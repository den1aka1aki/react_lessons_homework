import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Users from './layouts/users';
import editUserPage from './components/page/editUserPage';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/profession';

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavBar/>
                <Switch>
                    <Route exact path ='/' component={MainPage}/>
                    <Route path ='/login/:type?' component={Login}/>
                    <Route path = '/logout' component={LogOut}/>
                    <ProtectedRoute path='/users/:userId/:edit' exact component={editUserPage}/>
                    <Route path='/users/:userId?' exact component={Users}/>
                    <Redirect to='/'/>
                </Switch>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
