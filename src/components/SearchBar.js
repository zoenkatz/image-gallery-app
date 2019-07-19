import React, {useState, useContext} from 'react';
import ImagesContext from '../ImagesContext';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';

export default function SearchBar() {
    const [queryInput, setQueryInput] = useState("");
    const {dispatch} = useContext(ImagesContext);
    const queries = localStorage.getItem('queries') ?
        JSON.parse(localStorage.getItem('queries')) : localStorage.setItem(`queries`, JSON.stringify({}));

    const searchImages = async (event) => {
        setQueryInput(event.target.value);
        dispatch({type: "SET_QUERY", payload: event.target.value});

        const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${event.target.value}`);
        dispatch({type: "GET_IMAGES", payload: response.data.photos.photo});

        //save value to localStorage
        queries[event.target.value] = event.target.value;
        localStorage.setItem(`queries`, JSON.stringify(queries));
    };

    return (
        <div className="search-bar">
            <div className="search-lining">
                <h2>Image Gallery</h2>
                <DebounceInput type="search"
                               list="last-queries"
                               placeholder="Search for images..."
                               id="image-search"
                               name="q"
                               onFocus={(event) => event.target.placeholder = ""}
                               onBlur={(event) => event.target.placeholder = "Search for images..."}
                               value={queryInput}
                               minLength={1}
                               debounceTimeout={300}
                               onChange={(event) => {
                                   searchImages(event);
                               }}

                />
                <datalist id="last-queries">
                    {localStorage.getItem('queries') && Object.values(JSON.parse(localStorage.getItem('queries'))).reverse().map((query, index) => {
                        return (
                            <option key={index} value={query}/>
                        )
                    })}
                </datalist>
            </div>
        </div>
    )
}