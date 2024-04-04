import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MyPDF from '../../views/Invoices/pdfInvoiceTemplates/dynaTemplate';
import { TemplateOptionProps } from './templateSelector';
import PDFInvoice from '../../views/Invoices/pdfInvoiceTemplates/dynaTemplate';

interface TemplateDisplayProps {
    template: TemplateOptionProps | null;
    data: any;
}

const TemplateDisplay: React.FC<TemplateDisplayProps> = ({ template, data }) => {
    // If no template is selected, return null
    if (!template) return null;
    console.log("templateDisplay", data, template)
    // Render the appropriate template based on the selected option
    const renderTemplate = () => {
        switch (template.name) {
            case 'Invoice Template':
                return <PDFViewer width="100%" height="90%"><PDFInvoice data={data} template={template} /></PDFViewer>;
            default:
                return null;
        }
    };

    return renderTemplate();
};

export default TemplateDisplay;
