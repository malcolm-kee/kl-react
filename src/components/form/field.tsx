import * as React from 'react';
import { FieldContext } from './field-context';

export type FieldProps = {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  id?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
};

export const Field = ({ className = 'mb-8', ...props }: FieldProps) => {
  return (
    <FieldContext.Provider
      value={{
        id: props.id,
        required: props.required,
      }}
    >
      <div className={className}>
        <div className="flex justify-between items-center">
          <label htmlFor={props.id}>{props.label}</label>
          {props.required && <span className="text-sm">Required</span>}
        </div>
        {props.children}
        {props.helpText && <span className="text-sm">{props.helpText}</span>}
      </div>
    </FieldContext.Provider>
  );
};
