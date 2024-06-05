const base64ToFile = async (base64String, fileName) => {
    const response = await fetch(base64String);
    const blob = await response.blob();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
};

export default base64ToFile;
