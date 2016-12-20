import React from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import BooknotesCategory from './booknotes-category';


class BooknotesTabs extends React.Component {
	constructor(props) {
		super(props);
		this.addCategory = this.addCategory.bind(this);
	}

	addCategory(e) {
		e.preventDefault();
		let category = prompt('New category name:');
		if (category == null) {
			return;
		};
		this.props.dispatch(actions.addCategory(category));
	}

	render(props) {
		if (this.props.categories.length == 0) {
			return <p>Loading...</p>
		};
		var categoryTabs = this.props.categories.map((cat, index) => {
			return <BooknotesCategory key={index} cat={cat} />
		});
		return (
			<div id="booknotes-nav">
				{categoryTabs}
				<p className="booknotes-category new-tab" onClick={this.addCategory} >&#x271A;</p>
			</div>
		)
	}
}


const mapStateToProps = (state, props) => {
	return {
		categories: state.categories
	};
};

export default connect(mapStateToProps)(BooknotesTabs);
