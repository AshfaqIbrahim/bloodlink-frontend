import React from "react";
import WelcomeSection from "../../components/user/WelcomeSection";
import QuickStats from "../../components/user/QuickStats";
import AvailabilitySection from "../../components/user/AvailabilitySection";
import NearbyRequestsPreview from "../../components/user/NearbyRequestsPreview";

function Dashboard() {
  return (
    <div>
      <WelcomeSection />
      <QuickStats />
      <AvailabilitySection />
      <NearbyRequestsPreview />
    </div>
  );
}

export default Dashboard;
