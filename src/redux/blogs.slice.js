import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../supabase/supabaseClient';

export const BASE_IMG_URL = 'https://ageijospngqmyzptvsoo.supabase.co/storage/v1/object/public/blogs/';

// createAsyncThunk : 리덕스가 비동기 통신할 때 쓰는 친구
// read
export const getBlogs = createAsyncThunk('blogs/getBlogs', async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('가져오기 실패했다');
    }

    if (!data) {
        return rejectWithValue('데이터 없다');
    }

    const { data: likesData, error: likesError } = await supabase.from('blog_likes').select('*');

    const { data: userProfiles, error: profileError } = await supabase.from('userinfo').select('*');

    if (likesError) {
        console.error('Error fetching blog posts with likes:', likesError);
        return rejectWithValue('가져오기 실패했다');
    }

    if (profileError) {
        console.error('Error fetching blog posts with likes:', profileError);
        return rejectWithValue('프사 가져오기 실패했다');
    }

    if (error) {
        console.log(error);
        return rejectWithValue(error);
    }

    // 유저 프로필 데이터를 해시 맵으로 변환
    const profilesMap = userProfiles.reduce((acc, profile) => {
        acc[profile.email] = profile.profile_image;
        return acc;
    }, {});

    // 좋아요 데이터를 해시 맵으로 변환
    const likesMap = likesData.reduce((acc, like) => {
        acc[like.blog_id] = like.like_count;
        return acc;
    }, {});

    // 각 블로그 게시물에 좋아요 수를 추가
    const mapped = data.map((blog) => {
        return {
            ...blog,
            profilePic: profilesMap[blog.user_id],
            likes: likesMap[blog.id] || 0 // 좋아요 수가 없으면 0으로 설정
        };
    });

    return mapped;
});

// create
// 여길 수정해야 할 가능성 있음!!
export const createBlogs = createAsyncThunk('blogs/createBlogs', async (newBlog, { rejectWithValue }) => {
    let imgData, imgError;

    // 파일이 있는 경우에만 파일 업로드를 수행
    if (newBlog.file !== null) {
        const uploadResult = await supabase.storage
            .from('blogs')
            .upload(`${Date.now()}_${newBlog.file.name}`, newBlog.file);

        imgData = uploadResult.data;
        imgError = uploadResult.error;

        if (imgError) {
            console.log('error => ', imgError);
            return rejectWithValue('이미지 쓰기 실패했다');
        }

        newBlog.newBlog.image = imgData ? `${BASE_IMG_URL}${imgData.path}` : null;
    }

    // 파일이 없으면 이미지 경로를 null로 설정
    if (!newBlog.file) {
        newBlog.newBlog.image = null;
    }

    const { data: blogsData, error: blogsError } = await supabase
        .from('blogs')
        .insert([newBlog.newBlog])
        .select()
        .single();

    if (blogsError) {
        console.log('error => ', blogsError);
        return rejectWithValue('쓰기 실패했다');
    }
    if (!blogsData) {
        return rejectWithValue('데이터 없다');
    }

    return blogsData;
});

// createImgs
export const createImgs = createAsyncThunk('blogs/createImgs', async (file, { rejectWithValue }) => {
    let imgData, imgError;

    // 파일이 있는 경우에만 파일 업로드를 수행
    if (file !== null) {
        const uploadResult = await supabase.storage.from('blogs').upload(`${Date.now()}_${file.name}`, file);

        imgData = uploadResult.data;
        imgError = uploadResult.error;

        if (imgError) {
            console.log('error => ', imgError);
            return rejectWithValue('이미지 쓰기 실패했다');
        }
    }
    return imgData.path;
});

// update
// updateBlog 는 객체 (id를 가지고있음)
export const updateBlogs = createAsyncThunk('blogs/updateBlogs', async (updateBlog, { rejectWithValue }) => {
    let imgData, imgError;

    // 파일이 있고 타입이 스트링이 아닌 경우(타입이 스트링인 경우는 src 값이 넘어왔을 때임)에만 파일 업로드를 수행
    if (updateBlog.file !== null) {
        if (typeof updateBlog.file !== 'string') {
            const uploadResult = await supabase.storage
                .from('blogs')
                .upload(`${Date.now()}_${updateBlog.file.name}`, updateBlog.file);

            imgData = uploadResult.data;
            imgError = uploadResult.error;

            if (imgError) {
                console.log('error => ', imgError);
                return rejectWithValue('이미지 쓰기 실패했다');
            }

            updateBlog.newBlog.image = imgData ? `${BASE_IMG_URL}${imgData.path}` : null;
        } else {
            updateBlog.newBlog.image = updateBlog.file;
        }
    }

    // 파일이 없으면 이미지 경로를 null로 설정
    if (!updateBlog.file) {
        updateBlog.newBlog.image = null;
    }

    const { data, error } = await supabase
        .from('blogs')
        .update([updateBlog.newBlog])
        .eq('id', updateBlog.newBlog.id)
        .select()
        .single();

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('업데이트 실패했다');
    }
    if (!data) {
        return rejectWithValue('데이터 없다');
    }

    return data;
});

// delete
// id 는 uuid
export const deleteBlogs = createAsyncThunk('blogs/deleteBlogs', async (id, { rejectWithValue }) => {
    const { data, error } = await supabase.from('blogs').delete().eq('id', id);

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('업데이트 실패했다');
    }
    if (!data) {
        return rejectWithValue('데이터 없다');
    }

    return data;
});

