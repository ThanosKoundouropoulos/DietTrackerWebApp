import { GiChickenLeg,GiAvocado ,GiFlame} from 'react-icons/gi';
import { FaBreadSlice } from 'react-icons/fa';
import { Container, Header } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";


function round(value: number, precision: number) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}

export default observer( function MacrosHeader() {
   
    const {userStore : {dietGoal}} = useStore();

    return (
      <>
          <Container  className="macrosHeader global-font">
                <Header as='h2' floated="left"   className="macros global-font"> Your Goal :</Header>
                <Header as='h1' floated="left"   className="macrosC global-font"> <GiFlame className="icons flame" size="30px" /> {round(dietGoal!.calories,1)}</Header>
                <Header  floated="left"  as='h2'   className="macrosM global-font">  <GiChickenLeg className="icons chicken" size="25px" /> {round(dietGoal!.proteins,1)}</Header>
                <Header floated="left" as='h2'   className="macrosM global-font"> <FaBreadSlice className="icons bread" size="25px"/>{round(dietGoal!.carbs,1)}</Header>
                <Header floated="left" as='h2'   className="macrosM global-font"><GiAvocado className="icons avocado" size="25px"/> {round(dietGoal!.fats,1)}</Header> 
            </Container> 
         
      </>
       
      );
})