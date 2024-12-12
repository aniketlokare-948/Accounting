import express, { json } from 'express'
import mysql from 'mysql'
import cors from 'cors'

const app = express()
const port = 5500;

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "DELETE", "PATCH", "PUT"],
    credentials: true

}))


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "accounting"
})


connection.connect((err) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log('database is connected')
    }
})



app.post('/groupadd', (req, res) => {

    const groupname = req.body.groupname;
    const groupunder = req.body.groupunder;


    const sql = 'INSERT INTO `group`(`name`, `under`) VALUES (?, ?)';
    connection.query(sql, [groupname, groupunder], (err, result) => {
        if (err) return res.json(err)
        console.log(err);
        return res.json({ message: "done" })
    })



})


app.get('/groupdata', (req, res) => {

    const sql = 'SELECT * FROM `group`';

    connection.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.post('/fetchdataforedit', (req, res) => {
    const name = req.body.groupname; // Ensure you are extracting `groupname`

    const sql = "SELECT * FROM `group` WHERE name = ?";
    connection.query(sql, [name], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal Server Error" });
        }
        if (result.length > 0) {
            return res.json(result); // Return the first result
        } else {
            return res.status(404).json({ message: "Group not found" });
        }
    });
});


app.put('/groupedit', (req, res) => {
    const groupname = req.body.groupname;
    const groupunder = req.body.groupunder;
    const groupwanttoedit = req.body.wanttoeditgroup;

    const sql = "UPDATE `group` SET `name`= ?,`under`= ? WHERE `name` = ?";

    connection.query(sql, [groupname, groupunder, groupwanttoedit], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "done" })
    })
})


app.delete('/deletegroup', (req, res) => {

    const name = req.body.groupname;


    const sql = "DELETE FROM `group` WHERE name = ?";
    connection.query(sql, [name], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "done" })
    })
})



app.post('/createledger', (req, res) => {

    const ledgername = req.body.ledgername;
    const under = req.body.under;
    const name = req.body.name;
    const address = req.body.address;
    const state = req.body.state;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const mobilenumber = req.body.mobilenumber;
    const pannumber = req.body.pannumber;
    const gstnumber = req.body.gstnumber;


    const sql = "INSERT INTO `ledger`(`ledgername`, `under`, `name`, `address`, `state`, `country`, `pincode`, `mobilenumber`, `pannumber`, `gstnumber`) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,? ,?)";

    connection.query(sql, [ledgername, under, name, address, state, country, pincode, mobilenumber, pannumber, gstnumber], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "done" });
    })
})


app.get('/getledgerdata', (req, res) => {

    const sql = "SELECT * FROM `ledger`";

    connection.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})


app.get('/ledgereditget/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id)

    const sql = "SELECT * FROM `ledger` WHERE `srno` = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) return res.json(err)
        // console.log(result)
        return res.json(result);
    })

})


app.put('/ledgeredit/:id', (req, res) => {

    const ledgername = req.body.ledgername;
    const under = req.body.under;
    const name = req.body.name;
    const address = req.body.address;
    const state = req.body.state;
    const country = req.body.country;
    const pincode = req.body.pincode;
    const mobilenumber = req.body.mobilenumber;
    const pannumber = req.body.pannumber;
    const gstnumber = req.body.gstnumber;

    const srnumber = req.params.id;

    const sql = "UPDATE `ledger` SET `ledgername`= ?,`under`= ?,`name`= ?,`address`= ?,`state`= ?,`country`= ?,`pincode`= ?,`mobilenumber`= ?,`pannumber`= ?,`gstnumber`= ? WHERE srno = ?";

    connection.query(sql, [ledgername, under, name, address, state, country, pincode, mobilenumber, pannumber, gstnumber, srnumber], (err, result) => {
        if (err) return res, json(err);
        console.log(err);
        return res.json({ message: "done" });
    })


})


app.post('/createstockgroup', (req, res) => {

    const stockgroupname = req.body.stockgroupname;
    const under = req.body.under;

    const sql = "INSERT INTO `stockgroup` (`name`, `under`) VALUES (?, ?)";

    connection.query(sql, [stockgroupname, under], (err, result) => {
        if (err) return res.json(err)
        console.log(err)
        return res.json({ message: "done" });
    })
})


