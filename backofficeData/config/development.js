module.exports =  {

	PORT: 8888,
	DB: require('knex') ({
		client: 'pg',
		connection: "postgres://chrdtcltzbedtq:6ff0bb4d8b971dbec9c729d5816985675b04e861459599b9519534c68ac779b0@ec2-54-247-85-251.eu-west-1.compute.amazonaws.com:5432/d2oh836th98cvr?ssl=disable",


    })
	
};


// module.exports = {
//         client: 'mysql2',
//         connection: {
//             host: 'ec2-54-247-85-251.eu-west-1.compute.amazonaws.com.0.0.1',
//             user: 'chrdtcltzbedtq',
//             password: '6ff0bb4d8b971dbec9c729d5816985675b04e861459599b9519534c68ac779b0',
//             database: 'd2oh836th98cvr', 
//             port: '5432'
//         }
// }
