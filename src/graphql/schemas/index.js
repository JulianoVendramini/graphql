const { gql } = require("apollo-server")
const db = require("../../db")

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

module.exports = { 
    typeDefs,
    resolvers
}