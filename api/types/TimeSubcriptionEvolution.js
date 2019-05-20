const {objectType} = require('nexus')

module.exports = objectType({
	name: 'TimeSubcriptionEvolution',
	description: '',
	definition(t) {
		t.string('date', {
			description: '',
			nullable: true
        })
		t.int('count', {
			description: 'count subscriber',
			nullable: true
		})
    }
})