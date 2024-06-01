import React from 'react';
import useAuth from './hooks/useAuth';

const AuthTest = () => {
    const { user, session, loading, error, isLoggedIn, logIn, logOut, joinUp, logInWithGithub } = useAuth();

    const handleSignUpSignInSubmit = (e, type) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) return;

        if (type === 'join') {
            joinUp({ email, password });
        } else if (type === 'logIn') {
            logIn({ email, password });
        }
    };

    // isLoggedIn이 세번바뀜
    // console.log('isLoggedIn => ' + isLoggedIn);
    // console.log(user);
    // console.log(session);

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {user ? (
                <div>
                    <p>Signed in as {user.email}</p>
                    <button onClick={logOut}>Sign Out</button>
                </div>
            ) : (
                <>
                    <form onSubmit={(e) => handleSignUpSignInSubmit(e, 'logIn')}>
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">로그인</button>
                    </form>
                    <form onSubmit={(e) => handleSignUpSignInSubmit(e, 'join')}>
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">회원가입</button>
                    </form>
                    <button type="button" onClick={logInWithGithub}>
                        Sign In with Github
                    </button>
                </>
            )}
        </div>
    );
};

export default React.memo(AuthTest);
