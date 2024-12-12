import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css_files/listofmasters.css';
import Sidebar from '../components/layout/Sidebar';

const Boilerplate2 = ({ children }) => {
    return (
        <>
            <div className='container-fluid' style={{
                // Adjust margin-left to match the width of the sidebar
                backgroundColor: "#F6F7F9",
                minHeight: "100vh", // Ensure the main content takes full height
                // Optional: Add some padding
            }}>
                <div className='row'>


                    {children}

                </div>
            </div>
        </>
    );
}

export default Boilerplate2;
