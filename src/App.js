import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { get, isNil } from 'lodash';
import Lobby from './containers/Lobby';
import Game from './containers/Game';
import './App.css';

function App({ auth, setAuth }) {
  const location = useLocation();
  const navigate = useNavigate();

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
