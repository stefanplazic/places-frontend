import "./Details.css";
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  getOne} from '../../services/place.service.ts';

function Details() {
  const { id } = useParams();

  const [place, setPlace] = useState({});
  const [error, setError] = useState(false);

  const combindDays = (workingHours)  => Object.entries(workingHours).reduce(
        (acc, [day, hours]) => {
          const key = hours === "" ? "CLOSED" : hours;
          acc[key] = acc[key] ? `${acc[key]}-${day}` : day;
          return acc;
        },
        {}
      );


       const reverseObjectAndKeys = (obj) => Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [removeDaysinBetween(value), key]));
        

  const removeDaysinBetween = (days) => {
    const parts = days.split('-');

    if(parts.length < 3) return days;
    return `${parts[0]}-${parts[parts.length - 1]}`;
  }


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
  },[]);

  return (
    <div className="details-container">
      {error ? (
        <span>Error occurred</span>
      ) : place ? (
        <div className="info-holder">
          <div className='left-item'>
            <h1>{place.name}</h1>
            <b>Address</b>
            <p>{place.address}</p>
            <b>Website</b>
            <p>{place.website}</p>
            <b>Phone</b>
            <p>{place.phoneNumber}</p>
          </div>
          
  
          <div className="right-item">
          <b>Opening hours</b>
            {Object.entries(place.workingHours ? reverseObjectAndKeys(combindDays(place.workingHours)) : {}).map(([day, hours]) => (
              <div key={day} className="time-item">
                {day}
                <span className="hours" dangerouslySetInnerHTML={{ __html: hours.replace(/\n/g, '<br>') }}></span>
              </div>
            ))}
          </div>
        </div>
      ) : (<p>Loading data...</p>)}
    </div>
  );
}

export default Details;
