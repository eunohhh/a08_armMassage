import getDataUrl from '@/utils/getDataUrl';
import Quill from 'quill';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// 이미지 처리를 하는 핸들러
const imageHandler = (quill, setFiles, onTextChangeRef) => {
    console.log('에디터에서 이미지 버튼을 클릭하면 이 핸들러가 시작됩니다!');

    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); // 에디터 이미지버튼을 클릭하면 이 input이 클릭된다.
    // input이 클릭되면 파일 선택창이 나타난다.

    // input에 변화가 생긴다면 = 이미지를 선택
    input.addEventListener('change', async () => {
        const file = input.files[0];
        setFiles((prev) => [...prev, file]);
        const formData = new FormData();
        formData.append('img', file); // formData는 키-밸류 구조
        try {
            const base64 = await getDataUrl(file);

            // 1. 현재 에디터 커서 위치값을 가져온다
            const range = quill.getSelection();
            // 2. 가져온 위치에 이미지를 삽입한다
            quill.insertEmbed(range.index, 'image', base64);

            // 3. 커서를 이미지 다음으로 이동시키기
            quill.setSelection(range.index + 1);

            // 4. 강제로 TEXT_CHANGE 이벤트 트리거
            quill.insertText(range.index + 1, '\n');
            // quill.root.innerHTML을 사용하여 onTextChangeRef 호출
            onTextChangeRef.current?.(quill.root.innerHTML);
        } catch (error) {
            console.log('실패했어요ㅠ', error);
        }
    });
};

// Editor is an uncontrolled React component
const Editor = forwardRef(({ onTextChange, setFiles, blog }, ref) => {
    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);

    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange;
    });

    useEffect(() => {
        const container = containerRef.current;
        container.style.width = '800px';
        container.style.height = '600px';
        container.style.margin = '1rem 2rem';
        const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
        const quill = new Quill(editorContainer, {
            theme: 'snow',
            placeholder: blog ? '' : '여기에 입력하세요...',
            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, 3, 4, 5, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['code-block', 'link', 'image']
                    ],
                    handlers: {
                        image: () => {
                            imageHandler(quill, setFiles, onTextChangeRef);
                        }
                    }
                }
            }
        });

        ref.current = quill;
        container.children[0].style.height = '8%';
        container.children[1].style.height = '92%';

        // Set initial content if blog is provided
        if (blog && blog.contents) {
            quill.clipboard.dangerouslyPasteHTML(blog.contents);

            // 커서 마지막 위치로, 근데 왜 setTimeout 하는 것인지...
            setTimeout(() => {
                const length = quill.getLength();
                quill.setSelection(length - 1, length - 1);
            }, 0);
        }

        //oldDelta, source
        quill.on(Quill.events.TEXT_CHANGE, (delta, oldContents) => {
            let currrentContents = quill.getContents();
            console.log(currrentContents.diff(oldContents));
            console.log(oldContents.diff(currrentContents));
            console.log(delta);
            // Check if an image was added
            const hasImage = delta.ops.some((op) => op.insert && op.insert.image);
            if (hasImage) {
                const length = quill.getLength();
                quill.insertText(length, '\n'); // Add a new line after the image
            }
            onTextChangeRef.current?.(quill.root.innerHTML);
        });

        return () => {
            ref.current = null;
            container.innerHTML = '';
        };
    }, [ref, setFiles, blog]);

    return <div ref={containerRef}></div>;
});

Editor.displayName = 'Editor';

export default Editor;
