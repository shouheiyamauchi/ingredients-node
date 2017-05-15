// /controllers/ingredientController.js

const mongoose = require('mongoose');
const Ingredient = require('../models/Ingredient');

exports.getIndex = (req, res) => {
  res.redirect("/ingredients")
};


exports.getIngredients = (req,res) => {
  Ingredient.find()
    .then(ingredients => {
      res.render('index', {
        title: 'Ingredients',
        ingredients: ingredients,
        lastitem: res.locals.lastitem
      })
    })
};

exports.getIngredientsApi = (req,res) => {
  Ingredient.find()
    .then(ingredients => {
      res.json(ingredients)
    })
};

exports.postIngredients = (req, res) => {
  console.log('req.body: ', req.body)
  const name = req.body.ingredient_name;
  let ingredient = new Ingredient();
  ingredient.name = name;
  ingredient.save()
    .then(() => {
      res.redirect('/')
    });
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

exports.getEditIngredient = (req,res) => {
  Ingredient.findOne({ _id: req.params.id})
    .then(ingredient => {
      res.render('editIngredient', {ingredient: ingredient})
    });
};

exports.getIngredientApi = (req,res) => {
  console.log("req.params: ", req.params)
  Ingredient.findOne({ _id: req.params.id})
    .then(ingredient => {
      res.json(ingredient)
    });
};

exports.updateIngredient = (req, res) => {
  console.log('edit req.body: ', req.body)
  Ingredient.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true // returns new ingredient
  })
  .then(ingredient => {
    res.redirect('/ingredients')
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
