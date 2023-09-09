import { Fragment } from 'react';
import useTabs from '../../../hooks/useTabs';
import { useAppSelector } from '../../../redux/hooks';
import TableTabs from '../../table/tabs';
import { transactions_tables_list } from './tableslist';
import { User } from '../../../interfaces';

const TransactionsTable = () => {
  const user = useAppSelector((state: any) => state.auth.user);
  const userData: User = JSON.parse(user);
  const { role } = userData;
  const { 
    currentTab, 
    navigateTab, 
    tabs 
  } = useTabs({ tabs: transactions_tables_list, role: role });
  
  return (
    <>
      <TableTabs 
        tabs = { tabs }
        currentTab = { currentTab }
        onClick = { navigateTab }
      />
      { transactions_tables_list.map((val, i) => (
        currentTab === i && (
          <Fragment key = { i }>
            { val.table }
          </Fragment>
        )
      ))}
    </>
  )
};

export default TransactionsTable;