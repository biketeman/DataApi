const {GraphQLServer} = require('graphql-yoga');
const { queryType, stringArg, makeSchema,objectType} = require('nexus');
const { pg } = require('pg');
const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)
const db = config.DB;
const Segment = require(`./types/segments.js`);
const Client = require(`./types/clients.js`);
const CarteComm = require(`./types/cartecomm.js`);
const Abofrequences = require(`./types/abofrequences.js`);
const Abotgvmax = require(`./types/abotgvmax.js`);

Abotgvmax


const Query = queryType({
	definition(t) {
		t.list.field("allsegments", {
			type: Segment,
			resolve: (parent, args) => {
				const allsegments = db.select('cle_seg').from('segment')
				return allsegments
			}
    });
	},
});


const schema = makeSchema({
	types: [Query, Segment, Client, CarteComm, Abofrequences, Abotgvmax],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
schema
})


server.start(() => console.log('Server is running on localhost:4000'))
