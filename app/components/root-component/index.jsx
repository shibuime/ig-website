
import React, {Component, PropTypes} from 'react';
import ClassNames from "classnames";
import MainMenu from '../menu';




export default class RootComponent extends Component {


    render() {
        let {className, children} = this.props;

        className = ClassNames('RootComponent', className);

        return (
            <div className={className}>
                { children }

                <MainMenu/>
            </div>
        )

    }

};

