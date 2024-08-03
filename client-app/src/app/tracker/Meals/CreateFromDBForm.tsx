import { observer } from "mobx-react-lite";
import { Button, Container, Header } from "semantic-ui-react";
import { useState } from "react";
import NutrientsTable from "./NutrientsTable";
import IngredientsForm from "./IngredientsForm";









export default observer(function CreateForm() {
   
  
    const [activeComponent, setActiveComponent] = useState(null);
  
 
  

      const handleButtonClick = (component:any) => {
        setActiveComponent(component);
      };
      
 
    return (

        
        <Container textAlign='center'  className="mealForm">
            <div style={{ position: 'relative', top: 10 ,left:-72}}>
                  <Button icon='nutritionix'  onClick={() => handleButtonClick('nutrients')} content='Nutrition' className="mealBtn global-font"></Button>
            </div>
            <div style={{ position: 'relative', top: -26,right:-80 }}>
                  <Button  onClick={() => handleButtonClick('ingredients')} content='Ingredients' className="mealBtn global-font"></Button>
            </div>
        
      
            {activeComponent === 'nutrients' && <NutrientsTable  />}
            {activeComponent === 'ingredients' && <IngredientsForm/> }
            {activeComponent !== 'nutrients' && activeComponent !== 'ingredients' && 
            <div style={{position:'absolute', top:120}}>
                <Header inverted className="global-font" as={"h2"} >Add <span style={{ color: "lightgreen" }}>Ingredients</span> directly from the database 
                and get a detailed <br/> breakdown of the macronutrients from the <span style={{ color: "lightgreen" }}>Nutrition</span> tab!</Header>
            </div>}
        </Container>

    )
  });