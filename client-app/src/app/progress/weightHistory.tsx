import { observer } from "mobx-react-lite";
import { Button, Card, CardDescription, Container, Form, Header, Image } from "semantic-ui-react";
import { useStore } from "../stores/store";
import WeightEntryList from "./WeightEntryList";
import { useState } from "react";
import {v4 as uuid} from 'uuid';
import { WeightFormValues } from "../models/weight";
import { format, parseISO } from "date-fns";
import { Formik } from "formik";
import * as Yup from 'yup';
import MyDateInput from "../common/forms/MyDateInput";
import MyMacrosInput from "../common/forms/MyMacrosInput";








export default observer(function WeightHistory() {
  const { weightStore } = useStore();
  const { weightIns, createWeightIn } = weightStore;
  const [openForm, setOpenForm] = useState(false);
  const [weightIn,setWeightIn] = useState<WeightFormValues>(new WeightFormValues)



  const validationSchema = Yup.object({
    weight: Yup.number().required(),
    date: Yup.string().required().nullable()
  
})

  const handleSubmit = (values: WeightFormValues) => {
    console.log('WeightForm Values:', values);
    const newWeightIn = new WeightFormValues(values);
    newWeightIn.id = uuid();
    console.log('newWeightIn Values:', newWeightIn);
    createWeightIn(newWeightIn);
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
          <WeightEntryList />
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
                           <Container className="weightInput">
                              <MyMacrosInput  placeholder="Weight" name="weight" />
                           </Container>
                          
                            <MyDateInput   
                                placeholder='Date'
                                name='date' 
                                style={{backgroundColor: "#455d7a" ,width:'200px',height:'100px'}}                               
                             />
                          
                          
                            <Button 
                                disabled={isSubmitting || !dirty || !isValid}
                                loading={isSubmitting} floated='right' 
                                positive type='submit' content='Submit'
                                />
                              <Button content="Cancel" onClick={onCancel} color="red" />
                        </Form>
                    )}
            </Formik>  
        )}
      </Container>
    </>
  );
});



/*<Form>
            <Header as="h2" inverted className="macros">
              Add Weight Entry
            </Header>
            <Form.Input
              type="number"
              label="Weight"
              placeholder="Enter weight"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              required
            />
            <Form.Input
              type="date"
              label="Date"
              value={format(date, 'yyyy-MM-dd')}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
            <Button positive content="Submit" onClick={handleSubmit} />
            <Button content="Cancel" onClick={onCancel} color="red" />
          </Form>*/