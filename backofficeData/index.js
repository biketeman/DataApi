const {GraphQLServer} = require('graphql-yoga');
const { queryType, stringArg, makeSchema,	objectType} = require('nexus');
const { pg } = require('pg');
const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)
const db = config.DB;


const Segment = objectType({
	name: 'Segment',
	description: '',
	definition(t) {
		t.string('cle_seg', {
				description: 'clé du segment',
				nullable: true
			})
	}
})

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
	types: [Query, Segment],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
schema
})


server.start(() => console.log('Server is running on localhost:4000'))