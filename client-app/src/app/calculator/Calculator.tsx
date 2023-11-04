import { observer } from "mobx-react-lite";
import { Button, Container, Dropdown, Form, Header, Label, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { ErrorMessage, Formik } from "formik";
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import { genderOptions } from '../calculator/genderOptions'
import MyTextInput from "../common/forms/MyTextInput";
import MySelectInput from "../common/forms/MySelectInput";
import { activityLevelOptions } from "./activityLevelOptions";
import { goalOptions } from "./goalOptions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";







export default observer(function Calculator() {
    const {dietGoalStore} = useStore();
    const {selectedDietGoal,createGoal,
        loading,loadDietGoal,loadingInitial} = dietGoalStore;

    const {id} = useParams();
    const navigate = useNavigate();
    const [dietGoal,setDietGoal] = useState<DietGoalFormValues>(new DietGoalFormValues)

    const validationSchema = Yup.object({
        age: Yup.string().required(),
        weight: Yup.string().required(),
        height: Yup.string().required(),
        gender: Yup.string().required(),
        activityLevel: Yup.string().required(),
        plan: Yup.string().required(),
    })
    useEffect(() => {
        if (id) loadDietGoal(id).then(dietGoal => setDietGoal(new DietGoalFormValues(dietGoal)))
    }, [id ,loadDietGoal]);
    //display the content of this ability in the form if it is available
    //init state is either the selected activity we pass or the properties in an activity object
    //?? if left is null use right as initial state
    
   function handleFormSubmit(dietGoal: DietGoalFormValues){
        if (dietGoal.id) {
            dietGoal.id = uuid();
            createGoal(dietGoal).then(() => navigate(`/tracker`));
        } else {
            dietGoal.id = uuid();
            createGoal(dietGoal).then(() => navigate(`/tracker`));
           // updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }
    return (
        <Container clearing className="calculator">
            <Header content='Calculate your calorie plan !' sub color='teal'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={dietGoal} 
                onSubmit={values => handleFormSubmit(values)}>
                    {({handleSubmit,isValid,isSubmitting,dirty}) =>(
                       <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                           <MyTextInput placeholder="Age" name="age"/>
                            <MyTextInput placeholder="Weight" name="weight"/>
                            <MyTextInput placeholder="Height" name="height"/>
                            <MySelectInput label="Gender" options={genderOptions}   name='gender'  />
                            <MySelectInput label="Activity Level" options={activityLevelOptions}   name='activityLevel' />
                            <MySelectInput label="What are you planning to do ?" options={goalOptions}   name='plan' />
                            <Button 
                               
                                loading={isSubmitting} floated='right' 
                                positive type='submit' content='Submit'/>
                            <Button as={Link}  to='/tracker' floated='right'  type='button' content='Cancel'/>
                        </Form>
                )}

            </Formik>
         
        </Container>
       
        
       /*<Formik
            initialValues={dietGoal}
            onSubmit={values => handleFormSubmit(values)}
                validationSchema={Yup.object({
                    age: Yup.string().required(),
                    weight: Yup.string().required(),
                    height: Yup.string().required(),
                    password: Yup.string().required(),
                })}
        >
            {({handleSubmit, isSubmitting,errors, isValid,dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Calculate your calorie plan !' color="teal" textAlign="center"/>
                    <MyTextInput placeholder="Age" name="age"/>
                    <MyTextInput placeholder="Weight" name="weight"/>
                    <MyTextInput placeholder="Height" name="height"/>
                    <MySelectInput label="Gender" options={genderOptions}   name='gender' />
                    <MySelectInput label="Activity Level" options={activityLevelOptions}   name='activityLevel' />
                    <MySelectInput label="What are you planning to do ?" options={goalOptions}   name='plan' />
                    <Button 
                        disabled={ !dirty || isSubmitting}
                        loading={isSubmitting} 
                        positive content='Calculate' 
                        type="submit" fluid/>
                    <Button as={Link}  to='/tracker' color="red" floated='right'  type='button' content='Cancel'/>
                </Form>
            )}



        </Formik>*/
    
      
    )
  })