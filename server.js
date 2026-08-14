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
