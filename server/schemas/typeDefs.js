const typeDefs = `
  type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    createdNeeds: [Need]
    signedUpNeeds: [Need]
  }

  type Need {
    _id: ID
    needText: String!
    needAuthor: User!
    needDate: String
    createdAt: String
    signedUpUsers: [User]
  }

  type Auth {
    token: ID
  }

  type Query {
    user: User
    need(needId: ID!): Need
    allNeeds: [Need]
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNeed(needText: String!, needDate: String): Need
    removeNeed(needId: ID!): Need
    signUpForNeed(needId: ID!): Need
  }
`;

module.exports = typeDefs;
