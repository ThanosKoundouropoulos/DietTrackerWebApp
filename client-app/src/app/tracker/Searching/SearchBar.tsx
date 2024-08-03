import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Button, Container, Input, List } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { Food, FoodFormValues } from "../../models/Food";
import * as Yup from 'yup';
import userStore from "../../stores/userStore";
import { SearchResultsList } from "./SearchResultList";


interface SearchBarProps {
  setResults: React.Dispatch<React.SetStateAction<Food[]>>;
  onAddFood: (selectedFood: Food, amount: number ) => Promise<void>;
}

export const SearchBar: React.FC<SearchBarProps> = observer(({ setResults, onAddFood }) => {
  const [input, setInput] = useState("");
  const [inputGr, setInputGr] = useState("");
  const [unit, setUnit] = useState('100gr');
  const [showResults, setShowResults] = useState(false);
  const { foodStore } = useStore();
  const { searchResults, searchFoods, clearSearchResults } = foodStore;

  const handleSelectResult = (selectedResult: Food) => {
    setInput(selectedResult.name);
    setShowResults(false);
  };

  const handleAddFood = () => {
    let amount = parseFloat(inputGr);
    if (!isNaN(amount)) {
      if (unit === '100gr') {
        //amount *= 100;
      }
      else{
        amount = amount / 100;
      }
      console.error('Food name as input:', input);
      const selectedFood = foodStore.selectFood(input);

      if (selectedFood) {
        console.error('Food name after selection:', selectedFood.name);
        onAddFood(selectedFood, amount);
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

  const validationSchema = Yup.object({
    food: Yup.string().required(),
    gramms: Yup.string().required(),
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputGr(e.target.value);
  };

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(e.target.value);
    setInputGr('');
  };

  return (
    <>
      <Container className="search-input-wrapper ">
        <FaSearch id="search-icon" />
        <Input
          className="foodInput "
          name="food"
          transparent
          placeholder="Add foods from the database..."
          value={input}
          onChange={handleChange}
        />
      </Container>
      {showResults && <SearchResultsList results={searchResults} onSelectResult={handleSelectResult} />}
      
      <Container className="input-wrapper-grams ">
      
        <Input
          className="foodInput"
          name="gramms"
          transparent
          placeholder={`  qty of`}
          value={inputGr}
          onChange={handleInputChange}
        />
      </Container>
      <select className="input-wrapper-grams global-font" style={{position:"absolute",right:80, zIndex:1,top:26}} value={unit} onChange={handleUnitChange}>
          <option value="100gr">100 gr</option>
          <option value="1gr">1 gram</option>
        </select>
      <Button icon='add' floated="left" inverted color='green' className="addFoodButton" onClick={handleAddFood} />
    </>
       
      );
});
