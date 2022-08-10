import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Route, Switch } from 'react-router-dom';
import MainPage from './components/mainPage';
import NavBar from './components/navBar';
import Login from './components/login';
import UserCard from './components/userCard';
import Users from './components/users';

const App = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path ='/' component={MainPage}/>
                <Route path ='/users' component={Users}/>
                <Route path ='/login' component={Login}/>
                <Route path='/usercard:userId?' component={UserCard}/>
            </Switch>

        </>
    );
};

export default App;
