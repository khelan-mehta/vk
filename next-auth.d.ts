import { DefaultSession } from "next-auth"

declare module "next-auth" {
    interface User {
        _uid: string
        email?: string
        cognitoGroups: string[]
        access_token: string
        refreshToken: string
        idToken: string
        exp: number
        role?: string
    }

    interface Session {
        user: User & DefaultSession["user"]
        expires: string
        error: string
    }
}