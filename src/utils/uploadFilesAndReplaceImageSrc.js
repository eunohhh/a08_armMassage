import { BASE_IMG_URL } from '@/redux/blogs.slice';
import supabase from '@/supabase/supabaseClient';

const uploadFilesAndReplaceImageSrc = async (files, contents) => {
    let updatedContents = contents;

    for (let file of files) {
        const uploadResult = await supabase.storage.from('blogs').upload(`${Date.now()}_${file.name}`, file);
        const imgData = uploadResult.data;
        const imgError = uploadResult.error;

        if (imgError) {
            console.log('error => ', imgError);
            continue;
        }

        const imageUrl = `${BASE_IMG_URL}${imgData.path}`;
        // <img> 태그의 src를 이미지 URL로 대체
        // 요 아래가 핵심
        // div 하나 만들고
        // innerHTML 으로 밀어넣고
        // 다시 추출한다!
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = updatedContents;
        const imgTags = tempDiv.getElementsByTagName('img');

        for (let img of imgTags) {
            if (img.src.includes(file.name)) {
                img.src = imageUrl;
            }
        }

        updatedContents = tempDiv.innerHTML;
    }

    return updatedContents;
};

export default uploadFilesAndReplaceImageSrc;
