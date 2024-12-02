import { cookies, headers } from "next/headers"

import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios";

// import { privateRoutes } from "@/contains/contants" // an array like ["/", "/account"]

const privateRoutes = ['/'];

// @ts-ignore
// async function refreshAccessToken(token) { // this is our refresh token method
//     console.log("Now refreshing the expired token...")
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/refresh`, {
//             method: "POST",
//             headers: headers(),
//             body: JSON.stringify({ userID: token.userId })
//         })

//         const { success, data } = await res.json()

//         if (!success) {
//             console.log("The token could not be refreshed!")
//             throw data
//         }

//         console.log("The token has been refreshed successfully.")

//         // get some data from the new access token such as exp (expiration time)
//         const decodedAccessToken = JSON.parse(Buffer.from(data.accessToken.split(".")[1], "base64").toString())

//         return {
//             ...token,
//             accessToken: data.accessToken,
//             refreshToken: data.refreshToken ?? token.refreshToken,
//             idToken: data.idToken,
//             accessTokenExpires: decodedAccessToken["exp"] * 1000,
//             error: "",
//         }
//     } catch (error) {
//         console.log(error)

//         // return an error if somethings goes wrong
//         return {
//             ...token,
//             error: "RefreshAccessTokenError", // attention!
//         }
//     }
// }

export const config = {
    trustHost: true,
    theme: {
        logo: "https://next-auth.js.org/img/logo/logo-sm.png",
    },
    providers: [
        // we use credentials provider here
        CredentialsProvider({
            credentials: {
                phoneNumber: {
                    label: "phone number",
                    type: "number",
                    placeholder: "9****6785",
                },
                password: {
                    label: "password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const payload = {
                    phoneNumber: credentials.phoneNumber,
                    password: credentials.password,
                }
                console.log(process.env.API_BASE_URL);
                // external api for users to log in, change it with your own endpoint
                const res = await axios.post(`${process.env.API_BASE_URL}/auth/login`, payload);

                console.log(res);

                const user = await res.data;

                if (!(res.status >= 200 && res.status < 300)) {
                    throw new Error(user.message)
                }

                if (user) {
                    const prefix = process.env.NODE_ENV === "development" ? "__Dev-" : ""

                    // we set http only cookie here to store refresh token information as we will not append it to our session to avoid maximum size warning for the session cookie (4096 bytes)
                    cookies().set({
                        name: `${prefix}xxx.refresh-token`,
                        value: user.refreshToken,
                        httpOnly: true,
                        sameSite: "strict",
                        secure: true,
                    } as any)

                    return user
                }

                return null
            }
        })
    ],
    // this is required
    secret: process.env.AUTH_SECRET,
    // our custom login page
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                console.log("user: ", user);
                token.id = user._uid
                token.accessToken = user.access_token,
                token.refreshToken = user.access_token,
                token.role = "user" // the user role

                const decodedAccessToken = JSON.parse(Buffer.from(user.access_token.split(".")[1], "base64").toString())

                if (decodedAccessToken) {
                    token.userId = decodedAccessToken["sub"] as string
                    token.accessTokenExpires = decodedAccessToken["exp"] * 10000
                }

                // get some info about user from the id token
                // const decodedIdToken = JSON.parse(Buffer.from(user.idToken.split(".")[1], "base64").toString())

                // if (decodedIdToken) {
                //     token.email = decodedIdToken["email"]
                //     token.cognitoGroups = decodedIdToken["cognito:groups"]
                //     token.role = decodedIdToken["cognito:groups"].length ? decodedIdToken["cognito:groups"][0] : "Unknown"
                // }
            }

            // if our access token has not expired yet, return all information except the refresh token
            if ((token.accessTokenExpires && (Date.now() < Number(token.accessTokenExpires))) || token.error == "RefreshAccessTokenError") {
                const { refreshToken, ...rest } = token

                return rest
            }

            // if our access token has expired, refresh it and return the result
            // return await refreshAccessToken(token)
            return null;
        },

        async session({ session, token }) {
            console.log("session => ", session)

            return {
                ...session,
                user: {
                    ...session.user,
                    _uid: token.id as string,
                    email: token.email as string,
                    cognitoGroups: token.cognitoGroups as string[],
                    access_token: token.access_token as string,
                    accessTokenExpires: token.accessTokenExpires as number,
                    role: token.role as string
                },
                error: token.error,
            }
        },
        authorized({ request, auth }) {
            const { pathname } = request.nextUrl

            // get the route name from the url such as "/about"
            const searchTerm = request.nextUrl.pathname.split("/").slice(0, 2).join("/")

            // if the private routes array includes the search term, we ask authorization here and forward any unauthorized users to the login page
            if (privateRoutes.includes(searchTerm)) {
                console.log(`${!!auth ? "Can" : "Cannot"} access private route ${searchTerm}`)
                return !!auth
            // if the pathname starts with one of the routes below and the user is already logged in, forward the user to the home page
            } else if (pathname.startsWith("/login") || pathname.startsWith("/forgot-password") || pathname.startsWith("/signup")) {
                const isLoggedIn = !!auth

                if (isLoggedIn) {
                    return Response.redirect(new URL("/", request.nextUrl))
                }

                return true
            }

            return true
        },
    },
    debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig

export const { auth, handlers } = NextAuth(config)