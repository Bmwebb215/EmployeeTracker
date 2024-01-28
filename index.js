//Add in remaining logic for the rest of the functions
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
            case 'Add a Role':
                addRole();
                break;
            case 'Add an Employee':
                addEmployee();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Exit':
                db.end();
                break;
        }
    })
    .catch(error => {
        console.error(error);
    });
}

function viewDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu(); 
    });
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?'
        }
    ])
    .then(answers => {
        db.query('INSERT INTO department SET ?', answers, (err, results) => {
            if (err) throw err;
            console.log('Department added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error(error);
    });

}

function viewRoles(){
    db.query('SELECT * FROM role', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu(); 
    });
}

function viewEmployees(){
    db.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;
        console.table(results);
        mainMenu(); 
    });
}

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id of the role?'
        }
    ])
    .then(answers => {
        db.query('INSERT INTO role SET ?', answers, (err, results) => {
            if (err) throw err;
            console.log('Role added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function addEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager id of the employee?'
        }
    ])
    .then(answers => {
        db.query('INSERT INTO employee SET ?', answers, (err, results) => {
            if (err) throw err;
            console.log('Employee added.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error(error);
    });
}

function updateEmployeeRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'What is the id of the employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the role id of the employee?'
        }
    ])
    .then(answers => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [answers.role_id, answers.employee_id], (err, results) => {
            if (err) throw err;
            console.log('Employee role updated.');
            mainMenu();
        });
    })
    .catch(error => {
        console.error(error);
    });
}

mainMenu();