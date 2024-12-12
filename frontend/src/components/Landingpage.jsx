import React from 'react'
import Sidebar from './layout/Sidebar';



const Landingpage = () => {
    return (
        <>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-2 border-end' style={{height: "728px"}}>
                        <Sidebar></Sidebar>

                    </div>
                    <div className='col-10'>

                    </div>

                </div>


            </div>


        </>
    );
}



export default Landingpage;