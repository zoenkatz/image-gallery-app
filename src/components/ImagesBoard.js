import React, {useState, useEffect, useContext} from 'react';
import ImagesContext from '../ImagesContext';
import axios from 'axios';

export default function ImagesBoard(){
    const {state, dispatch} = useContext(ImagesContext);

    return(
        <div className="images-board">
            {state.images && state.images.map((photo, index) => {
                return(
                    <img key={index} src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_s.jpg`} />
                )
            })}
        </div>
    )
}