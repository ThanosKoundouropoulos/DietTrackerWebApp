import { observer } from "mobx-react-lite";
import { Button, Container, Grid, Header, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink, useParams } from "react-router-dom";


import { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import MacrosHeader from "./FoodsAndMacros/MacrosHeader";
import FoodList from "./FoodsAndMacros/FoodList";
import { SearchBar } from "./Searching/SearchBar";
import { Food } from "../models/Food";
import { SearchResultsList } from "./Searching/SearchResultList";
import RemainingMacros from "./FoodsAndMacros/RemainingMacros";
import StatisticsChart from "./Statistics/PieChart";
import DonutChart from "./Statistics/DonutChart";
import MealsList from "./Meals/MealsList";
import modalStore from "../stores/modalStore";
import CreateForm from "./Meals/CreateForm";







export default observer(function TrackerView() {

  const { userStore ,foodStore ,dietGoalStore ,mealStore} = useStore();
  const {loadFoods,foods} = foodStore;
  const {isCreating,setCreating,meals,loadMeals,mealEntries,loadMealEntries} = mealStore;
  const {addFoodToDiet} = dietGoalStore;
  const {userStore : {user,dietGoal,getUser}} = useStore();
  const [results, setResults] = useState<Food[]>([]);



 

  /*useEffect(() => {
    if (!user) {
      console.log('foodStore instance IN TRACKER user load:');
      getUser();
    }
    
  },[getUser,user])*/

  useEffect(() => {
    if (user && dietGoal) {
      console.log('foodStore instance IN TRACKER diet goal load:');
      
      if (foods.length ===0) loadFoods();
      console.log('foodS:' , foods.length);
      if (meals.length ===0) loadMeals();
      if (mealEntries.length ===0) loadMealEntries(dietGoal.id);
     
    }else{
      console.log('NO USER');
    }
  }, [user, dietGoal, loadFoods,loadMeals,loadMealEntries]);



  
  /*useEffect(() => {
   
    loadDietGoal().then(dietGoal => setDietGoal(dietGoal!)) 
    console.log("LOAD GOAL 1 :" ,dietGoal.calories,user?.hasDietPlan );
    console.log("LOAD GOAL 2 :" ,user?.dietGoal?.id ,user?.displayName );
  }, [id ,loadDietGoal]);*/

    
  if (foodStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (

   
      <Grid className="trackerGrid">
       
          <>
          <Grid.Column width='3'>
            
            <Segment textAlign="center" className="statsContainer">
            
            <Header as='h1' inverted className="distHeader"> Calories Distribution </Header>
            <StatisticsChart  />
            <Header as='h1' inverted className="distHeader"> Target Percentage</Header>
            <DonutChart/>
            </Segment>  
          </Grid.Column>
            <Grid.Column width='10'>
              
                <Grid.Row>
                { dietGoal ? (
                  <>
                     
                      <MacrosHeader />
                      <RemainingMacros/>
                      
                    <Container  className="entriesContainer">
                      
                      <SearchBar setResults={setResults} onAddFood={addFoodToDiet}/>
                      
                      <Container className="food-list-wrapper">
                        <FoodList />
                      </Container>
                    </Container> 
                      
                  </>
                      
                  ) : (
                    <Container className="noGoalContainer">
                      <Header as='h3' inverted >
                              You don't have a diet plan created,<br/> 
                              Create one and start tracking your macros immediately!
                      </Header>
                      <Button as={NavLink} to='/calculator' positive content='Create Diet Plan'>
                        
                      </Button>
                    </Container>  
                  )}
                </Grid.Row>             
    </Grid.Column></>
             
      
        
      <Grid.Column width='3'>
      {!isCreating ? (
        <Segment textAlign="center"  className="mealsContainer">
          <Header as='h1' inverted className="macros">My Meals</Header>
          {meals.length === 0 ? (
            <Header  as='h2' inverted className="macros">No meals available, create your custom meals to use anytime you want !</Header>
          ) : (
            <MealsList/>
          )}
          
          <Button onClick={() => {setCreating(true); console.log(isCreating);}}  positive content='Create Meal' className="mealBtn"></Button>
        </Segment> 
      ): <CreateForm/>}
      
      </Grid.Column>
      </Grid>
        
       
        
     
     
    );
  })

