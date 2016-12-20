import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';


class BooknotesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.deleteBooknote = this.deleteBooknote.bind(this);
		this.toggleOptions = this.toggleOptions.bind(this);
		this.toggleEditModal = this.toggleEditModal.bind(this);
    this.state = {
      dropdownOpen: false,
      modal: false
    };
	}

	toggleOptions() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleEditModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  editBooknote(e) {
		e.preventDefault();
		var title = ReactDOM.findDOMNode(this.refs.title).value.trim();
		if (title == null) {
			return;
		};
		var website = ReactDOM.findDOMNode(this.refs.url).value.trim();
		var pattern = /^((http|https|ftp):\/\/)/;
		if(!pattern.test(website)) {
    	website = "http://" + website;
		};
		var note = ReactDOM.findDOMNode(this.refs.note).value.trim();
		if(title === this.props.item.title && website === this.props.item.url && note === this.props.item.note) {
			return;
		};
		this.props.dispatch(actions.editBooknote(title, website, note, this.props.item.booknote_id, this.props.activeCategory));
	}

	deleteBooknote() {
		this.props.dispatch(actions.deleteBooknote(this.props.activeCategory, this.props.item.booknote_id));
	}

	render(props) {
		return (
			<div className="booknotes-detail">
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleOptions} tether>
	        <DropdownToggle className="toggle-icon">
	          <i className="fa fa-cog" aria-hidden="true" />
	        </DropdownToggle>
	        <DropdownMenu>
	          <DropdownItem onClick={this.toggleEditModal}>Edit</DropdownItem>
	          <DropdownItem onClick={this.deleteBooknote}>Delete</DropdownItem>
	        </DropdownMenu>
	      </Dropdown>
	      <a className="detail-title" href={this.props.item.url} target="_blank" ><p>{this.props.item.title}</p></a>
				<p className="detail-note">{this.props.item.note}</p>
	      <Modal isOpen={this.state.modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalBody>
            <p>Booknote Title:</p>
            <input ref="title" defaultValue={this.props.item.title} />
            <p>Booknote URL:</p>
            <input ref="url" defaultValue={this.props.item.url} />
            <p>Note:</p>
            <input ref="note" defaultValue={this.props.item.note} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => { this.toggleEditModal(); this.editBooknote(e); }}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
			</div>
		)
	}
}


const mapStateToProps = (state, props) => {
  return {
    activeCategory: state.activeCategory
  };
};

export default connect(mapStateToProps)(BooknotesDetail);
