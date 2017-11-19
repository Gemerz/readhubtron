import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';
import HomePage from '../../app/containers/HomePage';
import { configureStore } from '../../app/store/configureStore';

function setup(initialState) {
  const store = configureStore(initialState);
  const history = createBrowserHistory();

  const actions = {
    initTopic: spy() 
  };
  const app = mount(
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <HomePage {...actions}/>
      </ConnectedRouter>
    </Provider>
  );
 
  return {
    app,
    actions
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { app } = setup;
      expect(app).toMatchSnapshot();
    });
  });
});
