import React, { useState, useEffect } from "react";
import { fetchdata, storedValues } from "./Statemanagement";
import { getstorestate } from "./Statemanagement";

const Sendstate = () => {
    const [myname, setMyname] = useState([]);
    const [mithila, setMithila] = useState("mithila parmaj");

    const url = "https://jsonplaceholder.typicode.com/posts";

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        fetchdata(url, "omkardata");  // Fetch data and store it with the key 'demodata'

        // Since fetching is asynchronous, wait for the data to be fetched and then update state
        const interval = setInterval(() => {
            if (storedValues.omkardata) {
                setMyname(storedValues.omkardata); // Set myname with the fetched data
                clearInterval(interval);  // Stop checking once the data is available
            }
        }, 100); // Check every 100ms for the data

        // Cleanup interval when the component is unmounted
        return () => clearInterval(interval);
    }, []);

    
    getstorestate("mithila", mithila);
    console.log(storedValues);
    return (
        <div>
          {
            myname.length > 0 && myname.map((o, index) => (
                <h3 key={index}>{o.title}</h3> // Display each post's title
            ))
          }
        </div>
    );
};

export default Sendstate;
