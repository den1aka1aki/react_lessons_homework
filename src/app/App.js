import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import MainPage from './layouts/mainPage';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import Users from './layouts/users';
import editUserPage from './components/page/editUserPage';
import ProfessionProvider from './hooks/useProfession';
import { ToastContainer } from 'react-toastify';
import QualitiesProvider from './hooks/useQuality';
import AuthProvider from './hooks/useAuth';

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar/>
                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route exact path ='/' component={MainPage}/>
                            <Route path ='/login/:type?' component={Login}/>
                            <Route path='/users/:userId/:edit' component={editUserPage}/>
                            <Route path='/users/:userId?' component={Users}/>
                            <Redirect to='/'/>
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer/>
        </>
    );
};

export default App;
