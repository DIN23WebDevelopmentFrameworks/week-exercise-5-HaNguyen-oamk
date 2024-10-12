import React, { useState, useEffect } from "react";
import RecipeTagList from "./RecipeTagList";
import RecipeList from "./RecipeList";
import { IRecipe } from "./Recipe"; // Import IRecipe interface

const App = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTags = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/recipes/tags");
        const data = await response.json();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const fetchRecipesByTag = async () => {
      if (!selectedTag) return;
      setLoading(true);
      try {
        const response = await fetch(
          `https://dummyjson.com/recipes/tag/${selectedTag}`
        );
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesByTag();
  }, [selectedTag]);

  const handleSelectTag = (tagName: string) => {
    setSelectedTag(tagName);
  };

  const handleBackToTags = () => {
    setSelectedTag(null);
    setRecipes([]);
  };

  return (
    <div>
      <h1>ACME Recipe O'Master</h1>
      {loading && <p>Loading...</p>}
      {!selectedTag ? (
        <RecipeTagList tagList={tags} onSelectTag={handleSelectTag} />
      ) : (
        <>
          <button onClick={handleBackToTags}>Back to Tags</button>
          <RecipeList recipes={recipes} />
        </>
      )}
    </div>
  );
};

export default App;
