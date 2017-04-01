import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";
import {observer, inject} from 'mobx-react';
import {observable} from 'mobx';

import './_bg-img-style.scss';

@inject("uiStore") @observer
export default class BGImg extends Component {

	static propTypes = {
		src: PropTypes.string,
		alt: PropTypes.string,
		cover: PropTypes.bool,
		onLoad: PropTypes.func,
		//Load image immediatly allows images that should be 'above' the html fold come pre-displayed in the URL
		isImmediate: PropTypes.bool
	};

	static defaultProps = {
		onLoad: () => null
	};

	@observable state = {
		isLoaded: false
	};


	componentWillReceiveProps(nextProps){
		var {src} = this.props;
		if(nextProps.src !== src){
			this.updateImage(nextProps);
		}
	}

	componentDidMount() {
		this.updateImage(this.props);
	}

	updateImage({src, onLoad}){
		this.loadImage(src).then(image => {
			if(!this.isUnmounted){
				this.state.isLoaded = true;
				this.forceUpdate(onLoad);
			}
		});
	}


	componentWillUnmount(){
		this.isUnmounted = true;
	}

	loadImage(src){
		return new Promise((resolve, reject) =>{
			var image = new Image();
			image.addEventListener('load', e => resolve(image));
			image.src = src;
		});
	}

	render() {
		var {className, src, alt, cover, isImmediate} = this.props;
		var {isLoaded} = this.state;

		className = ClassNames('BGImg', className, {
			'BGImg-cover': cover,
			'BGImg-loaded': isImmediate || isLoaded
		});
		var imageStyle = {
			backgroundImage: `url(${src})`
		};

		return (
			<div className={className}>
				<div className='BGImg-image' style={imageStyle} alt={alt} />
			</div>
		);
	}

}






