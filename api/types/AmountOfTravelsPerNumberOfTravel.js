const {objectType} = require('nexus')

module.exports = objectType({
	name: 'AmountOfTravelsPerPerson',
	description: '',
	definition(t) {
		t.int('count', {
			description: '',
			nullable: true
        })
		t.int('AmountNonSubscribers', {
			description: 'count subscriber',
			nullable: true
        })
        t.int('AmountSubscribers', {
			description: 'count subscriber',
			nullable: true
		})
    }
})
