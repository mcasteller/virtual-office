import React from 'react'
import { useField } from 'formik';

import TextField from '@material-ui/core/TextField';

function TextInput ( { ...props } ) {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [ field, meta ] = useField( props );
  return (
    <>
      {meta.touched && meta.error ? (
        <TextField
          error
          helperText={meta.error}
          {...field}
          {...props} />
      ) : <TextField {...field} {...props} />
      }
    </>
  );
}

export { TextInput }
