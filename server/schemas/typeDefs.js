const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdNeeds: [Need]
    signedUpNeeds: [Need]
  }

  type Need {
    _id: ID!
    needText: String!
    needAuthor: User!
    needDate: String
    createdAt: String
    signedUpUsers: [User]
  }

  type signUpForNeed {
    _id: ID
    signUpForNeedText: String
    signUpForNeedAuthoer: String
    createdAt: String
  }

  type Auth {
    token: ID
  }

  type Query {
    user: User
    need: Need
    allNeeds: [Need]
    me: User
  }

  input needInput {
    _id: String!
    needText: String!
    needAuthor: userInput!
    needDate: String
    createdAt: String
    signedUpUsers: [userInput]
  }

  input userInput {
    _id: String!
    firstName: String!
    lastName: String!
    email: String!
    createdNeeds: [needInput]
    signedUpNeeds: [needInput]
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addNeed(needText: String!, needDate: String, needAuthor: userInput!): Need
    addSignUpForNeed(needId: ID!, signUpForNeedText: String!): Need
    removeNeed(_id: ID!): User
    removeSignUpForNeed(needId: ID!, signForNeedId: ID!): Need
  }
`;

module.exports = typeDefs;
