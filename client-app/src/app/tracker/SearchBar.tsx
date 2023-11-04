import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Input } from "semantic-ui-react";


export default function SearchBar() {
    const [input, setInput] = useState("");

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
  
    
    return (
        <Container className="input-wrapper">
            <FaSearch id="search-icon" />
                <Input className="Input"
                    transparent
                    placeholder="Add foods from the database..."
                    value={input}
                // onChange={(e) => handleChange(e.target.value)}
                />
        </Container>
      );
}