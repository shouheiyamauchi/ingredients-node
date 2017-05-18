var express = require('express');
var router = express.Router();

var middleware = require('../middleware/middleware')

router.use(middleware.mw)

const Ingredient = require('../models/Ingredient');
const ingredientController = require('../controllers/ingredientApiController')

router.get('/ingredients', ingredientController.getIngredientsApi);

router.post('/ingredients', ingredientController.postIngredientsApi);

router.get('/ingredients/:id', ingredientController.getIngredientApi);

router.post('/ingredients/:id', ingredientController.updateIngredientApi);

router.delete('/ingredients/:id', ingredientController.deleteIngredientApi);

module.exports = router;
