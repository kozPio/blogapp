import { gql } from '@apollo/client';

export const POST = gql`
  query ($id: ID!) {
    post(id: $id) {
      id
      title
      body
      published
      author {
        name
      }
      updatedAt
      comments {
        id
        updatedAt
        text
        author {
          name
        }
      }
    }
  }
`;

export const POSTS = gql`
  query ($first: Int, $skip: Int, $orderBy: PostOrderByInput) {
    posts(first: $first, skip: $skip, orderBy: $orderBy) {
      id
      title
      body
      published
      author {
        name
      }
      updatedAt
    }
  }
`;

export const MY_POSTS = gql`
  query ($first: Int, $skip: Int) {
    myPosts(first: $first, skip: $skip, orderBy: updatedAt_DESC) {
      id
      title
      body
      published
      author {
        name
      }
      updatedAt
    }
  }
`;

export const POSTS_SEARCH = gql`
  query ($query: String) {
    posts(query: $query) {
      id
      title
      body
      published
      author {
        name
      }
      updatedAt
    }
  }
`;
