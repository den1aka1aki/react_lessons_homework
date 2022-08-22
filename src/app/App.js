import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import NavBar from './components/navBar';
import Login from './layouts/login';
import Users from './layouts/users';

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path ='/' component={MainPage}/>
                <Route path ='/login' component={Login}/>
                <Route path='/users/:userId?' component={Users}/>
                <Redirect to='/'/>
            </Switch>

        </>
    );
};

export default App;
