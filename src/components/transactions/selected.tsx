import { 
  useState,
  useEffect
} from "react";
import { useGetTransactionByIdQuery } from '../../redux/services/transactionsServices';
import PrivateRouteLayout from '../layouts/privateroute';
import { 
  useLocation, 
  useNavigate 
} from 'react-router-dom';
import { Transaction } from "../../interfaces";
import Button from "../form/button";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { InvoiceDocument } from "../document";
import { formatDate } from "../../utils/formatDate";
import { LuHistory } from "react-icons/lu";
import { 
  TbReportAnalytics,
  TbReportMoney
} from  "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import Table from "../table";
import { produccts_table_headers } from "../../constants";
import { formatMoney } from "../../utils/formatMoney";

const SelectedTransaction = () => {
  const [ transaction, setTransaction ] = useState<Transaction>();
  const location = useLocation();
  const path = location.pathname.split("/");
  const id = path[path.length - 1];
  const navigate = useNavigate();

  const { 
    data,
    isLoading,
    isFetching,
    refetch
  } = useGetTransactionByIdQuery({ _id: id });

  useEffect(() => {
    if (data) {
      setTransaction(data);
    }
  }, [ data ]);

  useEffect(() => {
    refetch();
  }, [ refetch ]);

  return (
    <PrivateRouteLayout heading = "Transaction">
      {(transaction && !isLoading) && (
        <div className = "w-full flex flex-col gap-4 my-3">
          <span
            className = "cursor-pointer hover:text-[#3E78BC]"
            onClick = {() => navigate(-1)}
          >
            &lt;- Go Back
          </span>
          <div className = " bg-white dark:bg-[#222938] w-full rounded-lg p-6 flex items-center gap-6">
            <span className = "text-3xl">
              <LuHistory />
            </span>
            <div className = "flex flex-col w-full gap-2">
              <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                Transaction ID
              </span>
              <span className = "break-all font-bold text-xl text-[#2C2E39] dark:text-[#A6ADBA]">
                { transaction?._id } 
              </span>
            </div>
          </div>
          <div className = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className = "bg-white dark:bg-[#222938] rounded-lg p-6 flex flex-col gap-2">
              <span className = "text-3xl">
                <TbReportAnalytics />
              </span>
              <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                Transaction Name
              </span>
              <span className = "break-all font-bold text-lg text-[#2C2E39] dark:text-[#A6ADBA] capitalize">
                { transaction?.transaction_name }
              </span>
            </div>
            <div className = "bg-white dark:bg-[#222938] rounded-lg p-6 flex flex-col gap-2">
              <span className = "text-3xl">
                <TbReportMoney />
              </span>
              <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                Total Price
              </span>
              <span className = "break-all font-bold text-lg text-[#2C2E39] dark:text-[#A6ADBA]">
                { formatMoney(transaction.total_price) }
              </span>
            </div>
            <div className = "bg-white dark:bg-[#222938] rounded-lg p-6 flex flex-col gap-2">
              <span className = "text-3xl">
                <MdOutlineDateRange />
              </span>
              <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                Date of Payment
              </span>
              <span className = "break-all font-bold text-lg text-[#2C2E39] dark:text-[#A6ADBA]">
                { transaction?.payment_date ? formatDate(transaction?.payment_date!.toString()!, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', "MMMM dd, yyyy") : "Unpaid" }
              </span>
            </div>
            <div className = "bg-white dark:bg-[#222938] rounded-lg p-6 flex flex-col gap-2">
              <span className = "text-3xl">
                <MdOutlineDateRange />
              </span>
              <span className = "text-[#A2ABAE] dark:text-[#8792A6]">
                Created At
              </span>
              <span className = "break-all font-bold text-lg text-[#2C2E39] dark:text-[#A6ADBA]">
                { formatDate(transaction?.createdAt!.toString()!, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', "MMMM dd, yyyy") }
              </span>
            </div>
          </div>
          <Table 
            data = { transaction?.products! }
            isLoading = { isLoading }
            isFetching = { isFetching }
            headers = { produccts_table_headers }
            customTitleWithButtons = {
              <div className = "flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className = "font-semibold text-[#383A45] dark:text-[#EEEEEF] text-lg">
                  Products
                </h3>
                <div className = "flex flex-col sm:flex-row justify-between items-center gap-4 w-full sm:w-auto">
                  <div className = "w-full sm:w-32">
                    <PDFDownloadLink  
                      document = { 
                        <InvoiceDocument 
                          name = { transaction.transaction_name }
                          products = { transaction.products }
                          total_price = { transaction.total_price }
                      /> }
                      fileName =  { transaction?._id }
                    >
                      <Button 
                        type = "button"
                        label = "Export"
                        defaultBG
                      />
                    </PDFDownloadLink>
                  </div>
                </div>
              </div>
            }
            isViewOnly
            products
          />
        </div>
      )}
      {(!data && !isLoading) &&(
        <div className = "h-full flex justify-center items-center">
          <span className = "text-2xl">
            Transaction Not Found!
          </span>
        </div>
      )}
    </PrivateRouteLayout>
  )
}

export default SelectedTransaction;