import React from "react";





const Blankpage = ({ children }) => {
    return (
        <>

            <div className="card bg-white border-0 rounded-3">
                <div className="card-body">

                    {children}

                </div>

            </div>



        </>
    );
}


export default Blankpage