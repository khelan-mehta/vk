// import React from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// const SidebarDropdown = ({ item }: any) => {
//   const pathname = usePathname();

//   return (
//     <>
//       <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
//         {item.map((item: any, index: number) => (
//           <li key={index}>
//             <Link
//               href={item.route}
//               className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${
//                 pathname === item.route ? "text-white" : ""
//               }`}
//             >
//               {item.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default SidebarDropdown;

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out
              hover:bg-[#8edddd] hover:text-[#222222]
              ${pathname === item.route ? "bg-[#2EC5B6] text-white" : "bg-white text-[#222222]"}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
