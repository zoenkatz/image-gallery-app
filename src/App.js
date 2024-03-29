import React, {useContext, useReducer, useEffect, useState} from 'react';
import './App.scss';
import ImagesContext from './ImagesContext';
import ImagesReducer from './ImagesReducer';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import ImagesBoard from './components/ImagesBoard';



function App() {

    const useApi = (endpoint) => {
        const [data, setData] = useState([]);

        useEffect(() => {
            getData();
        }, [pageNum]);

        const getData = async () => {
            const response = await axios.get(endpoint);
            setData([...state.images, ...response.data.photos.photo]);
        };

        return data;
    };

    const initialState = useContext(ImagesContext);
    const [state, dispatch] = useReducer(ImagesReducer, initialState);
    const [pageNum, setPageNum] = useState(1);
    const savedImages = useApi(`https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&api_key=bac9f1ccfd854f27894fd47c4f01b1e8&content_type=1&is_getty=1&page=${pageNum}&text=${state.query}`);

    useEffect(() => {
        dispatch({
            type: "GET_IMAGES",
            payload: savedImages
        })
    }, [savedImages]);

    //adding infinite scrolling
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        setPageNum(pageNum+1);

        console.log('Fetch more list items!');
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [document.documentElement.scrollTop]);

    return (
        <ImagesContext.Provider value={{state, dispatch}}>
            <div className="App">
                <SearchBar/>
                <ImagesBoard/>
            </div>
        </ImagesContext.Provider>
    )
}

export default App;
