import 'isomorphic-fetch';
import Cookies from 'js-cookie';
import ObjectID from 'bson-objectid';


var FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
var fetchUserSuccess = function(user) {
  return {
    type: FETCH_USER_SUCCESS,
    user: user
  };
};

var FETCH_USER_ERROR = 'FETCH_USER_ERROR';
var fetchUserError = function(error) {
  return {
    type: FETCH_USER_ERROR,
    error: error
  };
};


// GET request for user info from DB using accessToken
var fetchUser = function() {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var headers = new Headers({
      Authorization: 'bearer ' + token
    });
    var url = '/user';
    return fetch(url, {headers: headers}).then(function(response) {
      if (response.status < 200 || response.status >= 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
      );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
      );
    });
  }
};

// PUT request to add category
var addCategory = function(category) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/add-category';
  return fetch(url,
    {
      method: 'put',
      headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
      body: JSON.stringify({
        'categoryName': category,
        'cat_id': ObjectID(),
        'items': []
      })
    }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// DELETE request to remove entire category
var deleteCategory = function(cat_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/delete-category';
  return fetch(url,
  {
    method: 'delete',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'cat_id': cat_id
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to set activeCategory
var setActiveCategory = function(activeCategory) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/set-active-category';
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
        'activeCategory': activeCategory
      })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to add booknote
var addBooknote = function(title, website, note, cat_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `add-booknote/${cat_id}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'title': title,
      'url': website,
      'note': note,
      'booknote_id': ObjectID()
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// PUT request to edit booknote
var editBooknote = function(title, website, note, booknote_id, cat_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `edit-booknote/${cat_id}`;
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'title': title,
      'url': website,
      'note': note,
      'booknote_id': booknote_id
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      console.log('USER', user);
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      console.log('ERROR', error);
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};

// DELETE request to delete booknote
var deleteBooknote = function(cat_id, booknote_id) {
  console.log('DELETE NOTE ACTION HIT', cat_id);
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `delete-booknote/${cat_id}`;
  return fetch(url,
  {
    method: 'delete',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      'booknote_id': booknote_id
    })
  }
    ).then(function(response) {
      if(response.status < 200 || response.status > 300) {
        var error = new Error(response.statusText);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then(function(user) {
      console.log('USER SUCCESS DELETE NOTE', user);
      return dispatch(
        fetchUserSuccess(user)
        );
    })
    .catch(function(error) {
      console.log('USER SUCCESS DELETE ERR');
      return dispatch(
        fetchUserError(error)
        );
    });
  }
};


exports.fetchUser = fetchUser;
exports.fetchUserSuccess = fetchUserSuccess;
exports.fetchUserError = fetchUserError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.addCategory = addCategory;
exports.deleteCategory = deleteCategory;
exports.setActiveCategory = setActiveCategory;
exports.addBooknote = addBooknote;
exports.editBooknote = editBooknote;
exports.deleteBooknote = deleteBooknote;
