import Editor from '@/components/Elements/Editor';
import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

function QuillTest() {
    const [contents, setContents] = useState();

    console.log(contents);
    // Use a ref to access the quill instance directly
    const quillRef = useRef();

    return (
        <form>
            <label htmlFor="title">타이틀</label>
            <input type="text" name="title"></input>
            <Editor ref={quillRef} onTextChange={setContents} />
        </form>
    );
}

export default QuillTest;

//     return (
//         <ReactQuill
//             style={{ position: 'relative', display: 'block', width: '800px', height: '600px' }}
//             theme="snow"
//             value={value}
//             onChange={setValue}
//             modules={modules}
//         />
//     );
