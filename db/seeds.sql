USE employee_db;

INSERT INTO department (name) VALUES 
('Engineering'), 
('Human Resources'), 
('Sales'), 
('Marketing'), 
('Finance');

INSERT INTO role (title, salary, department_id) VALUES 
('Software Engineer', 70000, 1),
('Senior Software Engineer', 90000, 1),
('HR Manager', 65000, 2),
('HR Associate', 45000, 2),
('Sales Representative', 50000, 3),
('Sales Manager', 75000, 3),
('Marketing Specialist', 60000, 4),
('Marketing Manager', 80000, 4),
('Accountant', 55000, 5),
('Finance Manager', 85000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Smith', 2, 1),
('Emily', 'Jones', 3, NULL),
('Michael', 'Brown', 4, 3),
('David', 'Wilson', 5, NULL),
('Richard', 'Taylor', 6, 5),
('Charles', 'Anderson', 7, NULL),
('Joseph', 'Thomas', 8, 7),
('Mary', 'Jackson', 9, NULL),
('Patricia', 'White', 10, 9);
