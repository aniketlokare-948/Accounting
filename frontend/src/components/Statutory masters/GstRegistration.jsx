import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const GstRegistration = () => {
    const [states, setStates] = useState([]);
    const [state, setState] = useState("");
    const [registrationType, setRegistrationType] = useState("");
    const [gstin, setGstin] = useState("");
    const [periodicity, setPeriodicity] = useState("");
    const [ewayBill, setEwayBill] = useState("");
    const [applicableDate, setApplicableDate] = useState("");
    const [intraState, setIntraState] = useState("");
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null); // Track the ID of the registration being edited

    useEffect(() => {
        fetchStates();
        fetchGstRegistrations();
    }, []);

    const fetchStates = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getgstregistration', { withCredentials: true });
            setStates(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchGstRegistrations = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getgstregistrations', { withCredentials: true });
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { state, registrationType, gstin, periodicity, ewayBill, applicableDate, intraState };

        try {
            if (editId) {
                // Update the existing registration
                payload.id = editId;
                const res = await axios.put('http://localhost:5500/updategstregistration', payload, { withCredentials: true });
                if (res.data.message === "done") {
                    alert("GST registration updated");
                    resetForm();
                    fetchGstRegistrations(); // Refresh the list
                }
            } else {
                // Create a new registration
                const res = await axios.post('http://localhost:5500/creategstregistration', payload, { withCredentials: true });
                if (res.data.message === "done") {
                    alert("GST registration created");
                    resetForm();
                    fetchGstRegistrations(); // Refresh the list
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    const resetForm = () => {
        setState("");
        setRegistrationType("");
        setGstin("");
        setPeriodicity("");
        setEwayBill("");
        setApplicableDate("");
        setIntraState("");
        setEditId(null); // Reset the edit ID
    };

    const fetchDataForEdit = async (id) => {
        try {
            const res = await axios.get(`http://localhost:5500/getgstregistration/${id}`, { withCredentials: true });
            const registration = res.data;
            setState(registration.state);
            setRegistrationType(registration.registration_type);
            setGstin(registration.gstin);
            setPeriodicity(registration.periodicity);
            setEwayBill(registration.eway_bill);
            setApplicableDate(registration.applicable_date);
            setIntraState(registration.intra_state);
            setEditId(id); // Set the ID for editing
        } catch (err) {
            console.log(err);
        }
    };

    const deleteGstRegistration = (id) => {
        if (window.confirm("Are you sure you want to delete this registration?")) {
            axios.delete(`http://localhost:5500/deletegstregistration/${id}`, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "done") {
                        alert("GST registration deleted");
                        fetchGstRegistrations(); // Refresh the list
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">GST Registration Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add/Edit GST Registration</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">State</label>
                                            <select
                                                className="form-control"
                                                value={state}
                                                onChange={e => setState(e.target.value)}
                                            >
                                                <option value="">Select State</option>
                                                {states.map(s => (
                                                    <option key={s.id} value={s.state_name}>{s.state_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Registration Type</label>
                                            <select
                                                className="form-control"
                                                value={registrationType}
                                                onChange={e => setRegistrationType(e.target.value)}
                                            >
                                                <option value="">Select Type</option>
                                                <option value="Regular">Regular</option>
                                                <option value="Composition">Composition</option>
                                                <option value="Regular-SEZ">Regular-SEZ</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">GSTIN/UIN</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={gstin}
                                                onChange={e => setGstin(e.target.value.toUpperCase())}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Periodicity of GSTR-1</label>
                                            <select
                                                className="form-control"
                                                value={periodicity}
                                                onChange={e => setPeriodicity(e.target.value)}
                                            >
                                                <option value="">Select Periodicity</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Quarterly">Quarterly</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">E-way Bill Applicable</label>
                                            <select
                                                className="form-control"
                                                value={ewayBill}
                                                onChange={e => setEwayBill(e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Applicable Date</label>
                                            {
                                                ewayBill === "No" ?
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        value={applicableDate}
                                                        onChange={e => setApplicableDate(e.target.value)}
                                                        disabled
                                                    /> :
                                                    <input
                                                        className="form-control"
                                                        type="date"
                                                        value={applicableDate}
                                                        onChange={e => setApplicableDate(e.target.value)}
                                                    />
                                            }
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Applicable for Intra-State</label>
                                            <select
                                                className="form-control"
                                                value={intraState}
                                                onChange={e => setIntraState(e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                            </select>
                                        </div>
                                        <button className="btn btn-success">{editId ? "Update" : "Submit"} GST Registration</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current GST Registrations</div>
                                <div className="card-body">
                                    <button className="btn btn-primary mb-3" onClick={resetForm}>
                                        NEW REGISTRATION
                                    </button>
                                    <div className="list-group">
                                        {data.length > 0 ? (
                                            data.map((registration) => (
                                                <div key={registration.id} className="d-flex justify-content-between align-items-center">
                                                    <span>{registration.gstin}</span>
                                                    <div>
                                                        <button
                                                            className="btn btn-outline-info btn-sm m-1"
                                                            onClick={() => fetchDataForEdit(registration.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-outline-danger btn-sm"
                                                            onClick={() => deleteGstRegistration(registration.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No registrations available.</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </Blankpage>
            </div>
        </Boilerplate>
    );
};

export default GstRegistration;
