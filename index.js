const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./queries");
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

// Professor Routes

app.get("/professors", db.getProfessors);
app.get("/professors/:id", db.getProfessorById);
app.post("/professors", db.createProfessor);
app.put("/professors/:id", db.updateProfessor);
app.delete("/professors/:id", db.deleteProfessor);

// Reviews Routes

app.get("/reviews", db.getReviews);
app.get("/reviews/:id", db.getReviewById);
app.post("/reviews", db.createReview);
app.put("/reviews/:id", db.updateReview);
app.delete("/reviews/:id", db.deleteReview);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
