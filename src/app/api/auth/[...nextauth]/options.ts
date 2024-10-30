import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Client from "@/lib/apiClient";

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string; // Add accessToken property
    ownerId?: string;
    restaurantId?: string;
  }
}

declare module "next-auth" {
  interface Session {
    access_token?: string; // Add accessToken property
    _oid?: string;
    _rid?: string;
  }
}
// export const getServerAuthSession = () => getServerSession(authOptions);
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials): Promise<any> {
        const { PhoneNumber, password, action, email, name } = credentials as {
          PhoneNumber: string;
          email: string;
          name: string;
          password: string;
          action: "signin" | "signup";
        };
        if (!PhoneNumber || !password) {
          return null;
        }
        const apiClient = new Client(
          {},
          null,
          false,
          false,
          process.env.API_BASE_URL,
        );

        try {
          let response;
          if (action === "signup") {
            response = await apiClient.post("/auth/restaurant-owner/register", {
              phoneNumber: PhoneNumber,
              password,
              email: email,
              ownerName: name,
              isVerified: true,
              restaurantIds: [],
              isDeleted: false,
            });
            if (response) {
              return {
                ownerId: response.token._oid,
                accessToken: response.token.access_token,
              };
            }
          } else {
            response = await apiClient.post("/auth/restaurant-owner/login", {
              phoneNumber: PhoneNumber,
              password,
            });
            if (response) {
              return {
                // ...response.user,
                ownerId: response._oid,
                restaurantId: response._rid,
                accessToken: response.access_token,
              };
            }
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        (session as any).accessToken = token.accessToken;
      }
      if (token.ownerId) {
        (session as any).ownerId = token.ownerId; // Add ownerId to the session
      }
      return session;
    },
  },
  pages: {
    signIn: "auth/signin",
    // signUp: "auth/signup",
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
};
