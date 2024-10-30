// "use client";
// import "jsvectormap/dist/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
// import "@/css/satoshi.css";
// import "@/css/style.css";
// import React, { useEffect, useState } from "react";
// import Loader from "@/components/common/Loader";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return (
//     <html lang="en">
//       <body suppressHydrationWarning={true}>
//         <div className="dark:bg-boxdark-2 dark:text-bodydark">
//           {loading ? <Loader /> : children}
//         </div>
//       </body>
//     </html>
//   );
// }

// src/app/layout.tsx
"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session?: any;
}) {
  const [loading, setLoading] = useState<boolean>(true);
  // const { data: session, status } = useSession();
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <SessionProvider session={session}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
