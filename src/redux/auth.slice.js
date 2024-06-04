import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../supabase/supabaseClient';

// 깃헙 로그인
export const signInWithGithub = createAsyncThunk('auth/signInWithGithub', async (_, { rejectWithValue }) => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
        });

        if (error) {
            console.error('OAuth 로그인 에러:', error);
            return rejectWithValue('OAuth 로그인 에러');
        }

        if (!data) {
            return rejectWithValue('로그인 실패?');
        }

        const user = data.user;

        // user의 아바타 URL 가져오기
        const avatarUrl = user?.identities?.[0]?.identity_data?.avatar_url;
        if (!avatarUrl) {
            return rejectWithValue('아바타 URL을 가져올 수 없습니다.');
        }

        // 아바타 이미지를 스토리지에 업로드
        const fileName = `avatars/${user.id}.jpg`;
        const response = await fetch(avatarUrl);
        const blob = await response.blob();

        const { error: storageError } = await supabase.storage.from('blogs').upload(fileName, blob, {
            cacheControl: '3600',
            upsert: true,
            contentType: 'image/jpeg'
        });

        if (storageError) {
            console.error('스토리지 업로드 에러:', storageError);
            return rejectWithValue('스토리지 업로드 에러');
        }

        // 업로드된 이미지의 URL 가져오기
        const { publicURL } = supabase.storage.from('blogs').getPublicUrl(fileName);

        if (!publicURL) {
            return rejectWithValue('업로드된 파일 URL을 가져올 수 없습니다.');
        }

        // userinfo 테이블에 profile_image 컬럼 업데이트
        const { error: updateError } = await supabase
            .from('userinfo')
            .update({ profile_image: publicURL })
            .eq('user_id', user.id);

        if (updateError) {
            console.error('프로필 이미지 업데이트 에러:', updateError);
            return rejectWithValue('프로필 이미지 업데이트 에러');
        }

        return user;
    } catch (error) {
        console.error('에러 발생:', error);
        return rejectWithValue('로그인 중 에러 발생');
    }
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

    const { data: profile, error: profileError } = await supabase
        .from('userinfo')
        .select('profile_image')
        .eq('id', data.user.id)
        .single();

    data.user.profile = profile.profile_image;

    if (profileError) {
        console.log(profileError);
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
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        throw new Error('Failed to fetch user');
    }

    return {
        user: data.session.user,
        session: data.session
    };
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
                state.isLoggedIn = false;
                state.user = null;
                state.session = null;
            })
            .addCase(checkSignIn.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.isLoggedIn = true;
                state.user = action.payload.user;
                state.session = action.payload.session;
            })
            .addCase(checkSignIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                state.isLoggedIn = false;
                state.user = null;
                state.session = null;
            });
    }
});

export const authSliceName = authSlice.name;
const authReducer = authSlice.reducer;
export default authReducer;
