/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateThing = /* GraphQL */ `
  subscription OnCreateThing(
    $filter: ModelSubscriptionThingFilterInput
    $owner: String
  ) {
    onCreateThing(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const onDeleteThing = /* GraphQL */ `
  subscription OnDeleteThing(
    $filter: ModelSubscriptionThingFilterInput
    $owner: String
  ) {
    onDeleteThing(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
export const onUpdateThing = /* GraphQL */ `
  subscription OnUpdateThing(
    $filter: ModelSubscriptionThingFilterInput
    $owner: String
  ) {
    onUpdateThing(filter: $filter, owner: $owner) {
      content
      createdAt
      id
      owner
      updatedAt
      __typename
    }
  }
`;
