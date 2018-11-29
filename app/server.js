const express = require( "express" );
const path = require( "path" );
const bodyParser = require( "body-parser" );
const app = express();
const config = require( "./config" );
const cors = require( "cors" );
const mysql = require( "mysql" );
const util = require( "util" );

var connection = mysql.createConnection( config.database );
connection.query = util.promisify( connection.query );
connection.connect();

const taskController = require( "./taskController" )( connection );

app.use( bodyParser.json() );
app.use( cors() );
app.get( "/tasks", async ( req, res ) => {
	let tasks = await taskController.getTasks();
	res.send( {
		status: 200,
		data: tasks
	} );
} );
app.post( "/tasks", async ( req, res ) => {
	let task = await taskController.addTask( req.body );
	res.send( {
		status: 200,
		task
	} );
} );
app.get( "/tasks/:taskId", async ( req, res ) => {
	let task = await taskController.getTask( req.params.taskId );
	res.send( {
		status: 200,
		data: task
	} );
} );
app.patch( "/tasks/complete/:taskId", async ( req, res ) => {
	await taskController.completeTask( req.params.taskId );
	res.send( {
		status: 200
	} );
} );
app.patch( "/tasks/:taskId", async ( req, res ) => {
	await taskController.updateTask( req.body.name, req.params.taskId );
	res.send( {
		status: 200
	} );
} );
app.delete( "/tasks/:taskId", async ( req, res ) => {
	await taskController.deleteTask( req.params.taskId );
	res.send( {
		status: 200
	} )
} );

app.listen( config.port );
