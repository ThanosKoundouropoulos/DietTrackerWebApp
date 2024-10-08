import { useField} from "formik";
import React from 'react';
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
   
    name: string;
    options: any;
    label?: string;
    style?: React.CSSProperties;
}

export default function MySelectInput(props: Props){
    const [field ,meta,helpers ] = useField(props.name);
    return(
        
            <Form.Field error={meta.touched && !!meta.error}  >
                    <label style={{color:"white"}}>{props.label}</label>
                    <Select 
                        clearable
                        options={props.options}
                        value={field.value || null}
                        onChange={(e,d) => helpers.setValue(d.value)}
                        onBlur={() => helpers.setTouched(true)}
                        
                    />
                    {meta.touched && meta.error ? (
                        <Label basic color="red"> {meta.error}</Label>
                    ) : null}

                </Form.Field>
      
      
        
    )
}