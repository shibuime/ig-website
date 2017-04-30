import React, {Component, PropTypes} from 'react';
import {observable} from "mobx";
import {observer} from "mobx-react";
import ClassNames from "classnames";
import Icon from "../icon/";
import Button from "../button/";
import BGImg from "../bg-img/";


import './_mission.scss';


@observer
export default class Home extends Component {


    render() {
        let {className} = this.props;

        className = ClassNames('Mission', className);

        return (
            <article className={className}>

                <ul className="features">
                    <li>
                        <BGImg cover src="/resources/images/speed.jpg"/>
                        <section>
                            <h4>
                                Speed
                            </h4>
                            <p>
                                A report in 10 minutes <br/>
                                instead of 10 days
                            </p>
                        </section>
                    </li>
                    <li>
                        <BGImg cover src="/resources/images/price.jpg"/>
                        <section>
                            <h4>
                                Price
                            </h4>
                            <p>
                                A report at half <br/>
                                the price
                            </p>
                        </section>
                    </li>
                    <li>
                        <BGImg cover src="/resources/images/coverage.jpg"/>
                        <section>
                            <h4>
                                Coverage
                            </h4>
                            <p>
                                Covering 1000's of sources <br/>
                                instead of 100s
                            </p>
                        </section>
                    </li>
                    <li>
                        <BGImg cover src="/resources/images/monitoring.jpg"/>
                        <section>
                            <h4>
                                Monitoring
                            </h4>
                            <p>
                                Constant and ongoing monitoring <br/>
                                instead of periodic manual updates
                            </p>
                        </section>
                    </li>
                </ul>


                <section className="section-title l enterAnim">
                    <h2>
                        <span className="title-line">
                            <span>Our Mission</span>
                        </span>
                    </h2>

                    <p>
                        <span className="title-line">
                            <span>The first truly automated due diligence solution,</span>
                        </span>
                        <span className="title-line">
                            <span>producing a comprehensive report in minutes.</span>
                        </span>
                    </p>
                    <Button primary  to="/request-a-demo">
                        <span className="label">Request a demo</span>
                        <Icon type="arrow-right"/>
                    </Button>
                </section>

            </article>
        );
    }

}


