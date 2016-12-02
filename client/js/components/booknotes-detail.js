import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';


class BooknotesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.deleteBooknote = this.deleteBooknote.bind(this);
	}

	deleteBooknote() {
		this.props.dispatch(actions.deleteBooknote(this.props.activeCategory, this.props.item.booknote_id));
	}

	render(props) {
		return (
			<div className="booknotes-detail">
				<a href={this.props.item.url} target="_blank" ><p>{this.props.item.title}</p></a>
				<p>{this.props.item.note}</p>
				<input type="button" onClick={this.deleteBooknote} value="Delete" />
			</div>
		)
	}
}


var Container = connect()(BooknotesDetail);

module.exports = Container;