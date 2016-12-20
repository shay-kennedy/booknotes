import React from 'react';
import ReactDOM from 'react-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class BooknotesCategory extends React.Component {
	constructor(props) {
		super(props);
		this.setActiveCategory = this.setActiveCategory.bind(this);
		this.deleteCategory = this.deleteCategory.bind(this);
		this.editCategory = this.editCategory.bind(this);
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

	editCategory() {
		var newCategoryName = ReactDOM.findDOMNode(this.refs.categoryName).value.trim();
		if(newCategoryName === this.props.cat.categoryName) return;
		this.props.dispatch(actions.editCategory(this.props.cat._id, newCategoryName));
	}

	render(props) {
		return (
			<div className="booknotes-category">
				<div className="tabs">
					<div className="tab-title tab-info">
						<Link to={'/booknotes/list'} onClick={this.setActiveCategory} >{this.props.cat.categoryName}</Link>
					</div>
					<div className="tab-edit tab-info">
						<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleOptions} tether>
			        <DropdownToggle className="toggle-icon">
			          <i className="fa fa-cog" aria-hidden="true" />
			        </DropdownToggle>
			        <DropdownMenu>
			          <DropdownItem onClick={this.toggleEditModal}>Edit</DropdownItem>
			          <DropdownItem onClick={this.deleteCategory}>Delete</DropdownItem>
			        </DropdownMenu>
			      </Dropdown>
	      	</div>
      	</div>
	      <Modal isOpen={this.state.modal} toggle={this.toggleEditModal} className={this.props.className}>
          <ModalBody>
            <p>Category Name:</p>
            <input ref="categoryName" defaultValue={this.props.cat.categoryName} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { this.toggleEditModal(); this.editCategory(); }}>Submit</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
			</div>
		)
	}
}


export default connect()(BooknotesCategory);
