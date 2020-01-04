if (typeof window === 'undefined') {
  global.window = {}
}

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/contact', (req, res) => res.render('contact'));
router.get(['/pizza', '/pizza/*'], (req, res) => res.render('pizza/index')); // react
router.get('/nacho', (req, res) => res.render('nacho/index')); // svelte

module.exports = router;
