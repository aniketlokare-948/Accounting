import React, { useEffect, useState } from 'react';
import { FaRegMoneyBillAlt, FaClipboardList, FaReceipt, FaFileInvoice, FaShoppingCart, FaFileAlt, FaCreditCard, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Boilerplate from "../../Boilerplate/Boilerplate"; // Adjust the import path as needed
import Blankpage from "../../Boilerplate/Blankpage"; // Adjust the import path as needed
import '../../Assets/css_files/Vouch.css'; // Import custom CSS for styling

const Vouch = () => {
    const voucherTypes = [
        { name: 'Contra', icon: <FaRegMoneyBillAlt />, color: 'success', description: 'Manage contra entries between accounts.' },
        { name: 'Payment', icon: <FaClipboardList />, color: 'primary', description: 'Record all payment transactions.' },
        { name: 'Receipt', icon: <FaReceipt />, color: 'info', description: 'Manage receipts for your transactions.' },
        { name: 'Journal', icon: <FaFileInvoice />, color: 'warning', description: 'Record journal entries for adjustments.' },
        { name: 'Sales', icon: <FaShoppingCart />, color: 'secondary', description: 'Manage sales transactions.' },
        { name: 'Purchase', icon: <FaFileAlt />, color: 'danger', description: 'Record purchase transactions.' },
        { name: 'Credit Note', icon: <FaCreditCard />, color: 'light', description: 'Manage credit notes issued to customers.' },
        { name: 'Debit Note', icon: <FaPlus />, color: 'dark', description: 'Record debit notes from suppliers.' },
        { name: 'Quotation', icon: <FaFileAlt />, color: 'info', description: 'Manage quotations sent to clients.' }
    ];

    return (
        <Boilerplate>
            <div className="vouch-container">
                <Blankpage>
                    <h2 className="text-center mb-4">Vouchers Management</h2>
                    <div className="row">
                        {voucherTypes.map((voucher, index) => (
                            <div className="col-md-4 mb-3" key={index}>
                                <div className={`widget vouch-${voucher.color}`}>
                                    <div className="widget-icon">
                                        {voucher.icon}
                                    </div>
                                    <h5 className="widget-title">{voucher.name}</h5>
                                    <p className="widget-description">{voucher.description}</p>
                                    <Link to={`/${voucher.name}`} className="vouch-button text-decoration-none">Manage {voucher.name}</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </Blankpage>
            </div>
        </Boilerplate>
    );
};

export default Vouch;
