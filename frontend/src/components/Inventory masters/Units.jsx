import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const Units = () => {
    const [type, setType] = useState("");
    const [symbol, setSymbol] = useState("");
    const [formalName, setFormalName] = useState("");
    const [uqc, setUqc] = useState("");
    const [decimalPlaces, setDecimalPlaces] = useState(0);
    const [data, setData] = useState([]);

    const [editType, setEditType] = useState("");
    const [editSymbol, setEditSymbol] = useState("");
    const [editFormalName, setEditFormalName] = useState("");
    const [editUqc, setEditUqc] = useState("");
    const [editDecimalPlaces, setEditDecimalPlaces] = useState(0);
    const [id, setId] = useState(0);

    useEffect(() => {
        fetchUnits();
    }, []);

    const fetchUnits = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getunitsdata', { withCredentials: true });
            setData(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { type, symbol, formalName, uqc, decimalPlaces };
            const res = await axios.post('http://localhost:5500/createunit', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Unit created");
                resetFields();
                fetchUnits(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const resetFields = () => {
        setType("");
        setSymbol("");
        setFormalName("");
        setUqc("");
        setDecimalPlaces(0);
        setEditType("");
        setEditSymbol("");
        setEditFormalName("");
        setEditUqc("");
        setEditDecimalPlaces(0);
    };

    const fetchDataForEdit = (value) => {
        const payload = { value };
        axios.post('http://localhost:5500/editunit', payload, { withCredentials: true })
            .then(res => {
                setEditType(res.data[0].type);
                setEditSymbol(res.data[0].symbol);
                setEditFormalName(res.data[0].formalname);
                setEditUqc(res.data[0].uqc);
                setEditDecimalPlaces(res.data[0].numberofdecimalplaces);
                setId(res.data[0].srno);
            });
    };

    const editUnit = (e) => {
        e.preventDefault();
        const payload = { id, editType, editSymbol, editFormalName, editUqc, editDecimalPlaces };
        axios.put('http://localhost:5500/editunit', payload, { withCredentials: true })
            .then(res => {
                if (res.data.message === "done") {
                    alert("Unit updated");
                    resetFields();
                    fetchUnits(); // Refresh the list
                }
            });
    };

    const deleteUnit = (srno) => {
        if (window.confirm("Are you sure you want to delete this unit?")) {
            axios.delete(`http://localhost:5500/deleteunit/${srno}`, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "done") {
                        alert("Unit deleted");
                        fetchUnits(); // Refresh the list
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Units Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add Unit</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {/** Form Fields for Adding Unit */}
                                        {[
                                            { label: "Type", value: type, setter: setType },
                                            { label: "Symbol", value: symbol, setter: setSymbol },
                                            { label: "Formal Name", value: formalName, setter: setFormalName },
                                            { label: "Unit Quantity Code (UQC)", value: uqc, setter: setUqc },
                                            { label: "Number of Decimal Places", value: decimalPlaces, setter: setDecimalPlaces, type: "number" }
                                        ].map(({ label, value, setter, type = "text" }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type={type}
                                                    value={value}
                                                    onChange={e => setter(type === "number" ? Number(e.target.value) : e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button className="btn btn-success">Submit Unit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-warning text-white">Edit Unit</div>
                                <div className="card-body">
                                    <form onSubmit={editUnit}>
                                        {/** Form Fields for Editing Unit */}
                                        {[
                                            { label: "Type", value: editType, setter: setEditType },
                                            { label: "Symbol", value: editSymbol, setter: setEditSymbol },
                                            { label: "Formal Name", value: editFormalName, setter: setEditFormalName },
                                            { label: "Unit Quantity Code (UQC)", value: editUqc, setter: setEditUqc },
                                            { label: "Number of Decimal Places", value: editDecimalPlaces, setter: setEditDecimalPlaces, type: "number" }
                                        ].map(({ label, value, setter, type = "text" }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type={type}
                                                    value={value}
                                                    onChange={e => setter(type === "number" ? Number(e.target.value) : e.target.value)}
                                                />
                                            </div>
                                        ))}
                                        <button className="btn btn-warning">Edit Unit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current Units</div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {data && data.length > 0 ? (
                                            data.map((unit) => (
                                                <div key={unit.srno} className="d-flex justify-content-between align-items-center list-group-item">
                                                    <button
                                                        className="btn btn-outline-info"
                                                        style={{ width: "150px" }}
                                                        onClick={() => fetchDataForEdit(unit.srno)}
                                                    >
                                                        {unit.symbol}
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => deleteUnit(unit.srno)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No units available.</p>
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

export default Units;
