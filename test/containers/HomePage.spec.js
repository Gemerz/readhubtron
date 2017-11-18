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
  const app = mount(
    <Provider store={store}>
      <ConnectedRouter history={history} >
        <HomePage />
      </ConnectedRouter>
    </Provider>
  );
  return {
    app
  };
}

describe('containers', () => {
  describe('App', () => {
    it('should display initial count', () => {
      const { app } = setup;
      console.log(app)
    });
  });
});
