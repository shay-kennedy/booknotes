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

// POST request to add category
var addCategory = function(category) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/add-category';
  return fetch(url,
    {
      method: 'post',
      headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
      body: JSON.stringify({
        'categoryName': category
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

// PUT request to add category
var editCategory = function(_id, newCategoryName) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/edit-category';
  return fetch(url,
    {
      method: 'put',
      headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
      body: JSON.stringify({
        '_id': _id,
        'newCategoryName': newCategoryName
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
var deleteCategory = function(_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/delete-category';
  return fetch(url,
  {
    method: 'delete',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
      '_id': _id
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
var setActiveCategory = function(_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = '/set-active-category';
  return fetch(url,
  {
    method: 'put',
    headers: {'Content-type': 'application/json', 'Authorization': 'bearer ' + token},
    body: JSON.stringify({
        'activeCategory': _id
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
var addBooknote = function(title, website, note, activeCategory) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `add-booknote/${activeCategory}`;
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
var editBooknote = function(title, website, note, booknote_id, activeCategory) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `edit-booknote/${activeCategory}`;
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

// DELETE request to delete booknote
var deleteBooknote = function(activeCategory, booknote_id) {
  return function(dispatch) {
    var token = Cookies.get('accessToken');
    var url = `delete-booknote/${activeCategory}`;
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


exports.fetchUser = fetchUser;
exports.fetchUserSuccess = fetchUserSuccess;
exports.fetchUserError = fetchUserError;
exports.FETCH_USER_SUCCESS = FETCH_USER_SUCCESS;
exports.FETCH_USER_ERROR = FETCH_USER_ERROR;
exports.addCategory = addCategory;
exports.editCategory = editCategory;
exports.deleteCategory = deleteCategory;
exports.setActiveCategory = setActiveCategory;
exports.addBooknote = addBooknote;
exports.editBooknote = editBooknote;
exports.deleteBooknote = deleteBooknote;
