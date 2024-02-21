import React, { useEffect, useState } from 'react';

interface InputConfig {
    name: string;
    type: string;
}

interface FormData {
    [key: string]: string | number;
}

interface Props {
    inputConfigs: InputConfig[];
    updateParentState: (data: FormData) => void;
}

const DynamicForm: React.FC<Props> = ({ inputConfigs, updateParentState }) => {
    const [formData, setFormData] = useState<FormData>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
    };

    useEffect(() => {
        updateParentState(formData)
    }, [formData])
    return (
        <form>
            {inputConfigs.map((inputConfig, index) => {
                const { name, type } = inputConfig;
                return (
                    <div key={index} className='py-3'>
                        <label>
                            {type === 'text' && (
                                <div>
                                    <label className="text-sm mb-1 flex font-medium text-gray-600">{name}</label>
                                    <div className="flex items-center">
                                        <input type={type} placeholder="John" name={name} onChange={(e) => handleChange(e)} className="border border-solid border-gray-300 rounded-md w-7/12 py-2 px-2.5 focus:border-0 focus:ring-0 focus:outline-0" />
                                    </div>
                                </div>
                            )}
                            {type === 'number' && (
                                <div>
                                    <label className="text-sm mb-1 flex font-medium text-gray-600">{name}</label>
                                    <div className="flex items-center">
                                        <input type={type} placeholder="John" name={name} onChange={(e) => handleChange(e)} className="border border-solid border-gray-300 rounded-md w-7/12 py-2 px-2.5 focus:border-0 focus:ring-0 focus:outline-0" />
                                    </div>
                                </div>
                            )}
                            {type === 'date' && (
                                <div>
                                    <label className="text-sm mb-1 flex font-medium text-gray-600">{name}</label>
                                    <div className="flex items-center">
                                        <input type={type} placeholder="John" name={name} onChange={(e) => handleChange(e)} className="border border-solid border-gray-300 rounded-md w-7/12 py-2 px-2.5 focus:border-0 focus:ring-0 focus:outline-0" />
                                    </div>
                                </div>
                            )}
                            {/* Add other input types as needed */}
                        </label>
                    </div>
                );
            })}
        </form>
    );
};

export default DynamicForm;
