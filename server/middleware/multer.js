import multer, { diskStorage } from 'multer';

// Set up Multer storage
const storage = diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where uploaded files will be stored
    cb(null, './public/temp');
  },
  filename: function (req, file, cb) {
    // Define the file name for the uploaded file
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Create Multer instance with configured storage
export const upload = multer({ storage: storage });

