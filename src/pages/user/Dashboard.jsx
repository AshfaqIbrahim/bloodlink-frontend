import React from "react";
import WelcomeSection from "../../components/user/WelcomeSection";
import QuickStats from "../../components/user/QuickStats";
import AvailabilitySection from "../../components/user/AvailabilitySection";

function Dashboard() {
  return (
    <div>
      <WelcomeSection />
      <QuickStats />
      <AvailabilitySection />
    </div>
  );
}

export default Dashboard;
