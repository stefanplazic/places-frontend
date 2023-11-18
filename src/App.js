import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { getAll, search} from './services/place.service.ts';

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


  const handleGetOneClick = async (id) => {
    navigate(`/details/${id}`);
  };


  return (
    <div className="App">

        <h1>Place Finder</h1>

        <input
        type="text"
        placeholder="Search business entries..."
        onChange={handleInputChange}
      />

        <ul>
          {places.map((place) => (
            <li key={place.id} onClick={() => handleGetOneClick(place.id)}>
              <strong>{place.name}</strong> - {place.address}
            </li>
          ))}
        </ul>

    </div>
  );
}

export default App;
