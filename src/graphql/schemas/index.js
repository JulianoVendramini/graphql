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
        phone: String
        profile: Profile
    }

    input UserInput {
        name: String
        email: String
        phone: String
    }

    input InputFilter {
        id: Int,
        email: String
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
        createUser(data: UserInput): User!
        updateUser(id: Int!, data: UserInput): User!
        deleteUser(filter: InputFilter): Boolean
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
        createUser: (_, { data }) => {
            const userAlreadyExists = db.users.find(user => user.name == data.name || user.email == data.email)

            if(userAlreadyExists) {
                throw new Error('User already exists')
            }

            const id = db.users.length + 1
            const user = { id, ...data}
            db.users.push(user)
            return user
        },
        updateUser: (_, { id, data}) => {
            const user = db.users.find(user => user.id === id)
            const userIndex = db.users.findIndex(user => user.id === id)

            if(!user) {
                throw new Error('User not found')
            }

            const userUpdatted = { ...user, ...data }

            db.users[userIndex] = userUpdatted

            return userUpdatted
        },
        deleteUser: (_, { filter: { id, email } }) => filterDeleteUser(id ? { id } : { email})
    }
}

const filterDeleteUser = (filter) => {
    const key = Object.keys(filter)[0];
    const value = Object.values(filter)[0];

    const userAlreadyExists = db.users.find(user => user[key] === value)
    db.users = db.users.filter(user => user[key] !== value)

    return !!userAlreadyExists
}

module.exports = { 
    typeDefs,
    resolvers
}