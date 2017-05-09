
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {Link} from 'react-router';
import {observer} from "mobx-react";
import ClassNames from "classnames";
import Webgl from "./webgl";
import Hero from "./hero";
import Technology from "./technology";
import Mission from "./mission";
import Footer from "../footer/";
import BGImg from "../bg-img/";
import autobind from "autobind-decorator";
import WheelIndicator from "wheel-indicator";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import './_style.scss';


const lastSlide = 8;
const lastCameraPos = 4;
let interval = null;



@observer
export default class Home extends Component {

    @observable state = {
        slideNum: 0
    };


    componentDidMount(){
            this.initWheel();
            document.addEventListener('keydown', this.arrowNavHandler)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.arrowNavHandler);
        interval = null;
    }


    @autobind
    arrowNavHandler(e){
        e = e || window.event;
        //console.log(e.keyCode);

        if (e.keyCode == '38') {
            this.wheelHandler('up')
        }
        else if (e.keyCode == '40') {
            this.wheelHandler('down')
        }
    }

    @autobind
    goToScreen(num){
        this.state.slideNum = num;

        if(num > 0 && num < lastCameraPos){
            this.runNumbers()
        }
        else{
            this.stopNumbers()
        }

        if(num === 0 || num > lastCameraPos) return;
        goo.SystemBus.emit('setCameraPosition'+(num-1));


        //hide top number
        const topNum = document.querySelector('.top-number');
        if(!topNum) return;
        if(num === 3){
			topNum.style.display = 'block';
        }else{
			topNum.style.display = 'none';
		}
    }

    @autobind
    initWheel() {

        let indicator = new WheelIndicator({
            elem: document.querySelector('.Home'),
            callback: function(e){
                this.wheelHandler(e.direction)

            }.bind(this)
        });
    }

    @autobind
    wheelHandler(dir) {
        let {slideNum} = this.state;

        if(dir === "up" && slideNum > 0){
            console.log("up");
            this.goToScreen(slideNum-1);
        }
        if(dir === "down" && slideNum < lastSlide){
            console.log("down");
            this.goToScreen(slideNum+1);
        }
    }




    runNumbers(){
        let numbers = document.querySelectorAll('.number-elm');
        if(!numbers || interval) return;

        interval = setInterval(function() {
            for(let i = 0; i < numbers.length; i++){
                let string = Math.floor(Math.random() * 11000 * (i+1 * 12));
                string = string.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                numbers[i].innerText = string;
            }
        }, 150);

        for(let i = 0; i < numbers.length; i++){
            numbers[i].parentNode.classList.add('active');
        }
    }

    stopNumbers(){
        let numbers = document.querySelectorAll('.number-elm');
        if(!numbers) return;

        clearInterval(interval);
        for(let i = 0; i < numbers.length; i++){
            numbers[i].parentNode.classList.remove('active');
        }
        interval = null;
    }



    render() {
        let {slideNum} = this.state;
        let {className} = this.props;

        className = ClassNames('Home', className, 'slide-'+slideNum);




        return (
            <div className={className}>


                {/* ----- WEBGL ----- */}
                <Webgl/>




                {/* ----- HERO img ----- */}
                <div id="hero-img" className={slideNum > 0 ? 'fold' : ''}>
                    <BGImg src="/resources/images/hero.jpg"/>
                </div>
                {/* ----- HERO ENDS ----- */}



                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {slideNum >= 0 &&  slideNum < 4 &&
                    <Hero slideNum={slideNum} goToScreen={this.goToScreen}/>
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {slideNum >= 4 &&  slideNum < 7 &&
                        <Technology slideNum={slideNum}/>
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {slideNum === 7 &&
                        <Mission/>
                    }
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                    {slideNum === 8 &&
                        <Footer/>
                    }
                </ReactCSSTransitionGroup>





                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{slideNum === 0 &&
                    <div className="scrollBtn" onClick={()=> this.goToScreen(1)}>
                        <p>Scroll</p>
                        <i/>
                    </div>
					}
                </ReactCSSTransitionGroup>

                    <ul className="bullets">

                        <li className={(slideNum >= 0 && slideNum < 4) ? "active" : ""} onClick={()=> this.goToScreen(0)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: Math.max(71 - slideNum*23, 0)}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                        <li className={(slideNum >= 4 && slideNum < 7) ? "active" : ""} onClick={()=> this.goToScreen(4)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: Math.min(71, Math.max(71 - (slideNum-3)*23, 0))}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                        <li className={slideNum === 7 ? "active" : ""} onClick={()=> this.goToScreen(7)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: 0}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                        <li className={slideNum === lastSlide ? "active" : ""} onClick={()=> this.goToScreen(8)}>
                            <svg width="22px" height="22px" viewBox="0 0 22 22" style={{strokeDashoffset: 0}}>
                                <circle stroke="#1DE7DE" strokeWidth="2" fill="none" cx="11" cy="11" r="10"/>
                            </svg>
                        </li>

                    </ul>





            </div>
        );
    }

}


