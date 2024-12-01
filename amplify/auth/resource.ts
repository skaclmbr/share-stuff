import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: false,
      required: true
    },
    profilePicture: {
      mutable: true,
      required: false
    },
    phoneNumber: {
      mutable: true,
      required: true
    }
  },
  groups: [
    "ADMINS",
    "MANAGERS",
    "USERS"
  ]
});
