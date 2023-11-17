import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      needs {
        _id
        needText
        needDate
        createdAt
      }
    }
  }
`;

export const QUERY_NEEDS = gql`
  query getNeeds {
    needs {
      _ID
      needText
      needAuthor
      needDate
      createdAt
    }
  }
`

export const QUERY_SINGLE_NEED = gql`
  query getSingleNeed($needId: ID!) {
    need(needId: $needId) {
      _id
      needText
      needAuthor
      needDate
      createdAt
    }
  }
`
export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      needs {
        _id
        needText
        needAuthor
        needDate
        createdAt
      }
    }
  }
`
