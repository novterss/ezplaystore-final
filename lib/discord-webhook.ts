// Discord Webhook for Push Notifications
// Used to send notifications to Discord when events occur

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

interface WebhookEmbed {
    title?: string;
    description?: string;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    footer?: { text: string };
    timestamp?: string;
    thumbnail?: { url: string };
}

interface WebhookMessage {
    content?: string;
    embeds?: WebhookEmbed[];
    username?: string;
    avatar_url?: string;
}

export async function sendDiscordNotification(message: WebhookMessage): Promise<boolean> {
    if (!DISCORD_WEBHOOK_URL) {
        console.warn('Discord webhook URL not configured');
        return false;
    }

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: message.username || 'EzplaystoreTH Bot',
                avatar_url: message.avatar_url || 'https://ezplaystoreth.vercel.app/images/ezicon3.png',
                ...message
            })
        });

        if (!response.ok) {
            console.error('Discord webhook failed:', response.statusText);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Discord webhook error:', error);
        return false;
    }
}

// Pre-built notification functions
export async function notifyNewPurchase(userEmail: string, productName: string) {
    return sendDiscordNotification({
        embeds: [{
            title: '🛒 New Purchase!',
            description: `A new purchase has been made!`,
            color: 0x00FF00, // Green
            fields: [
                { name: '👤 User', value: userEmail, inline: true },
                { name: '📦 Product', value: productName, inline: true }
            ],
            footer: { text: 'EzplaystoreTH Purchase System' },
            timestamp: new Date().toISOString()
        }]
    });
}

export async function notifyNewUser(userName: string, userEmail: string) {
    return sendDiscordNotification({
        embeds: [{
            title: '👋 New User Registered!',
            description: `A new user has joined EzplaystoreTH!`,
            color: 0x5865F2, // Discord Blue
            fields: [
                { name: '👤 Name', value: userName, inline: true },
                { name: '📧 Email', value: userEmail, inline: true }
            ],
            footer: { text: 'EzplaystoreTH User System' },
            timestamp: new Date().toISOString()
        }]
    });
}

export async function notifyDownload(userName: string, fileName: string) {
    return sendDiscordNotification({
        embeds: [{
            title: '⬇️ Download Tracked',
            description: `A user downloaded a file`,
            color: 0x00BFFF, // Deep Sky Blue
            fields: [
                { name: '👤 User', value: userName, inline: true },
                { name: '📁 File', value: fileName, inline: true }
            ],
            footer: { text: 'EzplaystoreTH Download Tracker' },
            timestamp: new Date().toISOString()
        }]
    });
}

export async function notifyMembershipChange(userName: string, newStatus: 'joined' | 'left') {
    const isJoined = newStatus === 'joined';
    return sendDiscordNotification({
        embeds: [{
            title: isJoined ? '✅ Member Verified!' : '❌ Member Left',
            description: isJoined
                ? `User has been verified as Discord member!`
                : `User is no longer a Discord member`,
            color: isJoined ? 0x00FF00 : 0xFF0000,
            fields: [
                { name: '👤 User', value: userName, inline: true }
            ],
            footer: { text: 'EzplaystoreTH Membership System' },
            timestamp: new Date().toISOString()
        }]
    });
}
