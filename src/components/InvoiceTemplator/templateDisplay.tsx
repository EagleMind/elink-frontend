// TemplateDisplay.tsx
import React from 'react';
import DynaTemplate from './pdfInvoiceTemplates/dynaTemplate';
import { PDFViewer, Document } from '@react-pdf/renderer';
import { TemplateOption } from './templateSelector';




interface TemplateDisplayProps {
    config: TemplateOption | null;
    inputValues: { [key: string]: string };
    onInputChange: (fieldName: string, value: string) => void;
}

const TemplateDisplay: React.FC<TemplateDisplayProps> = ({ config, inputValues }) => {
    const renderTemplate = (templateOption: TemplateOption) => {
        // Factory function to generate the appropriate template based on the selected option
        switch (templateOption.name) {
            case 'Template1':
                return <DynaTemplate config={{ headerCategory: { category: 'Header', fields: templateOption.fields }, billingCategory: { category: 'Billing', fields: templateOption.fields }, itemsCategory: { category: 'Items', fields: templateOption.fields }, footerCategory: { category: 'Footer', fields: templateOption.fields } }} inputValues={inputValues} />;
            case 'Template 2':
                return <DynaTemplate config={{ headerCategory: { category: 'Header', fields: templateOption.fields }, billingCategory: { category: 'Billing', fields: templateOption.fields }, itemsCategory: { category: 'Items', fields: templateOption.fields }, footerCategory: { category: 'Footer', fields: templateOption.fields } }} inputValues={inputValues} />;
            default:
                return null;
        }
    };
    return (
        <PDFViewer width="100%" height="90%">
            {renderTemplate(config)}
        </PDFViewer>
    );
};

export default TemplateDisplay;
