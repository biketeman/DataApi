const {objectType} = require('nexus')

module.exports = objectType({
	name: 'aboEvolution',
	description: '',
	definition(t) {
		t.string('cr_type_cr', {
			description: '',
			nullable: true
        })
		t.int('count', {
			description: 'clé du client',
			nullable: true
		})
		t.float('percentage', {
			description: 'clé du client',
			nullable: true
		})
    }
})