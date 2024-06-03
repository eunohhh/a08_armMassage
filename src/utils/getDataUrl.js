function getDataUrl(file) {
    // 파일이 이미지인지 확인
    if (file.type.startsWith('image/')) {
        // 이미지 파일인 경우 처리
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                // Create canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                // Set width and height
                canvas.width = img.width;
                canvas.height = img.height;
                // Draw the image
                ctx.drawImage(img, 0, 0);

                const base64 = canvas.toDataURL('image/*');
                // const strImage = base64.replace(/^data:image\/[a-z]+;base64,/, '');

                resolve(base64);
            };
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    } else {
        // 이미지 파일이 아닌 경우 처리하지 않음
        return Promise.reject(new Error('The provided file is not an image.'));
    }
}

export default getDataUrl;
