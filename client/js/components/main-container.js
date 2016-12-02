import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import TitleBar from './title-bar';
import BooknotesTabs from './booknotes-tabs';


var MainContainer = React.createClass({
	componentWillMount: function() {
		this.props.dispatch(actions.fetchUser());
	},
	render: function(props) {
		return (
			<div id="main-container">
				<TitleBar />
				<BooknotesTabs />
				{this.props.children}
			</div>
		)
	}
})


var Container = connect()(MainContainer);

module.exports = Container;