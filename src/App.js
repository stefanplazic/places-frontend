import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { getAll, search} from './services/place.service.ts';
import SearchBar from './components/searchBar/SearchBar';
import ItemHolder from './components/itemHolder/ItemHolder';


function App() {
  const [places, setPlaces] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const allPlaces = await getAll();
        setPlaces(allPlaces);
      } catch (error) {
        console.error('Error fetching places:', error.message);
      }
    };

    fetchPlaces();
  }, []);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
    let searchResults;

    // if search box is empty
    // fetch all places
   if(searchTerm=== '') searchResults = await getAll();
   
  else 
  // oterwise search places by search term
  searchResults = await search(searchTerm);
    setPlaces(searchResults);
  };

  return (
    <div className="App">

        <h1>Place Finder</h1>
        <SearchBar handleInputChange={handleInputChange}/>
        <ItemHolder placeItems={places}></ItemHolder>
    </div>
  );
}

export default App;
