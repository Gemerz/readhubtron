/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NewsPage from './containers/NewsPage';
import TechPage from './containers/TechPage';
import SettingPage from './containers/SettingPage';

export default () => (

  <App>
    <Switch>
      <Route path="/news" component={NewsPage} />
      <Route path="/tech" component={TechPage} />
      <Route path="/setting" component={SettingPage} />
      <Route path="/" component={window.mode === 'setting' ? SettingPage : HomePage} />
    </Switch>
  </App>
);
