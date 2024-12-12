import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { Link } from "react-router-dom";
import '../../Assets/css_files/sidebar.css';

const Sidebar = () => {
    return (
        <div className="accordion accordion-flush mt-4 border-0 m-0" id="accordionFlushExample">
             <div class="logo position-relative border-bottom pb-3">
                <a href="index.html" class="d-block text-decoration-none position-relative" >
                    <img src="logo192.png" alt="logo-icon" style={{height: "35px", width: "35px"}} />
                    <span class="logo-text fw-bold text-dark ms-2">Accounting</span>
                </a>
                <button class="sidebar-burger-menu bg-transparent p-0 border-0 opacity-0 z-n1 position-absolute top-50 end-0 translate-middle-y" id="sidebar-burger-menu">
                    <i data-feather="x"></i>
                </button>
            </div>
            <div className="accordion-item border border-0">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed collapsedbutton mt-3 border border-1 rounded-2 pt-4 pb-4" 
                            style={{ height: "20px" }} 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#flush-collapseDashboard" 
                            aria-expanded="false" 
                            aria-controls="flush-collapseDashboard">
                        Dashboard
                    </button>
                </h2>
                <div id="flush-collapseDashboard" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="">
                        <div className="m-0">
                            <button type="button" className="mt-3 btn innerbutton w-100 m-0 text-start ">Primary</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item border border-0">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed collapsedbutton mt-3 border border-1 rounded-2 pt-4 pb-4" 
                            style={{ height: "20px" }} 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#flush-collapsesetting" 
                            aria-expanded="false" 
                            aria-controls="flush-collapsesetting">
                        Master management
                    </button>
                </h2>
                <div id="flush-collapsesetting" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="">
                        <div className="m-0">
                            <Link to="/listofmasters" className="mt-2 btn innerbutton w-100 m-0 text-start ">Accounting master</Link>
                            <Link to="/listofmasters" className="mt-2 btn innerbutton w-100 m-0 text-start ">Inventory master</Link>
                            <Link to="/listofmasters" className="mt-2 btn innerbutton w-100 m-0 text-start ">Statutory master</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="accordion-item border border-0">
                <h2 className="accordion-header">
                    <button className="accordion-button collapsed collapsedbutton mt-3 border border-1 rounded-2 pt-4 pb-4" 
                            style={{ height: "20px" }} 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#flush-collapsethirdone" 
                            aria-expanded="false" 
                            aria-controls="flush-collapsethirdone">
                    Vouchers
                    </button>
                </h2>
                <div id="flush-collapsethirdone" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="">
                        <div className="m-0">
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Contra</Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Payment    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Recepit    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Journal    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Sales    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Purchase    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Creadit note    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Debit note    </Link>
                            <Link to="/vouchers" className="mt-2 btn innerbutton w-100 m-0 text-start ">Quotation    </Link>
                        </div>
                    </div>
                </div>
            </div>

          
        </div>
    );
};

export default Sidebar;
