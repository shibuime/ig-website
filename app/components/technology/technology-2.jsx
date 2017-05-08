
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";
import Icon from "../icon/index";


import './_style.scss';


export default class Button extends Component {

    render() {
        let {className} = this.props;

        className = ClassNames('TechnologySection', 'tech-2', className);



        return (
            <div className={className}>



                <div className="ripples">
                    <i/>
                    <i/>
                    <i/>
                    <i/>
                    <i/>
                </div>


                <svg className="circles" width="490px" height="550px" viewBox="0 0 490 550">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g className="loop" transform="translate(-26.000000, 12.000000)" stroke="#FFFFFF">
                            <path d="M403.06779,393.610316 C411.991076,371.601177 416.905259,347.540733 416.905259,322.333382 C416.905259,217.435095 331.804452,132.398233 226.827286,132.398233 C121.850121,132.398233 36.7493136,217.435095 36.7493136,322.333382" id="Oval-3" strokeWidth="5" transform="translate(226.827286, 263.004274) scale(1, -1) rotate(-45.000000) translate(-226.827286, -263.004274) "/>
                            <g id="Group-6" transform="translate(269.113921, 483.256145) rotate(-270.000000) translate(-269.113921, -483.256145) translate(229.113921, 476.256145)" strokeWidth="2">
                                <path d="M0.0340199232,7.00837521 L78.2920514,7.00837521" id="Path-13"/>
                                <polyline id="Path-5" transform="translate(76.539788, 7.167956) rotate(-90.000000) translate(-76.539788, -7.167956) " points="70.1252236 4.10179223 76.5397877 10.2341205 82.9543518 4.10179223"/>
                            </g>
                            <path d="M268.056401,442.863865 C390.44184,442.863865 489.654842,343.725412 489.654842,221.431933 C489.654842,99.1384531 390.44184,2.84217094e-14 268.056401,2.84217094e-14 C145.670962,2.84217094e-14 46.4579606,99.1384531 46.4579606,221.431933" id="Oval-4-Copy-10" strokeWidth="2"/>
                        </g>
                        <g className="brain" transform="translate(209.000000, 199.000000)">
                            <polygon id="Path-20" stroke="#FFFFFF" strokeWidth="0.5" points="0.00289830003 27.5681336 6.52228006 11.4987896 24.6828901 1.11576079 49.556805 0.108564435 63.8245314 10.1236518 70.5875352 25.0991083 71.9913354 35.6277975 67.4124692 45.8265249 55.6981023 45.8265249 56.8732772 53.2651607 49.9888302 56.7777959 41.7319313 51.7413361 31.3697089 40.0698546 23.0017079 46.5408412 6.24268134 40.0698546"/>
                            <polyline id="Path-22" stroke="#FFFFFF" strokeWidth="0.5" points="6.3458423 39.7871712 18.7684773 25.9616384 25.0670656 1.73215721 39.6851612 11.333096 48.9903332 0.637692394 55.4755352 16.4591914 71.0318713 35.0324301 52.3352951 31.183713 49.4475619 54.050892 46.1448522 43.0504653 41.9573623 50.8524216 33.2589526 23.9018536 22.8619058 45.0268336 18.7684773 25.9616384 6.66172742 11.333096"/>
                            <ellipse id="Oval-3" fill="#FFFFFF" cx="39.6810249" cy="11.3387097" rx="2.1472645" ry="2.14516129"/>
                            <ellipse id="Oval-3-Copy-4" fill="#FFFFFF" cx="33.6810249" cy="23.3387097" rx="2.1472645" ry="2.14516129"/>
                            <ellipse id="Oval-3-Copy" fill="#FFFFFF" cx="18.821884" cy="26.0483871" rx="2.1472645" ry="2.14516129"/>
                            <ellipse id="Oval-3-Copy-2" fill="#FFFFFF" cx="52.5646119" cy="30.9516129" rx="2.1472645" ry="2.14516129"/>
                            <ellipse id="Oval-3-Copy-3" fill="#FFFFFF" cx="55.6321326" cy="16.2419355" rx="2.1472645" ry="2.14516129"/>
                            <polyline id="Path-23" stroke="#FFFFFF" strokeWidth="0.5" points="0.576914881 27.4912761 18.7076141 26.0008341 33.5808737 23.5928105 25.3095124 1.78994576"/>
                            <polyline id="Path-24" stroke="#FFFFFF" strokeWidth="0.5" points="63.7735556 10.1155165 55.3688988 16.2848207 39.5761519 11.1124946 33.4727283 23.2581395 52.4006853 31.2309488 46.2555126 42.8464466 31.411427 39.9977226"/>
                            <polyline id="Path-25" stroke="#FFFFFF" strokeWidth="0.5" points="70.4348081 24.695818 67.0365281 43.5293565 55.7506772 16.4385885 33.5793647 23.6928098"/>
                            <path d="M55.5776446,45.792155 L33.8550097,23.7812514" id="Path-26" stroke="#FFFFFF" strokeWidth="0.5"/>
                        </g>

                        <g className="pointers" transform="translate(135.000000, 78.000000)" stroke="#FFFFFF" strokeWidth="0.5">
                            <path d="M113.940841,131.92229 L71.9387567,0.526729983" id="Path-8"/>
                            <path d="M129.821759,137.296591 L168.374162,26.3777739" id="Path-9"/>
                            <path d="M130.165039,137.229061 L217.037378,84.7484967" id="Path-10"/>
                            <path d="M126.250147,152.059505 L261.909507,121.955917" id="Path-11"/>
                            <path d="M126.936707,152.731058 L203.630701,201.880119" id="Path-12"/>
                            <path d="M108.206378,143.937089 L110.935735,270.532357" id="Path-15"/>
                            <path d="M92.6218428,147.045367 L0.238266944,180.155938" id="Path-16"/>
                            <path d="M92.7719106,146.561398 L15.670858,99.7308846" id="Path-17"/>
                        </g>
                    </g>
                </svg>



                <div className="brain-icons">
                    <Icon type="linkedin"/>
                    <Icon type="bing"/>
                    <Icon type="facebook"/>
                    <Icon type="google"/>
                    <Icon type="twitter"/>
                    <Icon type="buffer"/>
                    <Icon type="youtube"/>
                    <Icon type="gaurdian"/>
                </div>



                <h5>
                    Automated <br/>
                    analysis
                </h5>
            </div>
        );
    }

}




