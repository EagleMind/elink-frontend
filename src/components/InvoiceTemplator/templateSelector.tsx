import React, { useState } from 'react';
export type templateStructure = {
    categories: {
        name: string;
        fields: string[]
    }[];
}
export type TemplateOptionProps = {
    name: string;
    description: string;
    template: templateStructure
};

interface TemplateSelectorProps {
    onSelectTemplate: (template: TemplateOptionProps) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
    const [selectedTemplate, setSelectedTemplate] = useState<TemplateOptionProps | null>(null);
    const templateOptions: TemplateOptionProps[] = [
        {
            name: 'Invoice Template',
            description: 'An invoice template',
            template: {
                categories: [
                    {
                        name: "Header",
                        fields: ["Invoice Number", "Date", "Due Date", "Customer ID"]
                    },
                    {
                        name: "Billing Information",
                        fields: ["Customer Name", "Address", "City", "State", "Postal Code", "Country", "Email", "Phone"]
                    },
                    {
                        name: "Items",
                        fields: ["Item", "Description", "Quantity", "Unit Price", "Total Price"]
                    },
                    {
                        name: "Footer",
                        fields: ["Subtotal", "Tax", "Discount", "Total Amount", "Notes"]
                    }
                ]
            }


        }
    ];
    const handleTemplateSelect = (template: TemplateOptionProps) => {
        setSelectedTemplate(template);
        onSelectTemplate(template);
    };

    return (
        <div className="rounded-md scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {templateOptions.map((template, index) => (
                    <div key={index} className="shadow-md border-gray-200 rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-200 hover:text- transition duration-300" onClick={() => handleTemplateSelect(template)}>
                        <h3 className="text-sm font-semibold mb-2">{template.name}</h3>
                        <p className="text-gray-600 text-xs">{template.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
