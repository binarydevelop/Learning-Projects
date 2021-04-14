const express = require('express');
const app =  express();
const config = require('./config/configobj')
const dotenv = require('dotenv');
const {pool, Client} = require('pg')
const tableQuery =  require('./queries/table.query')
dotenv.config();


  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  })
  client.connect();

//Promise
  client.query(tableQuery.queryCreateTable)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })

//Async/ Await 
deleteTable = async () =>{
    try{
        const res = await client.query(tableQuery.queryDeleteTable);
        console.log('Table deleted', res)
    }
    catch(err){
        console.log(err);
    }
}

deleteTable();

client.query(tableQuery.insertData)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                })

client.query(tableQuery.selectData)
                .then((res) => {
                    for(let row of res.rows){
                        console.log(row)
                    }
                }).catch((err) => {
                    console.log(err);
                })
                    
                

client.query(tableQuery.updateData)
                .then((res) => {
                    for(let row of res.rows){
                        console.log(row)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })

client.query(tableQuery.deleteData)
    .then(res =>
    {console.log('Deleted Successfully')})
    .catch((err) => {
        console.log(err);
    })
                

app.listen(3000, () => {
   console.log(`Server is running`);
})


/* You have two options that you can connect to a PostgreSQL server with the node-postgres module.
 One of the options is to use a single client. The other method is to use a connection pool.
  However, if your application is using the database very frequently,
 the pool will be a better option than using a single client. 
 
 Connecting to the database using the node-postgres module can be done in two ways - 
 using a single client and
  using a connection pool.
 */