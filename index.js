const { gql, ApolloServer } = require("apollo-server")

const usersMock = [
    {
        id: "1",
        name: "John",
        age: 30,
        active: true,
        salary: 1000
    },
    {
        id: "2",
        name: "Jane",
        age: 25,
        active: false,
        salary: 2000
    }
]

const productsMock = [{
    id: "1",
    name: "Product 1",
    price: 100.00,
    description: "This is a product"
},
{
    id: "2",
    name: "Product 2",
    price: 200.00,
    description: "This is a product"
}]

const typeDefs = gql`

    type Product {
        id: ID
        name: String
        price: Float
        description: String
    }

    type User {
        id: ID
        name: String
        age: Int
        active: Boolean
        salary: Float
    }

    type Query {
        users: [User]
        products: [Product]
        user(name: String): User
        product(id: Int): Product
    }
`

const resolvers = {
    Query: {
        users: () => usersMock,
        user: (_, { name }) => (
            usersMock.find(user => user.name == name)
        ),
        products: () => productsMock,
        product: (_, { id }) => (
            productsMock.find(product => product.id == id)
        )
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen()