import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface Category {
    category: string;
    fields: string[];
}

interface Props {
    config: {
        headerCategory: Category;
        billingCategory: Category;
        itemsCategory: Category;
        footerCategory: Category;
    };
    inputValues: { [key: string]: string };
}

const styles = StyleSheet.create({
    categoryContainer: {
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    gridContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    gridItem: {
        width: '50%', // For 2 columns layout
        marginBottom: 8,
    },
});

const renderCategory = (category: Category, columns: number, inputValues: { [key: string]: string }) => (
    <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category.category}</Text>
        <View style={[styles.gridContainer, { columnCount: columns }]}>
            {category.fields.map((field, idx) => (
                <View key={idx} style={styles.gridItem}>
                    <Text>{field}: {inputValues[field]}</Text>
                </View>
            ))}
        </View>
    </View>
);

const Header: React.FC<{ category: Category, inputValues: { [key: string]: string } }> = ({ category, inputValues }) => renderCategory(category, 2, inputValues);
const Billing: React.FC<{ category: Category, inputValues: { [key: string]: string } }> = ({ category, inputValues }) => renderCategory(category, 3, inputValues);
const Items: React.FC<{ category: Category, inputValues: { [key: string]: string } }> = ({ category, inputValues }) => renderCategory(category, 2, inputValues);
const Footer: React.FC<{ category: Category, inputValues: { [key: string]: string } }> = ({ category, inputValues }) => renderCategory(category, 2, inputValues);

const DynaTemplate: React.FC<Props> = ({ config, inputValues }) => (
    <Document>
        <Page>
            <Header category={config.headerCategory} inputValues={inputValues} />
            <Billing category={config.billingCategory} inputValues={inputValues} />
            <Items category={config.itemsCategory} inputValues={inputValues} />
            <Footer category={config.footerCategory} inputValues={inputValues} />
        </Page>
    </Document>
);

export default DynaTemplate;
