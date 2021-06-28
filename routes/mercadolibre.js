
const { Router } = require('express');

const { searchById, searchByText } = require('../controllers/mercadolibre');

const router = Router();


router.get('/items', searchByText );
router.get('/items/:id', searchById );

module.exports = router;