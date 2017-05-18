var express = require('express');
var router = express.Router();

const Ingredient = require('../models/Ingredient');
const ingredientController = require('../controllers/ingredientController')

/* GET home page. */
router.get('/', ingredientController.getIndex);

router.get('/ingredients', ingredientController.getIngredients);

router.post('/ingredients', ingredientController.postIngredients);

router.get('/ingredient/:id/edit', ingredientController.getEditIngredient);

router.post('/ingredient/:id/edit', ingredientController.updateIngredient);


router.get('/ingredient/:id/delete', function(req, res){
	Ingredient.findByIdAndRemove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else    res.redirect('/ingredients');
	});
});

module.exports = router;
