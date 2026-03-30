# 2. 第一次连接与设置 {#first-connection}

这一章会带您把床连接到 App，并完成第一次使用前需要的基础设置。第一次使用时，跟着顺序一步一步操作就可以。

### 2.1 开始前准备 {#preparation}

开始之前，先花半分钟确认下面几项。准备好以后，后面的连接过程会更顺利。

开始前，先检查下面几项：

- 床已经通电，并处于可连接状态
- 手机已靠近床，方便 App 搜索附近的床
- 手机可正常使用蓝牙、位置和相机权限
- 如果要连接 Wi-Fi 型智能床，请提前确认可用的 Wi-Fi 网络和密码。床只支持单独的 2.4G 或 5G 频段，不能使用多频合一频段
- 如果自动查找没有找到您的床，先试扫码；如果已经找到床但床型不对，再手动选择床型；如果扫码也不行，再手动输入设备号

确认这些都没问题后，再继续看 {{jump-link|2.2 开始连接床|first-connection|start-connection}}。

### 2.2 开始连接床 {#start-connection}

准备好以后，就可以从欢迎页开始连接您的床。

第一次打开 App 时，您会先看到欢迎页。这里最常用的是两个按钮：Connect Your Bed 和 No Bed Yet?

1. 如果您已经有床，点击 Connect Your Bed。
2. 如果您还没有床，点击 No Bed Yet?，先前往 Ergomotion 官网了解并购买智能床。

![欢迎页](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-welcome.png)

如果您已经开始连床，下一步继续看 {{jump-link|2.3 查找并连接您的床|first-connection|find-identify-bed}}。

### 2.3 查找并连接您的床 {#find-identify-bed}

进入以后，先试最简单的自动连接。大多数情况下，App 会直接帮您找到床；如果没有找到，再改用扫码；如果扫码也不行，再手动输入设备号。如果已经找到床，但还不能确认床型，就按页面提示手动选择正确的床型。确认床型后，再继续看 {{jump-link|2.4 按床型继续设置|first-connection|bed-type-setup}}。

#### 2.3.1 自动连接 {#auto-identify}

这是最省事的方式。大多数用户都可以在这里直接把床连上。

1. 点击 Connect，开始查找您的床。

![开始找床](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-bed-setup-instructions.png)

2. 如果系统请求蓝牙权限，请点击允许。否则 App 无法搜索附近可连接的床。

![蓝牙权限提示](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-bluetooth-permission-required.png)

3. 等待 App 自动查找附近可以连接的床。

![搜索中](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-loading.png)

4. 如果页面显示床列表，请选择您的床并继续。

![搜索结果](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-search-results-multiple-beds.png)

5. 如果 App 找到了您的床，但还不能判断床型，先选择您的床，再按页面提示进入床型选择页。

![设备已找到但未识别床型](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-selection-before-type-identification.png)

6. 在床型选择页中确认正确的床型，然后继续。

![床型选择](/manual/chapter-02/onboarding/02-Bed-Search-And-Identification/bed-identification-type-selection.png)

#### 2.3.2 扫码连接 {#qr-identify}

如果自动查找没有找到您的床，可以改用这种方式继续连接。

1. 在 Unable to Connect 页面点击 Scan QR Code with Camera。

![无法连接页](/manual/chapter-02/onboarding/03-Alternative-Connection/alternative-connection-unable-to-connect.png)

2. 如果系统请求相机权限，请点击允许。

![相机权限提示](/manual/chapter-02/onboarding/03-Alternative-Connection/qr-scan-camera-permission-required.png)

3. 将摄像头对准主控盒上的二维码进行扫描。主控盒位于您的床底。

![扫码页](/manual/chapter-02/onboarding/03-Alternative-Connection/qr-scan-overview.png)

4. 连接成功后，按页面提示继续下一步。

5. 如果页面提示连接失败，请先确认手机蓝牙已经打开，再返回页面重新尝试连接。

![蓝牙未开启导致连接失败](/manual/chapter-02/onboarding/03-Alternative-Connection/Unable%20to%20Connect%20-%20Retry%20Options.png)

#### 2.3.3 手动输入设备号连接 {#manual-identify}

如果扫码不可用，或者扫完以后还是连不上，您可以改用手动输入设备号。

1. 在 Unable to Connect 页面点击 Manually Enter Bluetooth ID。
2. 设备号在床底主控盒上，您可以按图示查找。

![无法连接页](/manual/chapter-02/onboarding/03-Alternative-Connection/alternative-connection-unable-to-connect.png)

