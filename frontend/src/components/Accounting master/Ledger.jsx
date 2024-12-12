

import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";
import { Link } from "react-router-dom";

const Ledger = () => {
    const [ledgername, setLedgername] = useState("");
    const [under, setUnder] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState(0);
    const [mobilenumber, setMobilenumber] = useState(0);
    const [pannumber, setPannumber] = useState("");
    const [gstnumber, setGstnumber] = useState("");

    const [ledgerdata, setLedgerdata] = useState([]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ledgername,
                under,
                name,
                address,
                state,
                country,
                pincode,
                mobilenumber,
                pannumber,
                gstnumber,
            };

            const res = await axios.post('http://localhost:5500/createledger', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Ledger created successfully");
                fetchdata();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchdata = () => {
        axios.get('http://localhost:5500/getledgerdata', { withCredentials: true })
            .then(res => {
                setLedgerdata(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <Boilerplate>
            <div className="container-fluid">
                <div className="row mt-5">
                    <Blankpage>
                        <div className="m-2">
                            <Blankpage>
                                <div className="row">
                                    <div className="col-lg-9 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-header bg-primary text-white">
                                                <h5>Create Ledger</h5>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={handlesubmit}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Ledger Name</label>
                                                        <input className="form-control" type="text" value={ledgername} onChange={e => setLedgername(e.target.value)} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Under</label>
                                                        <input className="form-control" type="text" value={under} onChange={e => setUnder(e.target.value)} required />
                                                    </div>

                                                    <h5 className="mt-3">Mailing Details</h5>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Name</label>
                                                            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Address</label>
                                                            <input className="form-control" type="text" value={address} onChange={e => setAddress(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-4 mb-3">
                                                            <label className="form-label">State</label>
                                                            <input className="form-control" type="text" value={state} onChange={e => setState(e.target.value)} required />
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="form-label">Country</label>
                                                            <input className="form-control" type="text" value={country} onChange={e => setCountry(e.target.value)} required />
                                                        </div>
                                                        <div className="col-md-4 mb-3">
                                                            <label className="form-label">Pincode</label>
                                                            <input className="form-control" type="number" value={pincode} onChange={e => setPincode(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">Mobile Number</label>
                                                            <input className="form-control" type="number" value={mobilenumber} onChange={e => setMobilenumber(e.target.value)} required />
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label className="form-label">PAN Number</label>
                                                            <input className="form-control" type="text" value={pannumber} onChange={e => setPannumber(e.target.value)} required />
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">GST Number</label>
                                                        <input className="form-control" type="text" value={gstnumber} onChange={e => setGstnumber(e.target.value)} required />
                                                    </div>
                                                    <button className="btn btn-outline-primary mt-3" type="submit">Submit Ledger</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 mb-4">
                                        <div className="card shadow-sm">
                                            <div className="card-header bg-info text-white">
                                                <h5>List of Ledgers</h5>
                                            </div>
                                            <div className="card-body">
                                                {ledgerdata && ledgerdata.length > 0 ? (
                                                    ledgerdata.map((group, index) => (
                                                        <Link
                                                            key={group.id || index}
                                                            className="btn btn-outline-info w-100 mb-2"
                                                            to={`/ledgeredit/${group.srno}`}
                                                        >
                                                            {group.name}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p>No ledgers available.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Blankpage>
                        </div>
                    </Blankpage>
                </div>
            </div>
        </Boilerplate>
    );
};

export default Ledger;
