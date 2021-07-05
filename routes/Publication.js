const express = require('express')
const router = express.Router()
const uploadMulter = require('../middleware/upload')
const validation = require('../middleware/validation')
const {
    createCategory
} = require('../controllers/category.controllers')
const {
    getPublication , 
} = require('../controllers/category.controllers')
const {
    deletePublication , 
} = require('../controllers/category.controllers')
router.get('/getpub',getPublication)
router.post('/category', uploadMulter, validation, createCategory)
router.delete('/delete/:_id', deletePublication)
// router.get('/getcommentsPub',getComments)
module.exports = router