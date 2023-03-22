import React, { useState, useEffect } from 'react';
import "./Airlines.css"

function AirlineInfo({ airline, onBackClick }) {
    return (
        <div className='air--info' style={{ display: "flex" }}>
            <div style={{ width: "75%" }}>
                <a className='button' href="#" onClick={onBackClick}>&lt;  Back to List </a>
                <h2>{airline.name}  ({airline.code})  </h2>
                <p>{airline.phone}</p>
                <p className='website' onClick={() => window.location.href = airline.site}>{airline.site.replace("https://", "")}</p>
                <p style={{ color: "#f49000", paddingTop: "20px" }}>Check flight status</p>
                <div style={{ display: "flex" , justifyContent: "center", alignItems: "center",marginLeft:"30px"}}>
                    <input placeholder="Enter Flight Number" style={{ width: "105%",alignItems: "center",border: '1px solid #cacaca',
                            borderRadius: '10px',
                            fontSize: '18px',
                            boxSizing: 'border-box' }} />
                    <button style={{ width: "35%", marginLeft: "10px",border: '0px solid #f49000',
                            borderRadius: '10px',
                            fontSize: '18px',
                            boxSizing: 'border-box',background:"#f49000",color:"white" }} >
                        Submit
                    </button>
                </div>
            </div>

            <img src={`https://www.kayak.com/${airline.logoURL}`} alt={airline.name} width="100" height="100" crossOrigin="anonymous" style={{ marginLeft: "auto", marginRight: "10px" }} />


        </div>
    );
}


function Airlines() {
    const [searchTerm, setSearchTerm] = useState('');
    const [airlines, setAirlines] = useState([]);
    const [selectedAirline, setSelectedAirline] = useState(null);

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

    const handleClick = (airline) => {
        setSelectedAirline(airline);
    };



    const filteredAirlines = airlines.filter(airline =>
        airline.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>

            {selectedAirline ? (
                <AirlineInfo airline={selectedAirline} onBackClick={() => setSelectedAirline(null)} />
            ) : (
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
                            <li key={airline.code} onClick={() => handleClick(airline)}>
                                <img src={`https://www.kayak.com/${airline.logoURL}`} alt={airline.name} width="30" height="30" crossOrigin="anonymous" />
                                <div className='text--content'>
                                    {airline.name}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Airlines;
