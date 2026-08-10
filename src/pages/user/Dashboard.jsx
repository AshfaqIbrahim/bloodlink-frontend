import React from "react";
import WelcomeSection from "../../components/user/WelcomeSection";
import QuickStats from "../../components/user/QuickStats";
import AvailabilitySection from "../../components/user/AvailabilitySection";
import NearbyRequestsPreview from "../../components/user/NearbyRequestsPreview";
import Footer from "../../components/common/Footer";
import UserNavbar from "../../components/user/userNavbar";

function Dashboard() {
  return (
    <main className="bg-[#F6F3EC] min-h-screen">
      <UserNavbar />
      <WelcomeSection />
      <QuickStats />
      <AvailabilitySection />
      <NearbyRequestsPreview />
      <Footer />
    </main>
  );
}

export default Dashboard;
