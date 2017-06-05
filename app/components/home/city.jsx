
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import ClassNames from "classnames";
import Icon from "../icon/";
import Button from "../button/";


import './_city.scss';


@observer
export default class Home extends Component {



    render() {
        let {className, goToScreen} = this.props;

        className = ClassNames('City', className, 'enterAnim');

        return (
            <section className={className}>

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

                <div className="btn-wrapper">
                    <Button white className="scroll" onClick={()=> goToScreen(4)}>
                        <span className="label">Our Technology</span>
                        <Icon type="arrow-down"/>
                    </Button>
                </div>


            </section>
        );
    }

}


