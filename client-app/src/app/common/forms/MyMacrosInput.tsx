import { useField} from "formik";
import React from 'react';
import { Container, Form, Input, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
   
}

export default function MyMacrosInput(props: Props){
    const [field ,meta] = useField(props.name);
    return(
      <Container className="macrosInput">
        <Form.Field error={meta.touched && !!meta.error}>
          <label>{props.label}</label>
          <Input
            {...field}
            {...props}
            type="number"
            value={field.value !== undefined ? parseFloat(field.value) : ''} 
            transparent
          />
          {meta.touched && meta.error ? (
            <Label basic color="red">
              {meta.error}
            </Label>
          ) : null}
        </Form.Field>
    </Container>
    )
}