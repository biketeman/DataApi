const {objectType} = require('nexus')

module.exports = objectType({
	name: 'profileAndData',
	description: '',
	definition(t) {
		t.string('title', {
			description: 'profile title',
			nullable: true
		}),
		t.string('image', {
			description: 'profile image',
			nullable: true
		}),
		t.float('percentageInTotal', {
			description: '',
			nullable: true
		}),
		t.float('percentageCardOwner', {
			description: '',
			nullable: true
		}),		
		t.float('percentageNoneRenewed', {
			description: '',
			nullable: true
		}),
		t.string('description', {
			description: 'profile description',
			nullable: true
		}),
		t.string('card1', {
			description: 'image card 1',
			nullable: true
		}),	
		t.string('card2', {
			description: 'image card2',
			nullable: true
		}),
		t.string('cardImageText1', {
			description: 'text image card1',
			nullable: true
		}),
		t.string('cardImageText2', {
			description: 'text image card2',
			nullable: true
		})
		t.string('slug', {
			description: 'slug',
			nullable: true
		})
	}
})