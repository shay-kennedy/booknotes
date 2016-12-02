import actions from './actions';

const initialState = {
	googleID: null,
	firstName: null,
	lastName: null,
	categories: [
		{
			items: [],
			categoryName: ''
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
				firstName: user.firstName,
				lastName: user.lastName,
				categories: user.categories,
				activeCategory: user.activeCategory
			});
			console.log('NEW STATE', newState);
			return newState;
		
		case actions.FETCH_USER_ERROR:
			console.log('FETCH_USER_ERROR');
			return state;
	
	}
	console.log('STATE', state);
	return state;	
};


exports.reducer = reducer;