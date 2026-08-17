// import React from "react";
// import UserNavbar from "../../components/user/userNavbar";
// import WelcomeSection from "../../components/user/WelcomeSection";
// import QuickStats from "../../components/user/QuickStats";
// import AvailabilitySection from "../../components/user/AvailabilitySection";
// import NearbyRequestsPreview from "../../components/user/NearbyRequestsPreview";
// import UserFooter from "../../components/user/UserFooter";

// function Dashboard() {
//   return (
//     <main className="bg-[#F6F3EC] min-h-screen">
//       <UserNavbar />
//       <WelcomeSection />
//       <QuickStats />
//       <AvailabilitySection />
//       <NearbyRequestsPreview />
//       <UserFooter />
//     </main>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";

import UserNavbar from "../../components/user/UserNavbar";
import WelcomeSection from "../../components/user/WelcomeSection";
import RoleSelector from "../../components/user/RoleSelector";
import QuickStats from "../../components/user/QuickStats";
import AvailabilitySection from "../../components/user/AvailabilitySection";
import NearbyRequestsPreview from "../../components/user/NearbyRequestsPreview";
import UserFooter from "../../components/user/UserFooter";
import CreateRequest from "./CreateRequest";
import MyRequests from "./MyRequest";
import NearbyActiveDonors from "../../components/user/NearbyActiveDonors";

function Dashboard() {
  const [role, setRole] = useState("donor");

  return (
    <main className="bg-[#F6F3EC] min-h-screen">
      <UserNavbar role={role} setRole={setRole} />

      <WelcomeSection />

      {role === "donor" ? (
        <>
          <QuickStats />
          <AvailabilitySection />
          <NearbyRequestsPreview />
        </>
      ) : (
        <>
          <CreateRequest />
          <MyRequests />
          <NearbyActiveDonors />
        </>
      )}

      <UserFooter />
    </main>
  );
}

export default Dashboard;
