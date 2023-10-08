import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../assets/css/components/searchBar.css';

const SearchBar = ({ sendData }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery.length > 2) {
            fetchData(searchQuery);
        } else if (searchQuery.length == 0) {
            setSearchResults([]);
            sendData([], searchQuery);
        }
    }, [searchQuery]);

    const fetchData = (value) => {
        fetch(`http://localhost:5000/search/${value}`)
            .then(response => response.json())
            .then(json => {
                setSearchResults(json);

                // We send data to the parent component 
                // (result (array), request (string), isLoading (boolean)).
                setIsLoading(false)
                sendData(json, searchQuery, false);
            })
            .catch(error => {
                console.error("Une erreur s'est produite lors de la récupération des données:", error);
            });
    }

    const handleChange = (value) => {
        setSearchQuery(value);

        // If lenght > 2, we send true to isWainting
        if (value.length > 2) {
            setIsLoading(true);
            sendData([], searchQuery, true);
        }
    }


    return (

        <div className="SearchBarBox">
            <div className='row'>
                <div className='col-lg-6'>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1"><FaSearch id="search-icon" /></span>
                        </div>

                        <input type="text"
                            className="form-control"
                            placeholder="Rechercher un cours"
                            maxlength="50"
                            name="searchBar"
                            value={searchQuery}
                            onChange={(e) => handleChange(e.target.value)}
                        />

                        <div class="input-group-append">
                            {isLoading && <div class="lds-facebook"><div></div><div></div><div></div></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default SearchBar;