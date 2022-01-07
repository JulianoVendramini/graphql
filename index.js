const { gql, ApolloServer } = require("apollo-server")

const usersMock = [
    {
        id: "1",
        name: "John",
        perfil: 1
    },
    {
        id: "2",
        name: "Jane",
        perfil: 2
    }
]

const perfilMock = [
    {
        id: "1",
        description: 'admin'
    },
    {
        id: "2",
        description: 'user'
    }
]

const typeDefs = gql`
    type Perfil {
        id: Int
        description: String
    }

    type User {
        id: ID
        name: String
        perfil: Perfil
    }

    type Query {
        users: [User]
        user(id: Int): User
    }
`

const resolvers = {
    User: {
        perfil: (user) => {
            return perfilMock.find(perfil => perfil.id === user.id)
        }
    },

    Query: {
        users: () => usersMock,
        user: (_, { id }) => (usersMock.find(user => user.id == id))
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()