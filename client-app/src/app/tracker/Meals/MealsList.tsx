import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import { Container, Header, Segment } from "semantic-ui-react";
import MealListItem from "./MealListItem";








export default observer(function MealList(){
    const {mealStore} = useStore();
    const {meals} = mealStore;

    return(

        <Container textAlign="center" className="mealsListContainer">
            <Fragment>
                {meals.map((meal) => (
                    <MealListItem key={meal.id} meal={meal} />
                ))}
            </Fragment>
       </Container>
    )
})