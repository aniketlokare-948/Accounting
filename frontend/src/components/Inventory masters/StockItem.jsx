import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const StockItem = () => {
    const [name, setName] = useState("");
    const [under, setUnder] = useState("");
    const [units, setUnits] = useState("");
    const [gstApplicability, setGstApplicability] = useState("");
    const [hsnSacCode, setHsnSacCode] = useState("");
    const [sourceOfDetails, setSourceOfDetails] = useState("");
    const [hsnSac, setHsnSac] = useState("");
    const [description, setDescription] = useState("");
    const [gstRateDetails, setGstRateDetails] = useState("");
    const [taxableType, setTaxableType] = useState("");
    const [igstRate, setIgstRate] = useState(0);
    const [cgstRate, setCgstRate] = useState(0);
    const [sgstRate, setSgstRate] = useState(0);
    const [typeOfSupply, setTypeOfSupply] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [rate, setRate] = useState(0);
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(0);

    // Edit state variables
    const [editName, setEditName] = useState("");
    const [editUnder, setEditUnder] = useState("");
    const [editUnits, setEditUnits] = useState("");
    const [editGstApplicability, setEditGstApplicability] = useState("");
    const [editHsnSacCode, setEditHsnSacCode] = useState("");
    const [editSourceOfDetails, setEditSourceOfDetails] = useState("");
    const [editHsnSac, setEditHsnSac] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editGstRateDetails, setEditGstRateDetails] = useState("");
    const [editTaxableType, setEditTaxableType] = useState("");
    const [editIgstRate, setEditIgstRate] = useState(0);
    const [editCgstRate, setEditCgstRate] = useState(0);
    const [editSgstRate, setEditSgstRate] = useState(0);
    const [editTypeOfSupply, setEditTypeOfSupply] = useState("");
    const [editQuantity, setEditQuantity] = useState(0);
    const [editRate, setEditRate] = useState(0);
    const [editValue, setEditValue] = useState(0);

    useEffect(() => {
        fetchStockItems();
    }, []);

    const fetchStockItems = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getstockitemsdata', { withCredentials: true });
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac, description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate, typeOfSupply, quantity, rate, value };
        try {
            const res = await axios.post('http://localhost:5500/createstockitem', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Stock item created");
                resetFields();
                fetchStockItems(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const resetFields = () => {
        setName("");
        setUnder("");
        setUnits("");
        setGstApplicability("");
        setHsnSacCode("");
        setSourceOfDetails("");
        setHsnSac("");
        setDescription("");
        setGstRateDetails("");
        setTaxableType("");
        setIgstRate(0);
        setCgstRate(0);
        setSgstRate(0);
        setTypeOfSupply("");
        setQuantity(0);
        setRate(0);
        setValue(0);
        setEditName("");
        setEditUnder("");
        setEditUnits("");
        setEditGstApplicability("");
        setEditHsnSacCode("");
        setEditSourceOfDetails("");
        setEditHsnSac("");
        setEditDescription("");
        setEditGstRateDetails("");
        setEditTaxableType("");
        setEditIgstRate(0);
        setEditCgstRate(0);
        setEditSgstRate(0);
        setEditTypeOfSupply("");
        setEditQuantity(0);
        setEditRate(0);
        setEditValue(0);
        setEditId(0);
    };

    const calculateValue = () => {
        setValue(quantity * rate);
    };

    const fetchDataForEdit = (id) => {
        axios.post('http://localhost:5500/editstockitem', { id }, { withCredentials: true })
            .then(res => {
                const item = res.data[0];
                setEditName(item.name);
                setEditUnder(item.under);
                setEditUnits(item.units);
                setEditGstApplicability(item.gstApplicability);
                setEditHsnSacCode(item.hsnSacCode);
                setEditSourceOfDetails(item.sourceOfDetails);
                setEditHsnSac(item.hsnSac);
                setEditDescription(item.description);
                setEditGstRateDetails(item.gstRateDetails);
                setEditTaxableType(item.taxableType);
                setEditIgstRate(item.igstRate);
                setEditCgstRate(item.cgstRate);
                setEditSgstRate(item.sgstRate);
                setEditTypeOfSupply(item.typeOfSupply);
                setEditQuantity(item.quantity);
                setEditRate(item.rate);
                setEditValue(item.value);
                setEditId(item.id);
            });
    };

    const editStockItem = async (e) => {
        e.preventDefault();
        const payload = { id: editId, name: editName, under: editUnder, units: editUnits, gstApplicability: editGstApplicability, hsnSacCode: editHsnSacCode, sourceOfDetails: editSourceOfDetails, hsnSac: editHsnSac, description: editDescription, gstRateDetails: editGstRateDetails, taxableType: editTaxableType, igstRate: editIgstRate, cgstRate: editCgstRate, sgstRate: editSgstRate, typeOfSupply: editTypeOfSupply, quantity: editQuantity, rate: editRate, value: editValue };
        try {
            const res = await axios.put('http://localhost:5500/editstockitem', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Stock item updated");
                resetFields();
                fetchStockItems(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteStockItem = (id) => {
        if (window.confirm("Are you sure you want to delete this stock item?")) {
            axios.delete(`http://localhost:5500/deletestockitem/${id}`, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "done") {
                        alert("Stock item deleted");
                        fetchStockItems(); // Refresh the list
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Stock Items Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add Stock Item</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        {/** Form Fields */}
                                        {[
                                            { label: "Name", value: name, setter: setName },
                                            { label: "Under", value: under, setter: setUnder },
                                            { label: "Units", value: units, setter: setUnits },
                                            { label: "GST Applicability", value: gstApplicability, setter: setGstApplicability },
                                            { label: "HSN/SAC Code", value: hsnSacCode, setter: setHsnSacCode },
                                            { label: "Source of Details", value: sourceOfDetails, setter: setSourceOfDetails },
                                            { label: "HSN/SAC", value: hsnSac, setter: setHsnSac },
                                            { label: "Description", value: description, setter: setDescription },
                                            { label: "GST Rate Details", value: gstRateDetails, setter: setGstRateDetails },
                                            { label: "Taxable Type", value: taxableType, setter: setTaxableType },
                                            { label: "IGST Rate", value: igstRate, setter: setIgstRate, type: "number" },
                                            { label: "CGST Rate", value: cgstRate, setter: setCgstRate, type: "number" },
                                            { label: "SGST Rate", value: sgstRate, setter: setSgstRate, type: "number" },
                                            { label: "Type of Supply", value: typeOfSupply, setter: setTypeOfSupply },
                                            { label: "Quantity", value: quantity, setter: setQuantity, type: "number", calculate: true },
                                            { label: "Rate", value: rate, setter: setRate, type: "number", calculate: true },
                                        ].map(({ label, value, setter, type = "text", calculate = false }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type={type}
                                                    value={value}
                                                    onChange={e => {
                                                        setter(type === "number" ? Number(e.target.value) : e.target.value);
                                                        if (calculate) calculateValue();
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <div className="mb-3">
                                            <label className="form-label">Value</label>
                                            <input className="form-control" type="number" value={value} readOnly />
                                        </div>
                                        <button className="btn btn-success">Submit Stock Item</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-warning text-white">Edit Stock Item</div>
                                <div className="card-body">
                                    <form onSubmit={editStockItem}>
                                        {[
                                            { label: "Name", value: editName, setter: setEditName },
                                            { label: "Under", value: editUnder, setter: setEditUnder },
                                            { label: "Units", value: editUnits, setter: setEditUnits },
                                            { label: "GST Applicability", value: editGstApplicability, setter: setEditGstApplicability },
                                            { label: "HSN/SAC Code", value: editHsnSacCode, setter: setEditHsnSacCode },
                                            { label: "Source of Details", value: editSourceOfDetails, setter: setEditSourceOfDetails },
                                            { label: "HSN/SAC", value: editHsnSac, setter: setEditHsnSac },
                                            { label: "Description", value: editDescription, setter: setEditDescription },
                                            { label: "GST Rate Details", value: editGstRateDetails, setter: setEditGstRateDetails },
                                            { label: "Taxable Type", value: editTaxableType, setter: setEditTaxableType },
                                            { label: "IGST Rate", value: editIgstRate, setter: setEditIgstRate, type: "number" },
                                            { label: "CGST Rate", value: editCgstRate, setter: setEditCgstRate, type: "number" },
                                            { label: "SGST Rate", value: editSgstRate, setter: setEditSgstRate, type: "number" },
                                            { label: "Type of Supply", value: editTypeOfSupply, setter: setEditTypeOfSupply },
                                            { label: "Quantity", value: editQuantity, setter: setEditQuantity, type: "number", calculate: true },
                                            { label: "Rate", value: editRate, setter: setEditRate, type: "number", calculate: true },
                                        ].map(({ label, value, setter, type = "text", calculate = false }) => (
                                            <div key={label} className="mb-3">
                                                <label className="form-label">{label}</label>
                                                <input
                                                    className="form-control"
                                                    type={type}
                                                    value={value}
                                                    onChange={e => {
                                                        setter(type === "number" ? Number(e.target.value) : e.target.value);
                                                        if (calculate) setEditValue(editQuantity * Number(e.target.value));
                                                    }}
                                                />
                                            </div>
                                        ))}
                                        <div className="mb-3">
                                            <label className="form-label">Value</label>
                                            <input className="form-control" type="number" value={editValue} readOnly />
                                        </div>
                                        <button className="btn btn-warning">Edit Stock Item</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current Stock Items</div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {data && data.length > 0 ? (
                                            data.map((item) => (
                                                <div key={item.id} className="d-flex justify-content-between align-items-center list-group-item">
                                                    <button
                                                        className="btn btn-outline-info"
                                                        onClick={() => fetchDataForEdit(item.id)}
                                                    >
                                                        {item.name}
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => deleteStockItem(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No stock items available.</p>
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

export default StockItem;
