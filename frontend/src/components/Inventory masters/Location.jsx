import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const Location = () => {
    const [godownName, setGodownName] = useState("");
    const [address, setAddress] = useState("");
    const [under, setUnder] = useState("");
    const [data, setData] = useState([]);

    const [editGodownName, setEditGodownName] = useState("");
    const [editAddress, setEditAddress] = useState("");
    const [editUnder, setEditUnder] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getlocations', { withCredentials: true });
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { godownName, address, under };
            const res = await axios.post('http://localhost:5500/createlocation', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Location created");
                resetFields();
                fetchLocations(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const resetFields = () => {
        setGodownName("");
        setAddress("");
        setUnder("");
        setEditGodownName("");
        setEditAddress("");
        setEditUnder("");
    };

    const fetchDataForEdit = (value) => {
        const payload = { value };
        axios.post('http://localhost:5500/editlocation', payload, { withCredentials: true })
            .then(res => {
                setEditGodownName(res.data[0].godownName);
                setEditAddress(res.data[0].address);
                setEditUnder(res.data[0].under);
                setId(res.data[0].id);
            });
    };

    const editLocation = (e) => {
        e.preventDefault();
        const payload = { id, editGodownName, editAddress, editUnder };
        axios.put('http://localhost:5500/editlocation', payload, { withCredentials: true })
            .then(res => {
                if (res.data.message === "done") {
                    alert("Location updated");
                    resetFields();
                    fetchLocations(); // Refresh the list
                }
            });
    };

    const deleteLocation = (id) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            axios.delete(`http://localhost:5500/deletelocation/${id}`, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "done") {
                        alert("Location deleted");
                        fetchLocations(); // Refresh the list
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Location Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add Location</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {[ 
                                            { label: "Name of Godown", value: godownName, setter: setGodownName },
                                            { label: "Address", value: address, setter: setAddress },
                                            { label: "Under", value: under, setter: setUnder },
                                        ].map(({ label, value, setter }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={value}
                                                    onChange={e => setter(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button className="btn btn-success">Submit Location</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-warning text-white">Edit Location</div>
                                <div className="card-body">
                                    <form onSubmit={editLocation}>
                                        {[ 
                                            { label: "Name of Godown", value: editGodownName, setter: setEditGodownName },
                                            { label: "Address", value: editAddress, setter: setEditAddress },
                                            { label: "Under", value: editUnder, setter: setEditUnder },
                                        ].map(({ label, value, setter }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    value={value}
                                                    onChange={e => setter(e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button className="btn btn-warning">Edit Location</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current Locations</div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {data && data.length > 0 ? (
                                            data.map((location) => (
                                                <div key={location.id} className="d-flex justify-content-between align-items-center list-group-item">
                                                    <button
                                                        className="btn btn-outline-info"
                                                        style={{ width: "150px" }}
                                                        onClick={() => fetchDataForEdit(location.id)}
                                                    >
                                                        {location.godownName}
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => deleteLocation(location.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No locations available.</p>
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

export default Location;
