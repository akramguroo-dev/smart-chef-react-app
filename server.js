import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const GROQ_TOKEN = process.env.GROQ_API_KEY;

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://smart-chef-react-app.vercel.app",
    ],
  }),
);

app.use(express.json());

console.log("🔍 Using Groq token:", GROQ_TOKEN ? "✅ Found" : "❌ Missing");

const SYSTEM_PROMPT = `
You are an AI chef.

Suggest one short, easy and practical recipe using some of the user's listed ingredients.

Keep the response concise and beginner-friendly.

Format the recipe exactly with:

## Recipe Name

### Ingredients
- Ingredient 1
- Ingredient 2

### Instructions
1. Step one
2. Step two
3. Step three

Use Markdown.

Do not include unnecessary explanations, nutritional information, or long introductions.
`;

app.post("/api/recipe", async (req, res) => {
  const { inputs } = req.body;

  if (!inputs) {
    return res.status(400).json({
      error: "Missing 'inputs' field",
    });
  }

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${GROQ_TOKEN}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-120b",

          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: `Suggest a recipe using these ingredients: ${inputs}`,
            },
          ],

          reasoning_effort: "low",
          temperature: 0.7,
          max_tokens: 800,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        `Groq API error: ${errorData.error?.message || response.statusText}`,
      );
    }

    const data = await response.json();

    const recipe =
      data.choices?.[0]?.message?.content || "No recipe generated.";

    res.json({
      generated_text: recipe,
    });
  } catch (err) {
    console.error("🧩 Error from Groq:", err.message);
    console.error("🧠 Full error:", err);

    res.status(500).json({
      error: "Failed to generate recipe",
      details: err.message,
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({
    status: "Server is running ✅",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
