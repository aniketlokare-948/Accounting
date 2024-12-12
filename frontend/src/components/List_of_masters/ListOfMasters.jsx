import React from 'react';
import { Link } from 'react-router-dom';
import '../../Assets/css_files/listofmasters.css';
import Boilerplate from '../../Boilerplate/Boilerplate';
import { FaFileInvoice, FaWarehouse, FaMoneyBillWave, FaTags, FaClipboardList, FaInfoCircle } from 'react-icons/fa';

const ListOfMasters = () => {
    return (
        <Boilerplate>
            <div className="container mt-5">
                <h2 className="text-center mb-4">Masters Management</h2>
                <div className="row justify-content-center">
                    {/* Accounting Masters */}
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-primary text-white">
                                <h4 className="mb-0">Accounting Masters</h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <Link to='/group' className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaFileInvoice style={{ marginRight: '8px' }} /> Group</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>10</span>
                                    </Link>
                                    <Link to='/ledger' className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaClipboardList style={{ marginRight: '8px' }} /> Ledger</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>12</span>
                                    </Link>
                                    <Link to="/currency" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaMoneyBillWave style={{ marginRight: '8px' }} /> Currency</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>8</span>
                                    </Link>
                                    <Link to="/vouchertype" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaTags style={{ marginRight: '8px' }} /> Voucher Type</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>5</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Inventory Master */}
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-warning text-white">
                                <h4 className="mb-0">Inventory Master</h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <Link to="/stock-group" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaWarehouse style={{ marginRight: '8px' }} /> Stock Group</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>34</span>
                                    </Link>
                                    <Link to="/stockcatagory" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaWarehouse style={{ marginRight: '8px' }} /> Stock Category</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>20</span>
                                    </Link>
                                    <Link to='/stockitem' className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaWarehouse style={{ marginRight: '8px' }} /> Stock Items</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>15</span>
                                    </Link>
                                    <Link to="/units" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaTags style={{ marginRight: '8px' }} /> Units</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>10</span>
                                    </Link>
                                    <Link to="/location" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaInfoCircle style={{ marginRight: '8px' }} /> Location</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>5</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Statutory Master */}
                    <div className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            <div className="card-header bg-info text-white">
                                <h4 className="mb-0">Statutory Master</h4>
                            </div>
                            <div className="card-body">
                                <div className="list-group">
                                    <Link to="/gstregistration" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaFileInvoice style={{ marginRight: '8px' }} /> GST Registration</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>7</span>
                                    </Link>
                                    <Link to="/gst-classification" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaTags style={{ marginRight: '8px' }} /> GST Classification</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>3</span>
                                    </Link>
                                    <Link to="/tds-nature" className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                        <span><FaInfoCircle style={{ marginRight: '8px' }} /> TDS Nature of Payments</span>
                                        <span className="badge bg-light text-dark" style={{ minWidth: '30px', textAlign: 'center' }}>6</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Boilerplate>
    );
};

export default ListOfMasters;
