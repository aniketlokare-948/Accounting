import React, { useEffect, useState } from "react";
import Boilerplate from "../../Boilerplate/Boilerplate";
import Blankpage from "../../Boilerplate/Blankpage";
import Switchboilerplate from "../../Boilerplate/Switchboilerplate";
import axios from 'axios';

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [groupunder, setGroupunder] = useState("");
    const [groupdata, setGroupdata] = useState([]);
    const [editedgroupname, setEditedgroupname] = useState("");
    const [editedgroupunder, setEditedgroupunder] = useState("");
    const [wanttoedit, setWanttoedit] = useState("");

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { groupname, groupunder };
            const res = await axios.post('http://localhost:5500/groupadd', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Record added successfully");
                setGroupname("");
                setGroupunder("");
                fetchGroupData(); // Fetch updated data after adding
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                groupname: editedgroupname,
                groupunder: editedgroupunder,
                wanttoeditgroup: wanttoedit
            };
            const res = await axios.put('http://localhost:5500/groupedit', payload, { withCredentials: true });

            if (res.data.message === "done") {
                alert("Group updated successfully");
                setEditedgroupname("");
                setEditedgroupunder("");
                fetchGroupData();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGroupData();
    }, []);

    const fetchGroupData = async () => {
        try {
            const res = await axios.get('http://localhost:5500/groupdata', { withCredentials: true });
            if (res.data) {
                setGroupdata(res.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const fetchdataforedit = async (name) => {
        setWanttoedit(name);
        try {
            const res = await axios.post('http://localhost:5500/fetchdataforedit', { groupname: name }, { withCredentials: true });
            setEditedgroupname(res.data[0].name);
            setEditedgroupunder(res.data[0].under);
        } catch (err) {
            console.error(err);
        }
    };

    const handledelete = async (name) => {
        try {
            if (editedgroupname) {
                const res = await axios.delete('http://localhost:5500/deletegroup', {
                    data: { groupname: name },
                    withCredentials: true
                });

                if (res.data.message === "done") {
                    alert("Group deleted");
                    fetchGroupData();
                    setEditedgroupname("");
                    setEditedgroupunder("");
                }
            } else {
                alert('Please select a group to delete!');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Boilerplate>
            <div className="row mt-5">
                <div className="m-2">
                    <Blankpage>
                        <div className="row">
                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-primary text-white">
                                        <h5>Create Group</h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handlesubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Group Name</label>
                                                <input className="form-control" type="text" value={groupname} onChange={e => setGroupname(e.target.value)} required />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Group Under</label>
                                                <input className="form-control" type="text" value={groupunder} onChange={e => setGroupunder(e.target.value)} required />
                                            </div>
                                            <Switchboilerplate text={"Grouped by"} />
                                            <button className="btn btn-outline-primary mt-3" type="submit">Submit Group</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-warning text-white">
                                        <h5>Edit Group</h5>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={handleEditSubmit}>
                                            <div className="mb-3">
                                                <label className="form-label">Group Name</label>
                                                <input className="form-control" type="text" value={editedgroupname} onChange={e => setEditedgroupname(e.target.value)} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label">Group Under</label>
                                                <input className="form-control" type="text" value={editedgroupunder} onChange={e => setEditedgroupunder(e.target.value)} />
                                            </div>
                                            <Switchboilerplate text={"Grouped by"} />
                                            <div className="d-flex justify-content-between">
                                                <button className="btn btn-outline-primary" type="submit">Edit Group</button>
                                                <button className="btn btn-outline-danger" onClick={() => handledelete(editedgroupname)}>Delete</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-12 mb-4">
                                <div className="card shadow-sm">
                                    <div className="card-header bg-info text-white">
                                        <h5>List of Groups</h5>
                                    </div>
                                    <div className="card-body">
                                        {
                                            groupdata && groupdata.length > 0 ? (
                                                <div className="d-flex flex-wrap">
                                                    {groupdata.map((group, index) => (
                                                        <button
                                                            key={group.id || index}
                                                            className="btn btn-outline-info m-1"
                                                            style={{ width: "100px" }}
                                                            onClick={() => fetchdataforedit(group.name)}
                                                        >
                                                            {group.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-center">No groups available.</p>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Blankpage>
                </div>
            </div>
        </Boilerplate>
    );
};

export default Group;
