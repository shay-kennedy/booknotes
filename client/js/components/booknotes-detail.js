import React from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';


var BooknotesDetail = React.createClass({
	deleteBooknote: function() {
		this.props.dispatch(actions.deleteBooknote(this.props.activeCategory, this.props.item.booknote_id));
	},
	render: function(props) {
		return (
			<div className="booknotes-detail">
				<a href={this.props.item.url} target="_blank" ><p>{this.props.item.title}</p></a>
				<p>{this.props.item.note}</p>
				<input type="button" onClick={this.deleteBooknote} value="Delete" />
			</div>
		)
	}
})


var Container = connect()(BooknotesDetail);

module.exports = Container;