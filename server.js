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

const port = process.env.PORT || 10000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
