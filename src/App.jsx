import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Course from './pages/Course';
import Department from './pages/Department'

import SearchBar from './components/SearchBar';
import ShowResults from './components/ShowResults';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Fonction de rappel pour recevoir les données du composant searchbar
    const handleSearchResult = (dataSearchResults, dataSearchQuery, dataIsLoading) => {
        setSearchResult(dataSearchResults);
        setSearchQuery(dataSearchQuery);
        setIsLoading(dataIsLoading)
    };

    return (
        <div className='container'>


            <SearchBar sendData={handleSearchResult} />


            {searchQuery === '' ? (
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />

                        <Route path="/course/:course" element={<Course />} />
                        <Route path="/department/:department" element={<Department />} />
                    </Routes>
                </Router>
            ) : (
                <div>
                    {isLoading ? (
                        <div>
                            <h2>Recherche pour "{searchQuery}"</h2>
                        </div>
                    ) : searchResult.length === 0 ? (
                        <div className='col-lg-6'>
                            <h2>Résultats pour "{searchQuery}"</h2>
                            <hr />
                            <p>Aucun cours, professeur, département ou programme ne fut trouvé pour votre recherche. Essayez une autre requête !</p>
                        </div>
                    ) : (
                        <div className='col-lg-6 coursesList'>
                            <h2>Résultats pour "{searchQuery}"</h2>
                            <hr />
                            <ShowResults results={searchResult} />
                        </div>

                    )}
                </div>
            )}

        </div>

    );
}

export default App;