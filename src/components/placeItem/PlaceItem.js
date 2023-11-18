import './PlaceItem.css';
import { useNavigate } from 'react-router-dom';

function PlaceItem ({place})  {
    const navigate = useNavigate();

    const handleGetOneClick = async (id) => {
        navigate(`/details/${id}`);
      };

  return (
    <div className='place-item' onClick={() => handleGetOneClick(place.id)}>
        <p>{place.name}</p>
       <p>{place.address}</p>
    </div>
  );
};

export default PlaceItem;
