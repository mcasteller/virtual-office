import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import Page from './layouts/Page/Page';
import Error from './views/Error/Error';

import Home from './views/Home/Home';
import Person from './views/Person/Person';
import Profile from './views/Profile/Profile';

import AuthenticatedContent from './components/AuthenticatedContent/AuthenticatedContent.js';

import { AppProvider } from './context/AppProvider/store';
import { UserProfileProvider } from './context/UserProfileProvider/store';
import SideNavPage from './views/SideNavPage/SideNavPage';
//const env = process.env.NODE_ENV || 'development';

export default function App () {

  return (
    <Router history={history}>
      <AppProvider>
        <Page>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/error" component={Error} />
            <AuthenticatedContent>
              <Route path="/settings/account">
                <SideNavPage>
                  <UserProfileProvider>
                    <Profile />
                  </UserProfileProvider>
                </SideNavPage>
              </Route>
              <Route path="/dashboard" component={Person} />
            </AuthenticatedContent>
          </Switch>
        </Page>
      </AppProvider>
    </Router>
  )
}
