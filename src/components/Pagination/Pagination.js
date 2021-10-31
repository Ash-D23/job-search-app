import React from 'react';
import './Pagination.css';

export default function Pagination({ current, setcurrent}) {

    return (
        <div className="page-center">
            <button className="page-btn" onClick={()=> setcurrent(current-1)}> Prev </button>
            <p className="page-number">{current+1}</p>
            <button className="page-btn" onClick={()=> setcurrent(current+1)}> Next </button>
        </div>
    )
}
