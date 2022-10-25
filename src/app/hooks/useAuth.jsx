import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import localStorageService, { setTokens } from '../services/localStorage.service';

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:'
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);

    function randomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    async function sighUp ({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post(`signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            await createUser({ _id: data.localId, email, rate: randomInt(1, 5), complitedMeetings: randomInt(0, 200), ...rest });
            console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует'
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function singIn ({ email, password }) {
        try {
            const { data } = await httpAuth.post(`signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`, {
                email,
                password,
                returnSecureToken: true
            });
            setTokens(data);
            getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        email: 'Пользователь или пароль введены не верно'
                    };
                    throw errorObject;
                }
            }
        }
    }
    async function createUser (data) {
        try {
            const { content } = await userService.create(data);
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }
    async function getUserData () {
        try {
            const { content } = await userService.getCurentUser();
            setUser(content);
        } catch (e) {
            errorCatcher(e);
        }
    }
    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        }
    }, []);
    function errorCatcher (error) {
        const { message } = error.response.data;
        setError(message);
    }
    useEffect(() => {
        if (error !== null) {
            toast(error);
        }
    }, [error]);
    return (
        <AuthContext.Provider value={{ sighUp, currentUser, singIn }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AuthProvider;
