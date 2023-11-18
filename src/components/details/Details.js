// import "./Details.css";
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  getOne} from '../../services/place.service.ts';

function Details() {
  const { id } = useParams();

  const [place, setPlace] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const place = await getOne(id);
        setPlace(place);
      } catch (error) {
        console.error('Error in fetching place:', error.message);
        setError(true);
      }
    };

    fetchPlace();
  });

  return (
  <div>
    {error ? 
     
     (<span>Error occured</span>)
     :
     ( 
      <>
      <h1>{place.name}</h1>
       <p>{place.id}</p>
       </>
       )
    }
  </div>
  );
}

export default Details;
