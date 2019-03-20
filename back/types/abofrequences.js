const {objectType} = require('nexus')

module.exports = objectType({
	name: 'Abofrequences',
	description: '',
	definition(t) {
		t.int('cle_client', {
			description: 'clé du client',
			nullable: false
        })
		t.int('cle_abo_fq', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_dt_cmd', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_cod_iata_gare_arr', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_cod_iata_gare_dep', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_lib_iata_gare_dep', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_lib_iata_gare_arr', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_cod_ss_tarif', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_cod_tarif', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_dt_deb_val', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_dt_fin_val', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_statut', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_type_abo', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_type_freq', {
			description: 'clé du client',
			nullable: false
        })
        t.string('fq_type_ren', {
			description: 'clé du client',
			nullable: false
        })
        t.boolean('fq_ca', {
			description: 'clé du client',
			nullable: false
        })
	}
})