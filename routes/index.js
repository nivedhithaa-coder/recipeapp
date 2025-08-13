const express = require('express');
const router = express.Router();
const RecipeModel = require('../model/Recipe');

// GET all recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find({}).exec();
    res.status(200).json({ message: "Data has been retrieved!", data: recipes });
  } catch (error) {
    next(error);
  }
});

// POST: add a recipe
router.post('/', async (req, res, next) => {
  try {
    const { Name, Ingredients, Cuisine } = req.body;
    const newRecipe = await RecipeModel.create({ Name, Ingredients, Cuisine });
    res.status(201).json({ message: "Recipe added!", data: newRecipe });
  } catch (error) {
    next(error);
  }
});

// DELETE a recipe
router.delete('/:recipeId', async (req, res, next) => {
  try {
    const deleted = await RecipeModel.findByIdAndDelete(req.params.recipeId);
    if (!deleted) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe deleted", data: deleted });
  } catch (error) {
    next(error);
  }
});

// UPDATE a recipe
router.put('/:recipeId', async (req, res, next) => {
  try {
    const { Name, Ingredients, Cuisine } = req.body;
    const updated = await RecipeModel.findByIdAndUpdate(
      req.params.recipeId,
      { Name, Ingredients, Cuisine },
      { new: true }
    ).exec();

    if (!updated) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.status(200).json({ message: "Recipe updated", data: updated });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
