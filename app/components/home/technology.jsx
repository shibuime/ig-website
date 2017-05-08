import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import ClassNames from "classnames";
import Icon from "../icon/";
import Button from "../button/";
import Technology1 from "../technology/technology-1";
import Technology2 from "../technology/technology-2";
import Technology3 from "../technology/technology-3";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


import './_technology.scss';


@observer
export default class Home extends Component {


    render() {
        let {className, slideNum} = this.props;

        className = ClassNames('Technology', className);

        return (
            <article className={className}>


                <section className="section-title l enterAnim">
                    <h2>
                        <span className="title-line">
                            <span>Intelligo Clarity</span>
                        </span>
                    </h2>

                    <h3>
                        <span className="title-line">
                            <span>Technology that monitors human risk</span>
                        </span>
                    </h3>

                    <p>
                        <span className="title-line">
                            <span>Clarity enables effort-free compliance by </span>
                        </span>
                        <span className="title-line">
                            <span>automating research on people and companies</span>
                        </span>
                    </p>

                    <Button primary to="/request-a-demo">
                        <span className="label">Request a demo</span>
                        <Icon type="arrow-right"/>
                    </Button>
                </section>



                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{slideNum === 4 &&
                    <Technology1/>
					}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{slideNum === 5 &&
                    <Technology2/>
					}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup transitionName="FadeAnimation" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
					{slideNum === 6 &&
                    <Technology3/>
					}
                </ReactCSSTransitionGroup>

            </article>
        );
    }

}


