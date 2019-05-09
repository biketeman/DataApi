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

		// t.list.field("pourcentageProfilewrong", {
		// 	type: client,
		// 	args: {
		// 		maximumage: intArg({
		// 			nullable: true,
		// 		}),
		// 		minimumage: intArg({
		// 			nullable: true,
		// 		}),
		// 	},
		// 	resolve: async (parent, args) => {
		// 		// const total = await db('client').count('*')
		// 		// const profile = await db.raw('SELECT COUNT(*) FROM CLIENT WHERE IN_AGE > ?', [args.minimumage])
		// 		// const profile = await db('client').count('*').where('in_age', 41)
		// 		// const pourcentageProfile = profile[0].count / total[0].count * 100
		// 		// return profile[0]
		// 		const test = await db.raw('SELECT * FROM CLIENT')
		// 	}
        // });
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