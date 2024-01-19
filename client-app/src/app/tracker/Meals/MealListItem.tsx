import React, { useState } from 'react';
import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import { Item, Button, Label, Segment, Grid, Header, Modal, Card, CardDescription } from 'semantic-ui-react';
import { Food } from '../../models/Food';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Meal } from '../../models/meal';

interface Props {
  meal: Meal;
}

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


export default observer(function MealListItem({ meal }: Props) {
  const { dietGoalStore,userStore,mealStore} = useStore();
  const {addMealToDiet} = dietGoalStore;
  const {deleteMeal} = mealStore;
  const {dietGoal} = userStore

  const [openDetails, setOpenDetails] = useState(false);

  const handleAddMeal = () => {
      if (meal) {
        addMealToDiet(meal);
      } else {
        console.error('Selected meal not found.');
      }
  
  };

  const handleDelete = async () => {
      deleteMeal(meal.id);
  };

  return (
    <>
        <Segment className="meal-wrapper">
            <Header as="h1" floated="left" className="macros" size="medium">
            {meal.name}
            </Header>
            <Button icon="add" floated="right" inverted color="green" className="addFoodButton" onClick={handleAddMeal} />
            <Button icon="info" floated="right" inverted color="blue" className="addFoodButton" onClick={() => setOpenDetails(true)} />
            <Button inverted color="red" className="macros" onClick={handleDelete}>
            Delete
            </Button>
        </Segment>

        {openDetails && (
            <Card className="meal-details-card">
            <Card.Content>
                <Card.Header ><h1>{meal.name}</h1></Card.Header>
                <CardDescription><h3>{meal.description}</h3></CardDescription>
                <Card.Meta >Calories: {meal.calories}</Card.Meta>
                <Card.Meta>Proteins: {meal.proteins}</Card.Meta>
                <Card.Meta>Carbs: {meal.carbs}</Card.Meta>
                <Card.Meta>Fats: {meal.fats}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button negative onClick={() => setOpenDetails(false)}>
                Close
                </Button>
            </Card.Content>
            </Card>
        )}
    </>
   
  );
})