// addLikes
export const updateLikes = createAsyncThunk('blogs/addLikes', async (ids, { rejectWithValue }) => {
    try {
        // 좋아요가 이미 존재하는지 확인
        const { data: existingLike, error: checkError } = await supabase
            .from('likes')
            .select('*')
            .eq('blog_id', ids.blogId)
            .eq('user_id', ids.userId)
            .maybeSingle();

        if (checkError && checkError.code !== 'PGRST116') {
            // PGRST116은 'no rows found' 에러 코드입니다.
            console.log('fetch error => ', checkError);
            return rejectWithValue('현재 좋아요 수 업데이트 실패했습니다');
        }

        // 이미 좋아요를 누른 경우
        if (existingLike) {
            return rejectWithValue({ blog_id: ids.blogId, user_id: ids.userId, message: '이미 좋아요를 눌렀습니다' });
            // return { blog_id: ids.blogId, user_id: ids.userId, message: '이미 좋아요를 눌렀습니다' };
        }

        const { data, error } = await supabase
            .from('likes')
            .insert([{ blog_id: ids.blogId, created_at: new Date().toISOString(), user_id: ids.userId }])
            .select()
            .single();

        if (error) {
            // 23505는 PostgreSQL의 unique constraint violation error 코드입니다.
            // 이미 좋아요가 존재하는 경우
            if (error.code === '23505') {
                return rejectWithValue({
                    blog_id: ids.blogId,
                    user_id: ids.userId,
                    message: '이미 좋아요를 눌렀습니다'
                });
            }
            console.log('fetch error => ', error);
            return rejectWithValue({ blog_id: ids.blogId, user_id: ids.userId, message: '이미 좋아요를 눌렀습니다' });
        }

        return data;
    } catch (err) {
        console.log('unexpected error => ', err);
        return rejectWithValue('예기치 않은 오류가 발생했습니다');
    }
});

// const { data, error } = await supabase.from('blogs').update({ likes: updatedLikes }).eq('id', id).select().single();

// getLikes
export const getLikes = createAsyncThunk('blogs/getLikes', async (blogId, { rejectWithValue }) => {
    const { error, count } = await supabase.from('likes').select('*', { count: 'exact' }).eq('blog_id', blogId);

    if (error) {
        console.error('Error getting like count:', error);
        return;
    }

    // 현재 likes 값이 있는지 확인
    if (!count) {
        return rejectWithValue('데이터가 없습니다');
    }

    return { blogId, count };
});

// 유저 프로필 사진 가져오기
export const getUserProfile = createAsyncThunk('blogs/getUserProfile', async ({ user_email }, { rejectWithValue }) => {
    const { data, error } = await supabase.from('userinfo').select('profile_image').eq('email', user_email).single();

    if (error) {
        console.log(error);
        return rejectWithValue(error);
    }

    console.log(data.profile_image);

    const result = {
        profile: data.profile_image,
        userEmail: user_email
    };

    return result;
});

const initialState = {
    blogs: [],
    blogLoading: false,
    blogError: null,
    imageSrc: null
};

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // read
            .addCase(getBlogs.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(getBlogs.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(getBlogs.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogs = action.payload;
                prevState.blogError = null;
            })
            // create
            .addCase(createBlogs.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(createBlogs.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(createBlogs.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogs.push(action.payload);
            })
            // update
            .addCase(updateBlogs.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(updateBlogs.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(updateBlogs.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogs = prevState.blogs.map((blog) => {
                    // 아이디가 일치하면 통째로 업데이트
                    if (blog.id === action.payload.id) {
                        return action.payload;
                        // 불일치하면 원래 데이터 리턴
                    } else {
                        return blog;
                    }
                });
            })
            // delete
            .addCase(deleteBlogs.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(deleteBlogs.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(deleteBlogs.fulfilled, (prevState, action) => {
                // console.log(action.payload);
                // 페이로드가 아이디
                prevState.blogLoading = false;
                prevState.blogs = prevState.blogs.filter((blog) => blog.id !== action.payload);
            })
            // addLikes
            .addCase(updateLikes.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(updateLikes.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.payload;
            })
            .addCase(updateLikes.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                if (action.payload.message === '이미 좋아요를 눌렀습니다') {
                    prevState.blogError = action.payload.message;
                } else {
                    prevState.blogError = null;
                }
            })
            // getLikes
            .addCase(getLikes.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(getLikes.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(getLikes.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogs = prevState.blogs.map((blog) => {
                    if (blog.id === action.payload.blogId) {
                        blog.likes = action.payload.count;
                        return blog;
                        // 불일치하면 원래 데이터 리턴
                    } else {
                        return blog;
                    }
                });
            })
            // createImg
            .addCase(createImgs.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(createImgs.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(createImgs.fulfilled, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.imageSrc = action.payload;
            });
    }
});

const blogReducer = blogSlice.reducer;
export default blogReducer;

// updateLikes 좋아요 증가
// export const updateLikes = createAsyncThunk('blogs/updateLikes', async (id, { rejectWithValue }) => {
//     // 먼저 현재 likes 값을 가져옵니다
//     const { data: currentData, error: fetchError } = await supabase.from('blogs').select('likes').eq('id', id).single();

//     if (fetchError) {
//         console.log('fetch error => ', fetchError);
//         return rejectWithValue('현재 좋아요 수를 가져오는 데 실패했습니다');
//     }

//     // 현재 likes 값이 있는지 확인
//     if (!currentData) {
//         return rejectWithValue('데이터가 없습니다');
//     }

//     const updatedLikes = currentData.likes + 1;

//     // likes 값을 1 증가시켜 업데이트합니다
//     const { data, error } = await supabase.from('blogs').update({ likes: updatedLikes }).eq('id', id).select().single();

//     if (error) {
//         console.log('update error => ', error);
//         return rejectWithValue('업데이트에 실패했습니다');
//     }

//     if (!data) {
//         return rejectWithValue('업데이트된 데이터가 없습니다');
//     }

//     return data;
// });
