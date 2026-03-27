# 8. Troubleshooting {#troubleshooting}

This chapter collects the most common issues. If you run into problems while connecting, signing in, viewing reports, or using AI, look for the section that best matches what you are seeing right now. Starting from the closest matching title usually gets you to the right fix faster.

### 8.1 Cannot Find the Bed or Connection Fails {#connection-issues}

If the app cannot find your bed, or the connection process gets stuck, check the following in order:

#### 8.1.1 Check the Basic Connection Conditions First {#check-connection-conditions}

1. Make sure the bed is powered on and your phone is close to the bed.
2. Start the bed search flow again and search one more time.

#### 8.1.2 If Automatic Identification Fails {#auto-identify-failed}

1. If automatic identification fails, switch to Scan QR Code with Camera.
2. If scanning still does not work, switch to manual device ID entry.
3. If the page opens the bed type selection screen, choose the correct bed type manually and continue.

If it still will not connect, continue to {{jump-link|8.2 What to do if permissions are not enabled|troubleshooting|permissions}}.

### 8.2 What to Do If Permissions Are Not Enabled {#permissions}

The first time you connect a bed, the app may ask for Bluetooth, location, and camera permissions.

- Bluetooth permission affects device search and connection.
- Location permission affects nearby device scanning.
- Camera permission affects QR code scanning.

If you tapped "Don't Allow", the app may get stuck while searching, scanning, or identifying the bed. Open your phone's system settings, enable the missing permissions for the app, then return to the app and try again.

### 8.3 Wi-Fi Smart Bed Connection Fails {#wifi-connection}

If a Wi-Fi smart bed gets stuck on the Wi-Fi or server connection step, work through the checks below in order:

1. Confirm that the selected Wi-Fi network is correct.
2. Confirm that the Wi-Fi password was entered correctly.
3. Keep the phone close to the bed and wait for the app to complete the Bluetooth, Wi-Fi, and server connection steps.
4. If the page does not change for a long time, go back, choose the Wi-Fi network again, and retry.
5. If it still fails, restart the bed search and setup process from the beginning.

### 8.4 Home Page Shows Not Connected {#disconnected}

If the Home page shows a disconnected state, the app is not currently connected to the bed. Use the steps below:

1. Confirm that the page shows the disconnected message and the Proceed to bed connection entry.
2. Tap Proceed to bed connection.
3. Follow the prompts to reconnect your bed.
4. If you run into search or identification issues again while reconnecting, review {{jump-link|8.1 Cannot find the bed or connection fails|troubleshooting|connection-issues}} and {{jump-link|8.2 What to do if permissions are not enabled|troubleshooting|permissions}}.

![Home page disconnected prompt](/manual/chapter-08/homepage/No%20connection.png)

### 8.5 Home Page Shows No Report {#no-report}

If the Home page shows No Report, there is currently no sleep report available for the selected date. This message only appears for smart beds.

1. Confirm that the Home page is showing No Report.
2. Tap the date and switch to another date to check whether data is available there.
3. Confirm that both the account and the bed are connected normally.
4. If the selected date just finished a new sleep session, wait for the data to finish generating, then check again.

![Home page No Report prompt](/manual/chapter-08/homepage/No%20report.png)

If data still does not appear, check the bed connection status once more.

### 8.6 AI Content or Real-Time Data Is Temporarily Unavailable {#ai-data-unavailable}

If AI Chat only shows generic prompts, or the real-time data page does not show any values, check these items first:

- There is not enough sleep data for the current date.
- The app is not currently maintaining a normal connection with the bed.
- The related content is still refreshing.

First confirm that the Home page shows the bed as connected and that the selected date has valid data, then open the related page again.

### 8.7 Verification Code Does Not Arrive or Sign-In Cannot Be Completed {#login-issues}

If sign-up, sign-in, or password reset gets stuck, check the following first:

1. Confirm that the email address you entered is correct.
2. Wait for the system email to finish sending, then check your inbox again.
3. If you are trying to sign in to an existing account, make sure you are using the correct sign-in method, such as email, Apple, or Google.
4. If you still cannot sign in, tap Forgot Password? on the Sign In page and follow the email prompts to set a new password.

If you are already signed in and only want to change your password, go directly to {{jump-link|6.4 Change or reset your password|account-security|password}}.
