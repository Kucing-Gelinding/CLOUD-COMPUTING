// learningMaterialsRoutes.js
const {
    getAllLearningMaterials,
    getLearningMaterialById,
    createLearningMaterial,
    updateLearningMaterial,
    deleteLearningMaterial,
  } = require('../controllers/learningMaterialsController');
  
  const learningMaterialsRoutes = [
    { method: 'GET', path: '/api/learning-materials', handler: getAllLearningMaterials },
    { method: 'GET', path: '/api/learning-materials/{id}', handler: getLearningMaterialById },
    { method: 'POST', path: '/api/learning-materials', handler: createLearningMaterial },
    { method: 'PUT', path: '/api/learning-materials/{id}', handler: updateLearningMaterial },
    { method: 'DELETE', path: '/api/learning-materials/{id}', handler: deleteLearningMaterial },
  ];
  
  module.exports = learningMaterialsRoutes;
  