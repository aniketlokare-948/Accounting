import axios from "axios";

let storedValues = {}; // Define storedValues outside the function

// Function to fetch data using axios
export const fetchdata = (url, name) => {
    axios.get(url)
    .then(res => {
        // Store the response data with the key 'data'
        storedValues[name] = res.data; // Use res.data to get the actual data from the response
    })
    .catch(err => {
        console.log(err);
    })
}

// Function to store key-value pairs in storedValues
export const storestate = (key, value) => {
    storedValues[key] = value; // Add or update the key-value pair
    return storedValues; // Return the updated storedValues object
}

export const getstorestate = (key, value) => {
    storedValues[key].push(value); // Add or update the key-value pair
    return storedValues; // Return the updated storedValues object
}

export { storedValues };
