module.exports = ( db ) => {
	const addTask = async ( { name } ) => {
		let result = await db.query( {
			sql: "insert into tasks (name, completed) values( ?, ?);",
			values: [ name, false ]
		} );
		return await getTask( result.insertId );
	};
	const getTask = async ( id ) => {
		let result = await db.query( "select * from tasks where id =" + id );
		return result[0];
	}
	const getTasks = async () => {
		return await db.query( { sql: "select * from tasks" } );
	};
	const deleteTask = async ( id ) => {
		return await db.query( "delete from tasks where id =" + id )
	};
	const completeTask = async ( id ) => {
		return await db.query( "update tasks set completed = NOT completed where id = " + id );
	};
	const updateTask = async ( name, id ) => {
		return await db.query( {
			sql: "update tasks set name = ? where id = ?",
			values: [ name, id ]
		} );
	};
	return {
		addTask,
		getTask,
		getTasks,
		deleteTask,
		completeTask,
		updateTask
	}
}