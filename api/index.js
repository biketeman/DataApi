const { GraphQLServer } = require('graphql-yoga');
const { queryType, stringArg, intArg, makeSchema } = require('nexus');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)
const db = config.DB;
const Segment = require(`./types/segments.js`);
const Client = require(`./types/clients.js`);
const CarteComm = require(`./types/cartecomm.js`);
const Abofrequences = require(`./types/abofrequences.js`);
const Abotgvmax = require(`./types/abotgvmax.js`);
const aboEvolution = require(`./types/aboEvolution.js`);
const profileAndData = require(`./types/profileAndData.js`)


const Query = queryType({
	definition(t) {

		t.list.field("aboEvolution", {
			type: aboEvolution,
			args: {
				subscriptionDateActual: stringArg({
					nullable: true,
					default: '2019-06-17'
				}),
				subscriptionDateRequest: stringArg({
					nullable: true,
					default: '2018-05-17'
				}),
				subscriptionDateActualCompare: stringArg({
					nullable: true,
					default: '2019-05-17'
				}),
				subscriptionDateRequestCompare: stringArg({
					nullable: true,
					default: '2019-02-17'
				}),
			},
			resolve: async (parent, args) => {
				const result = await db.select('cr_type_cr').count('*').from('carte_comm').where('cr_dt_deb_val', '<', args.subscriptionDateActual).andWhere('cr_dt_deb_val', '>', args.subscriptionDateRequest).groupBy('cr_type_cr')
				const test = await db.select('cr_type_cr').count('*').from('carte_comm').where('cr_dt_deb_val', '<', args.subscriptionDateActualCompare).andWhere('cr_dt_deb_val', '>', args.subscriptionDateRequestCompare).groupBy('cr_type_cr')
				//const test = await db.raw(' select  cr_type_cr, count(*) from carte_comm  group by cr_type_cr ')
				return test
			}
		});	
		t.list.field("getProfileListAndData", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const profile_list = await db.select('*').from('profile_cards');
				const totalNumberUsers = await db('client').count('*')
				const amountSubscribe = db.raw('SELECT count(*) from client left JOIN carte_comm on client.cle_client = carte_comm.cle_client left join abo_frequence on abo_frequence.cle_client = client.cle_client left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client where carte_comm.cr_type_cr  is NULL AND abo_frequence.cle_client IS NULL AND abo_tgvmax.cle_client IS NULL')
				console.log(amountSubscribe)
				let returnedValues = []
				for (let i in profile_list) {

					let request = profile_list[i].arguments;
					let title = profile_list[i].title

					let percentageTarget = await db.raw(request);
					const percentageInTotal = percentageTarget.rows.length / totalNumberUsers[0].count * 100
					const percentageCardOwner = 90594 / percentageTarget.rows.length * 100

					let result = {
						title: title,
						percentageInTotal: percentageInTotal,
						percentageCardOwner: percentageCardOwner
					}
					returnedValues.push(result)
				}
				return returnedValues
			}
		});
	},
});
const schema = makeSchema({
	types: [Query, Segment, Client, CarteComm, Abofrequences, Abotgvmax, aboEvolution, profileAndData],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
	schema
})


server.start(() => console.log('Server is running on localhost:4000'))


