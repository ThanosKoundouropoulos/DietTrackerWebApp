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
  const { dietGoalStore,mealStore,userStore} = useStore();
  const {addMealToDiet} = dietGoalStore;
  const {deleteMeal} = mealStore;
  const {hasDietPlan} = userStore;
  

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

  function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  return (
    <>
        <Segment className="meal-wrapper">
            <Header as="h1" floated="left" className="macros global-font" size="medium">
            {meal.name}
            </Header>
            <Button disabled={!hasDietPlan}  icon="add" floated="right" inverted color="green"  onClick={handleAddMeal} />
            <Button  icon="info" floated="right" inverted color="blue" onClick={() => setOpenDetails(true)} />
            <Button inverted floated="right"  color="red"  onClick={handleDelete}>-</Button>
        </Segment>

        {openDetails && (
            <Card className="meal-details-card global-font">
            <Card.Content className='global-font card-content'>
                <Card.Header className='global-font'>{meal.name}</Card.Header>
                <CardDescription >{meal.description}</CardDescription>
                <Card.Meta className='global-font card-meta' >Calories: {round(meal.calories, 1)}</Card.Meta>
                <Card.Meta className='global-font card-meta'>Proteins: {round(meal.proteins,1)}</Card.Meta>
                <Card.Meta className='global-font card-meta'>Carbs: {round(meal.carbs,1)}</Card.Meta>
                <Card.Meta className='global-font card-meta'>Fats: {round(meal.fats,1)}</Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <Button className='global-font' negative onClick={() => setOpenDetails(false)}>
                Close
                </Button>
            </Card.Content>
            </Card>
        )}
    </>
   
  );
})
