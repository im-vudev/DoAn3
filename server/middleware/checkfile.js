export const checkFileUpload = (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const file = req.files.file;
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    req.fileName = fileName;

    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = req.file.originalname.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).json({ message: "Invalid file format" });
    }
    const maxSizeInBytes = 10 * 1024 * 1024; // 10 MB
    if (req.file.size > maxSizeInBytes) {
      return res.status(400).json({ message: "File size too large" });
    }
    next();
  };
  