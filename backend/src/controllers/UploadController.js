const { storage } = require('../models/config');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const UploadService = require('../services/UploadService');

const upload = async (req, res) => {
  try {
    const files = req.files; 
    const images = await UploadService.uploadMultipleFiles(files); 
    res.status(200).json({ status: true, images });
  } catch (error) {
    res.status(500).json({status: false, error: 'Failed to upload files' });
  }
};

module.exports = { upload };
