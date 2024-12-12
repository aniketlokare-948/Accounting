import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";
import { useParams } from "react-router-dom";

const Ledgeredit = () => {
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
    
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5500/ledgereditget/${id}`, { withCredentials: true })
            .then(res => {
                const data = res.data[0];
                setLedgername(data.ledgername);
                setAddress(data.address);
                setCountry(data.country);
                setGstnumber(data.gstnumber);
                setMobilenumber(data.mobilenumber);
                setName(data.name);
                setPannumber(data.pannumber);
                setPincode(data.pincode);
                setState(data.state);
                setUnder(data.under);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

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
            const res = await axios.put(`http://localhost:5500/ledgeredit/${id}`, payload, { withCredentials: true });
            if (res.data.message === "done") {
                alert("Ledger updated successfully");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Edit Ledger</h5>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Edit Ledger Details</div>
                                <div className="card-body">
                                    <form onSubmit={handlesubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Ledger Name</label>
                                            <input className="form-control" type="text" value={ledgername} onChange={e => setLedgername(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Under</label>
                                            <input className="form-control" type="text" value={under} onChange={e => setUnder(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Name</label>
                                            <input className="form-control" type="text" value={name} onChange={e => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Address</label>
                                            <input className="form-control" type="text" value={address} onChange={e => setAddress(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">State</label>
                                            <input className="form-control" type="text" value={state} onChange={e => setState(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Country</label>
                                            <input className="form-control" type="text" value={country} onChange={e => setCountry(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Pincode</label>
                                            <input className="form-control" type="number" value={pincode} onChange={e => setPincode(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Mobile Number</label>
                                            <input className="form-control" type="number" value={mobilenumber} onChange={e => setMobilenumber(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">PAN Number</label>
                                            <input className="form-control" type="text" value={pannumber} onChange={e => setPannumber(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">GST Number</label>
                                            <input className="form-control" type="text" value={gstnumber} onChange={e => setGstnumber(e.target.value)} />
                                        </div>
                                        <button className="btn btn-primary">Update Ledger</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Blankpage>
            </div>
        </Boilerplate>
    );
};

export default Ledgeredit;
