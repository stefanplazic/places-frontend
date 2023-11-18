import './ItemHolder.css';
import PlaceItem from '../placeItem/PlaceItem';

function ItemHolder ({placeItems})  {
  return (
    <div className='container'>

{placeItems.map((placeItem) => (
        <PlaceItem
          key={placeItem.id}
          place={placeItem}
          
          // Add other props as needed
        />
      ))}

    </div>
  );
};

export default ItemHolder;