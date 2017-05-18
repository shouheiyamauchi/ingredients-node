// /controllers/ingredientApiController.js

const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIngredientsApi = (req,res) => {
  Ingredient.find()
    .then(ingredients => {
      res.json(ingredients)
    })
};

exports.postIngredientsApi = (req, res) => {
  console.log('req: ', req)
  const name = req.query.name;
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(() => {
      res.json(ingredient)
    });
};

exports.getIngredientApi = (req,res) => {
  console.log("req.params: ", req.params)
  Ingredient.findOne({ _id: req.params.id})
    .then(ingredient => {
      res.json(ingredient)
    });
};

exports.updateIngredientApi = (req, res) => {
  console.log('edit req.query: ', req.query)
  Ingredient.findOneAndUpdate({ _id: req.params.id }, req.query, {
    new: true // returns new ingredient
  })
  .then(ingredient => {
    res.json(ingredient)
  });
};

exports.deleteIngredientApi = function(req, res){
	Ingredient.findByIdAndRemove({_id: req.params.id},
	   function(err){
		if(err) res.json(err);
		else {
      Ingredient.find()
        .then(ingredients => {
          res.json(ingredients)
        })
    };
	});
};
