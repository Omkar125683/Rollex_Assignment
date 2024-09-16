import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

const SearchBar = () => {
    const { searchQuery, setSearchQuery } = useContext(SearchContext);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <input
            type="text"
            className="form-control"
            placeholder="Search by name or address"
            value={searchQuery}
            onChange={handleSearch}
        />
    );
};

export default SearchBar;
