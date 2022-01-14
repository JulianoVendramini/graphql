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
        email: String
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

    type Mutation {
        createUser(name: String, email: String): User!
    }
`

const resolvers = {
    User: {
        profile: (user) => (db.profile.find(profile => profile.id == user.id))
    },

    Query: {
        users: () => db.users,
        user: (_, { id }) => (db.users.find(user => user.id == id)),
    },

    Mutation: {
        createUser: (_, { name, email }) => {
            const userAlreadyExists = db.users.find(user => user.name == name || user.email == email)

            if(userAlreadyExists) {
                throw new Error('User already exists')
            }

            const id = db.users.length + 1
            const user = { id, name, email }
            db.users.push(user)
            return user
        }
    }
}

module.exports = { 
    typeDefs,
    resolvers
}