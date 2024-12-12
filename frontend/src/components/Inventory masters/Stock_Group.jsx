import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";

const Stock_Group = () => {
    const [stockgroupname, setStockgroupname] = useState("");
    const [under, setUnder] = useState("");
    const [data, setData] = useState([]);

    const [stockchange, setStockchange] = useState("");
    const [underchange, setUnderchange] = useState("");
    const [id, setId] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:5500/getstockgroupdata', { withCredentials: true })
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { stockgroupname, under };
            const res = await axios.post('http://localhost:5500/createstockgroup', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Stock group created");
                setStockgroupname("");
                setUnder("");
                fetchStockGroups(); // Refresh the list
            }
        } catch (err) {
            console.log(err);
        }
    };

    const fetchdataforedit = (value) => {
        const payload = { value };
        axios.post('http://localhost:5500/editstockgroup', payload, { withCredentials: true })
            .then(res => {
                setStockchange(res.data[0].name);
                setUnderchange(res.data[0].under);
                setId(res.data[0].srno);
            });
    };

    const editstockgroup = (e) => {
        e.preventDefault();
        const payload = { id, stockchange, underchange };
        axios.put('http://localhost:5500/editstockgroup', payload, { withCredentials: true })
            .then(res => {
                if (res.data.message === "done") {
                    alert("Stock group updated");
                    setStockchange("");
                    setUnderchange("");
                    fetchStockGroups(); // Refresh the list
                }
            });
    };

    const fetchStockGroups = async () => {
        try {
            const res = await axios.get('http://localhost:5500/getstockgroupdata', { withCredentials: true });
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Boilerplate>
            <div className="container mt-4">
                <Blankpage>
                    <h5 className="text-center mb-4">Stock Group Management</h5>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-primary text-white">Add Stock Group</div>
                                <div className="card-body">
                                    <form onSubmit={handlesubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Stock Group Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={stockgroupname}
                                                onChange={e => setStockgroupname(e.target.value)}
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
                                        <button className="btn btn-success">Submit Stock Group</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-warning text-white">Edit Stock Group</div>
                                <div className="card-body">
                                    <form onSubmit={editstockgroup}>
                                        <div className="mb-3">
                                            <label className="form-label">Stock Group Name</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={stockchange}
                                                onChange={e => setStockchange(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Under</label>
                                            <input
                                                className="form-control"
                                                type="text"
                                                value={underchange}
                                                onChange={e => setUnderchange(e.target.value)}
                                            />
                                        </div>
                                        <button className="btn btn-warning">Edit Stock Group</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-3">
                                <div className="card-header bg-info text-white">Current Stock Groups</div>
                                <div className="card-body">
                                    <div className="list-group">
                                        {data && data.length > 0 ? (
                                            data.map((group) => (
                                                <button
                                                    key={group.srno}
                                                    className="btn btn-outline-info m-1"
                                                    style={{ width: "100%" }}
                                                    onClick={() => fetchdataforedit(group.srno)}
                                                >
                                                    {group.name}
                                                </button>
                                            ))
                                        ) : (
                                            <p className="text-center">No groups available.</p>
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

export default Stock_Group;
