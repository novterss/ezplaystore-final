import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: { params: { scope: 'identify guilds' } }, // ขอสิทธิ์ดูข้อมูลพื้นฐาน
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return session;
    },
  },
});

export { handler as GET, handler as POST };