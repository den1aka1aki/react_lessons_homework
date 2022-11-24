import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Users from './layouts/users';
import editUserPage from './components/page/editUserPage';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
    return (
        <>
            <AppLoader>

                <NavBar/>
                <Switch>
                    <Route exact path ='/' component={MainPage}/>
                    <Route path ='/login/:type?' component={Login}/>
                    <Route path = '/logout' component={LogOut}/>
                    <ProtectedRoute path='/users/:userId/:edit' exact component={editUserPage}/>
                    <Route path='/users/:userId?' exact component={Users}/>
                    <Redirect to='/'/>
                </Switch>

            </AppLoader>
            <ToastContainer/>
        </>
    );
};

export default App;
