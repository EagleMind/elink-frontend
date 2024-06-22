import { PDFViewer } from '@react-pdf/renderer';
import React from 'react';
import PDFInvoice from '../../views/Invoices/pdfInvoiceTemplates/dynaTemplate';

interface TemplateOptionProps {
    name: string;
}

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

interface TemplateDisplayProps {
    template: TemplateOptionProps | null;
    items: Item[];
    formData: FormState;
    total: number;
}

const TemplateDisplay: React.FC<TemplateDisplayProps> = ({ template, items, formData, total }) => {
    console.log("template?", template, items, formData, total)
    if (!template) return null;

    const data = {
        items,
        formData,
    };

    const renderTemplate = () => {
        switch (template.name) {
            case 'Invoice Template':
                return (
                    <PDFViewer width="100%" height="90%">
                        <PDFInvoice template={template} data={data} />
                    </PDFViewer>
                );
            default:
                return null;
        }
    };

    return renderTemplate();
};

export default TemplateDisplay;
