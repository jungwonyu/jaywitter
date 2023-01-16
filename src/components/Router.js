import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div
            style={{
              maxWidth: 320,
              height: '100vh',
              width: '100%',
              margin: '0 auto',
              marginTop: 50,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Route exact path='/'>
              <Home userObj={userObj} />
            </Route>
            <Route exact path='/profile'>
              <Profile refreshUser={refreshUser} userObj={userObj} />
            </Route>
          </div>
        ) : (
          <Route exact path='/'>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
