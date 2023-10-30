const Employees = require('../data/Employees')


const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employees.find();
        if (!employees || employees.length === 0) {
            return res.status(200).json({ message: 'No employees found.' });
        }
        res.status(200).json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `Error: ${err}` });
    }
};


const sendAllEmployees = async (req, res) => {
    const newEmployee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if (!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({message: 'first and last names are required.'})
    }

  try{
    const result = await Employees.create({
        'firstname': newEmployee.firstname,
        'lastname': newEmployee.lastname
       });
       console.log(result);
       res.status(201).json({'message' : `New Employee ${newEmployee.firstname} ${newEmployee.lastname} created.`})

  }catch (err){
      res.status(500).json({message: `Error ${err} creating user.`})
  }

}


const updateAllEmployees = async (req, res) => {
    const emp = req.body;
    try{
        const employee = await  Employees.findOne({id : emp.id}).exec()
        if (!employee){
            return res.status(400).json({"message": `Employee id ${req.body.id} not found.`})
        }
        if (emp.firstname){employee.firstname = emp.firstname}
        if (emp.lastname){employee.lastname = emp.lastname}
        const newArray = await employee.save();
        res.status(201).json(employee);

    } catch (err) {
        res.status(500).json({message: `Error ${err} creating user.`})
    }
}

const deleteAllEmployees = async (req, res) => {
    const empId = req.body;

    try {
        let employee = await Employees.findOne({ id: empId.id }).exec();

        if (!employee) {
            return res.status(400).json({ 'message': `Employee id ${empId} not found.` });
        } else{
            const result = await employee.deleteOne({ id: empId.id });
        }
        // Save changes;
        res.status(200).json({ 'message': `Employee  ${empId.firstname} deleted.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 'message': 'Internal server error.' });
    }
}



const getOneEmployee = async (req, res) => {
    const emp = req.params;
   try{
    const employee = Employees.findOne({id : emp.id}).exec();

    if(!employee) {
        return res.status(400).json({'message': `Employee id ${emp.id} not found.`})
    }
    res.status(201).json(employee);

   }catch (err){
         res.status(500).json({message: `Error ${err} creating user.`})
   }
}


module.exports = {getAllEmployees, sendAllEmployees, updateAllEmployees, deleteAllEmployees, getOneEmployee};