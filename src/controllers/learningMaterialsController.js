// learningMaterialsController.js
const pool = require('../config/database');

// Mendapatkan semua materi pembelajaran
const getAllLearningMaterials = async (req, h) => {
  // Enable this to use mysql
  const [rows] = await pool.query('SELECT * FROM learning_materials');
  // Enable this to use PostgreSQL
  // const result = await pool.query('SELECT * FROM learning_materials');
  // const rows = result.rows;
  if (rows.length === 0) {
    return h.response({
      error: false,
      message: 'No learning materials found.'
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
    error: false,
    message: 'Learning materials retrieved successfully.',
    learningMaterials: rows
  }).code(200); // Kode status 200: OK
};

// Mendapatkan materi pembelajaran berdasarkan ID
const getLearningMaterialById = async (req, h) => {
  // Enable this to use mysql
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM learning_materials WHERE id = ?', [id]);
  // Enable this to use PostgreSQL
  // const result = await pool.query('SELECT * FROM learning_materials WHERE id = $1', [id]);
  // const rows = result.rows;
  if (rows.length === 0) {
    return h.response({
    error: true,
    message: `Learning material not found. No material found with ID: ${id}`
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
    error: false,
    message: 'Learning material retrieved successfully.',
    learningMaterial: rows[0]
  }).code(200); // Kode status 200: OK
};

// Menambahkan materi pembelajaran baru
const createLearningMaterial = async (req, h) => {
  const { title, name, learning_image_path, body } = req.payload;
  try {
    // Enable this to use mysql
    const [result] = await pool.query(
      'INSERT INTO learning_materials (title, name, learning_image_path, body, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [title, name, learning_image_path, body]
    );
    // Enable this to use PostgreSQL
    // const result = await pool.query(
    //   'INSERT INTO learning_materials (title, name, learning_image_path, body, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id',
    //   [title, name, learning_image_path, body]
    // );
    return h.response({
      error: false, 
      message: 'Learning material created successfully.',
      learningMaterial: {
        id: result.insertId,
        title,
        name,
        learning_image_path,
        body
      }
    }).code(201); // Kode status 201: Created
  } catch (err) {
    return h.response({
      error: true, // Boolean value untuk error
      message: `Failed to create learning material. ${err.message}`,
    }).code(500); // Kode status 500: Internal Server Error
  }
};


// Memperbarui materi pembelajaran berdasarkan ID
const updateLearningMaterial = async (req, h) => {
  const { id } = req.params;
  const { title, name, learning_image_path, body } = req.payload;
  try {
    // Enable this to use mysql
    const [result] = await pool.query(
      'UPDATE learning_materials SET title = ?, name = ?, learning_image_path = ?, body = ?, updated_at = NOW() WHERE id = ?',
      [title, name, learning_image_path, body, id]
    );
    // Enable this to use PostgreSQL
    // const result = await pool.query(
    //   'UPDATE learning_materials SET title = $1, name = $2, learning_image_path = $3, body = $4, updated_at = NOW() WHERE id = $5',
    //   [title, name, learning_image_path, body, id]
    // );
    if (result.affectedRows === 0) {
      return h.response({
        error: true,
        message: `Learning material not found. No material found with ID: ${id}`
      }).code(404); // Kode status 404: Not Found
    }
    return h.response({
      error: false,
      message: 'Learning material updated successfully.',
      learningMaterial: {
        id,
        title,
        name,
        learning_image_path,
        body
      }
    }).code(200); // Kode status 200: OK
  } catch (err) {
    return h.response({
      error: true,
      message: `Failed to update learning material. ${err.message}`,
    }).code(500); // Kode status 500: Internal Server Error
  }
};

// Menghapus materi pembelajaran berdasarkan ID
const deleteLearningMaterial = async (req, h) => {
  const { id } = req.params;
  // Enable this to use mysql
  const [result] = await pool.query('DELETE FROM learning_materials WHERE id = ?', [id]);
  // Enable this to use PostgreSQL
  // const result = await pool.query('DELETE FROM learning_materials WHERE id = $1', [id]);
  if (result.affectedRows === 0) {
    return h.response({
    error: true,
    message: `Learning material not found. No material found with ID: ${id}`
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
    error: false,
    message: 'Learning material deleted successfully.'
  }).code(200); // Kode status 200: OK
};

module.exports = {
  getAllLearningMaterials,
  getLearningMaterialById,
  createLearningMaterial,
  updateLearningMaterial,
  deleteLearningMaterial,
};
