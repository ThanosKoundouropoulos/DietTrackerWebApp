import { observer } from "mobx-react-lite";
import { Button, Container, Form, Header } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Formik } from "formik";
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import { genderOptions } from '../calculator/genderOptions'
import MyTextInput from "../common/forms/MyTextInput";
import MySelectInput from "../common/forms/MySelectInput";
import { activityLevelOptions } from "./activityLevelOptions";
import { goalOptions } from "./goalOptions";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DietGoalFormValues } from "../models/dietGoal";


interface Props {
    onClose: () => void;
  }




export default observer(function Calculator({ onClose }: Props) {
    const {dietGoalStore,userStore} = useStore();
    const {createGoal,editDietGoal,deleteDietGoal } = dietGoalStore;
    const {hasDietPlan,dietGoal,user } = userStore;

   
  
    const [dietGoalForm,setDietGoal] = useState<DietGoalFormValues>(new DietGoalFormValues)

    const validationSchema = Yup.object({
        age: Yup.string().required(),
        weight: Yup.string().required(),
        height: Yup.string().required(),
        gender: Yup.string().required(),
        activityLevel: Yup.string().required(),
        plan: Yup.string().required(),
    })

    
    function handleFormSubmit(dietGoal: DietGoalFormValues) {
        if (hasDietPlan ) {
            editDietGoal(dietGoal);
        } else {
            dietGoal.id = uuid();
            createGoal(dietGoal);
        }
        onClose();
    }
    function handleDeleteGoal() {
        deleteDietGoal(dietGoal?.id!);
        user!.hasDietPlan = false;
        onClose();
    }


    return (
        <Container className="calculator">
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={dietGoalForm} 
                onSubmit={values => handleFormSubmit(values)}>
                    {({handleSubmit,isValid,isSubmitting,dirty}) =>(
                       <Form className='ui form ' onSubmit={handleSubmit} autoComplete='off' >
                                <Header className="global-font" color="teal" as={"h2"}>Calculate/Update you diet plan !</Header>
                                <div style={{position:'relative', top:-5, right:150}}> 
                                    <MyTextInput placeholder="Age" name="age"/>
                                </div> 
                                <div style={{position:'relative', top:-45, right:0}}> 
                                    <MyTextInput placeholder="Weight" name="weight"/>
                                </div> 
                                <div style={{position:'relative', top:-85, right:-150}}> 
                                    <MyTextInput placeholder="Height" name="height"/>
                                </div> 
                                <div style={{position:'relative', top:-35}}> 
                                    <MySelectInput label="Gender" options={genderOptions}   name='gender'  />
                                </div> 
                                <div style={{position:'relative', top:-18}}> 
                                    <MySelectInput label="Activity Level" options={activityLevelOptions}   name='activityLevel' />
                                </div> 
                                <div style={{position:'relative', top:5}}> 
                                    <MySelectInput label="What are you planning to do ?" options={goalOptions}   name='plan' />
                                </div> 
                                <div style={{position:'absolute', top:305, right:-120}}> 
                                <Button
                                    className="global-font"
                                    disabled={!isValid || !dirty || isSubmitting}
                                    loading={isSubmitting}
                                    floated='right'
                                    positive
                                    type='submit'
                                    content={hasDietPlan ? 'Update' : 'Create'}
                                />
                                </div> 
                                <div style={{ position: 'absolute', top: 305, right: 30 }}>
                                <Button
                                        className="global-font"
                                        as={Link}
                                        to='/tracker'
                                        floated='left'
                                        type='button'
                                        content='Delete'
                                        onClick={handleDeleteGoal}
                                        style={{
                                            backgroundColor: 'rgb(89, 20, 33)',
                                            color: 'white',
                                            padding: '15px 30px',         
                                        }}
                                    />
                                </div>
                                <div style={{position:'absolute', top:305, right:200}}> 
                                     <Button  className="global-font" as={Link}  to='/tracker' floated='left' inverted type='button' color="red" content='Cancel' onClick={onClose}/>
                                </div>                         
                        </Form>
                )}
            </Formik> 
        </Container>    
    )
  })