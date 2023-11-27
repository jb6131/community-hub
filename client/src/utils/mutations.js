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
  mutation addNeed($needText: String!, $needDate: String) {
    addNeed(needText: $needText, needDate: $needDate) {
      _id
      needText
      needAuthor {
        _id
        firstName
        lastName
        email
      }
      needDate
      createdAt
    }
  }
`;


export const REMOVE_NEED = gql`
  mutation removeNeed($needId: ID!) {
    removeNeed(needId: $needId) {
      _id
      needText
      needDate
      createdAt
    }
  }
`;

export const SIGN_UP_FOR_NEED = gql`
  mutation signUpForNeed($needId: ID!) {
    signUpForNeed(needId: $needId) {
      _id
      needText
      needAuthor {
        _id
        firstName
        lastName
        email
      }
      needDate
      createdAt
      signedUpUsers {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

export const WITHDRAW_FROM_NEED = gql`
  mutation withdrawFromNeed($needId: ID!) {
    withdrawFromNeed(needId: $needId) {
      _id
      needText
      needAuthor {
        _id
        firstName
        lastName
        email
      }
      needDate
      createdAt
      signedUpUsers {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;