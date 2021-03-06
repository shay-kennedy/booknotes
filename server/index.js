import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.static(process.env.CLIENT_PATH));

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;

// Passport Strategies
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import passport from 'passport';
import bodyParser from 'body-parser';

// User model
import User from './models/user';
import Category from './models/category';

try {
  var config = require('../config');
} catch (e) {};

mongoose.Promise = global.Promise;

// Database Setup
const db = process.env.DBPATH || config.mongoDB.dbPath;
mongoose.connect(db);

app.use(passport.initialize());
app.use(bodyParser.json());


// Google OAuth2 Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENTID || config.googleAuth.clientID,
  clientSecret: process.env.CLIENTSECRET || config.googleAuth.clientSecret,
  callbackURL: process.env.CALLBACKURL || config.googleAuth.callbackURL,
  },
  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleID: profile.id}, (err, user) => {
      if (!user) {
        User.create({
          googleID: profile.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          displayName: profile.displayName,
          email: profile.emails[0].value
        }, (err, users) => {
          return done(err, users);
        });
      } else {
        return done(err, user);
      }
    });
  }
));


app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    accessType: 'offline'
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session: false
  }),
  (req, res) => {
    res.cookie('accessToken', req.user.accessToken, {expires: 0});
    res.redirect('/#/booknotes');
  }
);


// Bearer Strategy
passport.use(new BearerStrategy(
  (token, done) => {
    User.findOne({ accessToken: token },
      (err, users) => {
        if(err) {
          return done(err)
        }
        if(!users) {
          return done(null, false)
        }
        return done(null, users, { scope: 'read' })
      }
    );
  }
));

// GET: Logout route
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// GET: Retrieve user object
app.get('/user', passport.authenticate('bearer', {session: false}), 
  (req, res) => {
    User.findOne({googleID: req.user.googleID})
    .populate('categories')
    .then((user) => {
      if (!user) {
        res.send("Error has occured")
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send(err)
    });
});

// POST: Add category
app.post('/add-category', passport.authenticate('bearer', {session: false}), 
  (req, res) => {
    const newCategory = new Category({
      categoryName: req.body.categoryName
    });
    newCategory.save();
    User.findOneAndUpdate(
              { 'googleID': req.user.googleID },
              { 
                $push: { 'categories': newCategory._id },
                $set: { 'activeCategory': newCategory._id } 
              },
              { 
                new: true, 
                populate: 'categories' 
              },
      (err, user) => {
      if (err) return res.send(err);
      return res.json(user);
    })
  });

// PUT: Edit category name
app.put('/edit-category', passport.authenticate('bearer', {session: false}), 
  (req, res) => {
    Category.findOneAndUpdate(
                { _id: req.body._id},
                { $set: { 'categoryName': req.body.newCategoryName } },
                { new: true },
      function(err, category) {
        if(err) return res.send(err);
      });
    User.findOne({googleID: req.user.googleID})
    .populate('categories')
    .then((user) => {
      if (!user) {
        res.send("Error has occured")
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send(err)
    });
  });

// DELETE: Remove category
app.delete('/delete-category', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    Category.findOneAndRemove({ '_id':req.body._id },
      function(err, category) {
        if(err) {
          return res.send(err)
        }
        if(req.user.activeCategory == req.body._id) {
          User.findOneAndUpdate(
                { googleID: req.user.googleID },
                { 
                  $pull: { 'categories': req.body._id },
                  $set: { 'activeCategory': null }
                },
                { 
                  new: true, 
                  populate: 'categories' 
                },
            (err, user) => {
              
              if (err) {
                return res.send(err);
              }
              return res.json(user);
            });
        } else {
          User.findOneAndUpdate(
                { googleID: req.user.googleID },
                { 
                  $pull: { 'categories': req.body._id }
                },
                { 
                  new: true, 
                  populate: 'categories' 
                },
            (err, user) => {
              if (err) return res.send(err);
              return res.json(user);
            });
        }
      });
  });

// POST: Set activeCategory
app.put('/set-active-category', passport.authenticate('bearer', {session: false}), 
  (req, res) => {
    User.findOneAndUpdate(
            { 'googleID': req.user.googleID },
            { $set: { 'activeCategory': req.body.activeCategory } },
            { 
              new:true,
              populate: 'categories' 
            },
      (err, user) => {
        if(err) {
          return res.send(err)
        }
        return res.json(user);
      });
  });

// PUT: Add booknote to existing category
app.put('/add-booknote/:_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    var googleID = req.user.googleID;
    Category.findOneAndUpdate( { '_id':req.params._id },
                  { $push : { 'items': req.body } },
                  { new: true },
      function(err, category) {
        if(err) return res.send(err);
      });
    User.findOne({googleID: req.user.googleID})
    .populate('categories')
    .then((user) => {
      if (!user) {
        res.send("Error has occured")
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send(err)
    });
  });

// PUT: Edit booknote from existing category
app.put('/edit-booknote/:_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    Category.findOneAndUpdate( { '_id': req.params._id, 'items.booknote_id': req.body.booknote_id },
                    { $set : 
                        { 
                          'items.$.title': req.body.title,
                          'items.$.url': req.body.url,
                          'items.$.note': req.body.note
                        }
                    },
                    { new: true }, 
      function(err, category) {
        if(err) return res.send(err);
      });
    User.findOne({googleID: req.user.googleID})
    .populate('categories')
    .then((user) => {
      if (!user) {
        res.send("Error has occured")
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send(err)
    });
  });

// DELETE: Remove booknote from existing category
app.delete('/delete-booknote/:_id', passport.authenticate('bearer', {session: false}),
  function(req, res) {
    Category.findOneAndUpdate( { '_id':req.params._id },
                  { $pull : { 'items':{ 'booknote_id': req.body.booknote_id } } },
                  { new: true },
      function(err, user) {
        if(err) return res.send(err);
      });
    User.findOne({googleID: req.user.googleID})
    .populate('categories')
    .then((user) => {
      if (!user) {
        res.send("Error has occured")
      } else {
        res.json(user);
      }
    })
    .catch((err) => {
      res.send(err)
    });
  });


console.log(`Server running in ${process.env.NODE_ENV} mode`);

function runServer() {
  return new Promise((resolve, reject) => {
    app.listen(PORT, HOST, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      const host = HOST || 'localhost';
      console.log(`Listening on ${host}:${PORT}`);
    });
  });
}

if (require.main === module) {
  runServer();
}