3. 在输入页填写您智能床的设备号。

![蓝牙 ID 输入页](/manual/chapter-02/onboarding/03-Alternative-Connection/manual-bluetooth-id-entry.png)

4. 确认输入无误后，继续下一步。如果输入的设备号格式不正确，页面会直接提示错误。修改后再继续即可。

![输入错误提示](/manual/chapter-02/onboarding/03-Alternative-Connection/manual-bluetooth-id-error.png)

5. 连接成功后，按页面提示继续下一步。

6. 如果页面提示连接失败，请先确认手机蓝牙已经打开，再返回页面重新尝试连接。

![蓝牙未开启导致连接失败](/manual/chapter-02/onboarding/03-Alternative-Connection/Unable%20to%20Connect%20-%20Retry%20Options.png)

#### 2.3.4 还不想连接床 {#skip-connect}

如果您现在不想连接床，或者这张智能床之前已经连过，可以先点击 Skip To Sign In。

![连床说明页](/manual/chapter-02/onboarding/01-Entry-And-Setup/entry-bed-setup-instructions.png)

如果您是第一次连床，或者这张床还没有绑定到您的账号，请继续看前面几个小节。

### 2.4 按床型继续设置 {#bed-type-setup}

找到床以后，接下来怎么继续，会根据床的类型不同而不同。电动床可以直接进入首页；智能床还需要注册或登录账号，再完成后面的设置。

#### 2.4.1 电动床 {#electric-bed-setup}

如果您使用的是电动床，App 会直接进入 Homepage。电动床不需要注册或登录账号，连上以后就可以开始使用。接下来您可以直接看第 3 章的 {{jump-link|电动床首页|using-app|homepage-electric}} 和 {{jump-link|遥控器|using-app|remote}}。

![电动床首页](/manual/chapter-02/homepage/electric-bed-homepage.png)

#### 2.4.2 智能床 {#smart-bed-setup}

如果您使用的是智能床，并且是第一次使用，请继续完成注册、登录和首次资料填写。下一步先看 {{jump-link|2.5 首次注册智能床账号|first-connection|register-account}}。

### 2.5 首次注册智能床账号 {#register-account}

如果您第一次使用智能床、还没有账号，就在这里完成注册。您可以用邮箱、Apple 账号或 Google 账号注册。注册并验证后，再继续看 {{jump-link|2.6 设置智能床|first-connection|setup-smart-bed}}。

#### 2.5.1 使用邮箱注册 {#register-email}

如果您打算用邮箱注册，请直接在 Sign Up 页面完成。

1. 输入邮箱地址。

![注册空白页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-empty-form.png)

2. 设置密码并再次输入密码进行确认。

![邮箱与密码填写页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-email-entered.png)

3. 选择您所在的地区。

![地区选择页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-region-selection.png)

4. 勾选必要的协议确认项。

![协议勾选状态](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-agreement-checked.png)

5. 点击注册按钮。

![注册提交页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-submit-clean-shot.png)

6. 查看系统发送到邮箱里的验证码，并输入验证码并完成邮箱验证。

![邮箱验证码页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/email-verification-clean-shot.png)

#### 2.5.2 使用 Apple 注册 {#register-apple}

如果您已经在手机上登录了 Apple 账号，可以直接点击 Apple 入口继续注册。

1. 在注册页面底部点击 Apple。

![Apple 入口](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-submit-clean-shot.png)

2. 按系统页面完成 Apple 授权。

![Apple 授权页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-apple-authorization.png)

3. 完成账号创建后，回到 App 继续后面的设置。

#### 2.5.3 使用 Google 注册 {#register-google}

如果您已经在手机上登录了 Google 账号，可以直接点击 Google 入口继续注册。

1. 在注册页面底部点击 Google。

![注册页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-up-empty-form.png)

2. 按系统页面完成 Google 授权。（图片缺失）

![Google 授权页](/manual/chapter-02/onboarding/04-Account-Registration-And-Verification/sign-in-google-authorization-placeholder.svg)

3. 完成账号创建后，回到 App 继续后面的设置。

### 2.6 设置智能床 {#setup-smart-bed}

账号准备好后，接着把智能床连好。蓝牙床和 Wi-Fi 床的步骤会有一点不同，连好以后还要确认是否打开睡眠数据跟踪。做完这里，再继续看 {{jump-link|2.7 完成首次资料填写|first-connection|first-profile}}。

#### 2.6.1 设置蓝牙型智能床 {#setup-bt-bed}

