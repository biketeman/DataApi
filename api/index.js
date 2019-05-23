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
const profileAndData = require(`./types/profileAndData.js`);
const TimeSubcriptionEvolution = require(`./types/TimeSubcriptionEvolution.js`)
const subscriptionCards = require(`./types/subscriptionCards.js`)
const moment = require('moment')

const Query = queryType({
	definition(t) {

		t.field("getProfileAndDataJeune", {
			type: profileAndData,
			resolve: async (parent, args) => {
				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('isjeune', true)
				let title = 'Jeune'
				let image = 'profile_jeune'
				let description = '18- 25 ans'
				let card1 = "carte_jeune"
				let card2 = "abo_frequence"
				let cardImageText2 = "carte jeune"
				let cardImageText1 = "Abo.fréquence"


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

				const percentageInTotal = (percentageTarget[0].count / totalNumberUsers[0].count *100).toFixed(1)
				const percentageCardOwner = (cardOwner.rows[0].count / percentageTarget[0].count *100).toFixed(1)
				const percentageNoneRenewed = (NoneRenewed.rows[0].count / percentageTarget[0].count *100).toFixed(1)


				let result = {
					title: title,
					image: image,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed,
					description: description,
					card1: card1,
					card2: card2,
					cardImageText1: cardImageText1,
					cardImageText2: cardImageText2
				}
				return result
			}
		});
		t.field("getProfileAndDataSenior", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('issenior', true)
				let title = 'Séniors'
				let image = 'profile_senior'
				let description = '+65 ans'
				let card1 = "carte_senior"
				let card2 = "abo_frequence"
				let cardImageText2 = "carte Sénior"
				let cardImageText1 = "Abo.fréquence"

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

				const percentageInTotal = (percentageTarget[0].count / totalNumberUsers[0].count *100).toFixed(1)
				const percentageCardOwner = (cardOwner.rows[0].count / percentageTarget[0].count *100).toFixed(1)
				const percentageNoneRenewed = (NoneRenewed.rows[0].count / percentageTarget[0].count *100).toFixed(1)

				let result = {
					title: title,
					image: image,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed,
					description: description,
					card1: card1,
					card2: card2,
					cardImageText1: cardImageText1,
					cardImageText2: cardImageText2
				}
				return result
			}
		});
		t.field("getProfileAndDataPro", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('ispro', true)
				let title = 'Pro'
				let image ='profile_pro'
				let description = '2/AR Par an'
				let card2 = "abo_frequence"
				let card1 = "empty"
				let cardImageText2 = "Abo.frequence"

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

				const percentageInTotal = (percentageTarget[0].count / totalNumberUsers[0].count *100).toFixed(1)
				const percentageCardOwner = (cardOwner.rows[0].count / percentageTarget[0].count *100).toFixed(1)
				const percentageNoneRenewed = (NoneRenewed.rows[0].count / percentageTarget[0].count *100).toFixed(1)

				let result = {
					title: title,
					image: image,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed,
					description: description,
					card1: card1,
					card2: card2,
					cardImageText2: cardImageText2
				}
				return result
			}
		});
		t.field("getProfileAndDataWeekEnd", {
			type: profileAndData,
			resolve: async (parent, args) => {

				const totalNumberUsers = await db('client').count('*')
				let percentageTarget = await db('client').count('*').where('ispro', true)
				let title = 'Week-End'
				let image ='profile_week-end'
				let description = 'Abo.Week End'
				let card2 = "abo_week-end"
				let card1 = "empty"
				let cardImageText2 = "Week-END"

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

				const percentageInTotal = (percentageTarget[0].count / totalNumberUsers[0].count *100).toFixed(1)
				const percentageCardOwner = (cardOwner.rows[0].count / percentageTarget[0].count *100).toFixed(1)
				const percentageNoneRenewed = (NoneRenewed.rows[0].count / percentageTarget[0].count *100).toFixed(1)

				let result = {
					title: title,
					image: image,
					percentageInTotal: percentageInTotal,
					percentageCardOwner: percentageCardOwner,
					percentageNoneRenewed : percentageNoneRenewed,
					description: description,
					card1: card1,
					card2: card2,
					cardImageText2: cardImageText2
				}
				return result
			}
		});
		t.list.field("aboEvolution", {
			type: aboEvolution,
			args: {
				subscriptionDateActual: stringArg({
					nullable: true,
					default: '2019-06-17'
				}),
				subscriptionDateRequest: stringArg({
					nullable: true,
					default: '2018-06-17'
				}),
				subscriptionDateActualCompare: stringArg({
					nullable: true,
					default: '2018-05-17'
				}),
				subscriptionDateRequestCompare: stringArg({
					nullable: true,
					default: '2017-05-17'
				}),
			},
			resolve: async (parent, args) => {
				const actual = await db.select('cr_type_cr').count('*').from('carte_comm').where('cr_dt_deb_val', '<', args.subscriptionDateActual).andWhere('cr_dt_deb_val', '>', args.subscriptionDateRequest).groupBy('cr_type_cr')
				const compare = await db.select('cr_type_cr').count('*').from('carte_comm').where('cr_dt_deb_val', '<', args.subscriptionDateActualCompare).andWhere('cr_dt_deb_val', '>', args.subscriptionDateRequestCompare).groupBy('cr_type_cr')

				var compared = []

				actual.forEach((element, i) => {
					compared.push({
						cr_type_cr: element.cr_type_cr,
						percentage: element.count / compare[i].count * 100 
					})
				});
				return compared
			}
		});
		t.list.field("TimeSubcriptionEvolution", {
			type: TimeSubcriptionEvolution,
			resolve: async (parent, args) => {

				const query= await db.raw(`
				SELECT count(*), date_trunc('month', cr_dt_deb_val::date) AS monthly
				FROM client
				LEFT JOIN carte_comm on carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence on abo_frequence.cle_client = client.cle_client
				LEFT JOIN abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				WHERE (carte_comm.cr_type_cr = 'Jeune'
				AND cr_dt_deb_val > '2016-10-06'
				AND cr_dt_deb_val < '2019-01-07')
				OR (abo_frequence.fq_dt_cmd > '2016-10-06'
				AND abo_frequence.fq_dt_cmd < '2019-01-07')
				OR (abo_tgvmax.dt_souscription_max > '2016-10-06'
				AND abo_tgvmax.dt_souscription_max < '2019-01-07')
				GROUP BY monthly
				ORDER BY monthly
				`)
				var result = []

				query.rows.forEach((element, i) => {
					if(element.monthly != null) {
						result.push({
							count: element.count,
							date: moment(element.monthly).lang('fr').format('MMMM YYYY')
						})
					}
				})

				return result
			}
		});	
		t.list.field("subscriptionCards", {
			type: subscriptionCards,
			args: {
				cr_type_cr: stringArg({
				  nullable: true,
				})
			},
			resolve: async (parent, args) => {
		
				const totalCardOwner = await db('carte_comm').count('*')
				const total = await db('client').count('*')
				const percentageCard = await db.raw(`
				SELECT cr_type_cr, count(distinct carte_comm) 
				from carte_comm
				FULL JOIN client on carte_comm.cle_client = client.cle_client
				WHERE cr_type_cr IS NOT NULL
				GROUP BY cr_type_cr
				`)
				
				let result = []

				percentageCard.rows.forEach((element, i) => {
					result.push({
						title: element.cr_type_cr,
						percentageInTotal : (element.count / total[0].count * 100).toFixed(1),
						percentageInTotalcardOwner : (element.count/ totalCardOwner[0].count * 100).toFixed(1)
					})
				})
				return result
			}	
		});	
		
	},
});
const schema = makeSchema({
	types: [Query, Segment, Client, CarteComm, Abofrequences, Abotgvmax, aboEvolution, profileAndData, TimeSubcriptionEvolution, subscriptionCards],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
	schema
})


server.start(() => console.log('Server is running on localhost:4000'))


