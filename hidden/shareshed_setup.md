# Setup Info

## Local Authorization CLI - SSO setup
following these instructions [https://docs.amplify.aws/react/start/account-setup/].

CLI profile name = amplify-policy-663873643567

To use this profile, specify the profile name using --profile, as shown:
aws s3 ls --profile default


## Commands for running testing environment

Start development server

    npm run dev

starts sso login procedure

    aws sso login

Deploys database changes to the database sandbox
This will watch for changes to the data model, and update as needed.

    npx ampx sandbox --profile amplify-default

Re-generates data entry forms - note this will delete current forms!

    npx ampx generate forms

# Formatting

* [Amplify Card Example](https://ui.docs.amplify.aws/react/components/card)
* [Amplify UI Library](https://ui.docs.amplify.aws/)