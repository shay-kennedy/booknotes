import React from 'react';
import { connect } from 'react-redux';
import actions from '../redux/actions';
import TitleBar from './title-bar';
import BooknotesTabs from './booknotes-tabs';


class MainContainer extends React.Component {
	constructor(props) {
		super(props);
		this.props.dispatch(actions.fetchUser());
	}

	render(props) {
		return (
			<div id="main-container">
				<TitleBar />
				<BooknotesTabs />
				{this.props.children}
			</div>
		)
	}
}


export default connect()(MainContainer);
