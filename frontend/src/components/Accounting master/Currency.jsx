import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import Boilerplate from '../../Boilerplate/Boilerplate';
import Blankpage from '../../Boilerplate/Blankpage';

const Currency = () => {
    const [currencyName, setCurrencyName] = useState('');
    const [currencySymbol, setCurrencySymbol] = useState('');
    const [currencyCode, setCurrencyCode] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchCurrencies();
    }, []);

    const fetchCurrencies = async () => {
        try {
            const response = await axios.get('http://localhost:5500/getcurrencies');
            setCurrencies(response.data);
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { currency_name: currencyName, currency_symbol: currencySymbol, currency_code: currencyCode };

        if (editId) {
            await axios.put(`http://localhost:5500/currencies/${editId}`, payload);
            alert('Currency updated successfully');
        } else {
            await axios.post('http://localhost:5500/currencies', payload);
            alert('Currency created successfully');
        }

        resetForm();
        fetchCurrencies();
    };

    const resetForm = () => {
        setCurrencyName('');
        setCurrencySymbol('');
        setCurrencyCode('');
        setEditId(null);
    };

    const handleEdit = (currency) => {
        setCurrencyName(currency.currency_name);
        setCurrencySymbol(currency.currency_symbol);
        setCurrencyCode(currency.currency_code);
        setEditId(currency.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this currency?')) {
            await axios.delete(`http://localhost:5500/currencies/${id}`);
            alert('Currency deleted successfully');
            fetchCurrencies();
        }
    };

    const newCurrency = () => {
        resetForm();
    };

    return (
        <Boilerplate>
            <div className='row mt-4 ms-2 me-2'>
                <Blankpage>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h5 className='text-center mb-4'>Manage Currencies</h5>
                            <form onSubmit={handleSubmit} className='card p-4 shadow-sm' style={{ border: '1px solid #007bff' }}>
                                <div className='mb-3'>
                                    <label className='form-label'>Currency Name</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={currencyName}
                                        onChange={(e) => setCurrencyName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Currency Symbol</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={currencySymbol}
                                        onChange={(e) => setCurrencySymbol(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Currency Code</label>
                                    <input
                                        className='form-control'
                                        type='text'
                                        value={currencyCode}
                                        onChange={(e) => setCurrencyCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <button className='btn btn-primary w-100' type='submit'>
                                    {editId ? 'Update Currency' : 'Add Currency'}
                                </button>
                            </form>
                        </div>

                        <div className='col-md-6 border-start'>
                            <h4 className='text-center'>Available Currencies</h4>
                            <button className='btn btn-success btn-sm mb-3' onClick={newCurrency}>
                                <FaPlus className='me-1' /> NEW CURRENCY
                            </button>
                            <ul className='list-group'>
                                {currencies.map((currency) => (
                                    <li key={currency.id} className='list-group-item d-flex justify-content-between align-items-center'>
                                        <span>
                                            <strong>{currency.currency_name}</strong> ({currency.currency_symbol} - {currency.currency_code})
                                        </span>
                                        <div>
                                            <button className='btn btn-warning btn-sm me-2' onClick={() => handleEdit(currency)}>
                                                <FaEdit /> Edit
                                            </button>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(currency.id)}>
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Blankpage>
            </div>
        </Boilerplate>
    );
};

export default Currency;
