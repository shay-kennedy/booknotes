import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class BooknotesCategory extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveCategory = this.setActiveCategory.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
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

	setActiveCategory() {
		this.props.dispatch(actions.setActiveCategory(this.props.cat._id));
	}
	
	deleteCategory() {
		this.props.dispatch(actions.deleteCategory(this.props.cat._id));
	}

	render(props) {
		return (
			<div id="booknotes-category">
				<Link to={'/booknotes/list'} onClick={this.setActiveCategory} >{this.props.cat.categoryName}</Link>
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleOptions} tether>
	        <DropdownToggle >
	          <img className="delete-icon" src="./assets/images/delete-icon.png" />
	        </DropdownToggle>
	        <DropdownMenu>
	          <DropdownItem onClick={this.toggleEditModal}>Edit</DropdownItem>
	          <DropdownItem onClick={this.deleteCategory}>Delete</DropdownItem>
	        </DropdownMenu>
	      </Dropdown>
	      <Modal isOpen={this.state.modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalBody>
            <p>Category Name:</p>
            <input ref="title" />
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


export default connect()(BooknotesCategory);
