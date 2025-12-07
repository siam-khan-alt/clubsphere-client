import { useMutation } from "@tanstack/react-query";
import uploadImageToImgBB from "../utils/imgbb";

const useImageUploadMutations = () => {
    return useMutation({
        mutationFn: uploadImageToImgBB,
        onError: (error) => {
            console.error("Image Upload Mutation Failed:", error.message);
        },
    });
};

export default useImageUploadMutations;