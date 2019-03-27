const {objectType} = require('nexus')

module.exports = objectType({
	name: 'Client',
	description: '',
	definition(t) {
		t.int('cle_client', {
			description: 'clé du client',
			nullable: false
        })
        t.int('in_age', {
			description: 'clé du client',
			nullable: true
        })
        t.string('in_sexe', {
			description: 'clé du client',
			nullable: false
        })
        t.boolean('in_top_fid', {
			description: 'clé du client',
			nullable: false
        })
        t.boolean('in_top_nsd', {
			description: 'clé du client',
			nullable: false
        })
        t.boolean('in_top_sncf_connect', {
			description: 'clé du client',
			nullable: false
        })
	}
})