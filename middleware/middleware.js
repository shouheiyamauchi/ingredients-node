// middleware.js

const Ingredient = require('../models/Ingredient');

exports.mw = function(req, res, next) {
  // Implement the middleware function based on the options object
  Ingredient.findOne({}, {}, { sort: { 'created_at' : -1 } }, function(err, lastitem) {
    res.locals.lastitem = lastitem;
    next();
  });
}
