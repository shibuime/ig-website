import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";
import {observable} from 'mobx';
import {observer, inject} from 'mobx-react';
import autobind from 'autobind-decorator'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@inject("uiStore")
@observer
export default class MainPage extends Component {

	@observable state = {
		showLoader: true
	};

	componentDidMount() {

	}



	render() {
		let {showLoader} = this.state;
		let {className, uiStore} = this.props;

		className = ClassNames('MainPage', className);

		return (
			<div className={className}>
					hello world!
				
			</div>
		)
	}
}
