import React, { useState, useEffect } from 'react';
import "./Airlines.css"

function Airlines() {
    const [searchTerm, setSearchTerm] = useState('');
    const [airlines, setAirlines] = useState([]);

    useEffect(() => {
        const callbackName = 'myCallback';
        window[callbackName] = data => {
            setAirlines(data);
        };

        const script = document.createElement('script');
        script.src = `https://www.kayak.com/h/mobileapis/directory/airlines/homework?jsonp=${callbackName}`;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
            delete window[callbackName];
        };
    }, []);

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };


    const filteredAirlines = airlines.filter(airline =>
        airline.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <input
                type="text"
                placeholder="Airline Filter"
                style={{
                    width: '90%',
                    border: '1px solid #cacaca',
                    borderRadius: '10px',
                    fontSize: '18px',
                    boxSizing: 'border-box',
                }}
                value={searchTerm}
                onChange={handleInputChange}
            />
            <ul>
                {filteredAirlines.map(airline => (
                    <li key={airline.code}>
                        <img src={`https://www.kayak.com/${airline.logoURL}`} alt={airline.name} width="30" height="30" crossOrigin="anonymous" />
                        <div className='text--content'>
                            {airline.name}
                        </div>

                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Airlines;
