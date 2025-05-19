import multer from "multer";
import path from 'path'
import fs from 'fs'



// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../../uploads')
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

// Multer storage setup
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadDir)
    },
    filename: (_req, file, cb) => {
        const timestamp = Date.now()
        const originalName = file.originalname.replace(/\s+/g, '_')
        const sanitizedOriginal = originalName.replace(/[^a-zA-Z0-9._-]/g, '')
        cb(null, `${timestamp}-${sanitizedOriginal}`)
    }
})

// File filter to allow image file only
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
   
    const allowedMimeTypes = ['image/jpg', 'image/png', 'image/gif', 'image/webp']

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only image files are allowed!'))
    }
}

// Limit file size to 5MB
const limits = {
    fileSize: 5 * 1024 * 1024, //5MB
}

// Final upload Middleware
export const upload = multer({
    storage, 
    fileFilter,
    limits,
})