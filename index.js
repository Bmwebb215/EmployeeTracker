const inquirer = require("inquirer");
const mysql = require("mysql2");
const db = require("./config/connection");

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Delete a Department',
                'Delete a Role',
                'Delete an Employee',
                'Exit'
            ]
        }
    ])
    .then(answers => {
        switch(answers.action) {
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Update an Employee Role':
                updateEmployeeRole();
                break;
            case 'Delete a Department':
                deleteDepartment();
                break;
            case 'Delete a Role':
                deleteRole();
                break;
            case 'Delete an Employee':
                deleteEmployee();
                break;
            case 'Exit':
                db.end();
                break;
        }
    })
    .catch(error => {
        console.error('An error occurred: ' + error);
        mainMenu();
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }
        console.table(results);
        mainMenu(); 
    });
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
            validate: input => input.trim() !== '' ? true : 'Department name cannot be empty.'
        }
    ])
    .then(answers => {
        db.query('INSERT INTO department SET ?', answers, (err, results) => {
            if (err) {
                console.error('An error occurred: ' + err);
                mainMenu();
                return;
            }
            console.log('Department added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error('An error occurred: ' + error);
        mainMenu();
    });
}

function viewRoles(){
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }
        console.table(results);
        mainMenu(); 
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?',
            validate: input => input.trim() !== '' ? true : 'Role title cannot be empty.'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?',
            validate: input => !isNaN(input) && input.trim() !== '' ? true : 'Please enter a valid salary (numeric value).'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id of the role?',
            validate: input => !isNaN(input) && input.trim() !== '' ? true : 'Please enter a valid department ID (numeric value).'
        }
    ])
    .then(answers => {
        db.query('INSERT INTO role SET ?', answers, (err, results) => {
            if (err) {
                console.error('An error occurred: ' + err);
                mainMenu();
                return;
            }
            console.log('Role added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error('An error occurred: ' + error);
        mainMenu();
    });
}

function viewEmployees(){
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }
        console.table(results);
        mainMenu(); 
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?',
            validate: input => input.trim() !== '' ? true : 'First name cannot be empty.'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
            validate: input => input.trim() !== '' ? true : 'Last name cannot be empty.'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee?',
            validate: input => !isNaN(input) && input.trim() !== '' ? true : 'Please enter a valid role ID (numeric value).'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager id of the employee? (Enter 0 if no manager)',
            validate: input => !isNaN(input) ? true : 'Please enter a valid manager ID (numeric value, or 0 if no manager).'
        }
    ])
    .then(answers => {
        if (answers.manager_id === '0') {
            answers.manager_id = null;
        }
        
        db.query('INSERT INTO employee SET ?', answers, (err, results) => {
            if (err) {
                console.error('An error occurred: ' + err);
                mainMenu();
                return;
            }
            console.log('Employee added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error('An error occurred: ' + error);
        mainMenu();
    });
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the id of the employee?',
            validate: input => !isNaN(input) && input.trim() !== '' ? true : 'Please enter a valid employee ID (numeric value).'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the new role id of the employee?',
            validate: input => !isNaN(input) && input.trim() !== '' ? true : 'Please enter a valid new role ID (numeric value).'
        }
    ])
    .then(answers => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err, results) => {
            if (err) {
                console.error('An error occurred: ' + err);
                mainMenu();
                return;
            }
            console.log('Employee role updated.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error('An error occurred: ' + error);
        mainMenu();
    });
}

function deleteDepartment() {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Which department do you want to delete?',
                choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
            }
        ])
        .then(answer => {
            db.query('SELECT * FROM role WHERE department_id = ?', [answer.departmentId], (err, employees) => {
                if (err) {
                    console.error('An error occurred: ' + err);
                    mainMenu();
                    return;
                }

                if (employees && employees.length > 0) {
                    console.log('Cannot delete department because it has employees assigned to it.');
                    mainMenu();
                    return;
                }

                db.query('DELETE FROM department WHERE id = ?', [answer.departmentId], (err, result) => {
                    if (err) {
                        console.error('An error occurred: ' + err);
                        mainMenu();
                        return;
                    }
                    console.log('Department deleted.');
                    mainMenu();
                });
            });
        })
        .catch(error => {
            console.error('An error occurred: ' + error);
            mainMenu();
        });
    });
}


function deleteRole() {
    db.query('SELECT * FROM role', (err, roles) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Which role do you want to delete?',
                choices: roles.map(role => ({ name: role.title, value: role.id }))
            }
        ])
        .then(answer => {
            db.query('SELECT * FROM employee WHERE role_id = ?', answer.roleId, (err, employees) => {
                if (employees.length > 0) {
                    console.log('Cannot delete role because it is assigned to employees.');
                    mainMenu();
                    return;
                }

                db.query('DELETE FROM role WHERE id = ?', answer.roleId, (err, result) => {
                    if (err) {
                        console.error('An error occurred: ' + err);
                        mainMenu();
                        return;
                    }
                    console.log('Role deleted.');
                    mainMenu();
                });
            });
        })
        .catch(error => {
            console.error('An error occurred: ' + error);
            mainMenu();
        });
    });
}

function deleteEmployee() {
    db.query('SELECT * FROM employee', (err, employees) => {
        if (err) {
            console.error('An error occurred: ' + err);
            mainMenu();
            return;
        }

        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Which employee do you want to delete?',
                choices: employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }))
            }
        ])
        .then(answer => {
            db.query('DELETE FROM employee WHERE id = ?', answer.employeeId, (err, result) => {
                if (err) {
                    console.error('An error occurred: ' + err);
                    mainMenu();
                    return;
                }
                console.log('Employee deleted.');
                mainMenu();
            });
        })
        .catch(error => {
            console.error('An error occurred: ' + error);
            mainMenu();
        });
    });
}

mainMenu();
