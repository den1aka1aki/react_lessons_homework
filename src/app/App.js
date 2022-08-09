import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/mainPage';
import NavBar from './components/navBar';
import UsersPage from './components/usersPage';
import Login from './components/login';

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path ='/mainpage' component={MainPage}/>
                <Route path ='/users' component={UsersPage}/>
                <Route path ='/login' component={Login}/>
            </Switch>

        </>
    );
};

export default App;
