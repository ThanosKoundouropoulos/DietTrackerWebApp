import { useField} from "formik";
import React from 'react';
import { Form, Label } from "semantic-ui-react";
import DatePicker , {ReactDatePickerProps} from 'react-datepicker';
import { values } from "mobx";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: Date;
    style?: React.CSSProperties;
}


export default function MyDateInput(props: Props){
    const [field ,meta ,helpers] = useField(props.name!);
    return(
        <Form.Field error={meta.touched && !!meta.error} >
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value) || null)}
                onChange = {(value: any) => helpers.setValue(value)}
                required
                dateFormat='dd MMM yyyy'
                className='custom-date-picker'
            
                />
            {meta.touched && meta.error ? (
                <Label basic color="red"> {meta.error}</Label>
            ) : null}

        </Form.Field>
    )
}