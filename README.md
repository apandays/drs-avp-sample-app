# Transmit Detection & Response <> Amazon-Verified-Permissions Integration Sample App

<img width="1335" alt="Screenshot 2023-05-24 at 20 49 27" src="https://github.com/TransmitSecurity/drs-avp-sample-app/assets/114135804/81dc8f96-1431-49b3-8629-d37ca6b256a7">

## Getting Started

1) run `yarn` or `npm i`
2) make sure you install aws-cli on your machine from this guide: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
3) run `aws configure` to connect to aws with your access-key
4) In `src/utils/config.ts` file - configure your transmitClientId & transmitClientSecret provided by your application in Transmit-Security portal (for the backend config)
5) In `src/_app.tsx` file, configure your transmit clientId in: `<TSAccountProtectionProvider clientId='YOUR-CLIENT-ID'>`
6) run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

7) Go inside [verified-permissions in aws console](https://us-east-1.console.aws.amazon.com/verifiedpermissions/), create your policy store and create the two separate policies:


```javascript
// Permitting any user to perform login action
permit (
    principal,
    action in [Action::"login"],
    resource == Account::"login"
);
// Permitting specific 'demo-user-id' to perform withdraw action, with additional condition on drs riskScore detection result
permit (
    principal == User::"demo-user-id",
    action in [Action::"withdraw"],
    resource == Cash::"cash_withdraw"
) when { context.riskScore <= 66 };
```

8) Go back to the application, press 'Set User', then press Login/Withdraw buttons to trigger actions and see the authorization result.
