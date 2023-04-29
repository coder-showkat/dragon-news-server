const express = require("express");
const app = express();
const cors = require("cors");
const news = require("./news.json");
const categories = require("./categories.json");
require("dotenv").config();
app.use(cors());

const port = process.env.PORT || 4005;

app.get("/", (req, res) => {
  res.send("<h1 style='text-align:center;'>Welcome to New Dragon</h1>");
});

app.get("/api/categories", (req, res) => {
  res.send({ categories: categories });
});

app.get("/api/categories/:id", (req, res) => {
  const id = req.params.id;
  try {
    if (id === "0") {
      res.send({ news: news });
    } else {
      const newsByCategory = [...news].filter(
        (item) => item.category_id === id
      );
      res.send({ news: newsByCategory });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/api/news/:id", (req, res) => {
  const id = req.params.id;
  const newsById = news.find((item) => item._id === id);
  res.send({ news: newsById });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
