const { gql, ApolloServer } = require("apollo-server")

const typeDefs = gql`
    type Query {
        id: ID
        name: String
        age: Int
        active: Boolean
        salary: Float
        tech: [String!]!
    }
`

const resolvers = {
    Query: {
        id: () => "123",
        name: () => "John Doe",
        age: () => 30,
        active: () => true,
        salary: () => 30000.00,
        tech: () => ["React", "Node", "GraphQL"]
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()