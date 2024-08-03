import React from 'react';
import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import { Item, Button, Label, Segment, Grid, Header } from 'semantic-ui-react';
import { Food } from '../../models/Food';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';
import { Meal } from '../../models/meal';

interface Props {
  ingredient: Food;
}

function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


export default observer(function Ingredient({ ingredient }: Props) {
  const { mealStore} = useStore();
  const { removeIngredient} = mealStore;

  const handleDelete = async () => {
    console.error('Deleting meal entry with name :', ingredient.name);
    removeIngredient(ingredient.id);
  };

  return (
    <Segment  className="food-wrapper ">
  
      <Header as='h1' floated="left" className="macros global-font" size='medium'>{ingredient.name}</Header>
      <Button inverted color='red' onClick={handleDelete} >-</Button>
     
      
  </Segment>
  );
})