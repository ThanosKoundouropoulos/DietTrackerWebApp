import { useField} from "formik";
import { Container, Form, Label, TextArea } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
    style?: React.CSSProperties;
}

export default function MyTextArea(props: Props){
    const [field ,meta] = useField(props.name);
    return(
        <Container className="input-wrapper-area">
            <Form.Field error={meta.touched && !!meta.error}>
                <label>{props.label}</label>
                <TextArea {...field} {...props} />
                {meta.touched && meta.error ? (
                <Label basic color="red">
                    {' '}
                    {meta.error}
                </Label>
                ) : null}
            </Form.Field>
    </Container>
    )
}