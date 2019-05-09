const {objectType} = require('nexus')

module.exports = objectType({
	name: 'profileAndData',
	description: '',
	definition(t) {
		t.string('title', {
			description: 'profile title',
			nullable: false
		}),
		t.float('percentageInTotal', {
			description: '',
			nullable: false
		}),
		t.int('percentageCardOwner', {
			description: '',
			nullable: false
		}),		
		t.int('percentageNoneRenewed', {
			description: '',
			nullable: false
		}) 
	}
})