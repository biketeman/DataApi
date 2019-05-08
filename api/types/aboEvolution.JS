const {objectType} = require('nexus')

module.exports = objectType({
	name: 'aboEvolution',
	description: '',
	definition(t) {
		t.string('cr_type_cr', {
			description: '',
			nullable: false
        })
		t.int('count', {
			description: 'clé du client',
			nullable: true
        })
    }
})