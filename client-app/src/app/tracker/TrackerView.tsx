import { observer } from "mobx-react-lite";
import { Button, Container, Grid, Header, Segment, Image, Label } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent";
import MacrosHeader from "./FoodsAndMacros/MacrosHeader";
import FoodList from "./FoodsAndMacros/FoodList";
import { SearchBar } from "./Searching/SearchBar";
import { Food } from "../models/Food";
import RemainingMacros from "./FoodsAndMacros/RemainingMacros";
import StatisticsChart from "./Statistics/PieChart";
import DonutChart from "./Statistics/DonutChart";
import MealsList from "./Meals/MealsList";
import CreateForm from "./Meals/CreateForm";
import Tooltip from "../common/Tooltip";
import RibbonLabel from "../common/RibbonLabel";







export default observer(function TrackerView() {

  const { foodStore ,dietGoalStore ,mealStore} = useStore();
  const {loadFoods,foods} = foodStore;
  const {isCreating,setCreating,meals,loadMeals,mealEntries,loadMealEntries} = mealStore;
  const {addFoodToDiet,remainingDietGoal} = dietGoalStore;
  const {userStore : {user,dietGoal,hasDietPlan}} = useStore();
  const [results, setResults] = useState<Food[]>([]);



 

  /*useEffect(() => {
    if (!user) {
      console.log('foodStore instance IN TRACKER user load:');
      getUser();
    }
    
  },[getUser,user])
  
  
  
  */

  useEffect(() => {
      
      if (meals.length ===0) loadMeals();
      if (dietGoal && remainingDietGoal) {
        if (foods.length ===0) loadFoods();
        if (mealEntries.length ===0) loadMealEntries(dietGoal.id);
      }
   
  }, [user, dietGoal,remainingDietGoal, loadFoods,loadMeals,loadMealEntries]);



    
  if (foodStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (

   
      <Grid className="trackerGrid">
       
          <>
          <div style={{position:'absolute',top:50,right:300,zIndex:1,fontSize: '45px',color:"#233142"}}> 
          <Tooltip content={<span style={{ fontSize:'15px' }}  >This is your diet goal. Aim to consume the exact amount of calories you need. 
            If you want to update your diet goal you can do it in the <span style={{ color: 'teal' }}>Calculator</span> tab.</span>}  />
          </div>
          <Grid.Column width='3'>

         
            <Segment textAlign="center" className="statsContainer">
          
              {foods.length ===0 && mealEntries.length ===0 ? (
                <>
                  <Label size="huge" color="teal" attached='top'><Header as='h1' color="black" className="macros global-font">Statistics</Header></Label>
                  <div style={{position:'absolute',top:120,right:12}}> 
                    <Image src="/assets/pie-graph.png" size="medium"  />
                  </div>
                  <div style={{position:'absolute',bottom:50,left:20}}> 
                    <Header inverted className="global-font" as={"h1"} color="teal">Add foods or meals to display statistics !</Header>
                  </div>
                </>
              ):(
                <>
                  <Header as='h2' inverted className="distHeader"> Calories Distribution </Header>
                  <StatisticsChart  />
                  <Header as='h1' inverted className="distHeader"> Target Percentage</Header>
                  <DonutChart/>
                </>
              )}
            
           
            </Segment>  
          </Grid.Column>
            <Grid.Column width='10'>
              
                <Grid.Row>
                { dietGoal ? (
                  <>
                     
                      <MacrosHeader  />
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
                      <div style={{position:'relative',top:150}}>
                        <Header className="global-font"  as='h2' inverted >
                                You don't have a diet plan created,<br/> 
                                Create one at the <span style={{ color: "teal" }}>Calculator</span> tab <br/>  and start tracking your macros immediately!
                        </Header>
                      </div>
                    
                    </Container>  
                  )}
                </Grid.Row>             
    </Grid.Column></>
             
      
        
      <Grid.Column width='3'>
      {!isCreating ? (
        <Segment textAlign="center"  className="mealsContainer">
          <Label size="huge" color="teal" attached='top'><Header as='h1' color="black" className="macros global-font">My Meals</Header></Label>
          
          {meals.length === 0 ? (
            <>
             <div style={{position:'absolute',top:90,right:5}}>
             <Header  as='h3' color="teal" inverted className="macros global-font">Create your custom <br/> meals to use anytime you want!</Header>
             </div>
              <div style={{position:'absolute',top:250,right:55}}> 
                <Image src="/assets/recipe.png" size="small"  />
              </div>
            </>    
          ) : (
            <MealsList/>
          )}
            
          <div style={{position:'relative',  top: 420}}>  
            <Button onClick={() => {setCreating(true);}}  positive content='Create Meal' className="mealBtn global-font"></Button>
          </div> 
        </Segment> 
      ): <CreateForm/>}
      
      </Grid.Column>
      </Grid>
        
       
        
     
     
    );
  })

