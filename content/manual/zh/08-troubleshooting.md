# 8. 常见问题与排查 {#troubleshooting}

连接、登录、查看报告或用 AI 时遇到问题，直接从这一章找对应的处理方法。先看最接近您当前情况的小节，通常能更快找到解决办法。

### 8.1 搜索不到床或连接失败 {#connection-issues}

App 找不到床，或者连到一半卡住了，按下面的顺序检查：

#### 8.1.1 先检查连接条件 {#check-connection-conditions}

1. 确认床体已通电，手机靠近床体。
2. 如果连的是 Wi-Fi 型智能床，确认用的是单独的 2.4G 或 5G 频段，不要用多频合一频段。
3. 重新进入找床流程，再搜一次。

#### 8.1.2 自动连接失败时 {#auto-identify-failed}

1. 自动查找没找到床，先改用 Scan QR Code with Camera 扫码连接。
2. 扫码还是不行，再改用手动输入设备号。
3. 如果已经找到床但还无法确认床型，手动选择正确的床型后继续。

还是连不上的话，继续看 {{jump-link|8.2 权限未开启怎么办|troubleshooting|permissions}}。

### 8.2 权限未开启怎么办 {#permissions}

第一次连床时，App 可能会请求蓝牙、位置和相机权限。

- 蓝牙权限影响设备搜索和连接。
- 位置权限影响附近设备扫描。
- 相机权限影响二维码扫描。

这些权限没开的话，App 可能找不到床、没法扫码，或者无法继续连接。去手机系统设置里给 App 补上权限，再回来重试。

### 8.3 Wi-Fi 型智能床连接失败 {#wifi-connection}

Wi-Fi 型智能床一直卡在 Wi-Fi 或服务器连接这一步，按下面的顺序处理：

1. 确认选的 Wi-Fi 网络正确，不是多频合一频段。
2. 确认 Wi-Fi 密码没输错。
3. 手机保持在床附近，等 App 完成蓝牙、Wi-Fi 和服务器连接。
4. 页面长时间没变化的话，返回上一步重新选 Wi-Fi 再试。
5. 还是不行，重新开始找床和设置。

### 8.4 首页显示未连接 {#disconnected}

首页显示未连接，说明 App 现在没连上您的床。

1. 先确认页面上有未连接提示和 Proceed to bed connection 入口。
2. 点 Proceed to bed connection。
3. 按提示重新连接。
4. 重连时又遇到搜索或识别问题，回看 {{jump-link|8.1 搜索不到床或连接失败|troubleshooting|connection-issues}} 和 {{jump-link|8.2 权限未开启怎么办|troubleshooting|permissions}}。

![首页未连接提示](/manual/chapter-08/homepage/No%20connection.png)

### 8.5 首页显示 No Report {#no-report}

首页显示 No Report，说明当前日期还没有可看的睡眠报告。这个提示只出现在智能床上。

1. 先确认首页显示的是 No Report。
2. 点日期切换到其他日期，看看有没有数据。
3. 确认账号和床体已正常连接。
4. 如果当天刚结束一次睡眠，等数据生成后再回来看。

![首页 No Report 提示](/manual/chapter-08/homepage/No%20report.png)

一直看不到数据的话，再检查一次床体连接状态。

### 8.6 AI 内容或实时数据暂不可用 {#ai-data-unavailable}

AI Chat 没显示预期的内容，或者实时数据页一直没有数值，先检查：

- 当前日期有没有足够的睡眠数据。
- App 现在有没有和床保持正常连接。
- 相关内容是不是还在刷新中。

先确认首页已连上床，所选日期也有有效数据，再重新进入相关页面。

### 8.7 收不到验证码或无法完成登录 {#login-issues}

注册、登录或重置密码时卡住了，先检查：

1. 邮箱地址有没有输对。
2. 等系统邮件发送完成后再去查邮箱。
3. 如果是登录已有账号，确认用的是正确的登录方式（邮箱、Apple 或 Google）。
4. 实在登不上，在 Sign In 页面点 Forgot Password?，按邮件提示重新设置密码。

已经登录了只是想改密码？直接看 {{jump-link|6.4 修改或找回密码|account-security|password}}。
