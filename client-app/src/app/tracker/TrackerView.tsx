import { observer } from "mobx-react-lite";
import { Button, Container, Grid, Header, Input, Label, Segment, Select } from "semantic-ui-react";
import { useStore } from "../stores/store";
import userStore from "../stores/userStore";
import { NavLink, useParams } from "react-router-dom";
import { DietGoal, DietGoalFormValues } from "../models/dietGoal";
import dietGoalStore from "../stores/dietGoalStore";
import { useEffect, useState } from "react";
import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import SearchBar from "./SearchBar";







export default observer(function TrackerView() {
  
  const {userStore : {user,loadDietGoal,dietGoal}} = useStore();
  const {dietGoalStore} = useStore();
  const {selectedDietGoal} = dietGoalStore;

  //const [dietGoal,setDietGoal] = useState<DietGoal>(new DietGoal())
  const {id} = useParams();

 /* useEffect(() => {
    if (user?.dietGoal) loadDietGoal(id!);
  }, [loadDietGoal])*/
  
  /*useEffect(() => {
   
    loadDietGoal().then(dietGoal => setDietGoal(dietGoal!))
    console.log("LOAD GOAL 1 :" ,dietGoal.calories,user?.hasDietPlan );
    console.log("LOAD GOAL 2 :" ,user?.dietGoal?.id ,user?.displayName );
  }, [id ,loadDietGoal]);*/

    
  function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
  
  return (

   
      <Grid className="trackerGrid">
       
          <>
          <Grid.Column width='3'>
            
            <Segment textAlign="center" className="statsContainer">
            
            <Header as='h1' inverted className="macros">
                                    
              Statistics
            </Header>
            </Segment>  
            </Grid.Column>
            <Grid.Column width='10'>
                <Grid.Row>
                {user?.dietGoal? (
                  <>
                    <Container  className="macrosHeader">
                      <Header as='h1' floated="left"   className="macros"> <GiFlame className="icons flame" size="35px" /> {round(dietGoal!.calories,1)}</Header>
                        <Header  floated="left"  as='h3'   className="macros">  <GiChickenLeg className="icons chicken" size="25px" /> {round(dietGoal!.proteins,1)}</Header>
                        <Header floated="left" as='h3'   className="macros"> <FaBreadSlice className="icons bread" size="25px"/>{round(dietGoal!.carbs,1)}</Header>
                        <Header floated="left" as='h3'   className="macros"><GiAvocado className="icons avocado" size="25px"/> {round(dietGoal!.fats,1)}</Header> 
                        <Button floated="left" inverted color='green'>
                          Add Food
                        </Button>
                        <Button floated="right" inverted color='red' >
                          Clear
                        </Button> 
                      </Container>  
                      <Container  className="entriesContainer">
                        
                        <SearchBar/>
                      </Container> 
                  </>
                      
                  ) : (
                    <>
                      <Header as='h1' inverted >
                              
                              Tracker
                      </Header>
                      <Button as={NavLink} to='/calculator' positive content='Create Diet Plan'>
                        
                      </Button>
                    </>  
                  )}
                </Grid.Row>             
    </Grid.Column></>
             
      
        
      <Grid.Column width='2'>
     
      <Segment textAlign="center" className="mealsContainer">
      
      <Header as='h1' inverted className="macros">
                              
         Meals
      </Header>
      </Segment>  
      </Grid.Column>
      </Grid>
        
       
        
     
     
    );
  })