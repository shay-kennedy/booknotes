import actions from './actions';

const initialState = {
	googleID: null,
	_id: null,
	firstName: null,
	lastName: null,
	categories: [
		{
			items: [],
			categoryName: '',
			_id: null
		}
	],
	activeCategory: null
};

var reducer = function(state, action) {
	state = state || initialState;
	switch (action.type) {
		
		// Updates state upon fetch user success
		case actions.FETCH_USER_SUCCESS:
			console.log('FETCH_USER_SUCCESS');
			var user = action.user;
			var newState = Object.assign({}, state, {
				googleID: user.googleID,
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				categories: user.categories,
				activeCategory: user.activeCategory
			});
			return newState;
		
		case actions.FETCH_USER_ERROR:
			console.log('FETCH_USER_ERROR');
			return state;
	
	}
	return state;	
};


exports.reducer = reducer;