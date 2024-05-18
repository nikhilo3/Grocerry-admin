import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import logo from "../../assets/icons/logo.png";
import { IOrder } from "../../types/order.types";
import interRegularFont from "../../assets/fonts/Inter-Regular.ttf";
// Register font
Font.register({
  family: "Inter",
  src: interRegularFont,
});
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FAFAFA",
    fontFamily: "Inter",
  },
  section: {
    display: "flex",
    gap: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgRight: {
    width: 290,
    height: 60,
  },
  imgLeft: {
    height: 55,
    width: 350,
  },
  body: {
    paddingHorizontal: 50,
    paddingVertical: 30,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: 75,
    width: 175,
  },
  logoText: {
    height: 35,
    width: 90,
    objectFit: "contain",
    objectPosition: "center",
  },
  line: {
    height: 1,
    width: "100%",
  },
  orderDetailsText: {
    fontSize: 14,
    fontWeight: 400,
  },
  customerDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  customerDetailsView: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "left",
  },
  customerDetailsViewRight: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    textAlign: "right",
    alignItems: "flex-end",
  },
  customerDetailsHeading: {
    fontSize: 16,
    fontWeight: 600,
  },
  customerDetailsText: {
    fontSize: 13,
    fontWeight: 500,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 6,
    width: 500,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "rgba(233, 39, 64, 0.75)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    color: "white",
    fontWeight: 600,
  },
  table1stRow: {
    width: 200,
  },
  tableOtherRows: {
    width: 100,
    alignItems: "center",
  },
  tableLastRow: {
    width: 100,
    alignItems: "flex-end",
  },
  tableLastBody: {
    width: 100,
    alignItems: "center",
  },
  tableBody: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    color: "black",
    fontSize: 14,
  },
  thankYou: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  thankYouText: {
    fontSize: 14,
    fontWeight: 400,
  },
  thankYouDesc: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: 200,
    padding: 6,
    backgroundColor: "#FFFFFF",
  },
  thankYouDescText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thankYouDescTextBold: {
    fontWeight: 700,
    fontSize: 17,
  },
  thankYouDescTextNormal: {
    fontWeight: 400,
    fontSize: 12,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: 500,
  },
  footerTextContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  footerImg: {
    height: 14,
    width: 14,
  },
});

const InvoicePdf = ({ order }: { order: IOrder }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.body}>
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
          </View>
          <View style={styles.header}>
            <Text style={styles.orderDetailsText}>Order Id: {order?.id}</Text>
            <Text style={styles.orderDetailsText}>
              Date: {new Date(order?.paidDate).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.customerDetailsContainer}>
            <View style={styles.customerDetailsView}>
              <Text style={styles.customerDetailsHeading}>
                Customer Details
              </Text>
              <Text style={styles.customerDetailsText}>
                Name: {order?.userDetailsDto?.name}
              </Text>
              <Text style={styles.customerDetailsText}>
                Email: {order?.userDetailsDto?.email}
              </Text>

              <View>
                <Text style={styles.customerDetailsText}>
                  Address: {order?.shippingInfo?.landmark},{" "}
                </Text>
                <Text style={styles.customerDetailsText}>
                  {order?.shippingInfo?.addressLine1}
                </Text>
                {order?.shippingInfo?.city}
                <Text style={styles.customerDetailsText}>
                  {order?.shippingInfo?.state}, {order?.shippingInfo?.pincode}
                </Text>
              </View>
            </View>
            <View style={styles.customerDetailsViewRight}>
              <Text style={styles.customerDetailsHeading}>Payment Details</Text>
              <Text style={styles.customerDetailsText}>
                Payment Id: {order?.paymentId}
              </Text>
            </View>
          </View>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.table1stRow}>Product</Text>
              <Text style={styles.tableOtherRows}>Quantity</Text>
              <Text style={styles.tableOtherRows}>Price</Text>
              <Text style={styles.tableLastRow}>Total</Text>
            </View>
            {order?.boughtProductDetailsList?.map((item, i) => (
              <View style={styles.tableBody} key={i}>
                <Text style={styles.table1stRow}>{item?.name}</Text>
                <Text style={styles.tableOtherRows}>
                  {item?.boughtQuantity}
                </Text>
                <Text style={styles.tableOtherRows}>
                  {"\u20B9"} {item?.discountedPrice}
                </Text>
                <Text style={styles.tableLastBody}>
                  {"\u20B9"}{" "}
                  {Number(item?.boughtQuantity) * Number(item?.discountedPrice)}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.thankYou}>
            <Text style={styles.thankYouText}>Thank you for your business</Text>
            <View style={styles.thankYouDesc}>
              <View style={styles.thankYouDescText}>
                <Text style={styles.thankYouDescTextBold}>Sub Total: </Text>
                <Text style={styles.thankYouDescTextNormal}>
                  {"\u20B9"} {order?.totalItemCost}
                </Text>
              </View>
              <View style={styles.thankYouDescText}>
                <Text style={styles.thankYouDescTextBold}>
                  Delivery Charge:{" "}
                </Text>
                <Text style={styles.thankYouDescTextNormal}>
                  {"\u20B9"} {order?.deliveryCharges}
                </Text>
              </View>
              <View style={styles.thankYouDescText}>
                <Text style={styles.thankYouDescTextBold}>Grand Total: </Text>
                <Text style={styles.thankYouDescTextNormal}>
                  {"\u20B9"} {order?.totalCost}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default InvoicePdf;
