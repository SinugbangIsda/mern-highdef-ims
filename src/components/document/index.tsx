import { 
  Document, 
  Page, 
  Text, 
  StyleSheet, 
  View 
} from '@react-pdf/renderer';
import { formatDate } from '../../utils/formatDate';
import { 
  InvoiceDocumentProps, 
  Product 
} from '../../interfaces';

export const InvoiceDocument = ({ name, products, total_price }: InvoiceDocumentProps) => {
  const productsPerPage = 19;

  const splitProductsIntoPages = (products: Product[], productsPerPage: number) => {
    const pages = [];
    for (let i = 0; i < products.length; i += productsPerPage) {
      const pageProducts = products.slice(i, i + productsPerPage);
      pages.push(pageProducts);
    }
    return pages;
  };

  const productPages = splitProductsIntoPages(products, productsPerPage);

  const formatMoney = (value: number) => {
    const locale = 'en-PH';
    const currency = 'PHP';
  
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'code',
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <Document>
      {productPages.map((pageProducts, index) => (
        <Page 
          key = { index } 
          style = { styles.body }
          size = "LETTER"
        >
          <Text style = { styles.title }>
            { name }
          </Text>
          <Text style = { styles.subheading }>
            STATEMENT OF ACCOUNT
          </Text>
          <Text style = { styles.pageNumber }>
            {index + 1} / { productPages.length }
          </Text>
          <View style = { styles.rowContainer }>
            <Text style = { styles.header }>
              Date Issued
            </Text>
            <Text style = { styles.header }>
              Item
            </Text>
            <Text style = { styles.header }>
              Quantity
            </Text>
            <Text style = { styles.header }>
              Price
            </Text>
          </View>
          { pageProducts.map((product, productIndex) => (
            <View 
              key = { productIndex } 
              style = { styles.rowContainer }
            >
              <Text style = { styles.value }>
                { formatDate(product.date.toString(), 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX', 'MM/dd/yyyy') }
              </Text>
              <Text style = { styles.value }>
                { product.name }
              </Text>
              <Text style = { styles.value }>
                { product.quantity }
              </Text>
              <Text style = { styles.value }> 
                { formatMoney(product.price) }
              </Text>
            </View>
          ))}
          { index === productPages.length - 1 && (
            <>
              <View style = { styles.totalContainer }>
                <Text>
                  TOTAL PRICE
                </Text>
                <Text style = { styles.total }>
                  { formatMoney(total_price) }
                  </Text>
              </View>
              <View style = { styles.signatureContainer }>
                <View style = { styles.signatureWrapper }>
                  <Text>
                    Submitted by
                  </Text>
                  <Text style = { styles.signatureName }>
                    Michael H. Operario
                  </Text>
                </View>
              </View>
            </>
          )}
        </Page>
      ))}
    </Document>
  );
};


const styles = StyleSheet.create({
  body: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: "Times-Roman"
  },
  title: {
    textAlign: 'center',
    textTransform: "uppercase",
    fontFamily: "Times-Bold",
    fontSize: 18,
    marginVertical: 5,
    marginTop: 10
  },
  subheading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginVertical: 5,
    marginBottom: 15
  },
  text: {
    margin: 10,
    fontSize: 12,
    textAlign: 'justify'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5
  },
  header: {
    fontFamily: "Times-Bold",
    flex: 1,
    textAlign: 'center',
  },
  value: {
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 55,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  product: {
    fontSize: 12,
    marginTop: 5,
  },
  total: {
    marginTop: 10,
    fontFamily: "Times-Bold"
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginTop: 10,
    fontSize: 14
  },
  signatureContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    marginTop: 25,
    fontSize: 16
  },
  signatureWrapper: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },
  signatureName: {
    fontFamily: "Times-Bold",
    marginTop: 25
  }
});
