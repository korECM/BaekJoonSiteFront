import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Join from './components/auth/join/JoinPage';
import LoginPage from './components/auth/login/LoginPage';
import styles from './App.module.scss';
import className from 'classnames/bind';
import Header from './components/header/Header';
import MakeRoomPage from './components/room/setting/MakeRoomPage';
import JoinRoom from './components/room/join/JoinRoom';
import MainRoom from './components/room/mainRoom/MainRoom';

const cx = className.bind(styles);

function App() {
  return (
    <Router>
      <div className={cx('container')}>
        <Header />
        <div>
          <Route path="/login" component={LoginPage} />
          <Route path="/join" render={() => <Join from="/" />} />
          <Route path="/makeRoom" component={MakeRoomPage} />
          <Route path="/joinRoom/:enterId" component={JoinRoom} />
          <Route path="/room/:roomId" component={MainRoom} />
          <Route exact path="/" component={Home} />
        </div>
      </div>
    </Router>
  );
}

export default App;
