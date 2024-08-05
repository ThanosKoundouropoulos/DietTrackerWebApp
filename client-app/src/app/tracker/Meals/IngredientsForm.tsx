import { observer } from "mobx-react-lite";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Container, Input } from "semantic-ui-react";
import { Food } from "../../models/Food";
import {v4 as uuid} from 'uuid';
import { useStore } from "../../stores/store";
import { SearchResultsList } from "../Searching/SearchResultList";
import IngredientsList from "./IngredientsList";
import { Link } from "react-router-dom";
import { MealFormValues } from "../../models/meal";





export default observer(function IngredientsForm() {
    const [inputNameValue, setInputNameValue] = useState<string>('');
    const [input, setInput] = useState("");
    const [inputGr, setInputGr] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { foodStore,mealStore } = useStore();
    const { searchResults, searchFoods, clearSearchResults } = foodStore;
    const { addIngredient ,ingredients,setCreatingDB,createMealFromIngredients} = mealStore;

    const handleSelectResult = (selectedResult: Food) => {
        setInput(selectedResult.name);
        setShowResults(false);
      };


      const handleChange = (e: any) => {
        const inputValue = e.target.value;
        setInput(inputValue);
    
        if (inputValue.trim() !== '') {
          searchFoods(inputValue);
          setShowResults(true);
        } else {
          clearSearchResults();
          setShowResults(false);
        }
      };

    const handleAddFood = () => {
      let amount = parseFloat(inputGr);
      if (!isNaN(amount)) {
        const selectedFood = foodStore.selectFood(input);
  
        if (selectedFood) {
          addIngredient(selectedFood, amount);
          setInput("");
          setInputGr("");
          setShowResults(false);
        } else {
          console.error('Selected food not found.');
        }
      } else {
        console.error('Invalid amount entered:', inputGr);
      }
    };

        
    function handleFormSubmit() {
      
      const newMeal = new MealFormValues();
      newMeal.id = uuid();
      newMeal.name = inputNameValue;
      createMealFromIngredients(newMeal);
      setCreatingDB(false);
    }

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputGr(e.target.value);
      };
 
    return (

        <>
        <Container className="search-input-wrapper db ">
          <FaSearch id="search-icon" />
          <Input
            className="foodInput db "
            name="food"
            transparent
            value={input}
            onChange={handleChange}
          />
        </Container>
        {showResults && <SearchResultsList  results={searchResults} onSelectResult={handleSelectResult} />}
        
        <Container className="input-wrapper-grams db ">
        
          <Input
            className="foodInput db"
            name="gramms"
            transparent
            placeholder={`gr`}
            value={inputGr}
            onChange={handleInputChange}
          />
        </Container>
        
        <Button icon='add' floated="left" inverted color='green' className="addFoodButton" onClick={handleAddFood} />
        <Container className="input-wrapper-name ">
          <Input 
            className="foodInputName db"
            placeholder='Enter food name'
            transparent
            value={inputNameValue}
            onChange={(e) => setInputNameValue(e.target.value)}
          />
        </Container>
      
        
        <IngredientsList/>
        <div style={{position:'absolute',bottom:20,right:25}}> 
                <Button 
                    onClick={() => handleFormSubmit()}
                    className="global-font"
                    disabled={ingredients.length === 0}
                    floated='left' 
                    positive type='submit' content='Submit'
                />
            </div>
            <div style={{position:'absolute',bottom:20,left:35}}> 
                <Button className="global-font" as={Link} onClick={() => setCreatingDB(false)} to='/tracker'  floated='right'  type='button' content='Cancel' color="red"/>
            </div>
      </>
        

    )
  });
