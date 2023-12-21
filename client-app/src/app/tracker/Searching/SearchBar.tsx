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
  const [showResults, setShowResults] = useState(false);
  const { foodStore } = useStore();
  const { searchResults, searchFoods, clearSearchResults } = foodStore;

 

  const handleSelectResult = (selectedResult: Food) => {
    setInput(selectedResult.name);
    setShowResults(false);
  };

  const handleAddFood = () => {
    
    const amount = parseFloat(inputGr);
    if (!isNaN(amount)) {
      console.error('Food name as input :', input);
      const selectedFood = foodStore.selectFood(input);
  
      if (selectedFood) {
        console.error('Food name after selection  :', selectedFood.name);
        onAddFood(selectedFood,amount);
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
   
})

/*   useEffect(() => {
    if (input.trim() !== "") {
    const fetchData = async () => {
      console.log('foodStore instance IN SEARCH BAR  :');
      if (input.trim() !== "") {
        try {
          // Call the searchFoods function with the input value
          console.log('foodStore instance IN SEARCH BAR  :');
          await searchFoods(input);
          setResults(searchResults);
          setShowResults(true);
        } catch (error) {
          console.error('Error searching foods:', error);
        }
      } else {
        // Clear results if the input is empty
        clearSearchResults();
        setShowResults(false);
      }
    };
    // Fetch data when the input changes
    fetchData();
    }
    
  }, [input, searchFoods, searchResults, setResults, clearSearchResults]);
*/

  const handleChange = (e:any) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    // Perform the search only if the input is not empty
    if (inputValue.trim() !== '') {
      searchFoods(inputValue);
      setShowResults(true);
    } else {
      // Clear results if the input is empty
      clearSearchResults();
      setShowResults(false);
    }
  };

  
    return (
      <>
       <Container className="input-wrapper">
            <FaSearch id="search-icon" />
                <Input className="foodInput"
                    name="food"
                    transparent
                    placeholder="Add foods from the database..."
                    value={input}
                    onChange={handleChange}
                />    
        </Container>
        {showResults && <SearchResultsList results={searchResults} onSelectResult={handleSelectResult} />}
        <Container className="input-wrapper-grams">
            <Input className="foodInput"
                name="gramms"
                transparent
                placeholder="of 100 gr"
                value={inputGr}
                onChange={(e) =>  setInputGr(e.target.value)}
            />
        </Container>
        <Button icon='add' floated="left" inverted color='green' className="addFoodButton" onClick={handleAddFood} />
         
      </>
       
      );
});


  /*const fetchData = (value) => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((json) => {
          const results = json.filter((user) => {
            return (
              value &&
              user &&
              user.name &&
              user.name.toLowerCase().includes(value)
            );
          });
          setResults(results);
        });
    };*/
  
  /*  const handleChange = (value) => {
      setInput(value);
      fetchData(value);
    };*/