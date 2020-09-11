const Pool = require("pg").Pool;
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "rate_my_professor",
  password: "password",
  port: 5432,
});

// GET all professors

const getProfessors = (request, response) => {
  pool.query("SELECT * FROM professors ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET single professor by id

const getProfessorById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query(
    "SELECT * FROM professors WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// POST new professor

const createProfessor = (request, response) => {
  const { name, title, school, department } = request.body;

  pool.query(
    "INSERT INTO professors (name, title, school, department) VALUES ($1, $2, $3, $4)",
    [name, title, school, department],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Professor added with ID: ${results.insertId}`);
    }
  );
  response.json("hello world");
};
// PUT update professor
const updateProfessor = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, title, school, department } = request.body;

  pool.query(
    "UPDATE professors SET name = $1, title = $2, school = $3, department = $4, WHERE id = $5",
    [name, title, school, department, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Professor modified with ID: ${id}`);
    }
  );
};

// DELETE professor

const deleteProfessor = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM professors WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Professor deleted with ID: ${id}`);
  });
};

// GET all reviews

const getReviews = (request, response) => {
  pool.query("SELECT * FROM reviews ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// GET single review by id

const getReviewById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// POST new review

const createReview = (request, response) => {
  const { professorId, rating, text } = request.body;

  pool.query(
    "INSERT INTO reviews (professorId, rating, text) VALUES ($1, $2, $3)",
    [professorId, rating, text],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added with ID: ${results.insertId}`);
    }
  );
};

// PUT update review
const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professorId, rating, text } = request.body;

  pool.query(
    "UPDATE reviews SET professorId = $1, rating = $2, text = $3, WHERE id = $4",
    [professorId, rating, text, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Review modified with ID: ${id}`);
    }
  );
};

// DELETE review

const deleteReview = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM reviews WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Review deleted with ID: ${id}`);
  });
};

//Module Exports

module.exports = {
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
