import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
    checkSignIn,
    getUserInfo,
    signIn,
    signInWithGithub,
    signOut,
    signUp,
    updateNickname,
    updateProfile
} from '../redux/auth.slice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, session, loading, error, isLoggedIn, userInfo } = useSelector(
        (state) => ({
            user: state.auth.user,
            session: state.auth.session,
            loading: state.auth.loading,
            error: state.auth.error,
            isLoggedIn: state.auth.isLoggedIn,
            userInfo: state.auth.userInfo
        }),
        shallowEqual
    );

    // console.log(user);

    useEffect(() => {
        dispatch(checkSignIn());
        dispatch(getUserInfo());
    }, [dispatch]);

    const logIn = (logInData) => dispatch(signIn(logInData)).then(() => dispatch(checkSignIn()));
    const logOut = () => dispatch(signOut());
    const joinUp = (logInData) => dispatch(signUp(logInData));
    // .then(() => dispatch(checkSignIn()))
    // .catch((error) => {
    //     throw new Error(error);
    // });
    const logInWithGithub = (prevLocation) => dispatch(signInWithGithub(prevLocation));
    // pickUpdate = { file, email }
    const upProfile = (picUpdate) => dispatch(updateProfile(picUpdate)).then(() => dispatch(checkSignIn()));
    // nickUpdate = { nickName, email }
    const upNickName = (nickUpdate) => dispatch(updateNickname(nickUpdate));
    const getUser = () => dispatch(getUserInfo());

    return {
        user,
        session,
        loading,
        error,
        isLoggedIn,
        userInfo,
        logIn,
        logOut,
        joinUp,
        logInWithGithub,
        upProfile,
        upNickName,
        getUser
    };
};

export default useAuth;

// const memoizedIsLoggedIn = useMemo(() => isLoggedIn, [isLoggedIn]);
