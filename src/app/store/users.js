import { createSlice, createAction } from '@reduxjs/toolkit';
import userService from '../services/user.service';
import authService from '../services/auth.service';
import localStorageService from '../services/localStorage.service';
import getRandomInt from '../utils/getRandomInt';
import history from '../utils/history';
import { generetaAuthError } from '../utils/generetaAuthError';

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserID() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdateSuccessed: (state, action) => {
            state.entities[state.entities.findIndex(u => u._id === action.payload._id)] = action.payload;
        },
        authRequested: (state) => {
            state.error = null;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const { usersRequested, usersReceived, usersRequestedFailed, userUpdateSuccessed, userLoggedOut, authRequestedSuccess, userCreated, authRequestedFailed } = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('user/userCreateRequested');
const createUserFailed = createAction('user/createUserFailed');
const userUpdateFailed = createAction('user/userUpdateFailed');
const userUpdateRequested = createAction('user/userUpdateRequested');

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.logIn({ email, password });
        dispatch(authRequestedSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        history.push(redirect);
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            console.log(code);
            const errorMessage = generetaAuthError(message);
            dispatch(authRequestedFailed(errorMessage));
        } else {
            dispatch(authRequestedFailed(error.message));
        }
    }
};
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push('/');
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestedFailed(error.message));
    }
};
export const updateUser = (payload) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userUpdateSuccessed(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};
export const signUp = ({ email, password, ...rest }) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: getRandomInt(1, 5),
            image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
                .toString(36)
                .substring(7)}.svg`,
            completedMeetings: getRandomInt(0, 200),
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestedFailed(error.message()));
    }
};
function createUser (payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            const { content } = await userService.create(payload);
            dispatch(userCreated(content));
            history.push('/users');
        } catch (error) {
            dispatch(createUserFailed(error.message));
        }
    };
}
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find(u => u._id === state.users.auth.userId)
        : null;
};
export const getUsersList = () => (state) => state.users.entities;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getAuthErrors = () => (state) => state.users.error;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(u => u._id === userId);
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export default usersReducer;
