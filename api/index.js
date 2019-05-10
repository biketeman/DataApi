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

		t.list.field("getProfileAndDataJeune", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('isjeune', true)

				let cardOwner = await db.raw(`SELECT count(*)
				from client 
				left JOIN carte_comm on client.cle_client = carte_comm.cle_client
				left join abo_frequence on abo_frequence.cle_client = client.cle_client 
				left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND isjeune = true`)

				let NoneRenewed = await db.raw(`SELECT count(*) FROM client
				LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
				WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
				OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
				AND client.isjeune = true
				`)

				const percentageInTotal = percentageTarget[0].count / totalNumberUsers[0].count *100
				const percentageCardOwner = cardOwner.rows[0].count / percentageTarget[0].count *100
				const percentageNoneRenewed = NoneRenewed.rows[0].count / percentageTarget[0].count *100
				let returnedValues = []

				let result = {
					//title: title,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed
					//description: description,
					//card1: card1,
					//card2: card2
				}
				returnedValues.push(result)
				return returnedValues
			}
		});
		t.list.field("getProfileAndDataSenior", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('issenior', true)

				let cardOwner = await db.raw(`SELECT count(distinct client.cle_client)
				from client 
				left JOIN carte_comm on client.cle_client = carte_comm.cle_client
				left join abo_frequence on abo_frequence.cle_client = client.cle_client 
				left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND issenior = true`)

				let NoneRenewed = await db.raw(`SELECT count(distinct client.cle_client) FROM client
				LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
				WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
				OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
				AND client.issenior = true
				`)

				const percentageInTotal = percentageTarget[0].count / totalNumberUsers[0].count *100
				const percentageCardOwner = cardOwner.rows[0].count / percentageTarget[0].count *100
				const percentageNoneRenewed = NoneRenewed.rows[0].count / percentageTarget[0].count *100
				let returnedValues = []

				let result = {
					//title: title,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed
					//description: description,
					//card1: card1,
					//card2: card2
				}
				returnedValues.push(result)
				return returnedValues
			}
		});
		t.list.field("getProfileAndDatapro", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('ispro', true)

				let cardOwner = await db.raw(`SELECT count(distinct client.cle_client)
				from client 
				left JOIN carte_comm on client.cle_client = carte_comm.cle_client
				left join abo_frequence on abo_frequence.cle_client = client.cle_client 
				left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND ispro = true`)

				let NoneRenewed = await db.raw(`SELECT count(distinct client.cle_client) FROM client
				LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
				WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
				OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
				AND client.ispro = true
				`)

				const percentageInTotal = percentageTarget[0].count / totalNumberUsers[0].count *100
				const percentageCardOwner = cardOwner.rows[0].count / percentageTarget[0].count *100
				const percentageNoneRenewed = NoneRenewed.rows[0].count / percentageTarget[0].count *100
				let returnedValues = []

				let result = {
					//title: title,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed
					//description: description,
					//card1: card1,
					//card2: card2
				}
				returnedValues.push(result)
				return returnedValues
			}
		});
		t.list.field("getProfileAndDataWeekEnd", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('ispro', true)

				let cardOwner = await db.raw(`SELECT count(distinct client.cle_client)
				from client 
				left JOIN carte_comm on client.cle_client = carte_comm.cle_client
				left join abo_frequence on abo_frequence.cle_client = client.cle_client 
				left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND ispro = true`)

				let NoneRenewed = await db.raw(`SELECT count(distinct client.cle_client) FROM client
				LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
				WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
				OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
				AND client.ispro = true
				`)

				const percentageInTotal = percentageTarget[0].count / totalNumberUsers[0].count *100
				const percentageCardOwner = cardOwner.rows[0].count / percentageTarget[0].count *100
				const percentageNoneRenewed = NoneRenewed.rows[0].count / percentageTarget[0].count *100
				let returnedValues = []

				let result = {
					//title: title,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed
					//description: description,
					//card1: card1,
					//card2: card2
				}
				returnedValues.push(result)
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


