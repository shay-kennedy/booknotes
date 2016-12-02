import React from 'react';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import BooknotesDetail from './booknotes-detail';


class BooknotesList extends React.Component {
	constructor(props) {
		super(props);
		this.addBooknote = this.addBooknote.bind(this);
	}


	addBooknote(e) {
		e.preventDefault();
		var title = prompt('Note title:');
		var website = prompt('Note url:');
		var pattern = /^((http|https|ftp):\/\/)/;
		if(!pattern.test(website)) {
    	website = "http://" + website;
		}
		var note = prompt('Note note:');
		if (title == null) {
			return;
		};
		this.props.dispatch(actions.addBooknote(title, website, note, this.props.activeCategory));
	}

	render(props) {
		if (this.props.activeCategory == null) {
			return (
				<div>
					<p>Select a category above.</p>
				</div>
			)
		};
		if (this.props.category.items.length == 0) {
			return (
				<div>
					<p>Add a Booknote to this category.</p>
					<input type="button" value="Add Note" onClick={this.addBooknote} />
				</div>
			)
		};
		var booknoteList = this.props.category.items.map((item) => {
			return (<BooknotesDetail key={item.booknote_id} item={item} activeCategory={this.props.activeCategory} />)
		});
		return (
			<div id="booknote-list">
				<input type="button" value="Add Note" onClick={this.addBooknote} />
				{booknoteList}
			</div>
		)
	}
}


const mapStateToProps = (state, props) => {
  return {
    category: state.categories.find((cat) => {
      if(state.activeCategory == cat.cat_id) {
        return cat
      }
    }),
    activeCategory: state.activeCategory
  };
};

export default connect(mapStateToProps)(BooknotesList);
