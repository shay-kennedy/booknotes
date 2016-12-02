import React from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import BooknotesCategory from './booknotes-category';


var BooknotesNav = React.createClass({
	addCategory: function(e) {
		e.preventDefault();
		let category = prompt('New category name:');
		if (category == null) {
			return;
		};
		this.props.dispatch(actions.addCategory(category));
	},
	render: function(props) {
		var categoryTabs = this.props.categories.map((cat, index) => {
			return <BooknotesCategory key={index} cat={cat} />
		});
		return (
			<div id="booknotes-nav">
				{categoryTabs}
				<p onClick={this.addCategory}>+ NEW</p>
			</div>
		)
	}
});


var mapStateToProps = function(state, props) {
	return {
		categories: state.categories
	}
}

var Container = connect(mapStateToProps)(BooknotesNav);

module.exports = Container;