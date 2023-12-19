const express = require('express');
const router = express.Router();
const {
  uploadResumeDetails,
  getResumeById,
  getResumeByName
} = require('../controllers/resumeController');

router.post('/uploadResumeDetails', uploadResumeDetails);
router.get('/getResumeById/:id', getResumeById);
router.get('/getResumeByName/:name', getResumeByName);

module.exports = router;
