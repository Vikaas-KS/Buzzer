import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { get, isNil } from 'lodash';

import Lobby from './containers/Lobby';
import Game from './containers/Game';
import './App.css';

function App() {
  const [auth, setAuth] = useState({
    playerID: null,
    credentials: null,
    roomID: null,
  });

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/:id"
            element={({ match }) => {
              const roomID = get(match, 'params.id');
              // redirect if the roomID in auth doesn't match, or no credentials
              return roomID &&
                auth.roomID === roomID &&
                !isNil(auth.credentials) &&
                !isNil(auth.playerID) ? (
                <Game auth={auth} setAuth={setAuth} />
              ) : (
                <Navigate
                  to={{
                    pathname: '/',
                    state: { from: location, roomID },
                  }}
                />
              );
            }}
          />
          <Route
            path="/"
            element={<Lobby setAuth={setAuth} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
