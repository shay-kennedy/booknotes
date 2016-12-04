import React from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class BooknotesCategory extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveCategory = this.setActiveCategory.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
	}

	setActiveCategory() {
		this.props.dispatch(actions.setActiveCategory(this.props.cat.cat_id));
	}
	
	deleteCategory() {
		this.props.dispatch(actions.deleteCategory(this.props.cat.cat_id));
	}

	render(props) {
		return (
			<div id="booknotes-category">
				<Link to={'/booknotes/list'} onClick={this.setActiveCategory} >{this.props.cat.categoryName}</Link>
				<Link to={'/booknotes'} onClick={this.deleteCategory}><img className="delete-icon" src="./assets/images/delete-icon.png" /></Link>
			</div>
		)
	}
}


export default connect()(BooknotesCategory);
