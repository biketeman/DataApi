module.exports =  {

	PORT: 8888,
	DB: require('knex') ({
		client: 'pg',
		connection: {
			            host: 'wsf-data-04.cqf0cfj75jd4.eu-west-3.rds.amazonaws.com',
			            user: 'wsf_data_04',
			            password: '97wJTWgERi4ruY8pFYA',
			            database: 'sncf', 
			            port: '5432'
			        }
  })
};
