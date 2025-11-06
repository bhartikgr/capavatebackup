const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Custom storage with dynamic user folder like doc_1
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.body.userId; // 👈 User ID from frontend
    const uploadPath = path.join(
      __dirname,
      "../../upload/users",
      `doc_${userId}`
    );
    console.log(uploadPath);
    //  Create folder if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath); // Save here
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
