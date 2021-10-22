import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import pg from "libs/pg"
import bcrypt from "libs/bcrypt"
import config from "config/config"
import uuid from 'uuid'

const handleGoogleAuth = async (user) => {
  try {
    const flag = await pg.user.findUnique({
      where: { email: user.email }
    })

    if (!flag) {
      await pg.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: bcrypt.hash(uuid.v4())
        }
      })
    }

    return true
  } catch (err) {
    return false
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      name: 'Google',
      clientId: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope: "https://www.googleapis.com/auth/userinfo.profile",
    }),
    CredentialsProvider({
      name: 'Credentials',
      authorize: async (credentials) => {
        try {
          const { email, password } = credentials

          const user = await pg.user.findUnique({
            where: { email }
          })

          if (!user) {
            throw { message: "auth failed" }
          } else if (!bcrypt.compare(password, user.password)) {
            throw { message: "auth failed" }
          }

          return user
        } catch (err) {
          throw {
            message: "Email atau password salah"
          }
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === 'google') {
        return await handleGoogleAuth(user)
      }

      return true
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/class-list"
    },
    async session({ session }) {
      return session
    }
  }
})