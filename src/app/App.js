import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/mainPage';
import NavBar from './components/navBar';
import UsersPage from './components/usersPage';
import Login from './components/login';
import UserCard from './components/userCard';

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path ='/' component={MainPage}/>
                <Route path ='/users' component={UsersPage}/>
                <Route path ='/login' component={Login}/>
                <Route path='/usercard' component={UserCard}/>
            </Switch>

        </>
    );
};

export default App;
