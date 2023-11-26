import { gql } from '@apollo/client';

// gets a user by ID
export const QUERY_USER = gql`
  query getUser($id: ID) {
    user(_id: $id) {
      _id
      firstName
      lastName
      email
      createdNeeds {
        _id
        needText
        needAuthor{
          firstName
          lastName
        } 
        needDate
        createdAt
      }
      signedUpNeeds {
        _id
        needText
        needAuthor{
          firstName
          lastName
        } 
        needDate
        createdAt
      }
    }
  }
`;

// gets a single need
export const QUERY_SINGLE_NEED = gql`
  query getNeed($needId: ID!) {
    singleNeed(needId: $needId) {
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