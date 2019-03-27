const {objectType} = require('nexus')

module.exports = objectType({
	name: 'Abotgvmax',
	description: '',
	definition(t) {
		t.int('cle_client', {
			description: 'clé du client',
			nullable: false
        })
		t.int('cle_abo', {
			description: 'clé du client',
			nullable: false
        })
		t.string('dt_souscription_max', {
			description: 'clé du client',
			nullable: false
        })
		t.string('compte_personnel_date_expiration', {
			description: 'clé du client',
			nullable: false
        })
		t.string('compte_personnel_statut', {
			description: 'clé du client',
			nullable: false
        })
	}
})