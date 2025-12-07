const uploadImageToImgBB = async (imageFile) => {
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

    if (!IMGBB_API_KEY) {
        throw new Error("IMGBB API Key is not configured.");
    }

    const formData = new FormData();
    formData.append("image", imageFile); 
    
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: "POST",
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            return data.data.url; 
        } else {
            throw new Error(data.error?.message || "Image upload failed via ImgBB");
        }
    } catch (error) {
        console.error("ImgBB Upload Error:", error);
        throw new Error("Failed to connect to image upload service.");
    }
};

export default uploadImageToImgBB;