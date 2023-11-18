import  { useState, useEffect } from 'react';
import './App.css';
import { getAll, search} from './services/place.service.ts';

function App() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const allPlaces = await getAll();
        setPlaces(allPlaces);
        console.log({allPlaces});
      } catch (error) {
        console.error('Error fetching places:', error.message);
      }
    };

    fetchPlaces();
  }, []);

  const handleInputChange = async (event) => {
    const searchTerm = event.target.value;
   if(searchTerm=== '') return;
    // get search results from server
    const searchResults = await search(searchTerm);
    setPlaces(searchResults);
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
          {places.map((place, index) => (
            <li key={index}>
              <strong>{place.name}</strong> - {place.address}
            </li>
          ))}
        </ul>

    </div>
  );
}

export default App;
