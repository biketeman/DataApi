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
const AmountOfTravelsPerNumberOfTravel = require(`./types/AmountOfTravelsPerNumberOfTravel.js`)
const moment = require('moment')

const Query = queryType({
	definition(t) {

		//this query can take a slug as arg to retrive all data for a certain profile or retrives data for all profile is it's not given an arg
		t.list.field("getProfileAndData", {
			type: profileAndData,
			args: {
				slug: stringArg({
					nullable: true
				})
			},
			resolve: async (parent, args) => {

				let query_param
				let percentageTarget
				let cluster_data

				// global query for all clusters even single ones
				const totalNumberUsers = await db('client').count('*')

				if ( args.slug != null ) {
					// we only have one data to return
					let query_param = "is"+args.slug+" = true"

					percentageTarget = await db('client').count('*').whereRaw(query_param)
					cluster_data = await db('cluster_data').select('*').where("slug", "=", args.slug)

					let cardOwner = await db.raw(`SELECT count(distinct client.cle_client)
						from client 
						left JOIN carte_comm on client.cle_client = carte_comm.cle_client
						left join abo_frequence on abo_frequence.cle_client = client.cle_client 
						left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
						where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND `+query_param)
						let NoneRenewed = await db.raw(`SELECT count(distinct client.cle_client) FROM client
						LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
						LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
						WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
						OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
						AND `+query_param)

					const percentageInTotal = (percentageTarget[0].count / totalNumberUsers[0].count *100).toFixed(1)
					const percentageCardOwner = (cardOwner.rows[0].count / percentageTarget[0].count *100).toFixed(1)
					const percentageNoneRenewed = (NoneRenewed.rows[0].count / percentageTarget[0].count *100).toFixed(1)

					return [{
						title: cluster_data[0].title,
						image: cluster_data[0].image,
						description: cluster_data[0].description,
						card1: cluster_data[0].card1,
						card2: cluster_data[0].card2,
						cardImageText1: cluster_data[0].cardImageText1,
						cardImageText2: cluster_data[0].cardImageText2,
						percentageInTotal: percentageInTotal,
						percentageCardOwner: percentageCardOwner,
						percentageNoneRenewed : percentageNoneRenewed,
						slug: cluster_data[0].slug
					}]

				} else {
					// we return all clusters data

					cluster_data = await db('cluster_data').select('*')
					let result = []

					// looping for all clusters
					for (let i in cluster_data) {

						let element = cluster_data[i]

						query_param = "is"+element.slug+" = true"

						let cardOwner = await db.raw(`SELECT count(distinct client.cle_client)
						from client 
						left JOIN carte_comm on client.cle_client = carte_comm.cle_client
						left join abo_frequence on abo_frequence.cle_client = client.cle_client 
						left join abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
						where (carte_comm.cr_type_cr is NOT NULL OR abo_frequence.cle_client IS NOT NULL OR abo_tgvmax.cle_client IS NOT NULL) AND `+query_param)
						let NoneRenewed = await db.raw(`SELECT count(distinct client.cle_client) FROM client
						LEFT JOIN carte_comm ON carte_comm.cle_client = client.cle_client
						LEFT JOIN abo_frequence ON abo_frequence.cle_client = client.cle_client
						WHERE (carte_comm.cr_type_ren = 'RENOUV ISO' or carte_comm.cr_type_ren = 'RENOUV TRANSFERT' 
						OR abo_frequence.fq_type_ren = 'RENOUV ISO' or abo_frequence.fq_type_ren = 'RENOUV TRANSFERT')
						AND `+query_param)

						percentageTarget = await db('client').count('*').whereRaw(query_param)
						
						let percentageInTotal = ((percentageTarget[0].count / totalNumberUsers[0].count) *100).toFixed(1)
						let percentageCardOwner = ((cardOwner.rows[0].count / percentageTarget[0].count) *100).toFixed(1)
						let percentageNoneRenewed = ((NoneRenewed.rows[0].count / percentageTarget[0].count) *100).toFixed(1)

						let title = element.title
						let image = element.image
						let description = element.description
						let card1 = element.card1
						let card2 = element.card2
						let cardImageText2 = element.cardImageText2
						let cardImageText1 = element.cardImageText1
						let slug = element.slug

	
						result.push({
							title: title,
							image: image,
							description: description,
							card1: card1,
							card2: card2,
							cardImageText1: cardImageText1,
							cardImageText2: cardImageText2,
							percentageInTotal: percentageInTotal,
							percentageCardOwner: percentageCardOwner,
							percentageNoneRenewed : percentageNoneRenewed,
							slug: slug
						})
					}
					
					return result

				}
			}
			
			//this query retrives all the informations for all profiles
			
		});

		//this query retrives the evolution of travelers for one year for every subscription card type
		t.list.field("aboEvolution", {
			type: aboEvolution,
			description: 'gives the evolution of subscription on one year for every card',
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

		//gives the percentage of subscription card owners among the whole base and among all the card owners
		t.list.field("subscriptionCards", {
			type: subscriptionCards,
			description: 'gives the percentage of subscription card owners among the whole base and among all the card owners',
			args: {
				cr_type_cr: stringArg({
				  nullable: true,
				})
			},
			resolve: async (parent, args) => {
				
				const totalCardOwner = await db('carte_comm').count('*')
				const total = await db('client').count('*')

				// getting the amount of subscriber for every card type
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

		//this query retrives the subscription evolution throughout the time  
		t.list.field("TimeSubcriptionEvolution", {
			args: {
				slug: stringArg({
					nullable: true
				}),
				card: stringArg({
					nullable: true
				}),
				date_debut : stringArg({
					nullable: true,
					default: '2016-10-06'
				}),
				date_fin : stringArg({
					nullable: true,
					default: '2019-01-07'
				})
			},
			type: TimeSubcriptionEvolution,
			description: 'gives the evolution over the time for subscriptions',
			resolve: async (parent, args) => {

				// changing parametrs considering if the query is used for the profiles or cards
				if (args.slug) {
					query_param = "is"+ args.slug+" = true"
					second_part = ` OR (abo_frequence.fq_dt_cmd >  '`+ args.date_debut + `' 
					AND abo_frequence.fq_dt_cmd <  '`+ args.date_fin + `' )
					OR (abo_tgvmax.dt_souscription_max >  '`+ args.date_debut + `' 
					AND abo_tgvmax.dt_souscription_max <  '`+ args.date_fin + `' )`
					format = 'MMMM YYYY'
				} else {
					query_param = "cr_type_cr = '" +args.card + "' "
					second_part = ' '
					format = 'MMMM'
				}

				const query= await db.raw(`
				SELECT count(*), date_trunc('month', cr_dt_deb_val::date) AS monthly
				FROM client
				LEFT JOIN carte_comm on carte_comm.cle_client = client.cle_client
				LEFT JOIN abo_frequence on abo_frequence.cle_client = client.cle_client
				LEFT JOIN abo_tgvmax on abo_tgvmax.cle_client = client.cle_client
				WHERE (` +  query_param + `
				AND cr_dt_deb_val > '`+ args.date_debut + ` '
				AND cr_dt_deb_val <  '`+ args.date_fin + `' ) 
				`+ second_part + ` 
				GROUP BY monthly
				ORDER BY monthly
				` 
				)
				var result = []

				//pushing the result
				query.rows.forEach((element, i) => {
					if(element.monthly != null) {
						result.push({
							count: element.count,
							date: moment(element.monthly).lang('fr').format(format)
						})
					}
				})

				return result
			}
		});

		//this query retrives the amount of travelers per number of travel example (1 travel : 2500 travelers)
		t.list.field("AmountOfTravelsPerNumberOfTravel", {
			type: AmountOfTravelsPerNumberOfTravel,
			args: {
				slug: stringArg({
					nullable: true
				}),
				card: stringArg({
					nullable: true
				})
			},
			resolve: async (parent, args) => {

				if(args.slug){
					query_param = "is"+args.slug+" = true"
				}else{
					query_param = "carte_comm.cr_type_cr = '" + args.card + "' "
				}
				let numberMax = 10
			
				// get the amount of subscriber that fits the params
				const AmountNonSubscribers = await db.raw(`
				SELECT count AS total,
					COUNT(cle_client) AS amount_non_subscribers
					FROM (
						SELECT
							count(*),
							segment.cle_client
						FROM
							segment
							LEFT JOIN abo_frequence ON abo_frequence.cle_client = segment.cle_client
							LEFT JOIN abo_tgvmax ON abo_tgvmax.cle_client = segment.cle_client
							LEFT JOIN client ON client.cle_client = segment.cle_client
							LEFT JOIN carte_comm on carte_comm.cle_client = segment.cle_client
							WHERE( 
								abo_frequence.cle_client IS NULL
								AND abo_tgvmax.cle_client IS NULL)
								AND ` + query_param + `
								AND segment.sg_dt_dep_voy >= '2018-01-01'
								AND segment.sg_dt_dep_voy <= '2019-01-01'
						GROUP BY
							segment.cle_client) t
					GROUP BY count
					ORDER BY count
					LIMIT ` + numberMax + `
						`)

				// get the amount of non subscriber that fits the params
				const AmountSubscribers = await db.raw(`
				SELECT count AS total,
					COUNT(cle_client) AS amount_subscribers
					FROM (
						SELECT
							count(*),
							segment.cle_client
						FROM
							segment
							LEFT JOIN abo_frequence ON abo_frequence.cle_client = segment.cle_client
							LEFT JOIN abo_tgvmax ON abo_tgvmax.cle_client = segment.cle_client
							LEFT JOIN client ON client.cle_client = segment.cle_client
							LEFT JOIN carte_comm on carte_comm.cle_client = segment.cle_client
							WHERE( 
								abo_frequence.cle_client IS NOT NULL
								OR abo_tgvmax.cle_client IS NOT NULL
								OR carte_comm.cle_client IS NOT NULL)
								AND ` + query_param + ` 
								AND segment.sg_dt_dep_voy >= '2018-01-01'
								AND segment.sg_dt_dep_voy <= '2019-01-01'
						GROUP BY
							segment.cle_client) t
					GROUP BY count
					ORDER BY count
					LIMIT ` + numberMax + `
						`)
				let result = []
				
				//pushing them into the result before returning them
				AmountNonSubscribers.rows.forEach((element, i) => {
					result.push({
						count: element.total,
						AmountNonSubscribers : element.amount_non_subscribers,
						AmountSubscribers : AmountSubscribers.rows[i].amount_subscribers,
					})
				})
				return result
			}	
		});
	},
});
const schema = makeSchema({
	types: [Query, Segment, Client, CarteComm, Abofrequences, Abotgvmax, aboEvolution, profileAndData, TimeSubcriptionEvolution, subscriptionCards, AmountOfTravelsPerNumberOfTravel],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
	schema
})


server.start(() => console.log('Server is running on localhost:4000'))


