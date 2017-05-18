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

exports.getEditIngredient = (req,res) => {
  Ingredient.findOne({ _id: req.params.id})
    .then(ingredient => {
      res.render('editIngredient', {ingredient: ingredient})
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
