import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import BooknotesDetail from './booknotes-detail';


class BooknotesList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
		this.addBooknote = this.addBooknote.bind(this);
	}

	toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

	addBooknote(e) {
		e.preventDefault();
		var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
		var website = ReactDOM.findDOMNode(this.refs.url).value.trim();
		var pattern = /^((http|https|ftp):\/\/)/;
		if(!pattern.test(website)) {
    	website = "http://" + website;
		}
		var note = ReactDOM.findDOMNode(this.refs.note).value.trim();
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
					<Button color="danger" onClick={this.toggle}>Add Booknote</Button>
					<p>Add a Booknote to this category.</p>
					<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
	          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
	          <ModalBody>
	            <Form>
	            	<FormGroup>
	          		 	<Label for="title">Booknote Title:</Label>
	        				<Input type="text" name="title" id="title" ref="title" placeholder="enter title here" />
	            	</FormGroup>
	            	<FormGroup>
	            		<Label for="url">Booknote Title:</Label>
	        				<Input type="url" name="url" id="url" ref="url" placeholder="enter url/website here" />
	            	</FormGroup>
	            	<FormGroup>
	            		<Label for="note">Note:</Label>
	          			<Input type="textarea" name="note" id="note" ref="note" placeholder="enter your note here to remind you about this booknote" />
	            	</FormGroup>
	            	<Button color="primary" onClick={(e) => { this.toggle(); this.addBooknote(e); }}>Submit</Button>{' '}
	            	<Button color="secondary" onClick={this.toggle}>Cancel</Button>
	            </Form>
	          </ModalBody>
	        </Modal>
				</div>
			)
		};
		var booknoteList = this.props.category.items.map((item) => {
			return (<BooknotesDetail key={item.booknote_id} item={item} activeCategory={this.props.activeCategory} />)
		});
		return (
			<div id="booknote-list">
				<Button color="danger" onClick={this.toggle}>Add Booknote</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
            	<FormGroup>
          		 	<Label for="title">Booknote Title:</Label>
        				<Input type="text" name="title" id="title" ref="title" placeholder="enter title here" />
            	</FormGroup>
            	<FormGroup>
            		<Label for="url">Booknote Title:</Label>
        				<Input type="url" name="url" id="url" ref="url" placeholder="enter url/website here" />
            	</FormGroup>
            	<FormGroup>
            		<Label for="note">Note:</Label>
          			<Input type="textarea" name="note" id="note" ref="note" placeholder="enter your note here to remind you about this booknote" />
            	</FormGroup>
            	<Button color="primary" onClick={(e) => { this.toggle(); this.addBooknote(e); }}>Submit</Button>{' '}
            	<Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </Form>
          </ModalBody>
        </Modal>
				{booknoteList}
			</div>
		)
	}
}


const mapStateToProps = (state, props) => {
  return {
    category: state.categories.find((cat) => {
      if(state.activeCategory == cat._id) {
        return cat
      }
    }),
    activeCategory: state.activeCategory
  };
};

export default connect(mapStateToProps)(BooknotesList);
