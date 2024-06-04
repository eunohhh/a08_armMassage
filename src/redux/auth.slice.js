import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../supabase/supabaseClient';

// 깃헙 로그인
export const signInWithGithub = createAsyncThunk('auth/signInWithGithub', async (prevLocation, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: `${window.location.origin}${prevLocation}` // 원하는 경로로 수정
        }
    });

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('OAuth 로그인 에러');
    }
    if (!data) {
        return rejectWithValue('로그인 실패?');
    }
    // data === user
    return data;
});

// 회원가입
export const signUp = createAsyncThunk('auth/signUp', async ({ email, password, displayName }, { rejectWithValue }) => {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                display_name: displayName
            }
        }
    });

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('auth 로그인 에러');
    }

    return user;
});

// 그냥 로그인
export const signIn = createAsyncThunk('auth/signIn', async ({ email, password }, { rejectWithValue }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        console.log('error => ', error.message);
        console.log(error.message);

        if (error.message.includes('Invalid login credentials')) {
            return rejectWithValue('아이디와 비번을 확인하세요!');
        } else {
            return rejectWithValue('로그인 에러');
        }
    }
    return data;
});

// 로그아웃
export const signOut = createAsyncThunk('auth/signOut', async (_, { rejectWithValue }) => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('로그아웃 중 에러');
    }
});

// 로그인 상태 체크
export const checkSignIn = createAsyncThunk('auth/checkSignIn', async () => {
    const session = await supabase.auth.getUser();
    const isSignIn = !!session.data.user;

    return { isSignIn, session: session.data.user };
});

const initialState = {
    user: null,
    isLoggedIn: false,
    session: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Oauth 로그인
            .addCase(signInWithGithub.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isLoggedIn = false;
            })
            .addCase(signInWithGithub.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isLoggedIn = true;
                state.error = null;
            })
            .addCase(signInWithGithub.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isLoggedIn = false;
            })
            // 회원가입
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // 로그인
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.session = action.payload.session;
                state.user = action.payload.user;
                state.isLoggedIn = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // 로그아웃
            .addCase(signOut.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOut.fulfilled, (state) => {
                state.loading = false;
                state.session = null;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addCase(signOut.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            // 로그인 상태체크
            .addCase(checkSignIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(checkSignIn.fulfilled, (state, action) => {
                state.loading = false;
                if (!action.payload.session) return;
                state.session = action.payload.session;
                state.user = action.payload.session;
                state.isLoggedIn = action.payload.isSignIn;
            })
            .addCase(checkSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

const authReducer = authSlice.reducer;
export default authReducer;
