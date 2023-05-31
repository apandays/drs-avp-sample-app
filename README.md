# Transmit Detection & Response <> Amazon-Verified-Permissions Integration Sample App

<img width="1335" alt="Screenshot 2023-05-24 at 20 49 27" src="https://github.com/TransmitSecurity/drs-avp-sample-app/assets/114135804/81dc8f96-1431-49b3-8629-d37ca6b256a7">

## Getting Started

This sample app is written in next.js, covering both client & backend side integrations.

1) run `yarn` or `npm i`
2) make sure you install aws-cli on your machine from this guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
3) run `aws configure` to connect to aws with your access-key
4) In Transmit Security Admin Portal - create a new application to get client credentials as specified [here](https://developer.transmitsecurity.com/guides/user/create_new_application/)
5) In `src/utils/config.ts` file (backend config) - configure your `transmitClientId` & `transmitClientSecret` from the previous step, configure your `policyStoreId` from AWS Verified Permissions and the relevant AWS `region`.
6) In `src/_app.tsx` file, configure your transmit clientId in: `<TSAccountProtectionProvider clientId='YOUR-CLIENT-ID'>`
7) run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

8) Go inside [verified-permissions in aws console](https://console.aws.amazon.com/verifiedpermissions/home), create your policy store and create the two separate policies:


```javascript
// Permitting any user to perform login action to any account
permit (
    principal,
    action in [Action::"login"],
    resource
);
// Permitting specific 'demo-user-id' to perform ‘withdraw’ action in specific resource account, with additional condition on Detection and Response riskScore result
permit (
    principal == User::"demo-user-id",
    action in [Action::"withdraw"],
    Resource == Account::"account-demo-user-id"
) when { context.riskScore <= 66 };
```

9) Go back to the application, press 'Set User', then press Login/Withdraw buttons to trigger actions and see the authorization result.
