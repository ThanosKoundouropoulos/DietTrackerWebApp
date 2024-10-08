import { ErrorMessage, Form, Formik } from "formik";
import { Button, Container, Header, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import * as Yup from 'yup';
import MyTextInput from "../common/forms/MyTextInput";
import { useStore } from "../stores/store";


export default observer(function RegisterForm(){
    const {userStore} = useStore();
    return(
        <Formik
            initialValues={{displayName:'', username:'',email:'', password:'',error:null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error =>
                setErrors({error}))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required(),
                    password: Yup.string().required(),
                })}
        >
            {({handleSubmit, isSubmitting,errors, isValid,dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Container className='modalContainerRegister'>
                        <Header className="global-font" as='h2' content='Sign Up' color="teal" textAlign="center"/>
                        <div style={{position:'relative', top:-5}}>
                            <MyTextInput placeholder="Username" name="username"/>
                        </div>
                        <div style={{position:'relative', top:1}}>
                            <MyTextInput placeholder="Display Name" name="displayName"/>
                        </div>
                        <div style={{position:'relative', top:5}}>
                            <MyTextInput placeholder="Email" name="email"/>
                        </div>
                        <div style={{position:'relative', top:10}}> 
                            <MyTextInput placeholder="Password" name="password" type='password'/>
                        </div>       
                        <ErrorMessage
                            name="error"render={() =>
                            <Label errors={errors.error}/>}
                        />
                        <Button 
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting} 
                            positive content='Register' 
                            type="submit" />
                    </Container>
                    
                </Form>
            )}



        </Formik>
    )
})