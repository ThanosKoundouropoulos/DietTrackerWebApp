import React from 'react';
import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import { Item, Button, Label, Segment, Grid, Header } from 'semantic-ui-react';
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


export default observer(function MealEntryItem({ meal }: Props) {
  const { dietGoalStore,userStore} = useStore();
  const {deleteMealEntry} = dietGoalStore;
  const {dietGoal} = userStore

  const handleDelete = async () => {
    console.error('Deleting meal entry with name :', meal.name);
    deleteMealEntry(dietGoal!.id ,meal.id );
  };

  return (
    <Segment  className="food-wrapper">
      <Header as='h1' floated="left" className="macros" size='medium'>{meal.quantity} entries of</Header>
      <Header as='h1' floated="left" className="macros" size='medium'>{meal.name}</Header>
      <Header as='h1' floated="left" className="macros">
        <GiFlame className="icons flame" size="35px" /> {round(meal.calories, 1)}
      </Header>
      <Header floated="left" as='h3' className="macros">
        <GiChickenLeg className="icons chicken" size="25px" /> {round(meal.proteins, 1)}
      </Header>
      <Header floated="left" as='h3' className="macros">
        <FaBreadSlice className="icons bread" size="25px" />{round(meal.carbs, 1)}
      </Header>
      <Header floated="left" as='h3' className="macros">
        <GiAvocado className="icons avocado" size="25px" /> {round(meal.fats, 1)}
      </Header>
      <Button inverted color='red' className="macros" onClick={handleDelete} >Delete</Button>
  </Segment>
  );
})