import cx from 'classnames';
import * as React from 'react';
import { isDefined } from '../../lib/type-guard';
import { FieldContext } from './field-context';

export type TextareaProps = React.ComponentPropsWithoutRef<'textarea'>;

export const Textarea = ({
  className,
  id,
  required,
  ...inputProps
}: TextareaProps) => {
  const fieldContext = React.useContext(FieldContext);

  const isRequired = isDefined(required) ? required : fieldContext.required;
  const inputId = isDefined(id) ? id : fieldContext.id;

  return (
    <textarea
      className={cx('form-textarea w-full', className)}
      id={inputId}
      required={isRequired}
      {...inputProps}
    />
  );
};
