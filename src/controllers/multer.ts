import multer from "multer"

const storage = (folderName: string) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
        },
        filename: function (req, file, cb) {
            cb(null, `${Date.now()}-${file.originalname}`)
        }
    })
};


export const uploadAvatars = multer({ storage: storage('avatars') });
export const uploadProducts = multer({ storage: storage('products') });