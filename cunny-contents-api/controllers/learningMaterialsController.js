const pool = require('../config/database');

// Mendapatkan semua materi pembelajaran
const getAllLearningMaterials = async (req, h) => {
  const [rows] = await pool.query('SELECT * FROM learning_materials');
  if (rows.length === 0) {
    return h.response({
      error: 'false',
      message: 'No learning materials found.'
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
    error: 'false',
    message: 'Learning materials retrieved successfully.',
    learningMaterials: rows
  }).code(200); // Kode status 200: OK
};

// Mendapatkan materi pembelajaran berdasarkan ID
const getLearningMaterialById = async (req, h) => {
  const { id } = req.params;
  const [rows] = await pool.query('SELECT * FROM learning_materials WHERE id = ?', [id]);
  if (rows.length === 0) {
    return h.response({
      error: 'Learning material not found.',
      message: `No material found with ID: ${id}`
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
    message: 'Learning material retrieved successfully.',
    learningMaterials: rows[0]
  }).code(200); // Kode status 200: OK
};

// Menambahkan materi pembelajaran baru
const createLearningMaterial = async (req, h) => {
  const { title, name, learning_image_path, body } = req.payload;
  try {
    const [result] = await pool.query(
      'INSERT INTO learning_materials (title, name, learning_image_path, body, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
      [title, name, learning_image_path, body]
    );
    return h.response({
      message: 'Learning material created successfully.',
      id: result.insertId
    }).code(201); // Kode status 201: Created
  } catch (err) {
    return h.response({
      error: 'Failed to create learning material.',
      message: err.message
    }).code(500); // Kode status 500: Internal Server Error
  }
};

// Memperbarui materi pembelajaran berdasarkan ID
const updateLearningMaterial = async (req, h) => {
  const { id } = req.params;
  const { title, name, learning_image_path, body } = req.payload;
  try {
    const [result] = await pool.query(
      'UPDATE learning_materials SET title = ?, name = ?, learning_image_path = ?, body = ?, updated_at = NOW() WHERE id = ?',
      [title, name, learning_image_path, body, id]
    );
    if (result.affectedRows === 0) {
      return h.response({
        error: 'Learning material not found.',
        message: `No material found with ID: ${id}`
      }).code(404); // Kode status 404: Not Found
    }
    return h.response({
      message: 'Learning material updated successfully.'
    }).code(200); // Kode status 200: OK
  } catch (err) {
    return h.response({
      error: 'Failed to update learning material.',
      message: err.message
    }).code(500); // Kode status 500: Internal Server Error
  }
};

// Menghapus materi pembelajaran berdasarkan ID
const deleteLearningMaterial = async (req, h) => {
  const { id } = req.params;
  const [result] = await pool.query('DELETE FROM learning_materials WHERE id = ?', [id]);
  if (result.affectedRows === 0) {
    return h.response({
      error: 'Learning material not found.',
      message: `No material found with ID: ${id}`
    }).code(404); // Kode status 404: Not Found
  }
  return h.response({
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
