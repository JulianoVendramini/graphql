const { gql, ApolloServer } = require("apollo-server")

const db = {
    users: [
        {
            id: "1",
            name: "John",
            profile: 1
        },
        {
            id: "2",
            name: "Jane",
            profile: 2
        }
    ],
    profile: [
        {
            id: "1",
            description: 'ADMIN'
        },
        {
            id: "2",
            description: 'USER'
        }
    ]
}


const typeDefs = gql`

    enum ProfileType {
        ADMIN
        USER
    }

    type User {
        id: ID
        name: String
        profile: Profile
    }

    type Profile {
        id: Int
        description: ProfileType
    }

    type Query {
        users: [User]
        user(id: Int): User
        profile: [Profile]
    }
`

const resolvers = {
    User: {
        profile: (user) => (db.profile.find(profile => profile.id == user.id))
    },

    Query: {
        users: () => db.users,
        user: (_, { id }) => (db.users.find(user => user.id == id)),
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()