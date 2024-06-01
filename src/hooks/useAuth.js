import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { checkSignIn, signIn, signInWithGithub, signOut, signUp } from '../redux/auth.slice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, session, loading, error, isLoggedIn } = useSelector(
        (state) => ({
            user: state.auth.user,
            session: state.auth.session,
            loading: state.auth.loading,
            error: state.auth.error,
            isLoggedIn: state.auth.isLoggedIn
        }),
        shallowEqual
    );

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

// const memoizedIsLoggedIn = useMemo(() => isLoggedIn, [isLoggedIn]);
