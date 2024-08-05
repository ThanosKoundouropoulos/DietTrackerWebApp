import { observer } from "mobx-react-lite";
import { Button, Container, Form, Header } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Link,useNavigate } from "react-router-dom";
import MyTextInput from "../../common/forms/MyTextInput";
import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import {v4 as uuid} from 'uuid';
import { useStore } from "../../stores/store";
import MyMacrosInput from "../../common/forms/MyMacrosInput";
import MyTextArea from "../../common/forms/MyTextArea";

import { useState } from "react";
import { MealFormValues } from "../../models/meal";









export default observer(function CreateForm() {
    const {mealStore : {setCreating,createMeal}} = useStore();

    const [meal,setMeal] = useState<MealFormValues>(new MealFormValues)

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        description: Yup.string().required(),
        calories: Yup.number().required(),
        proteins: Yup.number().required(),
        carbs: Yup.number().required(),
        fats: Yup.number().required()
    })
  
 
    
    function handleFormSubmit(values: MealFormValues) {
        const newMeal = new MealFormValues(values);
        newMeal.id = uuid();
        createMeal(newMeal);
        setCreating(false);
      }
      
 
    return (

        
        <Container textAlign='center'  className="mealForm">
            <Header as='h2' className="global-font" content='Create your custom meal' color='green'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={meal} 
                onSubmit={values => handleFormSubmit(values)}>
                    {({handleSubmit,isValid,isSubmitting,dirty}) =>(
                       <Form className='ui form global-font' onSubmit={handleSubmit} autoComplete='off' >
                           <MyTextInput  placeholder="Food name" name="name"/>
                            <MyTextArea placeholder="Description" name="description" style={{backgroundColor: "#455d7a" ,width: '250px',height:'100px',resize:'none'}}/>
                            <GiFlame className="icons-flame" size="30px" /> \
                            <div style={{position:'relative',  top: 40,left: -70}}>               
                                <MyMacrosInput  placeholder="Calories" name="calories" />   
                            </div>                        
                            <GiChickenLeg style={{ position: 'relative' , top: '4px', left: '20px'  }}  className="icons chicken" size="30px" />
                            <div style={{position:'relative',  top: -41,left: 80}}>  
                                <MyMacrosInput placeholder="Proteins" name="proteins"/>
                            </div> 
                            <FaBreadSlice style={{ position: 'relative' , top: '7px', left: '-130px'  }}  className="icons bread" size="30px"/>
                            <div style={{position:'relative',  top: 1-40,left: -70}}>  
                                <MyMacrosInput placeholder="Carbs" name="carbs"/>
                                </div> 
                            <GiAvocado style={{ position: 'relative' , top: '-75px', left: '20px'  }} className="icons avocado" size="30px"/>
                            <div style={{position:'relative',  top: -118,left: 82}}>  
                                <MyMacrosInput placeholder="Fats" name="fats"/>
                            </div> 
                            <div style={{position:'absolute',bottom:50,right:5}}> 
                            <Button 
                                className="global-font"
                                disabled={!isValid || !dirty}
                                loading={isSubmitting} floated='left' 
                                positive type='submit' content='Submit'
                            />
                             </div>
                             <div style={{position:'absolute',bottom:50,left:15}}> 
                                <Button className="global-font" as={Link} onClick={() => setCreating(false)} to='/tracker'  floated='right'  type='button' content='Cancel' color="red"/>
                                </div>
                        </Form>
                )}

            </Formik>
         
        </Container>

    )
  });