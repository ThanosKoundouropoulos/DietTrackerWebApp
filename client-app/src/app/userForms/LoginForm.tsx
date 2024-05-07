
import { observer } from 'mobx-react-lite';
import { ErrorMessage, Form, Formik } from 'formik';
import { useStore } from '../stores/store';
import MyTextInput from '../common/forms/MyTextInput';
import { values } from 'mobx';
import { Button, Container, Header, Icon, Label } from 'semantic-ui-react';





export default observer(function LoginForm() {
  const {userStore} = useStore();
  return (
  
    <Formik
        initialValues={{email:'', password:'',error: null}}
        onSubmit={(values, {setErrors}) => userStore.login(values).catch(error =>
            setErrors({error: 'Invalid email or password'}))}
    >
        {({handleSubmit, isSubmitting,errors,isValid,dirty}) => (
          <Container className='modalContainerLogIn'>
              <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
               
                <Header as='h2' className='global-font' content='Login to Reactivities ' color="teal" textAlign="center"/>
                <Icon name='sign-in' size='big' color='teal'/>
               
                   <MyTextInput  placeholder="Email" name="email" />
               
                <div style={{position:'relative', top:10}} className="input-wrapper-instance1">
                  <MyTextInput placeholder="Password" name="password" type='password'/>
                </div>
                <ErrorMessage
                name="error"render={() =>
                <Label style={{marginBottom: 10}} basic color="red" content={errors.error}/>}
                />
                <div style={{position:'absolute'}}>
                  <Button  disabled={!isValid || !dirty || isSubmitting} loading={isSubmitting} positive content='Login' type="submit" />
                </div>
                
            </Form>
          </Container>
         
        )}
    </Formik>
     
   
  );
})