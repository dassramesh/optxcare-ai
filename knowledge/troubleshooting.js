
const troubleshootingData = [
    {
        keywords: ["wifi", "wi-fi", "wireless", "internet connection"],
        title: "Wi-Fi Connection Issue",
        response: `Let's troubleshoot your Wi-Fi connection.

1. Check whether Wi-Fi is enabled.
2. Confirm that Airplane Mode is turned off.
3. Restart your Wi-Fi router.
4. Disconnect and reconnect to your Wi-Fi network.
5. Check whether other devices can access the internet.

If the issue continues, contact your network administrator or ISP.`
    },
    {
        keywords: ["no internet", "internet not working", "connected but no internet"],
        title: "No Internet Access",
        response: `Let's investigate the internet connection.

1. Check whether other devices have internet access.
2. Disconnect and reconnect to the network.
3. Restart your computer.
4. Check whether your router shows an internet connection.
5. Contact your ISP if multiple devices are affected.

If this is an office network, contact IT support.`
    },
    {
        keywords: [
            "slow computer", "slow pc", "computer slow",
            "laptop slow", "computer running slowly",
            "computer running slow", "computer is running slowly",
            "computer is running slow", "laptop running slowly",
            "laptop running slow", "laptop is running slowly",
            "laptop is running slow", "my laptop is slow",
            "my computer is slow", "pc running slowly",
            "pc running slow", "my pc is running slow",
            "my pc is running slowly", "my computer is running slow",
            "my computer is running slowly", "slow laptop",
            "system running slow", "computer performance is slow",
            "laptop performance is slow", "computer is slow",
            "pc is slow", "laptop is slow", "running slowly",
            "running slow", "very slow", "slow performance"
        ],
        title: "Slow Computer Performance",
        response: `Let's check your computer performance.

1. Close applications you are not using.
2. Check Task Manager for applications using high resources.
3. Check available disk space.
4. Restart your computer.
5. Install pending system updates through your normal update process.

If performance remains slow, escalate the issue to IT support.`
    },
    {
        keywords: ["dns", "dns error", "dns not working"],
        title: "DNS Resolution Issue",
        response: `Let's investigate the DNS issue.

1. Check whether other websites are accessible.
2. Confirm that your device has a valid network connection.
3. Check whether the issue affects other devices.
4. If permitted by your IT policy, ask IT support to investigate DNS settings.

An administrator may need to investigate DNS configuration.`
    },
    {
        keywords: ["keyboard", "keyboard not working", "keys not working"],
        title: "Keyboard Issue",
        response: `Let's troubleshoot your keyboard.

1. Check the keyboard connection.
2. If wireless, check its battery and connection.
3. Try another USB port if applicable.
4. Restart your computer.
5. Test with another keyboard if available.

If the issue continues, contact technical support.`
    },
    {
        keywords: ["printer", "printing", "printer not working", "printer offline"],
        title: "Printer Troubleshooting",
        response: `Let's troubleshoot your printer.

1. Check that the printer is powered on.
2. Check the USB or Wi-Fi connection.
3. Confirm that the printer has paper.
4. Check for any error messages on the printer.
5. Check whether the correct printer is selected.

If the problem continues, contact IT support.`
    },
    {
        keywords: ["windows update", "update error", "update failed"],
        title: "Windows Update Issue",
        response: `Let's investigate the Windows update issue.

1. Check your internet connection.
2. Restart your computer.
3. Check available storage space.
4. Open Windows Update settings and review the error message.
5. Contact IT support if the update continues to fail.`
    },
    {
        keywords: [
            "computer won't start", "pc won't start",
            "laptop won't start", "computer not starting",
            "pc not starting", "laptop not starting",
            "computer not turning on", "laptop not turning on",
            "pc not turning on", "won't boot", "not booting"
        ],
        title: "Computer Startup Issue",
        response: `Let's investigate the startup issue.

1. Check whether the power cable is connected.
2. Check whether the power outlet is working.
3. Disconnect unnecessary external accessories.
4. Note any error message displayed during startup.
5. Contact technical support if the computer still does not start.

Do not open the device or attempt hardware repairs yourself.`
    },
    {
        keywords: ["bluetooth", "bluetooth not working", "bluetooth connection"],
        title: "Bluetooth Connectivity Issue",
        response: `Let's troubleshoot Bluetooth connectivity.

1. Confirm that Bluetooth is enabled.
2. Check whether the device is in pairing mode.
3. Keep the devices within their recommended range.
4. Turn Bluetooth off and on again.
5. Remove and re-pair the device if permitted.

If the problem continues, contact IT support.`
    },
    {
        keywords: ["network", "network connection", "network not working", "cannot connect to network"],
        title: "Network Connectivity Issue",
        response: `Let's investigate your network connection.

1. Check your Ethernet or Wi-Fi connection.
2. Check whether other devices can connect.
3. Restart your computer.
4. Note any network error messages.
5. Contact your network administrator if the issue continues.`
    },
    {
        keywords: ["vpn", "vpn not working", "vpn connection", "vpn disconnected"],
        title: "VPN Connection Issue",
        response: `Let's troubleshoot your VPN connection.

1. Check your internet connection first.
2. Confirm that you are using your organization's approved VPN application.
3. Check whether the VPN application displays an error message.
4. Restart the approved VPN application.
5. Contact your IT support team if the connection still fails.

Never share your VPN password or authentication codes.`
    },
    {
        keywords: ["login", "log in", "sign in", "signin", "cannot login", "can't login", "login failed"],
        title: "Login and Authentication Issue",
        response: `Let's investigate your login issue.

1. Check that your username is entered correctly.
2. Confirm that Caps Lock is not enabled.
3. Check your internet connection.
4. Note any error message displayed during login.
5. Contact IT support if your account remains inaccessible.

Never share your password or verification codes.`
    },
    {
        keywords: ["software installation", "install software", "application installation", "cannot install", "installation failed"],
        title: "Software Installation Issue",
        response: `Let's troubleshoot the software installation issue.

1. Check whether your device meets the software requirements.
2. Confirm that sufficient storage space is available.
3. Check whether the installer came from an approved source.
4. Note any installation error message.
5. Contact IT support if administrator permissions are required.

Only install software approved by your organization.`
    },
    {
        keywords: ["sound", "audio", "no sound", "speaker", "microphone", "mic not working", "audio not working"],
        title: "Sound and Audio Issue",
        response: `Let's troubleshoot your audio issue.

1. Check whether your device is muted.
2. Check the system volume level.
3. Confirm that the correct audio output device is selected.
4. Check your speaker or headphone connection.
5. Restart the application and test the audio again.

If the issue continues, contact IT support.`
    },
    {
        keywords: ["monitor", "display", "screen not working", "black screen", "no display", "second monitor", "external display"],
        title: "Display and Monitor Issue",
        response: `Let's troubleshoot your display issue.

1. Check whether the monitor is powered on.
2. Check the HDMI, DisplayPort, or other display cable.
3. Confirm that the correct monitor input is selected.
4. Restart the computer if appropriate.
5. Note any error message or unusual display behavior.

If the issue continues, contact technical support.`
    },

    // ---------------- LINUX TROUBLESHOOTING ----------------

    {
        keywords: [
            "linux boot", "linux not booting",
            "linux startup", "linux won't start",
            "ubuntu not booting"
        ],
        title: "Linux Startup Issue",
        response: `Let's investigate your Linux startup issue.

1. Check whether the computer displays any boot error.
2. Note any error messages shown during startup.
3. Check whether the issue started after a recent update.
4. Disconnect unnecessary external devices.
5. Contact your Linux administrator if the system still cannot start.

Avoid changing bootloader settings without administrator guidance.`
    },
    {
        keywords: [
            "linux command", "terminal not working",
            "command not found", "bash error",
            "shell issue", "linux terminal"
        ],
        title: "Linux Terminal Issue",
        response: `Let's investigate your Linux terminal issue.

1. Check that the command is spelled correctly.
2. Review the complete error message.
3. Check whether the required application is installed.
4. Confirm that the command is available in your environment.
5. Contact your Linux administrator if the issue continues.

Share the error message without including passwords or confidential information.`
    },
    {
        keywords: [
            "linux install software", "linux package",
            "apt install", "package installation",
            "package manager", "software not installing"
        ],
        title: "Linux Package Installation Issue",
        response: `Let's troubleshoot your Linux package installation.

1. Check your internet connection.
2. Review the package manager error message.
3. Check whether the package name is correct.
4. Confirm that the software source is approved.
5. Contact your Linux administrator if administrator permissions are required.

Use only software sources approved by your organization.`
    },
    {
        keywords: [
            "linux permission", "permission denied",
            "file permission", "folder permission",
            "access denied linux"
        ],
        title: "Linux File Permission Issue",
        response: `Let's investigate your Linux file permission issue.

1. Check whether you are accessing the correct file or folder.
2. Review the file ownership and permission information.
3. Confirm that your account has the required access.
4. Note the exact permission error message.
5. Contact your Linux administrator if access needs to be changed.

Do not change permissions on system files without authorization.`
    },
    {
        keywords: [
            "linux network", "linux internet",
            "ubuntu internet not working",
            "linux wifi", "linux connectivity"
        ],
        title: "Linux Network Connectivity Issue",
        response: `Let's troubleshoot your Linux network connection.

1. Check whether Wi-Fi or Ethernet is enabled.
2. Confirm that the network connection is active.
3. Check whether other devices can access the internet.
4. Note any network-related error messages.
5. Contact your network administrator if the issue continues.`
    },
    {
        keywords: [
            "linux disk space", "linux storage",
            "disk full linux", "no space left on device",
            "linux low storage"
        ],
        title: "Linux Disk Space Issue",
        response: `Let's investigate your Linux disk space issue.

1. Check the available disk space.
2. Identify whether a particular filesystem is full.
3. Review which directories are using significant storage.
4. Avoid deleting system files or unfamiliar directories.
5. Contact your Linux administrator if additional storage or cleanup is required.`
    }
];

// Export troubleshooting knowledge base
module.exports = troubleshootingData;
