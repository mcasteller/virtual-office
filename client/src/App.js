import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './history';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import BaseLayout from './layouts/BaseLayout/BaseLayout';
import Error from './views/Error/Error';
import Home from './views/Home/Home';
import Dashboard from './views/Dashboard/Dashboard';
import Profile from './views/Profile/Profile';
import SideNavPage from './views/SideNavPage/SideNavPage';
import FAQ from './views/FAQ/FAQ';
import Contact from './views/Contact/Contact';
import Request from './views/Services/Request/Request';
import Retrieve from './views/Services/Retrieve';

import AuthenticatedContent from './components/AuthenticatedContent/AuthenticatedContent.js';

import { AppProvider } from './context/AppProvider/store';
import { UserProfileProvider } from './context/UserProfileProvider/store';
import theme from './theme';
//const env = process.env.NODE_ENV || 'development';

export default function App () {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <AppProvider>
          <BaseLayout>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/faq" component={FAQ} />
              <Route path="/contact" component={Contact} />
              <Route path="/error" component={Error} />
              <AuthenticatedContent>
                <Switch>
                  <Route path="/service/add" component={Request}/>
                  <SideNavPage>
                    <Route path="/settings/account" >
                      <UserProfileProvider>
                        <Profile />
                      </UserProfileProvider>
                    </ Route>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/service/list" component={Retrieve} />
                  </SideNavPage>
                </Switch>
              </AuthenticatedContent>
            </Switch>
          </BaseLayout>
        </AppProvider>
      </Router>
    </ThemeProvider>
  )
}
