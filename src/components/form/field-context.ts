import * as React from 'react';

export type FieldContextType = {
  id?: string;
  required?: boolean;
};

export const FieldContext = React.createContext<FieldContextType>({});

FieldContext.displayName = 'FieldContext';
