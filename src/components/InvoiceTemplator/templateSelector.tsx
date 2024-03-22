import React from 'react';

export interface TemplateOption {
    name: string;
    description: string;
    fields: string[]; // Array of field names for the template
}

interface TemplateSelectionProps {
    onSelectTemplate: (template: TemplateOption) => void;
}


const TemplateSelector: React.FC<TemplateSelectionProps> = ({ onSelectTemplate }) => {
    const templateOptions: TemplateOption[] = [
        {
            name: 'Template1',
            description: 'Description of Template 1 goes here.',
            fields: ['Field 1', 'Field 2', 'Field 3'],
        },
        {
            name: 'Template 2',
            description: 'Description of Template 2 goes here.',
            fields: ['Field A', 'Field B'],
        },
    ];
    const handleTemplateSelect = (template: TemplateOption) => {
        onSelectTemplate(template);
    };

    return (
        <div className="bg-white  rounded-md p-6 my-2 overflow-x-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-rounded-full scrollbar scrollbar-thumb-slate-200 scrollbar-track-slate-300">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {templateOptions.map((template, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition duration-300" onClick={() => handleTemplateSelect(template)}>
                        <h3 className="text-sm font-semibold mb-2">{template.name}</h3>
                        <p className="text-gray-600 text-xs">{template.description}</p>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TemplateSelector;
