import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../supabase/supabaseClient';

export const BASE_IMG_URL = 'https://ageijospngqmyzptvsoo.supabase.co/storage/v1/object/public/blogs/';

// createAsyncThunk : 리덕스가 비동기 통신할 때 쓰는 친구
// read
export const getBlogs = createAsyncThunk('blogs/getBlogs', async (_, { rejectWithValue }) => {
    const { data, error } = await supabase.from('blogs').select('*');

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('가져오기 실패했다');
    }
    if (!data) {
        return rejectWithValue('데이터 없다');
    }

    return data;
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

    // 파일이 있는 경우에만 파일 업로드를 수행
    if (updateBlog.file !== null) {
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

// updateLikes 좋아요 증가
export const updateLikes = createAsyncThunk('blogs/updateLikes', async (id, { rejectWithValue }) => {
    // 먼저 현재 likes 값을 가져옵니다
    const { data: currentData, error: fetchError } = await supabase.from('blogs').select('likes').eq('id', id).single();

    if (fetchError) {
        console.log('fetch error => ', fetchError);
        return rejectWithValue('현재 좋아요 수를 가져오는 데 실패했습니다');
    }

    // 현재 likes 값이 있는지 확인
    if (!currentData) {
        return rejectWithValue('데이터가 없습니다');
    }

    const updatedLikes = currentData.likes + 1;

    // likes 값을 1 증가시켜 업데이트합니다
    const { data, error } = await supabase.from('blogs').update({ likes: updatedLikes }).eq('id', id).select().single();

    if (error) {
        console.log('update error => ', error);
        return rejectWithValue('업데이트에 실패했습니다');
    }

    if (!data) {
        return rejectWithValue('업데이트된 데이터가 없습니다');
    }

    return data;
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
                console.log(action.payload);
                // 페이로드가 아이디
                prevState.blogLoading = false;
                prevState.blogs = prevState.blogs.filter((blog) => blog.id !== action.payload);
            })
            // updateLikes
            .addCase(updateLikes.pending, (prevState) => {
                prevState.blogLoading = true;
            })
            .addCase(updateLikes.rejected, (prevState, action) => {
                prevState.blogLoading = false;
                prevState.blogError = action.error.message;
            })
            .addCase(updateLikes.fulfilled, (prevState, action) => {
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
