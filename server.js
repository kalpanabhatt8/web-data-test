import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Render is working",
    data: [
      { name: "Cornell University", location: "Ithaca, NY" },
      { name: "MIT", location: "Cambridge, MA" }
    ]
  });
});

app.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.EXA_API_KEY
      },
      body: JSON.stringify({
        query,
        numResults: 10
      })
    });

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Search failed"
    });
  }
});

const port = process.env.PORT || 10000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
