import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
    }
  }
`;

export const ADD_NEED = gql`
  mutation addNeed($needText: String!) {
    addNeed(needText: $needText) {
      _id
      needText
      needAuthor
      needDate
      createdAt
    }
  }
`;

export const ADD_SIGNUPFORNEED = gql`
  mutation addSignUpForNeed($thoughtId: ID!, $signUpForNeedText: String!) {
    addSignUpForNeed(thoughtId: $thoughtId, signUpForNeedText: $signUpForNeedText) {
      _id
      needText
      needAuthor
      createdAt
      signUpForNeed {
        _id
        signUpForNeedText
        createdAt
      }
    }
  }
`
