import { observer } from "mobx-react-lite";
import { Button, Container, Form, Header, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import WeightEntryList from "./WeightEntryList";
import { useState } from "react";
import {v4 as uuid} from 'uuid';
import { WeightFormValues } from "../models/weight";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyDateInput from "../common/forms/MyDateInput";
import MyMacrosInput from "../common/forms/MyMacrosInput";
import LoadingPlaceholder from "../common/LoadingPlaceholder";

export default observer(function WeightHistory() {
  const { weightStore } = useStore();
  const { weightIns, createWeightIn,loading } = weightStore;
  const [openForm, setOpenForm] = useState(false);
  const [weightIn,setWeightIn] = useState<WeightFormValues>(new WeightFormValues)



  const validationSchema = Yup.object({
    weight: Yup.number().required(),
    dateRecorded: Yup.date().required().nullable()
  
})

  const handleSubmit = (values: WeightFormValues) => {
    values.id = uuid();
    console.log('Values:', values);
    createWeightIn(values);
    setOpenForm(false);
  };

  const onCancel = () => {
    setOpenForm(false);
  };

  return (
    <>
      <Container className="weightContainer">
        {weightIns.length === 0 || openForm! ? (
          <>
            <Header  color="teal" as="h3"  className="macros global-font">
              Insert your weight-ins to start tracking your progress!
            </Header>
            <div style={{position:'absolute',top:150,right:5}}> 
                <Image src="/assets/progress.png" size="medium"  />
            </div>
          </>
        ) : (
          <>     
            { loading ? (
              <LoadingPlaceholder/>
            ) : (
              <WeightEntryList />
            )}          
          </>   
        )}

        <Button onClick={() => setOpenForm(true)} positive content="Add Entry" className="weightBtn global-font" />
        {openForm && (
           <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={weightIn} 
                onSubmit={values => handleSubmit(values)}>
                    {({handleSubmit,isValid,isSubmitting,dirty}) =>(
                        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                          <div className="weightEntryForm"  >
                            <h3  className=" global-font" style={{position:"relative",top:50,right:30}} >Add weight:</h3>
                            <Container className="weightInput">
                                <MyMacrosInput  placeholder="Weight" name="weight" />
                            </Container>
                            <h3  className=" global-font" style={{position:"relative",top:30}} >Pick date :</h3>
                              <div  style={{position:"absolute" ,top:170,right:35 , boxShadow: '10px 0px 10px rgba(0, 0, 0, 0.2)',backgroundColor:"#233142" ,color:"#233142"}}>
                                <MyDateInput   
                                    placeholder='Date'
                                    name='dateRecorded'                              
                                />
                               </div>
                              <div style={{position:"absolute" ,top:250,right:30}}>
                                <Button 
                                    disabled={isSubmitting || !dirty || !isValid}
                                    loading={isSubmitting} floated='right' 
                                    positive type='submit' content='Submit'
                                    className="global-font"
                                />
                              </div>
                              <div style={{position:"absolute" ,top:250,left:20}}>
                                <Button inverted className="global-font" content="Cancel" onClick={onCancel} color="red" />
                              </div>
                          </div>
                          
                        </Form>
                    )}
            </Formik>  
        )}
      </Container>
    </>
  );
});

