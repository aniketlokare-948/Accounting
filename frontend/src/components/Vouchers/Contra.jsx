import React, { useEffect, useState } from "react";
import Blankpage from "../../Boilerplate/Blankpage";
import axios from "axios";
import Boilerplate2 from "../../Boilerplate/Boilerplate2";
import { Link } from "react-router-dom";

const Contra = () => {
    const [ledgernamedata, setLedgernamedata] = useState([]);
    const [ledgernamedata2, setLedgernamedata2] = useState([]);
    const [ledgeramountdata, setLedgeramountdata] = useState([]);
    const [rows, setRows] = useState([]);
    const [totalamount, setTotalamount] = useState(0);
    const [accountTo, setAccountTo] = useState("");
    const [no, setNo] = useState("");
    const [date, setDate] = useState("");
    const [finalprice, setFinalprice] = useState(0);

    useEffect(() => {
        if (accountTo) {
            axios.post('http://localhost:5500/getfinalprice', { account: accountTo }, { withCredentials: true })
                .then(res => setFinalprice(res.data[0].totalamount))
                .catch(err => console.log(err));
        }
    }, [accountTo]);

    useEffect(() => {
        axios.get('http://localhost:5500/getLedgerAccounts', { withCredentials: true })
            .then(res => setLedgernamedata(res.data))
            .catch(err => console.log(err));
    }, []);

    useEffect(() => {
        if (accountTo) {
            axios.post('http://localhost:5500/getLedgerAccounts2', { accountTo }, { withCredentials: true })
                .then(res => setLedgernamedata2(res.data))
                .catch(err => console.log(err));
        }
    }, [accountTo]);

    useEffect(() => {
        if (accountTo) {
            axios.get(`http://localhost:5500/getledgeramount/${accountTo}`, { withCredentials: true })
                .then(res => setLedgeramountdata(res.data[0]))
                .catch(err => console.log(err));
        }
    }, [accountTo]);

    const addRow = (e) => {
        e.preventDefault();
        const newRow = {
            Particulars: "",
            Amount: "",
        };
        setRows(prevRows => [...prevRows, newRow]);
    };

    const deleteRow = index => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };

    const handleInputChange = (index, name, value) => {
        const updatedRows = [...rows];
        updatedRows[index][name] = value;
        setRows(updatedRows);
    };

    useEffect(() => {
        const total = rows.reduce((sum, row) => sum + (parseFloat(row.Amount) || 0), 0);
        setTotalamount(total);
    }, [rows]);

    const handlesubmit = async (e) => {
        e.preventDefault();
        const payload = { no, date, accountTo, entries: rows };
        const payload2 = { changedamount: ledgeramountdata.amount + totalamount };
        const payload3 = {amount: totalamount, id: accountTo}

        try {
            const response = await axios.post('http://localhost:5500/contra', payload);
            await axios.put(`http://localhost:5500/updatedamountlaeger/${accountTo}`, payload2, { withCredentials: true });
            await axios.post(`http://localhost:5500/addledgeramount`, payload3, {withCredentials: true})

            for (const row of rows) {
                const rowPayload = {
                    particulars: row.Particulars,
                    amount: -row.Amount,
                    no,
                    date,
                    accountTo,
                };
                await axios.post('http://localhost:5500/ledgeramount', rowPayload);
            }

            alert(response.data.message);
            setNo("");
            setDate("");
            setAccountTo("");
            setRows([]);
            setTotalamount(0);
        } catch (error) {
            console.error(error);
            alert('Error submitting data');
        }
    };

    const sumAmounts = () => {
        const result = {};
        rows.forEach(row => {
            const { Particulars, Amount } = row;
            const amount = -parseFloat(Amount) || 0; // Convert string to number
            if (result[Particulars]) {
                result[Particulars] += amount; // Sum up amounts for existing particulars
            } else {
                result[Particulars] = amount; // Initialize with the first amount
            }
        });
        return result;
    };

    const summedAmounts = sumAmounts();

    return (
        <Boilerplate2>
            <div className="col-md-12 mt-3">
                <div className="row mb-3 d-flex justify-content-end">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-xs-12 ">
                        <Link to='/vouchers' className="float-end btn btn-success btn-sm">VOUCHERS</Link>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-header bg-primary text-white">
                        <div className="row">
                            <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-xs-12">
                                Contra Management
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handlesubmit}>
                            <div className="row">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-xs-12 d-flex align-items-center">
                                    <label className="form-label mt-1">No: </label>
                                    <input
                                        className="form-control form-control-sm ms-2"
                                        style={{ width: "250px" }}
                                        type="text"
                                        value={no}
                                        onChange={e => setNo(e.target.value)}
                                    />
                                </div>
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-xs-12 d-flex justify-content-end align-items-center">
                                    <label className="form-label mt-1">Date: </label>
                                    <input
                                        className="form-control form-control-sm ms-2"
                                        style={{ width: "250px" }}
                                        type="date"
                                        value={date}
                                        onChange={e => setDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-xxl-6 col-xl-6 col-lg-6 col-sm-12 col-xs-12 d-flex align-items-center">
                                    <label className="form-label me-4 fw-bold mt-1">Account To: </label>
                                    <select
                                        className="form-control form-control-sm ms-5"
                                        required
                                        style={{ width: "250px" }}
                                        onChange={e => setAccountTo(e.target.value)}
                                    >
                                        <option value="">Select Particulars</option>
                                        {ledgernamedata.map(account => (
                                            <option key={account.id} value={account.srno}>{account.ledgername}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <label className="form-label mt-2">Account balance: <span className="ms-4">Rs. {finalprice}</span></label>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="mb-4 row d-flex justify-content-end">
                                    <div className="col-xx-3 col-xl-3 col-lg-12 col-sm-12 col-xs-12 ">
                                        <button className="float-end btn btn-primary btn-sm" onClick={addRow}>ADD ROW</button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-xxl-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12">
                                        <table className="table table-bordered text-center">
                                            <thead className="border border-1">
                                                <tr>
                                                    <th>PARTICULARS</th>
                                                    <th>AMOUNT</th>
                                                    <th>ACTION</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <select
                                                                className="form-select form-select-sm"
                                                                name="Particulars"
                                                                onChange={e => handleInputChange(index, "Particulars", e.target.value)}
                                                                value={row.Particulars || ''}
                                                            >
                                                                <option value="">Select Particulars</option>
                                                                {ledgernamedata2.map(account => (
                                                                    <option key={account.id} value={account.ledgername}>{account.ledgername}</option>
                                                                ))}
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input
                                                                name="Amount"
                                                                type="number"
                                                                className='form-control form-control-sm text-center'
                                                                value={row.Amount}
                                                                onChange={e => handleInputChange(index, "Amount", e.target.value)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => deleteRow(index)}
                                                            >
                                                                DELETE
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <tfoot className="border border-1">
                                                <tr>
                                                    <td className="border-end">Total Amount</td>
                                                    <td className="border-end">Rs. {totalamount}</td>
                                                    <td></td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xxl-7 col-xl-7 col-lg-12 col-sm-12 col-xs-12">
                                    <label className="form-label">Comments:</label>
                                    <input className="form-control" type="text"></input>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <div className="col-xxl-3 col-xl-3 col-lg-12 col-sm-12 col-xs-12">
                                    <button className="float-end btn btn-success btn-sm mt-4">SUBMIT CONTRA</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div>
                    {Object.entries(summedAmounts).map(([particulars, sum]) => (
                        <div key={particulars}>
                            Particulars: {particulars} = {sum}
                        </div>
                    ))}
                </div>

               
            </div>
        </Boilerplate2>
    );
};

export default Contra;
