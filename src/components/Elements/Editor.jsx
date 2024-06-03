import { BASE_IMG_URL } from '@/redux/blogs.slice';
import supabase from '@/supabase/supabaseClient';
import Quill from 'quill';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';

// 이미지 처리를 하는 핸들러
const imageHandler = (quill) => {
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
        console.log('온체인지');
        const file = input.files[0];
        // multer에 맞는 형식으로 데이터 만들어준다.
        const formData = new FormData();
        formData.append('img', file); // formData는 키-밸류 구조
        // 백엔드 multer라우터에 이미지를 보낸다.
        try {
            let imgData, imgError;

            // 파일이 있는 경우에만 파일 업로드를 수행
            if (file !== null) {
                const uploadResult = await supabase.storage.from('blogs').upload(`${Date.now()}_${file.name}`, file);

                imgData = uploadResult.data;
                imgError = uploadResult.error;

                if (imgError) {
                    console.log('error => ', imgError);
                }
            }

            // 이미지 태그를 에디터에 써주기 - 여러 방법이 있다.
            // 2. 현재 에디터 커서 위치값을 가져온다
            const range = quill.getSelection();
            // 가져온 위치에 이미지를 삽입한다
            quill.insertEmbed(range.index, 'image', `${BASE_IMG_URL}${imgData.path}`);
        } catch (error) {
            console.log('실패했어요ㅠ', error);
        }
    });
};

// Editor is an uncontrolled React component
const Editor = forwardRef(({ onTextChange }, ref) => {
    const containerRef = useRef(null);
    const onTextChangeRef = useRef(onTextChange);

    useLayoutEffect(() => {
        onTextChangeRef.current = onTextChange;
    });

    useEffect(() => {
        const container = containerRef.current;
        container.style.width = '800px';
        container.style.height = '600px';
        const editorContainer = container.appendChild(container.ownerDocument.createElement('div'));
        const quill = new Quill(editorContainer, {
            theme: 'snow',
            placeholder: '당신의 하루를 들려주세요...,',
            modules: {
                toolbar: {
                    container: [
                        [{ header: [1, 2, 3, 4, 5, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['code-block', 'link', 'image']
                    ],
                    handlers: {
                        image: () => imageHandler(quill)
                    }
                }
            }
        });

        ref.current = quill;

        quill.on(Quill.events.TEXT_CHANGE, (delta, oldDelta, source) => {
            if (source === 'user') {
                onTextChangeRef.current?.(quill.root.innerHTML);
            }
        });

        return () => {
            ref.current = null;
            container.innerHTML = '';
        };
    }, [ref]);

    return <div ref={containerRef}></div>;
});

Editor.displayName = 'Editor';

export default Editor;
