import { compare } from 'bcryptjs'
import { connectToMongoDB } from '@/helpers/db'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET as string,
	session: {
		strategy: 'jwt',
		maxAge: 60 * 60,
	},
	providers: [
		CredentialsProvider({
			name: 'credentials',
			id: 'credentials',
			credentials: undefined!,
			async authorize(credentials, req) {
				try {
					const { username, password } = credentials!

					const client = await connectToMongoDB()
					const db = client.db('auth')

					const userCredentials = await db
						.collection('users')
						.findOne({ userName: username })

					if (!userCredentials) {
						client.close()
						throw new Error('User not found!')
					}

					const isValid =
						(await compare(password, userCredentials.hashedPassword)) &&
						username.trim() === userCredentials.userName

					if (!isValid) {
						throw new Error('Invalid credentials!')
					}

					client.close()

					return { name: userCredentials.userName } as any
				} catch {
					return null
				}
			},
		}),
	],
}

export default NextAuth(authOptions)
