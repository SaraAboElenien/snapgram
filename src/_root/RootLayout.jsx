import { Outlet } from "react-router-dom";
import Topbar from "@/components/Shared/Topbar";
import Bottombar from "@/components/Shared/Bottombar";
import LeftSidebar from "@/components/Shared/LeftSidebar";
import React from "react";

// const RootLayout = () => {
//   return (
//     <div className="w-full h-screen flex flex-col">
//       <Topbar />

//       <div className="flex flex-1 overflow-hidden">
//         <LeftSidebar className="leftsidebar" />

//         <section className="flex-1 overflow-y-auto custom-scrollbar">
//           <Outlet />
//         </section>
//       </div>

//       <Bottombar />
//     </div>
//   );
// };

const RootLayout = () => {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
};

export default RootLayout;
