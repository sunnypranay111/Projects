const { addPhone, getAllPhones, getPhonesById, deleteById, updateById } = require('../controllers/controller');

const router = require('express').Router();



router.post('/addPhone', addPhone);

router.get('/getAll', getAllPhones);

router.get('/getOne/:id', getPhonesById);

router.put('/update/:id', updateById);

router.delete('/delete/:id', deleteById);

module.exports = router;
