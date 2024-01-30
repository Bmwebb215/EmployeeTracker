# EmployeeTracker

## Description

This Employee Management System is a Node.js application designed to manage a company's employees using a simple command-line interface. It utilizes `mysql2` to connect to your MySQL database and `inquirer` for collecting input from the user. With this application, you can view, add, and update employees, roles, and departments within your organization.

## Installation

### Prerequisites

- Node.js
- MySQL

### Steps

1. Clone the repository:
`  git clone [git@github.com:RJLennon/PersonaPals.git]`

2.Install necessary dependencies:
```
npm install
```
3.Set up the database:

Log into your MySQL shell and source the schema.sql (and optionally seeds.sql) file located in the db folder:

```
source db/schema.sql;
source db/seeds.sql;
```
4. Create a .env file in the root directory and fill in your MySQL credentials:

DB_NAME='employee_db'
DB_USER='your_mysql_username'
DB_PASSWORD='your_mysql_password'

# Usage
To start the application, run the following command in your terminal:

```
node index.js
```

Follow the interactive prompts to view, add, or update departments, roles, and employees.

#Features
View all departments, roles, and employees
Add departments, roles, and employees
Update employee roles

#Contributing
Contributions are welcome! Please open a pull request to contribute.

## Demo
Here is a walkthrough video [video](https://drive.google.com/file/d/1eqBevXx4D_vf-FxJqG3XZlo_omysGeZb/view?usp=sharing)