<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Trial Registration</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fingerprintjs2/2.1.0/fingerprint2.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            max-width: 500px;
            width: 100%;
            transform: translateY(0);
            transition: transform 0.3s ease;
        }

        .container:hover {
            transform: translateY(-5px);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 30px;
            font-size: 2.5em;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .form-group {
            margin-bottom: 25px;
            position: relative;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-weight: bold;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        input {
            width: 100%;
            padding: 15px;
            border: 2px solid #e1e8ed;
            border-radius: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.9);
        }

        input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
        }

        button {
            width: 100%;
            padding: 15px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            border: none;
            border-radius: 10px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .status {
            margin-top: 20px;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            display: none;
        }

        .status.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }

        .status.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }

        .fingerprint-info {
            background: rgba(102, 126, 234, 0.1);
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
            font-size: 14px;
            color: #555;
            text-align: center;
        }

        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎮 Free Trial</h1>
        <div class="fingerprint-info">
            🔒 Secure registration with device fingerprinting to prevent abuse
        </div>
        
        <form id="registrationForm">
            <div class="form-group">
                <label for="robloxUsername">Roblox Username</label>
                <input type="text" id="robloxUsername" name="robloxUsername" required 
                       placeholder="Enter your Roblox username">
            </div>
            
            <div class="form-group">
                <label for="discordId">Discord ID</label>
                <input type="text" id="discordId" name="discordId" required 
                       placeholder="Enter your Discord ID (numbers only)">
            </div>
            
            <button type="submit" id="submitBtn">
                Register for Free Trial
            </button>
        </form>
        
        <div id="status" class="status"></div>
    </div>

    <script>
        // Configuration - Replace with your actual values
        const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1383108669675409428/fVV8tYfPgREA9Mb_Ae99nbjQwMQFRJnsR716kOWPffiHUaV3WODLFflb_ZSZpR54DqeK';
        const CHANNEL_ID = '1383108273317871626';
        
        let deviceFingerprint = '';
        let submissionData = [];

        // Generate device fingerprint
        function generateFingerprint() {
            if (typeof Fingerprint2 !== 'undefined') {
                Fingerprint2.get(function(components) {
                    const values = components.map(function(component) {
                        return component.value;
                    });
                    deviceFingerprint = Fingerprint2.x64hash128(values.join(''), 31);
                    console.log('Device fingerprint generated:', deviceFingerprint);
                });
            } else {
                // Fallback fingerprint method
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                ctx.textBaseline = 'top';
                ctx.font = '14px Arial';
                ctx.fillText('Device fingerprint', 2, 2);
                
                deviceFingerprint = btoa(
                    navigator.userAgent + 
                    navigator.language + 
                    screen.width + 'x' + screen.height + 
                    canvas.toDataURL()
                ).replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);
            }
        }

        // Check for duplicates
        function checkForDuplicates(robloxUsername, discordId, fingerprint) {
            const flags = [];
            
            for (let submission of submissionData) {
                if (submission.robloxUsername.toLowerCase() === robloxUsername.toLowerCase()) {
                    flags.push(`🚨 RED FLAG: Roblox username "${robloxUsername}" already registered`);
                }
                if (submission.discordId === discordId) {
                    flags.push(`🚨 RED FLAG: Discord ID "${discordId}" already registered`);
                }
                if (submission.fingerprint === fingerprint) {
                    flags.push(`🚨 RED FLAG: Device fingerprint already registered (possible alt account)`);
                }
            }
            
            return flags;
        }

        // Send to Discord
        async function sendToDiscord(data) {
            const embed = {
                title: "🎮 New Trial Registration",
                color: data.flags.length > 0 ? 0xff0000 : 0x00ff00,
                fields: [
                    {
                        name: "Roblox Username",
                        value: data.robloxUsername,
                        inline: true
                    },
                    {
                        name: "Discord ID",
                        value: data.discordId,
                        inline: true
                    },
                    {
                        name: "Device Fingerprint",
                        value: data.fingerprint.substring(0, 16) + "...",
                        inline: true
                    },
                    {
                        name: "Timestamp",
                        value: new Date().toLocaleString(),
                        inline: true
                    }
                ],
                footer: {
                    text: "Trial Registration System"
                }
            };

            if (data.flags.length > 0) {
                embed.fields.push({
                    name: "🚨 SECURITY ALERTS",
                    value: data.flags.join('\n'),
                    inline: false
                });
            }

            const payload = {
                embeds: [embed]
            };

            try {
                const response = await fetch(DISCORD_WEBHOOK_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                });

                return response.ok;
            } catch (error) {
                console.error('Error sending to Discord:', error);
                return false;
            }
        }

        // Handle form submission
        document.getElementById('registrationForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const status = document.getElementById('status');
            const robloxUsername = document.getElementById('robloxUsername').value.trim();
            const discordId = document.getElementById('discordId').value.trim();
            
            // Validate Discord ID format
            if (!/^\d{17,19}$/.test(discordId)) {
                status.className = 'status error';
                status.textContent = 'Invalid Discord ID format. Please enter a valid Discord ID (17-19 digits).';
                status.style.display = 'block';
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="loading"></span> Processing...';
            status.style.display = 'none';
            
            // Check for duplicates
            const flags = checkForDuplicates(robloxUsername, discordId, deviceFingerprint);
            
            const submissionInfo = {
                robloxUsername: robloxUsername,
                discordId: discordId,
                fingerprint: deviceFingerprint,
                flags: flags,
                timestamp: new Date().toISOString()
            };
            
            // Send to Discord
            const success = await sendToDiscord(submissionInfo);
            
            if (success) {
                // Add to local storage for duplicate checking
                submissionData.push(submissionInfo);
                
                status.className = 'status success';
                if (flags.length > 0) {
                    status.textContent = '⚠️ Registration submitted with security warnings. Admin will review your application.';
                } else {
                    status.textContent = '✅ Registration successful! You will receive your trial access soon.';
                }
                
                // Reset form
                document.getElementById('registrationForm').reset();
            } else {
                status.className = 'status error';
                status.textContent = '❌ Registration failed. Please try again or contact support.';
            }
            
            status.style.display = 'block';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Register for Free Trial';
        });

        // Initialize fingerprinting when page loads
        window.addEventListener('load', function() {
            generateFingerprint();
        });
    </script>
</body>
</html>
