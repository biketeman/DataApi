const {GraphQLServer} = require('graphql-yoga');
const { queryType, stringArg, makeSchema,	objectType} = require('nexus');
const { pg } = require('pg');
const knex = require('knex');

const env = process.env.NODE_ENV || 'development';
const config = require(`./config/${env}`)
const db = config.DB;

//all events
//all users
//events by userid

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

const Query = queryType({
	definition(t) {
		t.list.field("allusers", {
			type: User,
			resolve: (parent, args) => {
				const userresult = db.select('*').from('users')
				return userresult
			}
    });
    t.list.field("allevents", {
			type: Event,
			resolve: (parent, args) => {
				const eventresult = db.select('*').from('events')
				return eventresult
			}
    });
    t.list.field("eventsbyuserid", {
      type: Event,
      args: {
        user_id: stringArg({
          nullable: false
        })
      },
			resolve: (parent, args) => {
				const eventsbyuserid = db.select('*').from('events').where({user_id : args.user_id})
				return eventsbyuserid
			}
    });
	},
});


const schema = makeSchema({
	types: [Query, User, Event],
	outputs: {
		schema: __dirname + "/generated/schema.graphql",
		typegen: __dirname + "/generated/typings.ts",
	},
});


const server = new GraphQLServer({
schema
})


server.start(() => console.log('Server is running on localhost:4000'))