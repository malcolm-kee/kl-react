import cx from 'classnames';
import * as React from 'react';
import { isDefined } from '../../lib/type-guard';
import { FieldContext } from './field-context';

export type SelectProps = React.ComponentPropsWithoutRef<'select'>;

export const Select = ({
  className,
  id,
  required,
  ...inputProps
}: SelectProps) => {
  const fieldContext = React.useContext(FieldContext);

  const isRequired = isDefined(required) ? required : fieldContext.required;
  const inputId = isDefined(id) ? id : fieldContext.id;

  return (
    <select
      className={cx(
        'w-full rounded border-gray-300 focus:ring-primary-300',
        className
      )}
      id={inputId}
      required={isRequired}
      {...inputProps}
    />
  );
};
