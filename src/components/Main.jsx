// Read about the project in notes.md file
import React from "react";
import AIRecipe from "./AIRecipe.jsx";
import IngredientsList from "./IngredientsList.jsx";
import { getRecipeFromAI } from "../ai.js";

export default function Main() {
  const [recipe, setRecipe] = React.useState("");
  const [ingredients, setIngredients] = React.useState([]);

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredients) => [...prevIngredients, newIngredient]);
  }

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromAI(ingredients);
    setRecipe(recipeMarkdown);
  }
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && (
        <IngredientsList ingredients={ingredients} getRecipe={getRecipe} />
      )}

      {recipe && <AIRecipe recipe={recipe} />}
    </main>
  );
}
