import { Text, View, StyleSheet, Page, Document } from "@react-pdf/renderer";
import { TemplateOptionProps } from "../../../components/InvoiceTemplator/templateSelector";
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 4,
        marginRight: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10
    },
    section: {
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 12,
        marginBottom: 5,
    },
    table: {
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#000',
        backgroundColor: '#f0f0f0',
        padding: 5,
    },
    tableRow: {
        flexDirection: 'row',
        padding: 5,
    },
    tableCell: {
        flex: 1,
        fontSize: 10,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    totals: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
    text: {
        fontSize: 12
    }
});

type Props = {
    template: TemplateOptionProps,
    data: any
}
const PDFInvoice: React.FC<Props> = ({ template, data }) => {

    const renderCategoryBlock = () => {
        return template.template.categories.map((category: any, catIndex: number) => {
            switch (category.name) {
                case 'Header':
                    return (
                        <View style={styles.header}>
                            {category.fields.map((field: string, fieldIndex: number) => (
                                <View key={fieldIndex} style={styles.column}>
                                    <Text style={styles.text}>{field}: {data[category.name]?.fields[field]}</Text>
                                </View>
                            ))}
                        </View>
                    );

                default:
                    return null;
            }
        });
    };


    return (
        <Document>
            <Page size="A4" style={styles.container}>
                {renderCategoryBlock()}
            </Page>
        </Document>
    );
};

export default PDFInvoice;
