import type { DocSection } from "@/lib/docs-data.types"

export const docsData: DocSection[] = [
  {
    id: "quick-start",
    title: "1. Quick Start",
    description:
      "This chapter is for first-time SleepAssistPro users. If you mainly want to get the app installed, connect your bed, and reach the Home page quickly, start here.",
    items: [
      {
        id: "download-install",
        title: "1.1 Download and Install the App",
        content: `Choose your device platform, then follow the matching steps to download and install the app.`,
        children: [
          {
            id: "download-ios",
            title: "1.1.1 Download on iOS",
            content: `Open the iOS App Store, search for SleepAssist Pro, then download and install it. After the official release, you can also use the official download link to open the download page.

{{download-button|iOS|Download on the App Store|For iPhone and iPad. After downloading, follow the prompts to finish installation.}}`,
          },
          {
            id: "download-android",
            title: "1.1.2 Download on Android",
            content: `Open Google Play, search for SleepAssist Pro, then download and install it. After the official release, you can also use the official download link to open the download page.

{{download-button|Android|Download on Google Play|For Android devices. After downloading, follow the prompts to finish installation.}}`,
          },
        ],
      },
      {
        id: "first-use-steps",
        title: "1.2 What Happens the First Time You Use It",
        content: `The first time you use the app, you will usually go through these steps in order:

1. Download and open the app
2. Find and identify your bed
3. If you are connecting a smart bed, create an account or sign in
4. Finish bed setup and complete your first profile setup
5. Enter the Home page and start using the app

If the app is already installed and you are ready to connect your bed, go straight to {{jump-link|2.2 Start connecting your bed|first-connection|start-connection}}.`,
      },
    ],
  },
  {
    id: "first-connection",
    title: "2. First Connection and Setup",
    description:
      "This chapter is for users connecting a bed for the first time. Follow the steps in order to finish identification, connection, and initial setup.",
    items: [
      {
        id: "preparation",
        title: "2.1 Before You Start",
        content: `Before you begin, review these preparation items. A quick check of power, permissions, network, and device details will make the next steps much easier.

Before you start, check the following:

- Make sure the bed is powered on and ready to connect
- Keep your phone close to the bed so the app can find nearby devices
- Make sure your phone can use Bluetooth, location, and camera permissions normally
- If you are connecting a Wi-Fi smart bed, have the Wi-Fi network name and password ready
- If automatic identification does not work, you may need to scan the QR code on the bed or enter the device ID manually

After everything looks good, continue to {{jump-link|2.2 Start connecting your bed|first-connection|start-connection}}.`,
      },
      {
        id: "start-connection",
        title: "2.2 Start Connecting Your Bed",
        content: `Once the preparation is done, you can start connecting from the welcome screen.

The first time you open the app, you will see the welcome screen. There are two main buttons here: Connect Your Bed and No Bed Yet?

1. If you already have a bed, tap Connect Your Bed.
2. If you do not have a bed yet, tap No Bed Yet? to visit the brand website, learn more, or purchase a bed first.

![Welcome screen](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-welcome.png)

If you have already started the connection flow, continue with {{jump-link|2.3 Find and identify your bed|first-connection|find-identify-bed}}.`,
      },
      {
        id: "find-identify-bed",
        title: "2.3 Find and Identify Your Bed",
        content: `After entering from the welcome screen, first find your bed, then confirm the bed type. Try automatic identification first. If it does not work, scan the QR code or enter the device ID manually. After the bed type is confirmed, continue to {{jump-link|2.4 Continue setup based on bed type|first-connection|bed-type-setup}}.`,
        children: [
          {
            id: "auto-identify",
            title: "2.3.1 Automatic Identification",
            content: `This is the recommended method. Most users can finish identification this way.

1. Tap Connect to start searching for your bed.

![Start searching](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-bed-setup-instructions.png)

2. If the system asks for Bluetooth permission, tap Allow. Without it, the app cannot search for nearby beds.

![Bluetooth permission prompt](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-bluetooth-permission-required.png)

3. Wait while the app searches for and identifies nearby beds automatically.

![Searching](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-loading.png)

4. If a device list appears, select your bed and continue.

![Search results](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-results-multiple-beds.png)

5. If the app finds the device but has not identified the bed type yet, select your device first, then follow the prompts to open the bed type selection page.

![Device found but bed type not identified](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-selection-before-type-identification.png)

6. On the bed type selection page, choose the correct bed type and continue.

![Bed type selection](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-identification-type-selection.png)`,
          },
          {
            id: "qr-identify",
            title: "2.3.2 Scan the QR Code",
            content: `If automatic identification does not find your bed, tap Try another way.

1. On the Unable to Connect page, tap Scan QR Code with Camera.

![Unable to connect page](/manual/chapter-02/onboarding/03-Alternative-Connection/alternative-connection-unable-to-connect.png)

2. If the system asks for camera permission, tap Allow.

![Camera permission prompt](/manual/chapter-02/onboarding/03-Alternative-Connection/qr-scan-camera-permission-required.png)

3. Point the camera at the QR code on the bed and scan it.

![QR scan page](/manual/chapter-02/onboarding/03-Alternative-Connection/qr-scan-overview.png)

4. After the scan succeeds, follow the prompts to continue connecting.

![QR scan success placeholder](/manual/chapter-02/onboarding/03-Alternative-Connection/qr-scan-success-placeholder.svg)`,
          },
          {
            id: "manual-identify",
            title: "2.3.3 Enter the Device ID Manually",
            content: `If scanning is not available, or the QR code cannot be recognized, you can enter the device ID manually instead.

1. On the Unable to Connect page, tap Manually Enter Bluetooth ID, then use the illustration on screen to locate the device ID.

![Unable to connect page](/manual/chapter-02/onboarding/03-Alternative-Connection/alternative-connection-unable-to-connect.png)

2. On the entry screen, type in the device ID shown on your bed.

![Bluetooth ID entry page](/manual/chapter-02/onboarding/03-Alternative-Connection/manual-bluetooth-id-entry.png)

3. After confirming the ID is correct, continue. If the format is wrong, the page will show an error right away. Correct it and try again.

![Input error prompt](/manual/chapter-02/onboarding/03-Alternative-Connection/manual-bluetooth-id-error.png)

4. After identification succeeds, follow the prompts to continue connecting.`,
          },
          {
            id: "skip-connect",
            title: "2.3.4 Do Not Want to Connect a Bed Yet",
            content: `If you do not want to connect a bed right now, you can tap Skip To Sign In first.

![Bed connection instruction page](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-bed-setup-instructions.png)

If this is your first time connecting a bed, or this bed is not linked to your account yet, go back and follow the earlier sections instead.`,
          },
        ],
      },
      {
        id: "bed-type-setup",
        title: "2.4 Continue Setup Based on Bed Type",
        content: `After the bed type is confirmed, the next steps depend on what kind of bed you have. An adjustable bed can go straight to the Home page. A smart bed also needs account registration or sign-in, bed connection, and first-time profile setup.`,
        children: [
          {
            id: "electric-bed-setup",
            title: "2.4.1 Adjustable Bed",
            content: `After an adjustable bed is identified, the app will open the Home page directly. Adjustable beds do not require account sign-in, so Chapter 2 is almost complete at this point. Next, you can go straight to Chapter 3 and read {{jump-link|Adjustable Bed Home|using-app|homepage-electric}} and {{jump-link|Remote|using-app|remote}}.

![Adjustable bed Home page](/manual/chapter-02/homepage/electric-bed-homepage.png)`,
          },
          {
            id: "smart-bed-setup",
            title: "2.4.2 Smart Bed",
            content: `After a smart bed is identified, first-time users should continue with account registration, bed connection, and first-time profile setup. The next step is {{jump-link|2.5 Create your smart bed account|first-connection|register-account}}.`,
          },
        ],
      },
      {
        id: "register-account",
        title: "2.5 Create Your Smart Bed Account",
        content: `This section is for smart bed users who are using the app for the first time and do not have an account yet. You can sign up with email, Apple, or Google. After sign-up and verification are complete, continue to {{jump-link|2.6 Set up your smart bed|first-connection|setup-smart-bed}}.`,
        children: [
          {
            id: "register-email",
            title: "2.5.1 Sign Up with Email",
            content: `If you want to sign up with email, complete the process directly on the Sign Up page.

1. Enter your email address.

![Empty sign-up page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-empty-form.png)

2. Create a password, then enter it again to confirm.

![Email and password entry page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-email-entered.png)

3. Select your region.

![Region selection page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-region-selection.png)

4. Check the required agreement boxes.

![Agreement checked state](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-agreement-checked.png)

5. Tap the sign-up button.

![Submit sign-up page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-submit-clean-shot.png)

6. Check the verification code sent to your email, enter the code, and finish email verification.

![Email verification page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/email-verification-clean-shot.png)`,
          },
          {
            id: "register-apple",
            title: "2.5.2 Sign Up with Apple",
            content: `If your phone is already signed in with an Apple account, you can use the Apple option to continue registration.

1. On the sign-up page, tap Apple at the bottom.

![Apple entry](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-submit-clean-shot.png)

2. Complete Apple authorization on the system screen.

![Apple authorization page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-apple-authorization.png)

3. After the account is created, return to the app and continue the remaining setup.`,
          },
          {
            id: "register-google",
            title: "2.5.3 Sign Up with Google",
            content: `If your phone is already signed in with a Google account, you can use the Google option to continue registration.

1. On the sign-up page, tap Google at the bottom.

![Sign-up page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-empty-form.png)

2. Complete Google authorization on the system screen.

![Google authorization page](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-in-google-authorization-placeholder.svg)

3. After the account is created, return to the app and continue the remaining setup.`,
          },
        ],
      },
      {
        id: "setup-smart-bed",
        title: "2.6 Set Up Your Smart Bed",
        content: `Once your account is ready, connect the bed. Bluetooth smart beds and Wi-Fi smart beds have different setup steps. After the bed is connected, you also need to confirm whether Sleep Data Tracking is turned on. When this section is done, continue to {{jump-link|2.7 Complete your first profile setup|first-connection|first-profile}}.`,
        children: [
          {
            id: "setup-bt-bed",
            title: "2.6.1 Set Up a Bluetooth Smart Bed",
            content: `If the app identifies your bed as a Bluetooth smart bed, the process is a little simpler.

1. Wait for the app to finish the Bluetooth connection.

![Bluetooth connection stage](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-stage-bluetooth.png)

2. Wait for the app to finish bed setup.

![Bed setup stage](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-stage-bed-setup.png)

3. After the connection succeeds, the app will open Sleep Data Tracking settings.

![Bluetooth connection complete](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-complete.png)`,
          },
          {
            id: "setup-wifi-bed",
            title: "2.6.2 Set Up a Wi-Fi Smart Bed",
            content: `If the app identifies your bed as a Wi-Fi smart bed, you also need to connect it to your home Wi-Fi.

1. Select an available Wi-Fi network.

![Wi-Fi selection page](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-network-selection.png)

2. Enter the Wi-Fi password and continue.

![Wi-Fi password entry page](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-password-entry-empty.png)

3. Wait for the app to finish the Bluetooth connection.

![Bluetooth connection stage](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-bluetooth.png)

4. Wait for the app to finish the Wi-Fi connection.

![Wi-Fi connection stage](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-wifi.png)

5. Wait for the app to finish the server connection.

![Server connection stage](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-server.png)

6. After the connection succeeds, the app will open Sleep Data Tracking settings.

![Wi-Fi connection complete](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-complete.png)`,
          },
          {
            id: "setup-sleep-tracking",
            title: "2.6.3 Turn On Sleep Data Tracking",
            content: `After a Bluetooth or Wi-Fi smart bed is connected, the page will show Sleep Data Tracking.

1. Read the instructions on the page first.

![Sleep Data Tracking overview](/manual/chapter-02/onboarding/06-Sleep-Data-Tracking/sleep-data-tracking-overview.png)

2. Choose whether to turn Sleep Data Tracking on. If you turn it off, the app will stop tracking your sleep data and it will not generate sleep reports. You can turn it back on later in Settings if needed.

![Turn-off confirmation prompt](/manual/chapter-02/onboarding/06-Sleep-Data-Tracking/sleep-data-tracking-turn-off-confirmation.png)

3. Tap Continue to move on to your first profile setup.

![Nickname entry page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-empty.png)`,
          },
        ],
      },
      {
        id: "first-profile",
        title: "2.7 Complete Your First Profile Setup",
        content: `After the bed is connected and Sleep Data Tracking is confirmed, you still need to complete your first-time profile information. This includes your nickname, basic profile, sleep goals, and personal preferences. If your bed supports split-zone features, you will also choose your bed side. After that, you can enter the Home page and continue with {{jump-link|3.2 Smart Bed Home|using-app|homepage-smart}}.`,
        children: [
          {
            id: "profile-no-zone",
            title: "2.7.1 Smart Bed Without Split-Zone Features",
            content: `1. Enter your nickname.

![Nickname entry page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-filled.png)

2. Read the instructions shown on the page.

![Profile setup introduction](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-setup-introduction.png)

3. Open the basic information page and fill in details such as gender, height, weight, mattress thickness, birthday, and time format.

![Basic information form](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-profile-details-form.png)

4. After the basic information is complete, continue to the Sleep Goal page.

![Sleep Goal page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-goals-overview.png)

5. Continue to the personal tags page and choose the tags that fit you. You can also tap Skip to do this later.

![Personal tags page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-preferences-selection-state.png)

6. When you are done, the app opens the Home page.`,
          },
          {
            id: "profile-zone",
            title: "2.7.2 Smart Bed With Split-Zone Features",
            content: `1. Enter your nickname.

![Nickname entry page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-filled.png)

2. Read the instructions shown on the page.

![Profile setup introduction](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-setup-introduction.png)

3. Choose your bed side first.

![Bed side selection page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/profile-bed-side-selection.png)

4. Open the basic information page and confirm the unit settings first.

![Unit selection page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-profile-units-selection.png)

If you change units or other key fields, the system may briefly save the new settings.

![Unit configuration page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-profile-units-configuring.png)

5. After the basic information is complete, continue with Sleep Goal and choose the sleep issue you want to improve first.

![Sleep Goal priority page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-goals-priority-selection.png)

6. On the final personal tags page, confirm everything and tap Finish to enter the Home page.

![Final page](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-preferences-final-state.png)

Once you see the Home page, the first connection and basic setup are complete.

![Settings Home page](/manual/chapter-02/settings/sleeper-tags-overview.png)`,
          },
        ],
      },
    ],
  },
  {
    id: "using-app",
    title: "3. Using the App",
    description:
      "This chapter is for users who have already connected their bed and finished the first setup. Start here to learn the Home page, reports, real-time data, Remote, and Sleep Schedule.",
    items: [
      {
        id: "login",
        title: "3.1 Sign In",
        content: `This section is mainly for smart bed users. Adjustable bed users usually do not need to sign in before using the app.`,
        children: [
          {
            id: "login-email",
            title: "3.1.1 Sign In with Email",
            content: `1. Open the Sign In page.
2. Enter your registered email and password.
3. Tap Sign In.

![Sign In page](/manual/chapter-03/login/Pasted%20image%2020260325161252.png)

4. After sign-in succeeds, the Home page opens.

![Home page](/manual/chapter-03/homepage/Homepage-Full.png)`,
          },
          {
            id: "login-apple",
            title: "3.1.2 Sign In with Apple",
            content: `If you signed up with Apple, tap the matching option on the Sign In page and complete authorization on the system screen.

1. Tap Apple at the bottom of the Sign In page.

![Apple sign-in entry](/manual/chapter-03/login/Pasted%20image%2020260325161306.png)

2. Complete Apple authorization on the system screen.

![Apple authorization page](/manual/chapter-03/login/sign-up-apple-authorization.png)`,
          },
          {
            id: "login-google",
            title: "3.1.3 Sign In with Google",
            content: `If you signed up with Google, tap the matching option on the Sign In page and complete authorization on the system screen.

1. Tap Google at the bottom of the Sign In page.

![Google sign-in entry](/manual/chapter-03/login/Pasted%20image%2020260325161315.png)

2. Complete Google authorization on the system screen.

![Google authorization page](/manual/chapter-03/login/sign-in-google-authorization-placeholder.svg)`,
          },
        ],
      },
      {
        id: "homepage-smart",
        title: "3.2 Smart Bed Home",
        content: `If you are connected to a smart bed, the Home page usually shows entries such as Sleep Report, Your Highlights, Quick Actions, and Settings.

Use the guide below to get familiar with the Home page:`,
        children: [
          {
            id: "homepage-score",
            title: "3.2.1 Sleep Score",
            content: `1. If the selected date already has sleep data, the top area shows your sleep score and a short summary.

![Smart bed Home page](/manual/chapter-03/homepage/Homepage-Full.png)

2. If you want the latest data, pull down to refresh.

![Pull to refresh](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.14.12@2x.png)

3. If you want to view another date, tap the date and choose a different one from the pop-up calendar.

{{image-row|Date entry|/manual/chapter-03/homepage/CleanShot%202026-03-26%20at%2008.14.44@2x%201.png|Date picker|/manual/chapter-03/homepage/Calendar.png}}`,
          },
          {
            id: "homepage-highlights",
            title: "3.2.2 Your Highlights",
            content: `4. In Your Highlights, you can quickly view key sleep metric cards and swipe left or right to switch between cards.

![Highlights cards](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x.png)

5. If you want to change what is shown, tap Edit on the right.

![Highlights edit entry](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x%201.png)

6. The Home page shows the top three cards. Drag them to change the order, then tap the button in the upper-right corner to save.

![Highlights order edit](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.17.30@2x.png)`,
          },
          {
            id: "homepage-quick-actions",
            title: "3.2.3 Quick Actions",
            content: `7. In Quick Actions, you can open common features such as Real-Time Data, Sleep Schedule, and other shortcuts.

![Quick Actions area](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x%202.png)

8. If you want to change the order or content, tap Edit on the right.

![Quick Actions edit entry](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x%203.png)

9. The Home page shows the top four actions. Drag them to change the order, then tap the button in the upper-right corner to save.

![Quick Actions order edit](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.20.48@2x.png)`,
          },
          {
            id: "homepage-other",
            title: "3.2.4 Other Items on the Home Page",
            content: `10. If you want a more detailed analysis, tap the sleep score area or pull it upward to open Sleep Report.

![Sleep Report entry](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x%204.png)

11. If you need to change account, notification, device, or other settings, tap Settings.

![Settings entry](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.16.40@2x%205.png)`,
          },
        ],
      },
      {
        id: "homepage-electric",
        title: "3.3 Adjustable Bed Home",
        content: `If you are connected to an adjustable bed, the Home page focuses more on quick controls. It usually does not include account features, sleep reports, real-time data, or AI Chat. Its main purpose is to help you control the bed quickly and open common tools.

Here is how to use it:

1. Tap a feature inside Quick Actions to control the bed directly. You can also tap edit to change which Quick Actions appear.

![Adjustable bed Quick Actions](/manual/chapter-03/homepage/CleanShot%202026-03-25%20at%2016.24.14@2x.png)

2. If you want to control the bed remotely, tap the Remote button in the bottom navigation bar.
3. To open bed settings, tap the settings button in the upper-right corner.`,
      },
      {
        id: "sleep-report",
        title: "3.4 View Sleep Reports and History",
        content: `This section is for smart bed users. If your Home page already shows a sleep score or summary, you can open Sleep Report to view today's report, then continue into detailed metrics and trends.`,
        children: [
          {
            id: "view-sleep-report",
            title: "3.4.1 View a Sleep Report",
            content: `1. On the Home page, tap the sleep score area, or pull down to open Sleep Report.

![Sleep Report entry](/manual/chapter-03/sleep-report/CleanShot%202026-03-25%20at%2016.16.40@2x%206.png)

2. On the report page, first review today's sleep results and each metric. The current report includes 3 categories and 9 metrics in total.

![Report overview](/manual/chapter-03/sleep-report/CleanShot%202026-03-25%20at%2016.28.08@2x.png)

3. If you want to view another date, tap the current date first.

![Report date entry](/manual/chapter-03/sleep-report/CleanShot%202026-03-26%20at%2008.22.40@2x%201.png)

4. Choose the date you want in the pop-up calendar to switch to the matching historical sleep report.

![Report date picker](/manual/chapter-03/sleep-report/CleanShot%202026-03-25%20at%2016.28.46@2x.png)`,
          },
          {
            id: "view-metric-detail",
            title: "3.4.2 View Metric Details and Trends",
            content: `1. On the Sleep Report page, tap any metric card to open its detail page.

![Metric detail entry](/manual/chapter-03/sleep-report/CleanShot%202026-03-26%20at%2008.22.40@2x%203.png)

2. On the metric detail page, review more detailed explanations for that metric. If you want to ask more questions, tap Ask me in the daily view.

![Metric detail page](/manual/chapter-03/sleep-report/CleanShot%202026-03-26%20at%2008.29.59@2x.png)

3. You can also switch between weekly, monthly, and yearly trends for the metric.

![Metric trend switcher](/manual/chapter-03/sleep-report/CleanShot%202026-03-26%20at%2008.30.34@2x.png)`,
          },
        ],
      },
      {
        id: "realtime-data",
        title: "3.5 View Real-Time Data",
        content: `This section is for smart bed users. Real-Time Data shows the live body data currently collected by the bed. This feature only appears inside Quick Actions on the smart bed Home page.

1. On the Home page, tap Real-Time Data in Quick Actions.

![Real-Time Data entry](/manual/chapter-03/realtime-data/Real-Time%20Data.png)

2. Review the current values in the live metrics area. The current version mainly shows Heart Rate, Respiratory Rate, and Sleep Movement.

![Connected real-time data](/manual/chapter-03/realtime-data/RealTimeData-DoubleSize-Connected.png)

3. If your bed supports dual-sleeper mode, the page shows data for both Sleeper Left and Sleeper Right.

![Dual-sleeper real-time data](/manual/chapter-03/realtime-data/CleanShot%202026-03-26%20at%2008.36.51@2x.png)

4. If the bed is not connected, real-time values will not appear. Return to the Home page, confirm the connection status, then open this page again.

![Disconnected real-time data](/manual/chapter-03/realtime-data/RealTimeData-Disconnected.png)`,
      },
      {
        id: "remote",
        title: "3.6 Use the Remote",
        content: `The Remote page is mainly for controlling common bed functions directly, such as bed position, massage, preset modes, and lighting. Different bed models support different features, so the page automatically shows the buttons available for the bed you are currently connected to.

1. Open the Remote page from the bottom navigation bar.

![Remote entry](/manual/chapter-03/remote/CleanShot%202026-03-26%20at%2008.40.26@2x.png)

2. If the bed is connected, use the buttons shown on the page. Available controls may vary by bed model.

{{image-row|Bluetooth bed|/manual/chapter-03/remote/CleanShot%202026-03-26%20at%2008.41.36@2x.png|Wi-Fi bed|/manual/chapter-03/remote/CleanShot%202026-03-26%20at%2008.42.09@2x.png}}

3. If the page shows a disconnected state, return to the Home page, reconnect the bed, then come back to Remote.`,
      },
      {
        id: "sleep-schedule",
        title: "3.7 Use Sleep Schedule",
        content: `This section is for smart bed users. From Quick Actions, you can open Sleep Schedule to set a repeating weekly schedule, or create a one-time schedule for tomorrow only.

If a weekly schedule and a tomorrow-only schedule both exist, the system will prioritize the tomorrow-only schedule. A tomorrow-only schedule runs once, and later dates go back to following the weekly schedule.`,
        children: [
          {
            id: "open-sleep-schedule",
            title: "3.7.1 Open Sleep Schedule",
            content: `Open Sleep Schedule from Quick Actions.

![Sleep Schedule entry](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.43.11@2x.png)`,
          },
          {
            id: "weekly-sleep-schedule",
            title: "3.7.2 Use a Weekly Sleep Schedule",
            content: `1. On the Sleep Schedule page, review the Active Schedule and Weekly Schedule sections.

![Weekly schedule overview](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.44.12@2x%201.png)

2. Tap Add New Schedule, then set the schedule for each day of the week. You can give weekdays and weekends different routines, or only set some days.

![Add weekly schedule](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.46.07@2x%201.png)

3. On the edit page, set Rest Actions and Rise Actions such as bed position, massage, or lighting, then save. The bed will repeat those actions at your chosen bedtime and wake-up time according to the weekly schedule.

![Weekly schedule action editor](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.46.07@2x%202.png)`,
          },
          {
            id: "tomorrow-sleep-schedule",
            title: "3.7.3 Set a Temporary Schedule for Tomorrow Only",
            content: `1. If you only want to change tomorrow's routine once, tap Add for Tomorrow Only or Change for Tomorrow Only.

![Tomorrow-only schedule entry](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.44.12@2x%202.png)

2. On the edit page, set the Rest Actions and Rise Actions for tomorrow only. After you save, the system runs that temporary schedule only tomorrow. If tomorrow has both a weekly schedule and a temporary schedule, the temporary schedule takes priority.

![Tomorrow-only schedule editor](/manual/chapter-03/sleep-schedule/CleanShot%202026-03-26%20at%2008.45.14@2x.png)`,
          },
        ],
      },
    ],
  },
  {
    id: "ai-chat",
    title: "4. AI Chat",
    description:
      "This chapter is for smart bed users. AI Chat is the text-based assistant inside the app. It can explain bed features, show you how features work, help with basic issues, and open the right page when needed.",
    items: [
      {
        id: "ai-capabilities",
        title: "4.1 What AI Can Help With Right Now",
        content: `You can think of AI Chat as an on-demand smart bed assistant. In the current version, it is especially useful for these types of questions:

- Asking what a bed feature means, such as a mode, preset, or sensing feature
- Asking how to use something, such as how to unlock, set up, or find a feature
- Handling basic troubleshooting, such as when the bed does not move or the remote does not respond
- Recognizing clear control requests and guiding you to the correct control entry
- Explaining basic sleep data sources when you have questions about your sleep data, and guiding you to submit feedback when needed

If your question is outside the current support range, AI Chat may guide you to human support or a feedback form.`,
      },
      {
        id: "enter-ai-chat",
        title: "4.2 Open AI Chat",
        content: `AI entry points appear on the Home page and on metric detail pages.

1. On the Home page, tap Ask me at the bottom.

![Home page Ask me entry](/manual/chapter-04/ai-chat/ai-chat-entry-homepage-ask-me.png)

2. In the daily view of a metric detail page, tap Ask me.

![Metric detail Ask me entry](/manual/chapter-04/ai-chat/ai-chat-entry-metric-detail-ask-me.png)

3. After the page opens, review the suggested questions or any existing recommendations.`,
      },
      {
        id: "ai-suggestions",
        title: "4.3 Review AI Suggestions and Keep Asking",
        content: `After you open AI Chat, start by looking at the suggestions provided by the system, then decide whether you want to keep asking questions. When you ask, it helps to say clearly what you want to do or what problem you are seeing.

1. Read the AI suggestions currently shown on the page.
2. If recommended questions are provided, tap one to view the reply.
3. If you want to keep asking, type your question directly.
4. If you are not sure how to describe it, use the feature name, the issue you are seeing, or the action you want to perform.

![AI suggestions and input page](/manual/chapter-04/ai-chat/ai-chat-suggestions-overview.png)

You can ask questions like these:

- What is Auto Anti-Snore Intervention?
- How do I unlock Child Lock?
- Why does my base not respond to my remote?
- Go to zero gravity.
- Why is my sleep duration incorrect?`,
      },
      {
        id: "ai-help-process",
        title: "4.4 How AI Helps You",
        content: `AI Chat responds differently depending on what you ask. In general, you will see results like these:

- If you ask how to do something, AI gives you step-by-step guidance.

![AI how-to example](/manual/chapter-04/ai-chat/ai-chat-help-how-to.png)

- If you ask to view a metric or related information, AI may show the matching chart data.

![AI chart data example](/manual/chapter-04/ai-chat/ai-chat-help-data-chart.png)

- If you express a clear control intent, such as wanting the bed to move into a preset, AI may show a matching feature card and guide you to the Remote page.

![AI feature card example](/manual/chapter-04/ai-chat/ai-chat-help-remote-card.png)`,
      },
      {
        id: "human-support",
        title: "4.5 When to Use Human Support",
        content: `AI Chat can help with common questions, but it is not a full after-sales diagnostic tool. If the problem is not solved, the page may continue by offering a human support entry or a feedback form.

Human support or a feedback form is usually a better fit when:

- The issue is still not solved after following AI's basic troubleshooting steps
- The bed keeps failing to connect, does not move, or keeps showing the same abnormal behavior
- You need to submit a specific sleep data issue for deeper review or calibration`,
      },
      {
        id: "ai-issues",
        title: "4.6 If Something Does Not Look Right",
        content: `If AI Chat only shows generic prompts, or the reply does not seem to match your current situation, check the following first:

- Make sure you are already connected to a smart bed
- Make sure the current page has available data
- Make sure your question clearly mentions the feature name, the issue, or the action you want

If AI Chat still does not give a useful answer, first go to {{jump-link|8.6 AI content or real-time data is temporarily unavailable|troubleshooting|ai-data-unavailable}}, then decide whether to switch to human support or a feedback form.`,
      },
    ],
  },
  {
    id: "system-settings",
    title: "5. Settings",
    description:
      "This chapter is for users who are already on the Home page and want to fine-tune the experience. Here you can manage your bed, adjust sleep preferences, sync health data, control notifications, and rename the AI assistant.\n\nIf you use an adjustable bed, you may not see the full Settings page.",
    items: [
      {
        id: "open-settings",
        title: "5.1 Open Settings",
        content: `This section helps you open Settings and find the item you want to change. As long as you are still signed in, the Settings page can usually be opened even if the bed is temporarily disconnected.

1. Open the Home page, then tap Settings.

![Settings entry](/manual/chapter-05/open-settings/settings-entry.png)

2. After entering Settings, choose the item that matches what you want to manage. You will usually see options such as Bed Settings, Sleep Goal, Sleeper Tags, Account & Security, Apple Health Integration, Push Notifications, AI Settings, Bed Diagnostic, Help Center, Contact Us, and Log Out.

![Settings Home page](/manual/chapter-05/open-settings/settings-home-overview.png)`,
      },
      {
        id: "bed-settings",
        title: "5.2 Manage Bed Settings",
        content: `This section introduces the most commonly used items in Bed Settings. Here you can adjust bed side, anti-snore sensitivity, and sleep data tracking, or disconnect the current bed and check for hardware updates.`,
        children: [
          {
            id: "open-bed-settings",
            title: "5.2.1 Open Bed Settings",
            content: `This page is where you manage key settings for the smart bed you are currently using. Start by confirming which bed you are managing, then decide whether you need to change the bed side, anti-snore sensitivity, data tracking, disconnection, or updates.

1. On the Settings page, tap Bed Settings.

![Bed Settings entry](/manual/chapter-05/bed-settings/bed-settings-entry.png)

2. After opening Bed Settings, confirm which item you want to change. This page usually shows Bed Side, Anti-Snore Sensitivity, Disconnect Bed, Sleep Data Tracking, and Hardware Update. The Bed ID is also shown near the bottom so you can verify which bed you are managing.

![Bed Settings overview](/manual/chapter-05/bed-settings/bed-settings-overview.png)`,
          },
          {
            id: "bed-side-settings",
            title: "5.2.2 Change Bed Side",
            content: `If the side you sleep on does not match the current setting, change it here. Once the correct side is selected, side-related settings and data will line up more clearly with your own use.

1. Tap Bed Side.
2. In the Bed Side panel, choose Center, Left, or Right.
3. Tap Confirm to save.

![Bed side settings](/manual/chapter-05/bed-settings/bed-settings-bed-side-drawer.png)`,
          },
          {
            id: "anti-snore-settings",
            title: "5.2.3 Adjust Anti-Snore Sensitivity",
            content: `This setting controls whether anti-snore detection is on, and how sensitive it is. If you want the bed to react more easily when snoring is detected, choose a higher sensitivity. If you do not want to use this feature, you can turn detection off.

1. Tap Anti-Snore Sensitivity.
2. Use the Detect Snoring switch to turn detection on or off.
3. If it stays on, choose Low, Medium, or High.

![Anti-snore sensitivity](/manual/chapter-05/bed-settings/bed-settings-anti-snore-sensitivity.png)`,
          },
          {
            id: "sleep-tracking-settings",
            title: "5.2.4 Control Sleep Data Tracking",
            content: `This setting decides whether new sleep data from the bed continues syncing to the app. If you turn it off, you can still view past data, but no new sleep data will continue to come in.

1. Stay on the Bed Settings page.
2. Turn the Sleep Data Tracking switch on or off directly.

When it is off, the app stops recording new sleep data from the bed. When you turn it back on, only future data will continue syncing.`,
          },
          {
            id: "disconnect-bed",
            title: "5.2.5 Disconnect the Current Bed",
            content: `If you are no longer using the current bed, or want to connect a different one instead, you can disconnect it here. After disconnecting, the current account can usually still view historical data, but it will not receive new bed data until the bed is connected again.

1. Tap Disconnect Bed.
2. Read the confirmation message again in the dialog.
3. If everything looks correct, tap Disconnect.

![Disconnect bed confirmation dialog](/manual/chapter-05/bed-settings/bed-settings-disconnect-dialog.png)`,
          },
          {
            id: "hardware-update",
            title: "5.2.6 Install a Hardware Update",
            content: `If you see a New label here, your bed has a newer hardware version available. Updates usually fix issues or add capabilities. After the update starts, stay near the bed until the progress is complete.

1. Tap Hardware Update.

![Hardware Update entry](/manual/chapter-05/bed-settings/bed-settings-hardware-update-entry.png)

2. In the Bed Update dialog, tap Update Now.

3. Follow the prompts, stay near the bed, and wait for the update to finish.

![Hardware update progress](/manual/chapter-05/bed-settings/bed-settings-hardware-update-progress.png)

4. If the update fails, tap Try Again to restart it, or tap Later to deal with it another time.

![Hardware update failed dialog](/manual/chapter-05/bed-settings/bed-settings-hardware-update-failed-dialog.png)`,
          },
        ],
      },
      {
        id: "sleep-goal",
        title: "5.3 Sleep Goal",
        content: `This section helps you set Sleep Goal so the app better fits your routine and the area you want to improve most. The main items here are target sleep duration, sleep type, and improvement priority.`,
        children: [
          {
            id: "sleep-goal-duration",
            title: "5.3.1 Set Your Target Sleep Duration",
            content: `This setting lets you choose how long you want to sleep each night. Once it is set, sleep schedule features can align more naturally with your goal.

1. On the Settings page, tap Sleep Goal.
2. In Sleep Goal, choose how long you want to sleep each night. When adjusting the target sleep duration, you will usually see a time picker like the one below.

![Target sleep duration](/manual/chapter-05/sleep-goal/sleep-goals-duration-picker.png)`,
          },
          {
            id: "sleep-goal-type",
            title: "5.3.2 Set Sleep Type and Improvement Priority",
            content: `If you want the app to understand your routine and your biggest current concern better, you can add your sleep type and improvement priority here. These are personal settings, so you do not need to overthink them. Start by picking the options that feel closest to you.

1. Choose the sleep type that fits you best, such as Lion, Bear, or Wolf.
2. Choose the improvement goal you want to prioritize right now.
3. Tap Confirm to save.

![Sleep Goal overview](/manual/chapter-05/sleep-goal/sleep-goals-overview.png)`,
          },
        ],
      },
      {
        id: "sleeper-tags",
        title: "5.4 Sleeper Tags",
        content: `This page is for adding your sleep habits, lifestyle, and personal preferences. The more closely your selections match your real situation, the more relevant later content and recommendations will usually feel.

1. On the Settings page, tap Sleeper Tags.
2. Choose the tags that match you, such as lifestyle habits, sleep challenges, or personal preferences.
3. Tap Confirm to save.

![Sleeper Tags](/manual/chapter-05/sleeper-tags/sleeper-tags-overview.png)`,
      },
      {
        id: "apple-health",
        title: "5.5 Apple Health Integration",
        content: `If you use an iPhone and want to sync related data from SleepAssistPro to Apple Health, you can turn the integration on here. Turning it on opens Apple's authorization flow. If you turn it off later, future syncing stops, but previously written history is not deleted.

1. On the Settings page, tap Apple Health Integration.

![Apple Health Integration entry](/manual/chapter-05/apple-health/apple-health-integration-disabled-state.png)

2. On the Apple Health authorization page, enable the permissions you want and choose Allow.

![Apple Health authorization page](/manual/chapter-05/apple-health/apple-health-sharing-permissions.png)

3. After it is enabled successfully, the page shows the active state. If you later turn the switch off, the system stops writing new health data, but history already written to Apple Health stays there.

![Apple Health Integration enabled](/manual/chapter-05/apple-health/apple-health-enabled-state.png)`,
      },
      {
        id: "push-notifications",
        title: "5.6 Push Notifications",
        content: `This section helps you adjust your notification settings in one place, including morning reminders, evening reminders, sync reminders, and email sleep reports. You can decide which reminders fit your routine and which ones you do not need.`,
        children: [
          {
            id: "push-notification-permission",
            title: "5.6.1 Turn On Notification Permission",
            content: `If overall notification permission is not enabled, morning reminders, evening reminders, and sync reminders will not be delivered correctly. It is best to fix this first before adjusting the other notification items.

1. On the Settings page, tap Push Notifications.
2. Turn on Receive Push Notifications first. If the system shows a notification permission prompt, allow it. If no prompt appears, open your phone's system settings and enable notifications for the app there.

![Push Notifications permission](/manual/chapter-05/push-notifications/push-notifications-permission.png)`,
          },
          {
            id: "morning-notifications",
            title: "5.6.2 Set Morning Reminders",
            content: `This option is useful if you want a reminder at a fixed time in the morning to review your sleep report. You can decide whether to enable it and choose a reminder time that fits you best.

1. If you want a morning reminder to review your sleep report, turn Morning Notifications on or off as needed.
2. Choose the reminder time in Morning Notifications Time.

![Morning Notifications](/manual/chapter-05/push-notifications/push-notifications-morning.png)`,
          },
          {
            id: "evening-notifications",
            title: "5.6.3 Set Evening Reminders",
            content: `If you want a reminder at a fixed time in the evening to get ready for sleep, set it here. This reminder is especially useful if you are trying to build a more consistent routine over time.

1. If you want an evening reminder, turn Evening Notifications on or off as needed.
2. Choose the reminder time in Evening Notifications Time.

![Evening Notifications](/manual/chapter-05/push-notifications/push-notifications-evening.png)`,
          },
          {
            id: "sync-reminders",
            title: "5.6.4 Set Sync Reminders",
            content: `If you are worried that the bed may stop syncing data to the app for several days, turn this option on. That way you can catch long sync gaps sooner.

1. If you want a reminder when the bed has not synced data for several days, turn on Sleep Assist Sync Reminders.

![Sleep Assist Sync Reminders](/manual/chapter-05/push-notifications/push-notifications-sync-reminders.png)`,
          },
          {
            id: "email-reports",
            title: "5.6.5 Set Email Reports",
            content: `If you prefer receiving the sleep report entry by email, turn this option on. After the frequency is set, the system sends the report to your email on the schedule you choose.

1. If you want to receive a web sleep report entry by email, turn on Sleep Report via Email.
2. Choose the frequency in Notification frequency. The system will send your sleep report to your email based on the option you choose.

![Sleep Report via Email](/manual/chapter-05/push-notifications/push-notifications-email-report.png)`,
          },
        ],
      },
      {
        id: "ai-settings",
        title: "5.7 AI Settings",
        content: `This page lets you change the display name of the AI assistant. If you want the assistant name shown in AI Chat to feel more natural to you, update it here.

1. On the Settings page, tap AI Settings.
2. Tap Sleep Assistant's Name.
3. Enter the name you want to use. After opening the name edit page, you will usually see an input screen like the one below.

![AI name edit page](/manual/chapter-05/ai-settings/ai-settings-edit-name.png)

4. Save and go back as instructed on the page. After the change is complete, AI Chat will show the new assistant name.

![AI Settings overview](/manual/chapter-05/ai-settings/ai-settings-overview.png)`,
      },
    ],
  },
  {
    id: "account-security",
    title: "6. Account and Security",
    description:
      "This chapter covers common account actions after you sign in. If you want to change your nickname, units, height, weight, or language settings, manage sleep data and sharing, turn on FaceID sign-in, change or reset your password, switch accounts, or sign out, you can do all of that here. If you are considering deleting your account, read this chapter first so you know what will happen before you continue.",
    items: [
      {
        id: "personal-info",
        title: "6.1 Edit Personal Information",
        content: `If you want to update your nickname, units, height, weight, or language settings, first open Account & Security, then open Personal Information. These settings affect how your profile appears in the app and how some data is displayed.`,
        children: [
          {
            id: "open-account-security-personal",
            title: "6.1.1 Open Account & Security",
            content: `1. Open Settings first, then tap Account & Security.

{{image-row|Settings|/manual/chapter-06/settings-home/settings-home-overview.png|Account & Security|/manual/chapter-06/settings-home/AccountSecurity.png}}`,
          },
          {
            id: "edit-personal-information",
            title: "6.1.2 Edit Your Personal Information",
            content: `1. Tap Personal Information to open the personal information page.

![Personal Information page](/manual/chapter-06/account-security/personal-information-form.png)

2. Update the information you want to change.
3. Tap Confirm at the bottom of the page.

If you want to change both units and body measurements, it is best to adjust Units first, then fill in the related fields. That makes height, weight, and similar values easier to check.`,
          },
          {
            id: "edit-language",
            title: "6.1.3 Change the Language",
            content: `If you only want to switch the app language, you also do that on the Personal Information page.

1. Tap Personal Information to open the personal information page.

![Personal Information page](/manual/chapter-06/account-security/personal-information-form.png)

2. Find Language.
3. Choose the language you want to use.
4. Tap Confirm at the bottom of the page.`,
          },
        ],
      },
      {
        id: "data-sharing",
        title: "6.2 Manage Sleep Data and Sharing",
        content: `If you want to delete sleep data, download data, or review shared content, first open Account & Security, then open Data & Sharing Settings. This page is where you manage your own sleep records and the reports others have shared with you.`,
        children: [
          {
            id: "open-account-security-data-sharing",
            title: "6.2.1 Open Account & Security",
            content: `1. Open Settings first, then tap Account & Security.

{{image-row|Settings|/manual/chapter-06/settings-home/settings-home-overview.png|Account & Security|/manual/chapter-06/settings-home/AccountSecurity.png}}`,
          },
          {
            id: "open-data-sharing-settings",
            title: "6.2.2 Open Data & Sharing Settings",
            content: `1. On the Account & Security page, tap Data & Sharing Settings to open the data and sharing settings page.

![Data & Sharing Settings page](/manual/chapter-06/account-security/data-sharing-settings-overview.png)`,
          },
          {
            id: "delete-sleep-data",
            title: "6.2.3 Delete Sleep Data",
            content: `If you only want to delete sleep records from specific dates, use Delete Sleep Data.

1. Tap Data & Sharing Settings.
2. Tap Delete Sleep Data. The page first lets you choose which dates to delete.

![Delete sleep data date picker](/manual/chapter-06/account-security/delete-sleep-data-calendar.png)

3. After choosing the dates, continue to the confirmation dialog to finish the action.

![Delete sleep data confirmation dialog](/manual/chapter-06/account-security/delete-sleep-data-popup.png)`,
          },
          {
            id: "download-sleep-data",
            title: "6.2.4 Download Sleep Data",
            content: `If you want to keep your own copy of your sleep records, use the path below.

1. Tap Data & Sharing Settings.
2. Tap Download Sleep Data, then follow the prompts on the page.

![Download Sleep Data page](/manual/chapter-06/account-security/date-download.png)`,
          },
          {
            id: "sharing-settings",
            title: "6.2.5 View and Manage Sharing",
            content: `If you want to view reports that others shared with you, or share your own sleep report with someone else, use the path below.

1. Tap Data & Sharing Settings.
2. Tap Sharing Settings.

After you enter Sharing Settings, you will usually see a page like the one below. Here you can review what has been shared with you and manage your own sharing actions.

![Sharing Settings page](/manual/chapter-06/account-security/sharing-settings.png)`,
          },
        ],
      },
      {
        id: "faceid",
        title: "6.3 FaceID Sign-In Verification",
        content: `If your device supports FaceID, you can turn on Sign In With FaceID in Account & Security. After it is enabled, future sign-ins require FaceID verification before the app opens.`,
        children: [
          {
            id: "open-account-security-faceid",
            title: "6.3.1 Open Account & Security",
            content: `1. Open Settings first, then tap Account & Security.

{{image-row|Settings|/manual/chapter-06/settings-home/settings-home-overview.png|Account & Security|/manual/chapter-06/settings-home/AccountSecurity.png}}`,
          },
          {
            id: "enable-faceid",
            title: "6.3.2 Turn On FaceID Sign-In Verification",
            content: `1. Find Sign In With FaceID.
2. Turn on the setting by following the prompts on the page.

![FaceID sign-in verification](/manual/chapter-06/account-security/faceid.png)

3. If the system asks for FaceID permission, allow it, or open your phone's system settings to authorize it there.
4. The next time you sign in, complete FaceID verification before entering the app.`,
          },
        ],
      },
      {
        id: "password",
        title: "6.4 Change or Reset Your Password",
        content: `There are two situations in this section. If you still remember your current password, you can change it directly in the app. If you forgot it, resetting by email is usually the faster option.`,
        children: [
          {
            id: "open-account-security-password",
            title: "6.4.1 Open Account & Security",
            content: `1. Open Settings first, then tap Account & Security.

{{image-row|Settings|/manual/chapter-06/settings-home/settings-home-overview.png|Account & Security|/manual/chapter-06/settings-home/AccountSecurity.png}}`,
          },
          {
            id: "reset-password-known",
            title: "6.4.2 If You Still Remember the Current Password",
            content: `If you still remember your current password, change it directly inside Account & Security.

1. Tap Reset Your Password to open the in-app password change page.

![Reset Your Password page](/manual/chapter-06/account-security/reset-password-form.png)

2. Enter your current password in Current Password.
3. Enter the new password in New Password.
4. Enter the new password again in Confirm New Password.
5. Tap Reset Password.

The page says the new password must be at least 6 characters long. After the change is complete, use the new password the next time you sign in.`,
          },
          {
            id: "reset-password-forgotten",
            title: "6.4.3 If You Forgot Your Password",
            content: `If you already forgot your current password, do not keep retrying old passwords. Using email reset is usually faster.

1. Tap Reset via email at the bottom of the page.
2. On the verification code page, enter the code from your email.

![Password reset code page](/manual/chapter-06/account-security/password-reset-code-entry-filled.png)

3. On the Create a new password page, set a new password.

![Create a new password page](/manual/chapter-06/account-security/password-reset-new-password-form.png)

4. After the reset is complete, the system usually returns to the Sign In page. Sign in again with the new password.

![Back to Sign In after password reset](/manual/chapter-06/account-security/password-reset-success-sign-in.png)`,
          },
        ],
      },
      {
        id: "delete-account",
        title: "6.5 Review This Before Deleting Your Account",
        content: `Deleting your account removes all data and signs you out automatically. This action usually cannot be undone, so make sure you truly no longer need the account before continuing.`,
        children: [
          {
            id: "open-account-security-delete-account",
            title: "6.5.1 Open Account & Security",
            content: `1. Open Settings first, then tap Account & Security.

{{image-row|Settings|/manual/chapter-06/settings-home/settings-home-overview.png|Account & Security|/manual/chapter-06/settings-home/AccountSecurity.png}}`,
          },
          {
            id: "delete-account-checklist",
            title: "6.5.2 Review These Points First",
            content: `Before you confirm deletion, it is a good idea to review the items below:

- If you want to keep a copy of your sleep data, open Download Sleep Data first.
- If you only want to remove part of your sleep data, use Delete Sleep Data first.
- If you only want a break from the app, signing out is usually a better choice than deleting the account.
- If you only want to change your password or turn on FaceID, use Reset Your Password or Sign In With FaceID instead of deleting the account.`,
          },
          {
            id: "delete-account-confirm",
            title: "6.5.3 When You Are Ready to Confirm Deletion",
            content: `If you are sure you want to delete the account, follow these steps:

1. Find Delete Your Account near the bottom of the page.
2. Read the on-screen message again and make sure it matches what you expect.

![Delete account confirmation page](/manual/chapter-06/account-security/delete-account-confirmation.png)

3. If everything looks correct, follow the prompts to finish deletion.`,
          },
        ],
      },
      {
        id: "logout",
        title: "6.6 Sign Out",
        content: `If you need to switch accounts, or simply do not want to stay signed in for now, you can sign out at the bottom of the Settings page. After you sign out, the app no longer keeps the current account logged in.

1. Open Settings.
2. Scroll to the bottom of the page.
3. Tap Log Out.
4. Follow the prompts to finish signing out.

![Settings page overview](/manual/chapter-06/settings-home/settings-home-overview.png)

After signing out, you need to sign in again before you can use account-related features and smart bed data.`,
      },
    ],
  },
  {
    id: "support",
    title: "7. Help and Support",
    description:
      "This chapter brings together the most useful places to go when you need help. If you want to check bed status, read help content, or contact the support team directly, start here. These items are all located in the Support area of Settings.",
    items: [
      {
        id: "bed-diagnostic",
        title: "7.1 Run Bed Diagnostic",
        content: `If you suspect the bed is not working normally, start by running Bed Diagnostic once.

1. On the Settings page, tap Bed Diagnostic.
2. Confirm that the area around the bed is safe, then tap Run Bed Diagnostic Test.

![Bed Diagnostic page](/manual/chapter-07/bed-diagnostic/bed-diagnostic-overview.png)

3. Wait for the diagnostic to finish, then review the result.

![Bed Diagnostic result page](/manual/chapter-07/bed-diagnostic/bed-diagnostic-results.png)`,
      },
      {
        id: "help-center",
        title: "7.2 Open Help Center",
        content: `If you want to read help content, open Help Center.

Here you will usually see User Manual, FAQs, and End User License Agreement. Open the page you need and continue from there.

![Help Center page](/manual/chapter-07/help-center/help-center-overview.png)`,
      },
      {
        id: "contact-us",
        title: "7.3 Contact the Support Team",
        content: `If you need help from a real person, open Contact Us.

1. Type the problem you are experiencing in the input box.
2. Review the email-related options on the page if needed.
3. Tap Send Message to submit.

![Contact Us page](/manual/chapter-07/contact-us/contact-us-form.png)

To help the support team understand the issue faster, include what you saw, when it happened, and what you already tried.`,
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "8. Troubleshooting",
    description:
      "This chapter collects the most common issues. If you run into problems while connecting, signing in, viewing reports, or using AI, look for the section that best matches what you are seeing right now. Starting from the closest matching title usually gets you to the right fix faster.",
    items: [
      {
        id: "connection-issues",
        title: "8.1 Cannot Find the Bed or Connection Fails",
        content: `If the app cannot find your bed, or the connection process gets stuck, check the following in order:`,
        children: [
          {
            id: "check-connection-conditions",
            title: "8.1.1 Check the Basic Connection Conditions First",
            content: `1. Make sure the bed is powered on and your phone is close to the bed.
2. Start the bed search flow again and search one more time.`,
          },
          {
            id: "auto-identify-failed",
            title: "8.1.2 If Automatic Identification Fails",
            content: `1. If automatic identification fails, switch to Scan QR Code with Camera.
2. If scanning still does not work, switch to manual device ID entry.
3. If the page opens the bed type selection screen, choose the correct bed type manually and continue.

If it still will not connect, continue to {{jump-link|8.2 What to do if permissions are not enabled|troubleshooting|permissions}}.`,
          },
        ],
      },
      {
        id: "permissions",
        title: "8.2 What to Do If Permissions Are Not Enabled",
        content: `The first time you connect a bed, the app may ask for Bluetooth, location, and camera permissions.

- Bluetooth permission affects device search and connection.
- Location permission affects nearby device scanning.
- Camera permission affects QR code scanning.

If you tapped "Don't Allow", the app may get stuck while searching, scanning, or identifying the bed. Open your phone's system settings, enable the missing permissions for the app, then return to the app and try again.`,
      },
      {
        id: "wifi-connection",
        title: "8.3 Wi-Fi Smart Bed Connection Fails",
        content: `If a Wi-Fi smart bed gets stuck on the Wi-Fi or server connection step, work through the checks below in order:

1. Confirm that the selected Wi-Fi network is correct.
2. Confirm that the Wi-Fi password was entered correctly.
3. Keep the phone close to the bed and wait for the app to complete the Bluetooth, Wi-Fi, and server connection steps.
4. If the page does not change for a long time, go back, choose the Wi-Fi network again, and retry.
5. If it still fails, restart the bed search and setup process from the beginning.`,
      },
      {
        id: "disconnected",
        title: "8.4 Home Page Shows Not Connected",
        content: `If the Home page shows a disconnected state, the app is not currently connected to the bed. Use the steps below:

1. Confirm that the page shows the disconnected message and the Proceed to bed connection entry.
2. Tap Proceed to bed connection.
3. Follow the prompts to reconnect your bed.
4. If you run into search or identification issues again while reconnecting, review {{jump-link|8.1 Cannot find the bed or connection fails|troubleshooting|connection-issues}} and {{jump-link|8.2 What to do if permissions are not enabled|troubleshooting|permissions}}.

![Home page disconnected prompt](/manual/chapter-08/homepage/No%20connection.png)`,
      },
      {
        id: "no-report",
        title: "8.5 Home Page Shows No Report",
        content: `If the Home page shows No Report, there is currently no sleep report available for the selected date. This message only appears for smart beds.

1. Confirm that the Home page is showing No Report.
2. Tap the date and switch to another date to check whether data is available there.
3. Confirm that both the account and the bed are connected normally.
4. If the selected date just finished a new sleep session, wait for the data to finish generating, then check again.

![Home page No Report prompt](/manual/chapter-08/homepage/No%20report.png)

If data still does not appear, check the bed connection status once more.`,
      },
      {
        id: "ai-data-unavailable",
        title: "8.6 AI Content or Real-Time Data Is Temporarily Unavailable",
        content: `If AI Chat only shows generic prompts, or the real-time data page does not show any values, check these items first:

- There is not enough sleep data for the current date.
- The app is not currently maintaining a normal connection with the bed.
- The related content is still refreshing.

First confirm that the Home page shows the bed as connected and that the selected date has valid data, then open the related page again.`,
      },
      {
        id: "login-issues",
        title: "8.7 Verification Code Does Not Arrive or Sign-In Cannot Be Completed",
        content: `If sign-up, sign-in, or password reset gets stuck, check the following first:

1. Confirm that the email address you entered is correct.
2. Wait for the system email to finish sending, then check your inbox again.
3. If you are trying to sign in to an existing account, make sure you are using the correct sign-in method, such as email, Apple, or Google.
4. If you still cannot sign in, tap Forgot Password? on the Sign In page and follow the email prompts to set a new password.

If you are already signed in and only want to change your password, go directly to {{jump-link|6.4 Change or reset your password|account-security|password}}.`,
      },
    ],
  },
]

export const quickLinks = [
  "Want to install the app and connect your bed first? Read Chapters 1 and 2.",
  "Already on the Home page and want to check reports, real-time data, or bed controls? Read Chapter 3.",
  "Want to use AI Chat? Read Chapter 4.",
  "Want to manage your bed, notifications, or AI settings? Read Chapter 5.",
  "Want to update your profile, password, or other account security settings? Read Chapter 6.",
  "Want to run diagnostics, open Help Center, or contact support? Read Chapter 7.",
  "Having connection, sign-in, report, or AI issues? Go straight to Chapter 8.",
]
