import React, { useState } from 'react';

interface FormData {
    [key: string]: string;
}

interface FormProps {
    fields: string[];
    onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        setFormData({ ...formData, [fieldName]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field, index) => (
                <div key={index}>
                    <label>{field}</label>
                    <input type="text" value={formData[field] || ''} onChange={(e) => handleChange(e, field)} />
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default Form;
