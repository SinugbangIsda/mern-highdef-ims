import PrivateRouteLayout from '../../components/layouts/privateroute';
import TransactionsTable from "../../components/transactions/tables";

const Transactions = () => {  
  return (
    <PrivateRouteLayout heading = "Transactions">
      <TransactionsTable />
    </PrivateRouteLayout>
  )
}

export default Transactions;