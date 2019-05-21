const {objectType} = require('nexus')

module.exports = objectType({
	name: 'subscriptionCards',
	description: '',
	definition(t) {
		t.string('cr_type_cr', {
			description: '',
			nullable: true
        })
        t.string('title', {
			description: '',
			nullable: true
        })
		t.float('percentageInTotal', {
			description: 'clé du client',
			nullable: true
		})
		t.float('percentageInTotalcardOwner', {
			description: 'clé du client',
			nullable: true
		})
    }
})