app.get('/getstockgroupdata', (req, res) => {

    const sql = "SELECT * FROM `stockgroup`";

    connection.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})

app.post('/editstockgroup', (req, res) => {

    const value = req.body.value;

    const sql = "SELECT * FROM `stockgroup` WHERE srno = ?";

    connection.query(sql, [value], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);
    })
})



app.put('/editstockgroup', (req, res) => {
    const id = req.body.id;
    const stockchange = req.body.stockchange;
    const underchange = req.body.underchange;


    const sql = "UPDATE `stockgroup` SET `name`= ?,`under`= ? WHERE srno = ?"

    connection.query(sql, [stockchange, underchange, id], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "done" });
    })


})




//units backend code starts

app.get('/getunitsdata', (req, res) => {
    const sql = "SELECT * FROM units";
    connection.query(sql, (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

// Create a new unit
app.post('/createunit', (req, res) => {
    const { type, symbol, formalName, uqc, decimalPlaces } = req.body;
    const sql = "INSERT INTO units (type, symbol, formalname, uqc, numberofdecimalplaces) VALUES (?, ?, ?, ?, ?)";

    connection.query(sql, [type, symbol, formalName, uqc, decimalPlaces], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "done" });
    });
});

// Fetch data for editing a unit
app.post('/editunit', (req, res) => {
    const { value } = req.body; // Assuming value is the srno (primary key)
    const sql = "SELECT * FROM units WHERE srno = ?";

    connection.query(sql, [value], (err, results) => {
        if (err) return res.json(err);
        return res.json(results);
    });
});

// Update a unit
app.put('/editunit', (req, res) => {
    const { id, editType, editSymbol, editFormalName, editUqc, editDecimalPlaces } = req.body;
    const sql = "UPDATE units SET type = ?, symbol = ?, formalname = ?, uqc = ?, numberofdecimalplaces = ? WHERE srno = ?";

    connection.query(sql, [editType, editSymbol, editFormalName, editUqc, editDecimalPlaces, id], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "done" });
    });
});


// Delete a unit
app.delete('/deleteunit/:srno', (req, res) => {
    const { srno } = req.params;
    const sql = "DELETE FROM units WHERE srno = ?";

    connection.query(sql, [srno], (err, result) => {
        if (err) return res.json(err);
        return res.json({ message: "done" });
    });
});





//unit backend code ends




//stock item code start

// Get all stock items
app.get('/getstockitemsdata', (req, res) => {
    connection.query('SELECT * FROM stockitems', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Create stock item
app.post('/createstockitem', (req, res) => {
    const {
        name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac,
        description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate,
        typeOfSupply, quantity, rate, value
    } = req.body;

    connection.query('INSERT INTO stockitems (name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac, description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate, typeOfSupply, quantity, rate, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac, description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate, typeOfSupply, quantity, rate, value],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'done' });
        }
    );
});

// Edit stock item
app.post('/editstockitem', (req, res) => {
    const { id } = req.body;
    connection.query('SELECT * FROM stockitems WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Update stock item
app.put('/editstockitem', (req, res) => {
    const { id, name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac, description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate, typeOfSupply, quantity, rate, value } = req.body;
    connection.query('UPDATE stockitems SET name = ?, under = ?, units = ?, gstApplicability = ?, hsnSacCode = ?, sourceOfDetails = ?, hsnSac = ?, description = ?, gstRateDetails = ?, taxableType = ?, igstRate = ?, cgstRate = ?, sgstRate = ?, typeOfSupply = ?, quantity = ?, rate = ?, value = ? WHERE id = ?',
        [name, under, units, gstApplicability, hsnSacCode, sourceOfDetails, hsnSac, description, gstRateDetails, taxableType, igstRate, cgstRate, sgstRate, typeOfSupply, quantity, rate, value, id],
        (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: 'done' });
        }
    );
});

// Delete stock item
app.delete('/deletestockitem/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM stockitems WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'done' });
    });
});


//stock item code ends



//stock catagory code start

