
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {Link} from 'react-router';
import {observer} from "mobx-react";
import ClassNames from "classnames";
import Icon from "../icon/";
import BGImg from "../bg-img/";
import Button from "../button/";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import './_hero.scss';


@observer
export default class Home extends Component {



    render() {
        let {className, slideNum, goToScreen} = this.props;

        className = ClassNames('Hero', className, 'enterAnim');

        return (
            <section className={className}>

                <h1>
                    <span className="title-line">
                        <span>Intelligo</span>
                    </span>
                    <span className="title-line">
                        <span>Group</span>
                    </span>
                </h1>
                <h2>
                    <span className="title-line">
                        <span>Innovative</span>
                    </span>
                    <span className="title-line">
                        <span>intelligence,</span>
                    </span>
                    <span className="title-line">
                        <span>iactionable</span>
                    </span>
                    <span className="title-line">
                        <span>insights</span>
                    </span>
                </h2>


                <ReactCSSTransitionGroup
                    transitionName="FadeAnimation"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}>
                    {slideNum !== 0 &&
                    <div>
                        <Button white className="scroll" onClick={()=> goToScreen(4)}>
                            <span className="label">Our Technology</span>
                            <Icon type="arrow-down"/>
                        </Button>
                    </div>
                    }
                </ReactCSSTransitionGroup>


            </section>
        );
    }

}


