import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './blogs.slice';

// 리덕스 스토어는 = 창고
// 리덕스 슬라이스는 = 공장
// 리덕스 액션은 = 기계

const store = configureStore({
    reducer: {
        // 슬라이스를 넣는 자리
        blogs: blogReducer
    }
});

export default store;
