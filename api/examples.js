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