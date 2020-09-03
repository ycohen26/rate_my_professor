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
      response.status(201).send(`Professor added with ID: ${result.insertId}`);
    }
  );
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

// Professor Module Exports

module.exports = {
  getProfessors,
  getProfessorById,
  createProfessor,
  updateProfessor,
  deleteProfessor,
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

  pool.query(
    "SELECT * FROM reviews WHERE id = $1",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

// POST new review

const createReview = (request, response) => {
  const { professor_id, rating, text } = request.body; //for professor_id fix to get current professor's ID //does professor_id need to be camel case in this instance?

  pool.query(
    "INSERT INTO professors (professor_id, rating, text) VALUES ($1, $2, $3)",
    [professor_id, rating, text],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Review added with ID: ${result.insertId}`);
    }
  );
};

// PUT update review
const updateReview = (request, response) => {
  const id = parseInt(request.params.id);
  const { professor_id, rating, text } = request.body;

  pool.query(
    "UPDATE reviews SET professor_id = $1, rating = $2, text = $3, WHERE id = $4",
    [professor_id, rating, text, id],
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

// Reviews Module Exports

module.exports = {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
};
