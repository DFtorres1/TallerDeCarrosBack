const { Router } = require('express');
const { getMechanics, addMechanic } = require('../controllers/mechanics.controller');
const { addReportIn, getReportsIn } = require('../controllers/repairin.controller');
const { getBrands, getModelsByBrand } = require('../controllers/brandmodel.controller');
const { getVehicle, addVehicle } = require('../controllers/vehicles.controller');
const { getReportsOut, addReportOut } = require('../controllers/repairout.controller');

const router = Router()

// mechanics routes
router.get('/mechanic', getMechanics)
router.post('/mechanic', addMechanic)

// repair in routes
router.get('/reportin', getReportsIn)
router.post('/reportin', addReportIn)

// repair out routes
router.get('/reportout', getReportsOut)
router.post('/reportout', addReportOut)

// vehicles routes
router.get('/vehicles', getVehicle)
router.post('/vehicles', addVehicle)

// brand and model routes
router.get('/brand', getBrands)
router.get('/model/:idbrand', getModelsByBrand)


module.exports = router
