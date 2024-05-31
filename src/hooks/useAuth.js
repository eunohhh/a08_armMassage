import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkSignIn, signIn, signInWithGithub, signOut, signUp } from '../redux/auth.slice';

const useAuth = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const session = useSelector((state) => state.auth.session);
    const loading = useSelector((state) => state.auth.loading);
    const error = useSelector((state) => state.auth.error);
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        dispatch(checkSignIn());
    }, [dispatch]);

    const logIn = (logInData) => dispatch(signIn(logInData));
    const logOut = () => dispatch(signOut());
    const joinUp = (logInData) => dispatch(signUp(logInData));
    const logInWithGithub = () => dispatch(signInWithGithub());

    return {
        user,
        session,
        loading,
        error,
        isLoggedIn,
        logIn,
        logOut,
        joinUp,
        logInWithGithub
    };
};

export default useAuth;
