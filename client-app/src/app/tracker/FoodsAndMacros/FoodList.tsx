import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import { Header, Segment } from "semantic-ui-react";
import FoodListItem from "./FoodListItem";







export default observer(function FoodList(){
    const {foodStore} = useStore();
    const {foods} = foodStore;

    return(

        <Fragment>
        {foods.map((food) => (
          <FoodListItem key={food.id} food={food} />
        ))}
       </Fragment>
    )
})