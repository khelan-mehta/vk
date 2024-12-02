// in app/providers.tsx

"use client"

import type { NextAuthResult, Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

// THIS WILL WORK

export default function ClientSessionProvider({ session, children }: { session: Session | null, children: React.ReactNode }) {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}