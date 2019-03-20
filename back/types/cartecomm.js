const {objectType} = require('nexus')

module.exports = objectType({
	name: 'CarteComm',
	description: '',
	definition(t) {
		t.int('cle_client', {
			description: 'clé du client',
			nullable: false
        })
		t.int('cle_cr', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cle_cmd', {
			description: 'clé du client',
			nullable: false
        })
        t.boolean('cr_ca', {
			description: 'clé du client',
			nullable: false
        })
        t.int('cr_cod_ss_tarif', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_cod_tarif', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_dt_deb_val', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_dt_deb_val', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_dt_fin_val', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_status', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_type_ren', {
			description: 'clé du client',
			nullable: false
        })
        t.string('cr_type_cr', {
			description: 'clé du client',
			nullable: false
        })
	}
})