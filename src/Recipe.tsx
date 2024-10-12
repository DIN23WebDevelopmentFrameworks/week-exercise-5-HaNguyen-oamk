import React from "react";

export interface IRecipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface IRecipeProps {
  recipeData: IRecipe;
}

const Recipe: React.FC<IRecipeProps> = ({ recipeData }) => {
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <h3>{recipeData.name}</h3>
      <p>
        <strong>Ingredients:</strong> {recipeData.ingredients.join(", ")}
      </p>
      <p>
        <strong>Instructions:</strong> {recipeData.instructions.join(". ")}
      </p>
    </div>
  );
};

export default Recipe;
