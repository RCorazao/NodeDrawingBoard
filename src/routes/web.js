const express = require('express');
const router = express.Router();
const lines = require('../../models/lines');

// Routes (corregir)
router.get('/', (req, res) => {
    res.sendFile('../public/index.html');
})

router.get('/board', (req, res) => {
    res.sendFile('src/public/board.html', { root: '.' });
})

// delete all data from database
router.get('/Delete_Data',  (req, res) => {
    lines.collection.drop();
    res.redirect('/board');
});


/*
router.get('/about', (req, res) => {
    res.render('about.ejs')
})
*/
module.exports = router;