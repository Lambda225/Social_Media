import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/png' || 'image/jpg') {
      callback(null, true);
    } else {
      console.log('only jpg and png file supported');
      callback(null, false);
    }
  },
});
