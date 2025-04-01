// components/models/FormModel.tsx
import React from 'react';
import BaseModel from '../BaseModel/BaseModel';

interface FormModelProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitButtonText?: string;
  cancelButton?: React.ReactNode;
}

const FormModel = ({
  title,
  onSubmit,
  children,
  submitButtonText = 'Submit',
  cancelButton
}: FormModelProps) => {
  return (
    <BaseModel>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {title}
      </h2>

      <form onSubmit={onSubmit}>
        <div className="space-y-4 mb-6">{children}</div>
        <div className="flex justify-end space-x-3">
          {cancelButton}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </BaseModel>
  );
};

export default FormModel;
