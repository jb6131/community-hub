const typeDefs = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
  }

  type Need {
    _id: ID
    needText: String!
    needAuthor: String!
    needDate: String
    createdAt: String
  }

  type Auth {
    token: ID
  }

  type Query {
    user: User
    need: Need
    allNeeds: [Need]
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNeed(needText: String!, needAuthor: String!, needDate: String): User
    removeNeed(_id: ID): User
  }
`;

module.exports = typeDefs;
