const { prisma } = require('../prisma/prisma');

/**
 * @route GET api/employees/all
 * @desc Get all employees
 * @access Private
 */
const getAllEmployeesAsync = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json({ message: 'Employees fetched', data: employees });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route GET api/employees/:id
 * @desc Gte single employee
 * @access Private
 */
const getSingleEmployeeAsync = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Id is required' });

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'Employee fetched', data: employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route POST api/employees
 * @desc Add new employee
 * @access Private
 */
const addEmployeeAsync = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ data: 'All fields are required' });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: 'Employee created', data: employee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route PUT api/employees
 * @desc Update employee
 * @access Private
 */
const updateEmployeeAsync = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;

    if (!id) return res.status(400).json({ message: 'Id is required' });

    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) return res.status(400).json({ message: 'Employee not found' });

    const updatedEmployee = await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(200).json({ message: 'Updated successfully', data: updatedEmployee });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @route DELETE api/employees/:id
 * @desc DELETE employee
 * @access Private
 */
const removeEmployeeAsync = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: 'Id is required' });

  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) return res.status(400).json({ message: 'Employee not found' });

    await prisma.employee.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: 'Deleted successfully', data: { id } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllEmployeesAsync,
  getSingleEmployeeAsync,
  addEmployeeAsync,
  updateEmployeeAsync,
  removeEmployeeAsync,
};
