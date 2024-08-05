import { Button, Segment, Header } from 'semantic-ui-react';
import { Food } from '../../models/Food';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/store';

interface Props {
  ingredient: Food;
}

export default observer(function Ingredient({ ingredient }: Props) {
  const { mealStore} = useStore();
  const { removeIngredient} = mealStore;

  const handleDelete = async () => {
    removeIngredient(ingredient.id);
  };

  return (
    <Segment  className="food-wrapper ">
  
      <Header as='h1' floated="left" className="macros global-font" size='medium'>{ingredient.name}</Header>
      <Button inverted color='red' onClick={handleDelete} >-</Button>
     
      
  </Segment>
  );
})