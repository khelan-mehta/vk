// "use client";
// import React, { useState, ReactNode } from "react";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/Header";

// export default function DefaultLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   return (
//     <>
//       {/* <!-- ===== Page Wrapper Start ===== --> */}
//       <div className="flex">
//         {/* <!-- ===== Sidebar Start ===== --> */}
//         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//         {/* <!-- ===== Sidebar End ===== --> */}

//         {/* <!-- ===== Content Area Start ===== --> */}
//         <div className="relative flex flex-1 flex-col lg:ml-72.5">
//           {/* <!-- ===== Header Start ===== --> */}
//           <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
//           {/* <!-- ===== Header End ===== --> */}

//           {/* <!-- ===== Main Content Start ===== --> */}
//           <main>
//             <div className="mx-auto max-w-screen-2xl overflow-x-hidden p-4 md:p-6 2xl:p-10">
//               {children}
//             </div>
//           </main>
//           {/* <!-- ===== Main Content End ===== --> */}
//         </div>
//         {/* <!-- ===== Content Area End ===== --> */}
//       </div>
//       {/* <!-- ===== Page Wrapper End ===== --> */}
//     </>
//   );
// }

// components/Layouts/defaultLayout.tsx

// src/components/layouts/DefaultLayout.tsx
"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Loader from "@/components/common/Loader";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // if (status === "loading") {
  //   return <Loader />;
  // }

  // if (status === "unauthenticated") {
  //   router.push("/auth/signup");
  //   return null;
  // }
  // if (status === "authenticated") {
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col lg:ml-72.5">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl overflow-x-hidden p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
// }
// }
