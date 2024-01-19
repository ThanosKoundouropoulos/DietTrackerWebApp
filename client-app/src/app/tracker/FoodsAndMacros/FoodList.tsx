import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import { Divider, Header, Segment } from "semantic-ui-react";
import FoodListItem from "./FoodListItem";
import MealEntryItem from "../Meals/MealEntryItem";







export default observer(function FoodList(){
    const {foodStore ,mealStore} = useStore();
    const {foods} = foodStore;
    const {mealEntries} = mealStore;

    return(

        <Fragment>
        {foods && foods.map((food) => (
          <FoodListItem key={food.id} food={food} />
        ))}
        {mealEntries && mealEntries.map((meal) => (
          <MealEntryItem key={meal.id} meal={meal} />
        ))}
       </Fragment>
       
    )
})