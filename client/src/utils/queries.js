import { gql } from '@apollo/client';

// gets a user by ID
export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(_id: $id) {
      _id
      firstName
      lastName
      email
      createdNeeds {
        _id
        needText
        needAuthor 
        needDate
        createdAt
      }
      signedUpNeeds {
        _id
        needText
        needAuthor 
        needDate
        createdAt
      }
    }
  }
`;

// gets a single need
export const QUERY_SINGLE_NEED = gql`
  query getNeed($id: ID!) {
    need(_id: $id) {
      _id
      needText
      needAuthor 
      needDate
      createdAt
      signUpForNeed {
        _id
        firstName
        lastName
      }
    }
  }
`;

// gets all needs
export const QUERY_NEEDS = gql`
  query getNeeds {
    allNeeds {
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

// gets currently authenticated user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
    }
  }
`;