# 8. Troubleshooting {#troubleshooting}

If you run into problems while connecting, signing in, viewing reports, or using AI, go directly to the matching section in this chapter. Starting with the section that is closest to your current situation usually gets you to the answer faster.

### 8.1 Cannot Find the Bed or Connection Fails {#connection-issues}

If the app cannot find your bed, or the connection gets stuck halfway through, check the following in order:

#### 8.1.1 Check the Basic Connection Conditions First {#check-connection-conditions}

1. Make sure the bed is powered on and your phone is close to the bed.
2. If you are connecting a Wi-Fi smart bed, make sure you are using a dedicated 2.4G or 5G band, not a combined multi-band network.
3. Restart the bed search flow and search again.

#### 8.1.2 If Automatic Identification Fails {#auto-identify-failed}

1. If automatic search does not find your bed, switch to Scan QR Code with Camera first.
2. If scanning still does not work, switch to manual device ID entry.
3. If the page has already found your bed but still cannot confirm the bed type, choose the correct bed type manually before continuing.

If it still does not connect, continue to {{jump-link|8.2 What to Do If Permissions Are Not Enabled|troubleshooting|permissions}}.

### 8.2 What to Do If Permissions Are Not Enabled {#permissions}

The first time you connect a bed, the app may ask for Bluetooth, location, and camera permissions.

- Bluetooth permission affects device search and connection.
- Location permission affects nearby device scanning.
- Camera permission affects QR code scanning.

If these permissions are not enabled, the app may not find the bed, may fail to scan the QR code, or may not be able to continue the next connection step. Open your phone's system settings first, grant the missing permissions to the app, then return to the app and try again.

### 8.3 Wi-Fi Smart Bed Connection Fails {#wifi-connection}

If a Wi-Fi smart bed keeps getting stuck at the Wi-Fi or server connection step, work through the items below in order:

1. Confirm that the selected Wi-Fi network is correct and that it is not a combined multi-band network.
2. Confirm that the Wi-Fi password was entered correctly.
3. Keep the phone close to the bed and wait for the app to complete the Bluetooth, Wi-Fi, and server connection steps.
4. If the page does not change for a long time, go back one step, choose the Wi-Fi network again, and try once more.
5. If it still fails, restart the bed search and setup from the beginning.

### 8.4 Home Page Shows Not Connected {#disconnected}

If the Home page shows a disconnected state, the app is not currently connected to your bed. Use the steps below:

1. Confirm that the page shows the disconnected prompt and the Proceed to bed connection entry.
2. Tap Proceed to bed connection.
3. Follow the prompts to reconnect your bed.
4. If you run into search or identification issues again while reconnecting, review {{jump-link|8.1 Cannot Find the Bed or Connection Fails|troubleshooting|connection-issues}} and {{jump-link|8.2 What to Do If Permissions Are Not Enabled|troubleshooting|permissions}}.

![Home page disconnected prompt](/manual/chapter-08/homepage/No%20connection.png)

### 8.5 Home Page Shows No Report {#no-report}

If the Home page shows No Report, there is currently no sleep report available for the selected date. This message only appears for smart beds.

1. Confirm that the Home page is showing No Report.
2. Tap the date and switch to another date to see whether data is available there.
3. Confirm that both the account and the bed are connected normally.
4. If the selected date has just finished a new sleep session, wait for the data to finish generating, then come back and check again.

![Home page No Report prompt](/manual/chapter-08/homepage/No%20report.png)

If data still does not appear, check the bed connection status once more.

### 8.6 AI Content or Real-Time Data Is Temporarily Unavailable {#ai-data-unavailable}

If AI Chat does not show the content you expect, or the Real-Time Data page keeps showing no values, check the items below first:

- There is not enough sleep data for the current date.
- The app is not currently maintaining a normal connection with the bed.
- The related content is still refreshing.

First confirm that the Home page shows the bed as connected and that the selected date has valid data, then open the related page again.

### 8.7 Verification Code Does Not Arrive or Sign-In Cannot Be Completed {#login-issues}

If sign-up, sign-in, or password reset gets stuck, check the following first:

1. Confirm that the email address you entered is correct.
2. Wait for the system email to finish sending, then check your inbox again.
3. If you are trying to sign in to an existing account, make sure you are using the correct sign-in method, such as email, Apple, or Google.
4. If you still cannot continue signing in, tap Forgot Password? on the Sign In page, then follow the email prompts to set a new password.

If you are already signed in to the app and only want to change your password, go directly to {{jump-link|6.4 Change or Reset Your Password|account-security|password}}.
