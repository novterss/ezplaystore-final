
import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { supabase } from "@/lib/supabase";

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            authorization: { params: { scope: 'identify email guilds guilds.members.read' } },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.accessToken = token.accessToken;
            // Fetch fresh user data from Supabase to get roles
            const { data } = await supabase
                .from('users')
                .select('roles, is_member')
                .eq('email', session.user.email)
                .single();

            if (data) {
                session.user.roles = data.roles;
                session.user.isMember = data.is_member;
            }
            return session;
        },
        async signIn({ user, account }: any) {
            if (account?.provider === 'discord') {
                let discordRoles: any[] = [];
                let isMember = false;

                try {
                    const guildId = process.env.DISCORD_GUILD_ID;
                    const botToken = process.env.DISCORD_BOT_TOKEN;

                    if (guildId && botToken) {
                        // 1. Fetch User's Member Data
                        const memberRes = await fetch(`https://discord.com/api/users/@me/guilds/${guildId}/member`, {
                            headers: { Authorization: `Bearer ${account.access_token}` },
                        });

                        if (memberRes.ok) {
                            const memberData = await memberRes.json();
                            const memberRoleIds = memberData.roles || [];
                            isMember = true;

                            // 2. Fetch All Guild Roles (to get Names/Colors) - REQUIRES BOT TOKEN
                            const guildRolesRes = await fetch(`https://discord.com/api/guilds/${guildId}/roles`, {
                                headers: { Authorization: `Bot ${botToken}` },
                            });

                            if (guildRolesRes.ok) {
                                const allRoles = await guildRolesRes.json();

                                // 3. Map IDs to Objects
                                discordRoles = memberRoleIds.map((id: string) => {
                                    const role = allRoles.find((r: any) => r.id === id);
                                    return role ? {
                                        id: role.id,
                                        name: role.name,
                                        color: role.color ? `#${role.color.toString(16).padStart(6, '0')}` : '#99aab5' // Default Gray
                                    } : { id, name: 'Unknown Role', color: '#99aab5' };
                                });
                            } else {
                                // Fallback if Bot fails: Just save IDs
                                discordRoles = memberRoleIds.map((id: string) => ({ id, name: id, color: '#99aab5' }));
                                console.error('Failed to fetch guild roles (Bot not in server?):', await guildRolesRes.text());
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error in Discord Auth:', error);
                }

                // 4. Save to Supabase
                const { error } = await supabase
                    .from('users')
                    .upsert({
                        discord_id: account.providerAccountId,
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        last_login: new Date().toISOString(),
                        roles: discordRoles, // Now saves Array of Objects!
                        is_member: isMember
                    }, { onConflict: 'discord_id' });

                if (error) {
                    console.error('Error saving user to Supabase:', error);
                }
            }
            return true;
        },
    },
};
