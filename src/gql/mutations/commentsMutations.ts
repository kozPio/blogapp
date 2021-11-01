import { gql } from '@apollo/client';

export const DELETE_COMMENT = gql`
  mutation ($id: ID!) {
    deleteComment(id: $id) {
      id
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation ($props: CreateCommentInput!) {
    createComment(data: $props) {
      id
      text
      author {
        name
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation ($id: ID!, $props: UpdateCommentInput!) {
    updateComment(id: $id, data: $props) {
      id
      text
    }
  }
`;
