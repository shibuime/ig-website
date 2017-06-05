
import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import ClassNames from "classnames";


import './_hero.scss';


@observer
export default class Home extends Component {



    render() {
        let {className, slideNum} = this.props;

        className = ClassNames('Hero', className, 'enterAnim');

        return (
            <section className={className}>

                <h1>
                    <span className="title-line">
                        <span>Automated</span>
                    </span>
                    <span className="title-line">
                        <span>compliance</span>
                    </span>
                </h1>
                <h2>
                    <span className="title-line">
                        <span>Decision-ready</span>
                    </span>
                    <span className="title-line">
                        <span>analysis in minutes</span>
                    </span>
                </h2>

            </section>
        );
    }

}


