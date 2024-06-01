import { useMemo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { signIn, signInWithGithub, signOut, signUp } from '../redux/auth.slice';

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

    // useEffect(() => {
    //     dispatch(checkSignIn());
    // }, [dispatch]);

    const logIn = (logInData) => dispatch(signIn(logInData));
    const logOut = () => dispatch(signOut());
    const joinUp = (logInData) => dispatch(signUp(logInData));
    const logInWithGithub = () => dispatch(signInWithGithub());

    const memoizedIsLoggedIn = useMemo(() => isLoggedIn, [isLoggedIn]);

    return {
        user,
        session,
        loading,
        error,
        isLoggedIn: memoizedIsLoggedIn,
        logIn,
        logOut,
        joinUp,
        logInWithGithub
    };
};

export default useAuth;
