import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();
const GROQ_TOKEN = process.env.GROQ_API_KEY;

const app = express();

// ✅ Update CORS to allow Vercel domain
app.use(cors({
  origin: [
    'http://localhost:5173',           // Local development
    'https://smart-chef-app.vercel.app' // Your Vercel domain (update after deployment)
  ]
}));

app.use(express.json());

// ✅ Debug: Check if token is loaded correctly
console.log("🔍 Using Groq token:", GROQ_TOKEN ? "✅ Found" : "❌ Missing");

const SYSTEM_PROMPT = `
You are an AI chef. Suggest a short, easy recipe using some of the user's listed ingredients.
Keep the response concise and beginner-friendly.
Format the recipe with:
- Recipe Name
- Ingredients needed
- Simple step-by-step instructions
- Markdown
`;

app.post("/api/recipe", async (req, res) => {
  const { inputs } = req.body;

  if (!inputs) {
    return res.status(400).json({ error: "Missing 'inputs' field" });
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // ✅ Updated to current model
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Suggest a recipe using these ingredients: ${inputs}` }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Groq API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const recipe = data.choices[0]?.message?.content || "No recipe generated.";

    res.json({ generated_text: recipe });
  } catch (err) {
    console.error("🧩 Error from Groq:", err.message);
    console.error("🧠 Full error:", err);
    res.status(500).json({ error: "Failed to generate recipe", details: err.message });
  }
});

// ✅ Health check endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running ✅" });
});

// ✅ Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));