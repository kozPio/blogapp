import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation ($props: CreatePostInput!) {
    createPost(data: $props) {
      id
      title
      published
    }
  }
`;

export const UPDATE_POST = gql`
  mutation ($id: ID!, $props: UpdatePostInput!) {
    updatePost(id: $id, data: $props) {
      id
      title
      published
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;
