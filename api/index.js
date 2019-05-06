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
				cr_type_cr: stringArg({
				  nullable: true,
				}),
				age: intArg({
					nullable: true,
				}),
				cr_cod_tarif: stringArg({
					nullable: true,
				}),
				cr_status: stringArg({
					nullable: true,
				}),
			},
			resolve: async (parent, args) => {

				const where = {}
				for(argument in args){
				 	if(argument != "" && argument && argument != null && argument != undefined){
						where[argument] = args[argument]
				 	}
				}	
				const total = await db('carte_comm').count('*')
				const abo = await db('carte_comm').countDistinct('carte_comm').fullOuterJoin('client', 'client.cle_client', 'carte_comm.cle_client')
				.where(where)
				const pourcentageAbo = abo[0].count/ total[0].count * 100
				return (pourcentageAbo)
			}	
		});

		t.float("pourcentageFid", {
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
		t.float("aboEvolution", {
			args: {
				subscriptionDateActual: stringArg({
					nullable: true,
					default: '2019-06-17'
				}),
				subscriptionDateRequest: stringArg({
					nullable: true,
					default: '2018-05-17'
				}),
			},
			resolve: async (parent, args) => {
				const aboevolution = await db('carte_comm').count('cr_type_cr').where('cr_dt_deb_val','<', args.subscriptionDateActual).andWhere('cr_dt_deb_val','>', args.subscriptionDateRequest).groupBy('cr_type_cr')
				return aboevolution
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
