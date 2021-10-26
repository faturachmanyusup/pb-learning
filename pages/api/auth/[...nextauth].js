import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import pg from "libs/pg"
import bcrypt from "libs/bcrypt"
import config from "config/config"
import { v4 as uuidV4 } from 'uuid'

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
          image: user.image,
          password: bcrypt.hash(uuidV4())
        }
      })
    }

    return true
  } catch (err) {
    return false
  }
}

export default NextAuth({
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
            throw { message: "Akun tidak ditemukan" }
          } else if (!bcrypt.compare(password, user.password)) {
            throw { message: "Email atau password salah" }
          }

          return user
        } catch (err) {
          throw {
            message: err.message
          }
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        return await handleGoogleAuth(user)
      }

      return true
    },
    async redirect() {
      return config.url.base + "/class/list"
    },
    async jwt({ token }) {
      return token
    },
    async session({ session }) {
      const user = await pg.user.findUnique({
        where: { email: session.user.email }
      })

      if (!user) {
        throw {
          message: "Email atau password salah"
        }
      }

      return { 
        ...session,
        user: {
          ...session.user,
          id: user.id
        }
      }
    },
  },
  jwt: {
    secret: config.JWT_KEY,
  }
})