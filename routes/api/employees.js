const express = require('express');
const router = express.Router();
const employees = require ('../../Controllers/employees.js');


router.route('/')
    .get(employees.getAllEmployees)
    .post(employees.sendAllEmployees)
    .put(employees.updateAllEmployees)
    .delete(employees.deleteAllEmployees);

router.route('/:id')
    .get(employees.getOneEmployee);

module.exports = router;