app.post('/createstockcategory', (req, res) => {
    const { categoryName, under } = req.body;
    const sql = "INSERT INTO stock_categories (name, under) VALUES (?, ?)";
    connection.query(sql, [categoryName, under], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "done" });
    });
});

// Get Stock Categories
app.get('/getstockcategorydata', (req, res) => {
    const sql = "SELECT * FROM stock_categories";
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

// Edit Stock Category
app.post('/editstockcategory', (req, res) => {
    const { value } = req.body;
    const sql = "SELECT * FROM stock_categories WHERE srno = ?";
    connection.query(sql, [value], (err, results) => {
        if (err) return res.status(500).send(err);
        res.send(results);
    });
});

app.put('/editstockcategory', (req, res) => {
    const { id, categoryChange, underChange } = req.body;
    const sql = "UPDATE stock_categories SET name = ?, under = ? WHERE srno = ?";
    connection.query(sql, [categoryChange, underChange, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "done" });
    });
});

// Delete Stock Category
app.delete('/deletestockcategory/:srno', (req, res) => {
    const { srno } = req.params;
    const sql = "DELETE FROM stock_categories WHERE srno = ?";
    connection.query(sql, [srno], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ message: "done" });
    });
});

//stock catagory code ends



//location code start

// Create Location
app.post('/createlocation', (req, res) => {
    const { godownName, address, under } = req.body;
    connection.query('INSERT INTO locations (godownName, address, under) VALUES (?, ?, ?)', [godownName, address, under], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error occurred' });
        return res.json({ message: 'done' });
    });
});

// Get Locations
app.get('/getlocations', (req, res) => {
    connection.query('SELECT * FROM locations', (err, results) => {
        if (err) return res.status(500).json({ message: 'Error occurred' });
        return res.json(results);
    });
});

// Edit Location
app.post('/editlocation', (req, res) => {
    const { value } = req.body;
    connection.query('SELECT * FROM locations WHERE id = ?', [value], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error occurred' });
        return res.json(results);
    });
});

// Update Location
app.put('/editlocation', (req, res) => {
    const { id, editGodownName, editAddress, editUnder } = req.body;
    connection.query('UPDATE locations SET godownName = ?, address = ?, under = ? WHERE id = ?', [editGodownName, editAddress, editUnder, id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error occurred' });
        return res.json({ message: 'done' });
    });
});

// Delete Location
app.delete('/deletelocation/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM locations WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ message: 'Error occurred' });
        return res.json({ message: 'done' });
    });
});


//location code ends


//currency code start

// Get all currencies
app.get('/getcurrencies', (req, res) => {
    const query = 'SELECT * FROM currencydetails';
    connection.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Create a new currency
app.post('/currencies', (req, res) => {
    const { currency_name, currency_symbol, currency_code } = req.body;
    const query = 'INSERT INTO currencydetails (currency_name, currency_symbol, currency_code) VALUES (?, ?, ?)';
    connection.query(query, [currency_name, currency_symbol, currency_code], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Currency added', id: result.insertId });
    });
});

// Update an existing currency
app.put('/currencies/:id', (req, res) => {
    const { id } = req.params;
    const { currency_name, currency_symbol, currency_code } = req.body;
    const query = 'UPDATE currencydetails SET currency_name = ?, currency_symbol = ?, currency_code = ? WHERE id = ?';
    connection.query(query, [currency_name, currency_symbol, currency_code, id], (err) => {
        if (err) throw err;
        res.json({ message: 'Currency updated' });
    });
});

// Delete a currency
app.delete('/currencies/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM currencydetails WHERE id = ?';
    connection.query(query, [id], (err) => {
        if (err) throw err;
        res.json({ message: 'Currency deleted' });
    });
});


//currency code ends




//gst registration code starts 

// Get all states
app.get('/getgstregistration', (req, res) => {
    connection.query('SELECT * FROM states', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Create GST registration
app.post('/creategstregistration', (req, res) => {
    const { state, registrationType, gstin, periodicity, ewayBill, applicableDate, intraState } = req.body;
    const sql = 'INSERT INTO gst_registrations (state, registration_type, gstin, periodicity, eway_bill, applicable_date, intra_state) VALUES (?, ?, ?, ?, ?, ?, ?)';

    connection.query(sql, [state, registrationType, gstin, periodicity, ewayBill, applicableDate, intraState], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: "done" });
    });
});

