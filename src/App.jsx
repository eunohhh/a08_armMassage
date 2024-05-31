import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from './redux/blogs.slice';

function App() {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs.blogs);

    console.log(blogs);

    useEffect(() => {
        dispatch(getBlogs());
    }, [dispatch]);

    // 잘되는 것 확인 크리에이트
    // useEffect(() => {
    //     setTimeout(() => {
    //         const temp = {
    //             title: '너무 어려워',
    //             contents: '진짜 너무해',
    //             created_at: new Date().toISOString(),
    //             author: '테스트맨'
    //         };
    //         dispatch(createBlogs(temp));
    //     }, 500);
    // }, []);

    // 잘되는 것 확인 업데이트
    // useEffect(() => {
    //     setTimeout(() => {
    //         // 실제로 할때는 id 맞춰서 보내야함
    //         const temp = {
    //             id: 7,
    //             title: '너무하는거 아니냐고',
    //             contents: 'ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ',
    //             created_at: new Date().toISOString(),
    //             author: '테스트맨222'
    //         };
    //         dispatch(updateBlogs(temp));
    //     }, 2000);
    // }, []);

    // 잘 되는 것 확인 딜리트
    // useEffect(() => {
    //     setTimeout(() => {
    //         const id = 5;
    //         dispatch(deleteBlogs(id));
    //     }, 2000);
    // }, []);

    return <main>야임마</main>;
}

export default App;