如果您连接的是蓝牙型智能床，这里的步骤会更简单一些。

1. 等待 App 完成蓝牙连接。

![蓝牙连接阶段](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-stage-bluetooth.png)

2. 等待 App 完成智能床设置。

![床体设置阶段](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-stage-bed-setup.png)

3. 连接成功后，进入睡眠追踪设置。

![蓝牙连接完成](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/bluetooth-connection-complete.png)

#### 2.6.2 设置 Wi-Fi 型智能床 {#setup-wifi-bed}

如果您连接的是 Wi-Fi 型智能床，还需要把床连上家里的 Wi-Fi。

1. 选择可用的 Wi-Fi 网络。请使用单独的 2.4G 或 5G 频段，不要使用多频合一频段。

![Wi-Fi 选择页](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-network-selection.png)

2. 输入 Wi-Fi 密码并继续。

![Wi-Fi 密码输入页](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-password-entry-empty.png)

3. 等待 App 完成蓝牙连接。

![蓝牙连接阶段](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-bluetooth.png)

4. 等待 App 完成 Wi-Fi 连接。

![Wi-Fi 连接阶段](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-wifi.png)

5. 等待 App 完成服务器连接。

![服务器连接阶段](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-stage-server.png)

6. 连接成功后，进入睡眠追踪设置。

![Wi-Fi 连接完成](/manual/chapter-02/onboarding/05-Smart-Bed-Connection/wifi-connection-complete.png)

#### 2.6.3 开启睡眠数据跟踪 {#setup-sleep-tracking}

床连接完成后，页面会显示 Sleep Data Tracking。您可以在这里决定是否让 App 继续记录后续的睡眠数据。

1. 先阅读页面说明。

![睡眠数据跟踪说明页](/manual/chapter-02/onboarding/06-Sleep-Data-Tracking/sleep-data-tracking-overview.png)

2. 选择是否开启睡眠数据跟踪。如果您关闭睡眠数据跟踪，App 将不再追踪您的睡眠数据，但同时也不会生成睡眠报告。您之后如果需要，也可以在设置中重新打开。

![关闭确认提示](/manual/chapter-02/onboarding/06-Sleep-Data-Tracking/sleep-data-tracking-turn-off-confirmation.png)

3. 点击继续，进入首次资料填写。

![昵称输入页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-empty.png)

### 2.7 完成首次资料填写 {#first-profile}

床连好并确认睡眠数据跟踪后，还需要补充第一次使用的信息。您会依次填写昵称、基础信息、睡眠目标和个人偏好；如果床支持分区功能，还会多一步选择睡觉位置。完成这里后，您就可以进入首页，开始看 {{jump-link|3.2 智能床首页|using-app|homepage-smart}}。

#### 2.7.1 无分区功能智能床 {#profile-no-zone}

1. 输入昵称。

![昵称填写页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-filled.png)

2. 阅读页面上的填写说明。

![资料填写说明页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-setup-introduction.png)

3. 进入基础信息填写页，补充性别、身高、体重、床垫厚度、生日和时间制式等内容。

![基础资料填写页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-profile-details-form.png)

4. 完成基础信息后，进入睡眠目标页。

![睡眠目标页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-goals-overview.png)

5. 继续进入个人标签页，选择适合自己的标签。您也可以点击 Skip 先跳过。

![个人标签页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/02-Without-Partition-Feature/sleep-preferences-selection-state.png)

6. 完成后进入首页。

#### 2.7.2 有分区功能智能床 {#profile-zone}

1. 输入昵称。

![昵称填写页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-name-entry-filled.png)

2. 阅读页面上的填写说明。

![资料填写说明页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/01-Shared-Steps/profile-setup-introduction.png)

3. 先选择您的睡觉位置。

![睡觉位置选择页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/profile-bed-side-selection.png)

4. 进入基础信息填写页，并先确认单位设置。

![单位选择页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-profile-units-selection.png)

如果您调整了单位或关键字段，系统可能会短暂保存设置。

![单位配置页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-profile-units-configuring.png)

5. 完成基础信息后，继续设置睡眠目标，并选择优先改善的睡眠项。

![睡眠目标优先项页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-goals-priority-selection.png)

6. 进入个人标签完成页，确认后点击 Finish 进入首页。

![完成页](/manual/chapter-02/onboarding/07-Profile-And-Preferences/03-With-Partition-Feature/sleep-preferences-final-state.png)

看到首页后，第一次连接和基础设置就完成了。

![设置首页](/manual/chapter-02/settings/sleeper-tags-overview.png)
