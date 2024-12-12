import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const StockCategory = () => {
    const [categoryName, setCategoryName] = useState("");
    const [under, setUnder] = useState("");
    const [data, setData] = useState([]);

    const [categoryChange, setCategoryChange] = useState("");
    const [underChange, setUnderChange] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        fetchStockCategories();
    }, []);

    const fetchStockCategories = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getstockcategorydata', { withCredentials: true });
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { categoryName, under };
            const res = await axios.post('http://localhost:5500/createstockcategory', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Stock category created");
                setCategoryName("");
                setUnder("");
                fetchStockCategories(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchDataForEdit = (value) => {
        const payload = { value };
        axios.post('http://localhost:5500/editstockcategory', payload, { withCredentials: true })
            .then(res => {
                setCategoryChange(res.data[0].name);
                setUnderChange(res.data[0].under);
                setId(res.data[0].srno);
            });
    };

    const editStockCategory = (e) => {
        e.preventDefault();
        const payload = { id, categoryChange, underChange };
        axios.put('http://localhost:5500/editstockcategory', payload, { withCredentials: true })
            .then(res => {
                if (res.data.message === "done") {
                    alert("Stock category updated");
                    setCategoryChange("");
                    setUnderChange("");
                    fetchStockCategories(); // Refresh the list
                }
            });
    };

    const deleteStockCategory = (srno) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            axios.delete(`http://localhost:5500/deletestockcategory/${srno}`, { withCredentials: true })
                .then(res => {
                    if (res.data.message === "done") {
                        alert("Stock category deleted");
                        fetchStockCategories(); // Refresh the list
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Stock Category Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add Stock Category</div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Category Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={categoryName}
                                                onChange={e => setCategoryName(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Under</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={under}
                                                onChange={e => setUnder(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-success">Submit Stock Category</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-warning text-white">Edit Stock Category</div>
                                <div className="card-body">
                                    <form onSubmit={editStockCategory}>
                                        <div className="mb-3">
                                            <label className="form-label">Category Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={categoryChange}
                                                onChange={e => setCategoryChange(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Under</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={underChange}
                                                onChange={e => setUnderChange(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-warning">Edit Stock Category</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current Stock Categories</div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {data && data.length > 0 ? (
                                            data.map((category) => (
                                                <div key={category.srno} className="d-flex justify-content-between align-items-center">
                                                    <button
                                                        className="btn btn-outline-info m-1"
                                                        style={{ width: "100%" }}
                                                        onClick={() => fetchDataForEdit(category.srno)}
                                                    >
                                                        {category.name}
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => deleteStockCategory(category.srno)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-center">No categories available.</p>
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

export default StockCategory;
