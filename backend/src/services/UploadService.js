const { storage } = require('../models/config');
const { ref, uploadBytes } = require('firebase/storage');
const path = require('path');

const uploadMultipleFiles = async (files) => {
  const uploadedFiles = [];

  for (const file of files) {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 100000);
    const extension = path.extname(file.originalname); 
    const randomString = `${timestamp}${randomNumber}${extension}`;

    const storageRef = ref(storage, `${randomString}`);
    await uploadBytes(storageRef, file.buffer);

    uploadedFiles.push(randomString);
  }

  return uploadedFiles;
};

module.exports = { uploadMultipleFiles };
