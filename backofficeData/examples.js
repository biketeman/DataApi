const User = objectType({
	name: 'User',
	description: '',
	definition(t) {
		t.string('username', {
				description: 'The username of this user',
				nullable: false
			}),
			t.string('email', {
				description: 'The email address of the user',
				nullable: false
			}),
			t.string('created_at', {
				description: 'when did the user got created',
				nullable: false
			})
	}
})

const Event = objectType({
	name: 'Event',
	description: '',
	definition(t) {
		t.string('name', {
				description: 'The name of ths user',
				nullable: false
			}),
			t.string('user_id', {
				description: 'which user this event is related',
				nullable: false
			}),
			t.string('library_id', {
				description: 'which library this event is related',
				nullable: false
			})
	}
})

