import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import actions from '../redux/actions';
import { connect } from 'react-redux';


class BooknotesDetail extends React.Component {
	constructor(props) {
		super(props);
		this.deleteBooknote = this.deleteBooknote.bind(this);
		this.toggleOptions = this.toggleOptions.bind(this);
    this.state = {
      dropdownOpen: false
    };
	}

	toggleOptions() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

	deleteBooknote() {
		this.props.dispatch(actions.deleteBooknote(this.props.activeCategory, this.props.item.booknote_id));
	}

	render(props) {
		return (
			<div className="booknotes-detail">
				<a href={this.props.item.url} target="_blank" ><p>{this.props.item.title}</p></a>
				<p>{this.props.item.note}</p>
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleOptions} tether>
	        <DropdownToggle >
	          Options
	        </DropdownToggle>
	        <DropdownMenu>
	          <DropdownItem>Edit</DropdownItem>
	          <DropdownItem onClick={this.deleteBooknote}>Delete</DropdownItem>
	        </DropdownMenu>
	      </Dropdown>
			</div>
		)
	}
}


export default connect()(BooknotesDetail);
