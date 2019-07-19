import React, {useState, useEffect, useContext} from 'react';
import ImagesContext from '../ImagesContext';
import axios from 'axios';
import {DebounceInput} from 'react-debounce-input';

export default function SearchBar() {
    const [queryInput, setQueryInput] = useState("");
    const {dispatch} = useContext(ImagesContext);

    const searchImages = async (event) => {
        setQueryInput(event.target.value);

        const response = await axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&text=${event.target.value}`);
        dispatch({type: "GET_IMAGES", payload: response.data.photos.photo});
    };

    return (
        <div className="search-bar">
            <div className="search-lining">
                <h2>Image Gallery</h2>
                <DebounceInput type="text" placeholder="Search for images..."
                               onFocus={(event) => event.target.placeholder = ""}
                               onBlur={(event) => event.target.placeholder = "Search for images..."}
                               value={queryInput}
                               minLength={1}
                               debounceTimeout={300}
                               onChange={(event) => {
                                   searchImages(event);
                               }}

                />
            </div>
        </div>
    )
}