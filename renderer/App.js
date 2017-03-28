import React from 'react';

import {observer, Provider} from 'mobx-react';

const UiStore = require('./store/ui.store').default;
const uiStore = new UiStore();


@observer
export default class App extends React.Component {


  render () {
    return (
      <Provider uiStore={uiStore}>
        <div className='wrapper'>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}

