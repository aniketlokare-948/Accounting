import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css_files/listofmasters.css';
import Sidebar from '../components/layout/Sidebar';

const Boilerplate = ({ children }) => {
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xxl-2 col-xl-2 col-lg-2 col-sm-0 col-xs-0 border-end' 
                         style={{ 
                             height: "100vh", 
                             position: "fixed", 
                             overflowY: "auto", 
                             backgroundColor: "#fff" // Optional: Set a background color
                         }}>
                        <Sidebar />
                    </div>
                    <div className='col-xxl-10 col-xl-10 col-lg-10 col-sm-12 col-xs-12' 
                         style={{ 
                             marginLeft: "16.66667%", // Adjust margin-left to match the width of the sidebar
                             backgroundColor: "#F6F7F9", 
                             minHeight: "100vh", // Ensure the main content takes full height
                             padding: "20px" // Optional: Add some padding
                         }}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Boilerplate;
