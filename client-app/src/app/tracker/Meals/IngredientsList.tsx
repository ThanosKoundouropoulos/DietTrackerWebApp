import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useStore } from "../../stores/store";
import { Container, Header, Segment } from "semantic-ui-react";
import MealListItem from "./MealListItem";
import Ingredient from "./Ingredient";








export default observer(function IngredientList(){
    const {mealStore} = useStore();
    const {ingredients} = mealStore;

    return(

        <Container textAlign="center" className="IngredientListContainer">
            <Fragment>
                {ingredients.map((ingredient) => (
                    <Ingredient key={ingredient.id} ingredient={ingredient} />
                ))}
            </Fragment>
       </Container>
    )
})