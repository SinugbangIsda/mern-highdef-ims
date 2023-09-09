import PrivateRouteLayout from '../../components/layouts/privateroute';
import AdminRoute from '../../components/layouts/privateroute/adminroute';
import UsersTable from '../../components/users/tables';
const Users = () => {
  return (
    <PrivateRouteLayout heading = "Users">
      <AdminRoute />
      <UsersTable />
    </PrivateRouteLayout>
  )
}

export default Users;