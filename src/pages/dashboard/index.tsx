import PrivateRouteLayout from '../../components/layouts/privateroute';
import RecentTransactionsTable from '../../components/dashboard/recent';
import DashboardStastics from '../../components/dashboard/statistics';

const Dashboard = () => {
  return (
    <PrivateRouteLayout heading = "Dashboard">
      <DashboardStastics />
      <RecentTransactionsTable />
    </PrivateRouteLayout>
  )
}

export default Dashboard;