var express = require('express');
var router = express.Router();

var middleware = require('../middleware/middleware')

router.use(middleware.mw)

const Ingredient = require('../models/Ingredient');
const ingredientController = require('../controllers/ingredientController')

/* GET home page. */
router.get('/ingredients', ingredientController.getIngredients);

router.post('/ingredients', ingredientController.postIngredients);

router.get('/ingredients/:id/edit', ingredientController.getEditIngredient);

router.post('/ingredients/:id/edit', ingredientController.updateIngredient);


router.get('/ingredient/:id/delete', function(req, res){
	Ingredient.findByIdAndRemove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/');
	});
});

router.get('/api/ingredients', ingredientController.getIngredientsApi);

router.post('/api/ingredients', ingredientController.postIngredientsApi);

router.get('/api/ingredient/:id', ingredientController.getIngredientApi);

router.post('/api/ingredient/:id', ingredientController.updateIngredientApi);

router.delete('/api/ingredient/:id', ingredientController.deleteIngredientApi);

module.exports = router;
