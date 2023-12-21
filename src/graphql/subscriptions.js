/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateFile = /* GraphQL */ `
  subscription OnCreateFile($filter: ModelSubscriptionFileFilterInput) {
    onCreateFile(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateFile = /* GraphQL */ `
  subscription OnUpdateFile($filter: ModelSubscriptionFileFilterInput) {
    onUpdateFile(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteFile = /* GraphQL */ `
  subscription OnDeleteFile($filter: ModelSubscriptionFileFilterInput) {
    onDeleteFile(filter: $filter) {
      id
      name
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onCreatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onUpdatePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost(
    $filter: ModelSubscriptionPostFilterInput
    $username: String
  ) {
    onDeletePost(filter: $filter, username: $username) {
      id
      title
      content
      username
      coverImage
      createdAt
      updatedAt
      __typename
    }
  }
`;
