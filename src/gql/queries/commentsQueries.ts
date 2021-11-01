import { gql } from '@apollo/client';

export const COMMENTS = gql`
  query {
    comments {
      id
      text
      author {
        id
        name
      }
      updatedAt
      post {
        id
      }
    }
  }
`;
