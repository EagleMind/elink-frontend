import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

interface InvoiceDetails {
    vendor_name: string;
    client_name: string;
    delivery_date: Date;
    due_date: Date;
    invoice_name: string;
    total: number;
}

interface Item {
    description: string;
    price: number;
}

interface Props {
    invoiceDetails: InvoiceDetails;
    items: Item[];
    newItemName: string;
    newItemPrice: number;
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        padding: 20,
        marginBottom: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
    },
    section: {
        marginBottom: 5,

    },
    BillingInfos: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    flexRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderTopColor: '#999999',
        borderTopWidth: 1,
    },
    items: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomColor: '#999999',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        padding: 3
    },
    input: {
        margin: 5,
        fontSize: 12,
        color: "#5b5b5b",

    },
    table: {
        width: '100%',
        marginBottom: 10,
    },
    th: {
        borderBottomWidth: 1,
        borderColor: '#888',
        textAlign: 'left',
        padding: 5,
    },
    td: {
        borderBottomWidth: 1,
        borderColor: '#888',
        textAlign: 'right',
        padding: 5,
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 4,
        marginRight: 10,
    },
});

const PDFInvoice: React.FC<Props> = ({ invoiceDetails, items }) => (
    <Document>
        <Page size="A4" style={styles.container}>
            <View style={styles.headerSection}>
                <Text style={styles.header}>Invoice</Text>
                <Text>{invoiceDetails.invoice_name}</Text>
            </View>
            <View style={styles.BillingInfos}>
                <View style={styles.column}>
                    <Text style={styles.label}>Recipient</Text>
                    <Text style={styles.input}>{invoiceDetails.vendor_name}</Text>
                    <Text style={styles.label}>Date de livraison</Text>
                    <Text style={styles.input}>{invoiceDetails.delivery_date ? moment(invoiceDetails.delivery_date).format("DD-MM-YYYY") : null}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Destinataire</Text>
                    <Text style={styles.input}>{invoiceDetails.client_name}</Text>
                    <Text style={styles.label}>Date d'expiration</Text>
                    <Text style={styles.input}>{invoiceDetails.due_date ? moment(invoiceDetails.due_date).format("DD-MM-YYYY") : null}</Text>
                </View>
            </View>

            <View style={{ border: 1, borderColor: "#999999" }}>
                <View style={styles.tableHeader}>
                    <Text style={styles.label}>Description</Text>
                    <Text style={styles.label}>Amount</Text>
                </View>
                {items.map((item, index) => (
                    <View style={styles.items}>
                        <Text style={styles.input}>{item.description}</Text>
                        <Text style={styles.input}>{item.price.toFixed(2)}</Text>
                    </View>
                ))}
                <View style={styles.flexRow}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.label}>{invoiceDetails.total}</Text>
                </View>

            </View>

        </Page>
    </Document>
);

export default PDFInvoice;
