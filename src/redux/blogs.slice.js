import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import supabase from '../supabase/supabaseClient';

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
export const createBlogs = createAsyncThunk('blogs/createBlogs', async (newBlog, { rejectWithValue }) => {
    const { data, error } = await supabase.from('blogs').insert([newBlog]).select().single();

    if (error) {
        console.log('error => ', error);
        return rejectWithValue('쓰기 실패했다');
    }
    if (!data) {
        return rejectWithValue('데이터 없다');
    }

    return data;
});

// update
// updateBlog 는 객체 (id를 가지고있음)
export const updateBlogs = createAsyncThunk('blogs/updateBlogs', async (updateBlog, { rejectWithValue }) => {
    const { data, error } = await supabase.from('blogs').update([updateBlog]).eq('id', updateBlog.id).select().single();

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
// id 는 number
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

const initialState = {
    blogs: [],
    blogLoading: false,
    blogError: null
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
            });
    }
});

const blogReducer = blogSlice.reducer;
export default blogReducer;
