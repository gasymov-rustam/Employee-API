const express = require('express');
const router = express.Router();
const { checkAuth } = require('../middleware/checkAuth.middleware');
const {
  getAllEmployeesAsync,
  getSingleEmployeeAsync,
  addEmployeeAsync,
  updateEmployeeAsync,
  removeEmployeeAsync,
} = require('../controllers/employees.controller');

// GET: /api/employees
router.get('/', checkAuth, getAllEmployeesAsync);
// GET: /api/employees/:id
router.get('/:id', checkAuth, getSingleEmployeeAsync);
// POST: /api/employees
router.post('/', checkAuth, addEmployeeAsync);
// PUT: /api/employees
router.put('/', checkAuth, updateEmployeeAsync);
// DELETE: /api/employees/:id
router.delete('/:id', checkAuth, removeEmployeeAsync);

module.exports = router;
