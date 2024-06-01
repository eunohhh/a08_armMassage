import BlogTest from './blogTest';
import Test from './test';

function App() {
    // 잘되는 것 확인 크리에이트

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

    return (
        <main>
            <h1>야임마</h1>
            <Test />
            <BlogTest />
        </main>
    );
}

export default App;
