const {GraphQLServer} = require('graphql-yoga');
const { queryType, stringArg, intArg, makeSchema} = require('nexus');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)
const db = config.DB;
const Segment = require(`./types/segments.js`);
const Client = require(`./types/clients.js`);
const CarteComm = require(`./types/cartecomm.js`);
const Abofrequences = require(`./types/abofrequences.js`);
const Abotgvmax = require(`./types/abotgvmax.js`);



const Query = queryType({
	definition(t) {
		t.list.field("allsegments", {
			type: Segment,
			resolve: async (parent, args) => {
				const allsegments = await db.select('*').from('segment').limit(200)
				return allsegments
			}
		});
		t.float("pourcentageFideliteGlobal", {
			resolve: async (parent, args) => {
				const total = await db('client').count('*')
				const abo = await db('client').count('*').where('in_top_fid', true)
				const pourcentageAbo = abo[0].count/ total[0].count * 100
				return pourcentageAbo
			}	
		});
		t.float("pourcentageCarteComm", {
			args: {
				type: stringArg({
				  nullable: true,
				  default: 'Jeune'
				}),
				age: intArg({
					nullable: true,
					default: 25
				  })
			},
			resolve: async (parent, args) => {
				const total = await db('carte_comm').count('*')
				const abo = await db('carte_comm').countDistinct('carte_comm').fullOuterJoin('client', 'client.cle_client', 'carte_comm.cle_client').where({'carte_comm.cr_type_cr': args.type, 'client.in_age': args.age})
				const pourcentageAbo = abo[0].count/ total[0].count * 100
				return (pourcentageAbo)
			}	
		});
		t.float("pourcentageAbo", {
			args: {
				stationdepart: stringArg({
				  nullable: true
				})
			},
			resolve: async (parent, args) => {
				const total = await db('client').count('*')
				const abo = await db('client').countDistinct('client').fullOuterJoin('segment', 'client.cle_client', 'segment.cle_client').where('client.in_top_fid', true)
				const pourcentageAbo = abo[0].count/ total[0].count * 100
				return pourcentageAbo
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
