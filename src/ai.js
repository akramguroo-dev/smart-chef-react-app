// ai.js — Frontend function to communicate with your backend API
// No API keys needed here

export async function getRecipeFromAI(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch("http://localhost:5000/api/recipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        inputs: ingredientsString, // Just send the ingredients list
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Server error: ${response.status} - ${errorData.error || response.statusText}`);
    }

    const data = await response.json();

    // Groq response format
    if (data.generated_text) {
      return data.generated_text;
    } else {
      return "Sorry, I couldn't generate a recipe right now.";
    }
  } catch (err) {
    console.error("Error fetching recipe:", err.message);
    return "There was an error fetching the recipe. Please try again.";
  }
}