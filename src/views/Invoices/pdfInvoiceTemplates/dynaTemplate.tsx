import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from '@react-pdf/renderer';

// Define interfaces for TypeScript
interface Item {
    description: string;
    price: number;
    qty: number;
}

interface FormState {
    [categoryName: string]: {
        fields: {
            [fieldName: string]: string;
        };
    };
}

interface TemplateCategory {
    name: string;
    fields: string[] | { [fieldName: string]: string };
}

interface PDFInvoiceProps {
    template?: {
        categories: TemplateCategory[];
    };
    data: {
        total: number;
        items: Item[];
        formData: FormState;
    };
}

// Define styles for the PDF
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 20
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
        marginVertical: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerColumn: {
        flex: 1,
        marginHorizontal: 10, // increased space between columns
    },
    fieldContainer: {
        marginBottom: 10, // space between fields
    },
    text: {
        flexWrap: 'nowrap', // prevents text from wrapping
        whiteSpace: 'nowrap', // keeps text in one line
        fontSize: 12
    },
    section: {
        flexWrap: "wrap",
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

});
const formatFieldName = (fieldName: string) => {
    // Convert camelCase to normal text (e.g., businessName -> Business Name)
    return fieldName.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};
const PDFInvoice: React.FC<PDFInvoiceProps> = ({ template, data }) => {
    console.log("data", data, template)
    const renderCategoryBlock = () => {
        if (!template) {
            return null; // Handle case where template is not defined
        }

        return template.template.categories.map((category, catIndex) => {
            switch (category.name) {
                case 'Header':
                    return (
                        <View key={catIndex} style={styles.header}>
                            <View style={styles.headerRow}>
                                <View style={styles.headerColumn}>
                                    {category.fields.slice(0, Math.ceil(category.fields.length / 2)).map((field: string, fieldIndex: number) => (
                                        <View key={fieldIndex} style={styles.fieldContainer}>
                                            <Text style={styles.text}>{formatFieldName(field)}: {data.formData[category.name]?.fields[field]}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.headerColumn}>
                                    {category.fields.slice(Math.ceil(category.fields.length / 2)).map((field: string, fieldIndex: number) => (
                                        <View key={fieldIndex + Math.ceil(category.fields.length / 2)} style={styles.fieldContainer}>
                                            <Text style={styles.text}>{formatFieldName(field)}: {data.formData[category.name]?.fields[field]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    );
                case 'Billing Information':
                    return (
                        <View key={catIndex} style={styles.header}>
                            <View style={styles.headerRow}>
                                <View style={styles.headerColumn}>
                                    {category.fields.slice(0, Math.ceil(category.fields.length / 2)).map((field: string, fieldIndex: number) => (
                                        <View key={fieldIndex} style={styles.fieldContainer}>
                                            <Text style={styles.text}>{formatFieldName(field)}: {data.formData[category.name]?.fields[field]}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={styles.headerColumn}>
                                    {category.fields.slice(Math.ceil(category.fields.length / 2)).map((field: string, fieldIndex: number) => (
                                        <View key={fieldIndex + Math.ceil(category.fields.length / 2)} style={styles.fieldContainer}>
                                            <Text style={styles.text}>{formatFieldName(field)}: {data.formData[category.name]?.fields[field]}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>
                    );



                case 'Items':
                    return (
                        <View key={catIndex} style={styles.section}>

                            <View style={styles.table}>
                                <View style={[styles.tableRow, styles.tableHeader]}>
                                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Description</Text>
                                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Price</Text>
                                    <Text style={[styles.tableCell, styles.tableHeaderCell]}>Qty</Text>
                                </View>
                                {data.items.map((item, itemIndex) => (
                                    <View key={itemIndex} style={styles.tableRow}>
                                        <Text style={styles.tableCell}>{item.description}</Text>
                                        <Text style={styles.tableCell}>{item.price}</Text>
                                        <Text style={styles.tableCell}>{item.qty}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                case 'Footer':
                    return (
                        <View key={catIndex} style={styles.section}>
                            {category.fields.map((field: string, fieldIndex: number) => (
                                <View key={fieldIndex} style={styles.fieldContainer}>
                                    <Text style={styles.text}>{formatFieldName(field)}: {data.formData[field].toString()}</Text>
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
