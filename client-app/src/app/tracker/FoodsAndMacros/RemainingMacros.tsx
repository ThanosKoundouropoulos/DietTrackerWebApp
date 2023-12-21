import { Button, Container, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";


function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export default observer( function RemainingMacros() {
    const {userStore : {dietGoal}} = useStore();
    const {dietGoalStore : {remainingDietGoal,clearDietGoal,loading}} = useStore();
    const {foodStore : {foods}} = useStore();

    const handleClearDietGoal = async () => {
        try {
          clearDietGoal(dietGoal!.id);
        } catch (error) {
          console.error('Error clearing diet goal:', error);
        }
      };

    return (
      <>
          <Container  className="RemainingMacros">
                <Header as='h4' floated="left"   className="macros">  Remaining :</Header>
                <Header as='h3' floated="left"   className="macrosC">  {round(remainingDietGoal!.calories,1)}</Header>
                <Header  floated="left"  as='h3'   className="macrosM">   {round(remainingDietGoal!.proteins,1)}</Header>
                <Header floated="left" as='h3'   className="macrosCa"> {round(remainingDietGoal!.carbs,1)}</Header>
                <Header floated="left" as='h3'   className="macrosF">{round(remainingDietGoal!.fats,1)}</Header>
                <Button 
                    floated="right" 
                    color='red' 
                    className="clearBtn"
                    onClick={handleClearDietGoal}
                    loading={loading} 
                    disabled={foods.length === 0}>
                    Clear
                </Button> 
            </Container> 
         
      </>
       
      );
})