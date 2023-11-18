import './SearchBar.css';
function SearchBar ({handleInputChange})  {
  return (
    <input type='text'
    placeholder="Search business entries..."
        onChange={handleInputChange}
      
        />
  );
};

export default SearchBar;