// Get all GST registrations
app.get('/getgstregistrations', (req, res) => {
    connection.query('SELECT * FROM gst_registrations', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Get a specific GST registration by ID
app.get('/getgstregistration/:id', (req, res) => {
    const { id } = req.params;
    connection.query('SELECT * FROM gst_registrations WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ message: "Registration not found" });
        res.json(results[0]);
    });
});

// Update an existing GST registration
app.put('/updategstregistration', (req, res) => {
    const { id, state, registrationType, gstin, periodicity, ewayBill, applicableDate, intraState } = req.body;
    const sql = 'UPDATE gst_registrations SET state = ?, registration_type = ?, gstin = ?, periodicity = ?, eway_bill = ?, applicable_date = ?, intra_state = ? WHERE id = ?';

    connection.query(sql, [state, registrationType, gstin, periodicity, ewayBill, applicableDate, intraState, id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Registration not found" });
        res.json({ message: "done" });
    });
});

// Delete a GST registration
app.delete('/deletegstregistration/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM gst_registrations WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).send(err);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Registration not found" });
        res.json({ message: "done" });
    });
});

//gst registration code ends




//contra code starts 

// Route to fetch ledger accounts
app.get('/getLedgerAccounts', (req, res) => {
    const sql = "SELECT * FROM ledger WHERE under = 'Bank Accounts'";
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.post('/getLedgerAccounts2', (req, res) => {

    const accountTo = req.body.accountTo;

    const sql = "SELECT * FROM ledger WHERE under = 'Bank Accounts' AND srno != ?";

    connection.query(sql, [accountTo], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/updateLedgerAmount', (req, res) => {
    const srno = req.body.srno;
    const newAmount = req.body.newAmount;

    const sql = "UPDATE `ledger` SET `amount`= ? WHERE srno = ?";

    connection.query(sql, [newAmount, srno], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: 'done' })
    })
})

app.get('/getledgeramount/:id', (req, res) => {
    const number = req.params.id;

    const sql = "SELECT * FROM ledger WHERE under = 'Bank Accounts' AND srno = ?";
    connection.query(sql, [number], (err, result) => {
        if (err) return res.json(err)
        return res.json(result);

    })

});



app.post('/contra', (req, res) => {
    const { no, date, accountTo, entries } = req.body;

    entries.forEach(entry => {
        const { Particulars, Amount } = entry;

        const query = 'INSERT INTO Contra (no, date, accountTo, particulars, amount) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [no, date, accountTo, Particulars, Amount], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error inserting data' });
            }
        });
    });

    return res.status(201).json({ message: 'Contra entries added successfully' });
});

app.put('/updatedamountlaeger/:accountTo', (req, res) => {
    const updatedamount = req.body.changedamount;
    const id = req.params.accountTo;


    const sql = "UPDATE `ledger` SET `amount`= ? WHERE srno = ?";
    connection.query(sql, [updatedamount, id], (err, result) => {
        if (err) return res.json(err)
        return res.json({ message: "done" });

    })
})



// Other existing routes...
app.post('/ledgeramount', (req, res) => {
    const { particulars, amount, no, date, accountTo } = req.body;

    const query = 'INSERT INTO ledgeramount (particulars, amount, no, date, accountTo) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [particulars, amount, no, date, accountTo], (err, results) => {
        if (err) {
            console.error('Error saving ledger amount:', err);
            return res.status(500).json({ message: 'Error saving ledger amount', error: err });
        }
        res.status(201).json({ message: 'Ledger amount saved successfully!', id: results.insertId });
    });
});

app.post('/addledgeramount', (req, res) => {
    const amount = req.body.amount;
    const id = req.body.id;

    const sql = ""
})


app.post('/getfinalprice', (req, res) => {

    const account = req.body.account;
    console.log(account)

    const sql = "SELECT SUM(amount) AS totalamount FROM ledgeramount WHERE accountTo = ?";

    connection.query(sql, [account], (err, result) => {
        if (err) return res.json(err)
           
        return res.json(result);

    })
})
// Other existing routes...



//contra code ends

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})