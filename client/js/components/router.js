import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import store from '../redux/store';
import Main from './main';
import Login from './login';
import MainContainer from './main-container';
import MainLanding from './main-landing';
import BooknotesList from './booknotes-list';


const routes = (
	<Provider store={store}>
		<Router history={hashHistory} >
			<Route path="/" component={Main} >
				<IndexRoute component={Login} />
				<Route path="/booknotes" component={MainContainer} >
					<IndexRoute component={MainLanding} />
						<Route path="list" component={BooknotesList} />
				</Route>
			</Route>
		</Router>
	</Provider>
);

export default routes;