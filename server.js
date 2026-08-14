import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Exa web research test is running",
    usage: "/search?q=your+query"
  });
});

app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "Missing query",
      usage: "/search?q=your+query"
    });
  }

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

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Exa request failed",
        details: data
      });
    }

    res.json({
      query,
      resultCount: data.results?.length ?? 0,
      searchTime: data.searchTime ?? null,
      cost: data.costDollars?.total ?? null,
      results: data.results ?? []
    });

  } catch (error) {
    console.error("Search error:", error);

    res.status(500).json({
      error: "Search failed",
      message: error.message
    });
  }
});

const port = process.env.PORT || 10000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
