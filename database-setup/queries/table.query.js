module.exports.queryCreateTable = `CREATE TABLE NO (
    email varchar,
    firstName varchar,
    lastName varchar,
    age int
);`;

module.exports.queryDeleteTable = 'DROP TABLE no;'

module.exports.insertData =  `
INSERT INTO users (email, firstName, lastName, age)
VALUES ('johndoe@gmail.com', 'john', 'doe', 21)
`;

module.exports.selectData = `
SELECT *
FROM users
`;

module.exports.updateData = `
UPDATE users
SET age = 22
WHERE email = 'johndoe@gmail.com'
`;

module.exports.deleteData = `
DELETE FROM users
WHERE email = 'johndoe@gmail.com'
`;