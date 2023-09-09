import { Fragment } from 'react';
import useTabs from '../../../hooks/useTabs';
import { useAppSelector } from '../../../redux/hooks';
import TableTabs from '../../table/tabs';
import { users_tables_list } from './tabelist';
import { User } from '../../../interfaces';

const UsersTable = () => {
  const user = useAppSelector((state) => state.auth.user);
  const userData: User = JSON.parse(user);
  const { role } = userData;
  const { 
    currentTab, 
    navigateTab, 
    tabs 
  } = useTabs({ tabs: users_tables_list, role: role });
  

  return (
    <>
      <TableTabs 
        tabs = { tabs }
        currentTab = { currentTab }
        onClick = { navigateTab }
      />
      { users_tables_list.map((val, i) => (
        currentTab === i && (
          <Fragment key = { i }>
            { val.table }
          </Fragment>
        )
      ))}
    </>
  )
};

export default UsersTable;