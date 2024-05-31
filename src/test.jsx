import useAuth from './hooks/useAuth';

const Test = () => {
    const { user, session, loading, error, isLoggedIn, logIn, logOut, joinUp, logInWithGithub } = useAuth();

    const handleSignUpSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) return;

        joinUp({ email, password });
    };

    const handleSignInSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) return;

        logIn({ email, password });
    };

    console.log(isLoggedIn);
    console.log(session);
    console.log(user);

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
                    <form onSubmit={handleSignInSubmit}>
                        <input type="email" name="email" placeholder="Email" />
                        <input type="password" name="password" placeholder="Password" />
                        <button type="submit">로그인</button>
                    </form>
                    <form onSubmit={handleSignUpSubmit}>
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

export default Test;
