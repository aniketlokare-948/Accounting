import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Landingpage from './components/Landingpage';
import ListOfMasters from './components/List_of_masters/ListOfMasters';
import Group from './components/Accounting master/Group';
import Ledger from './components/Accounting master/Ledger';
import Ledgeredit from './components/Accounting master/Ledgeredit';
import Currency from './components/Accounting master/Currency';
import Stock_Group from './components/Inventory masters/Stock_Group';
import Units from './components/Inventory masters/Units';
import StockItem from './components/Inventory masters/StockItem';
import StockCategory from './components/Inventory masters/StockCategory';
import Location from './components/Inventory masters/Location';
import GstRegistration from './components/Statutory masters/GstRegistration';

import Vouch from './components/Vouchers/Vouch';
import Contra from './components/Vouchers/Contra';
import FruitInput from './components/FruitInput';
import TransactionIDExtractor from './components/TransactionIDExtractor';
import Myusecontext, { Number1 } from './components/Myusecontext';
import Usethatcontext from './components/Usethatcontext';
import Omkarnumber1 from './components/Omkarnumber1';
import Number2 from './components/Number2';
import Getstate from './components/Gatestate';
import Sendstate from './components/Sendstate';
import Omkarparmaj from './components/Omkarparmaj';
import Sales from './components/Vouchers/Sales';




function App() {
  return (
   <>
   
   <BrowserRouter>
   
   <Routes>
    <Route path='/' element={<Sidebar></Sidebar>}></Route>
    <Route path='/landingpage' element={<Landingpage></Landingpage>}></Route>
    <Route path='/listofmasters' element={<ListOfMasters></ListOfMasters>}></Route>vs
    <Route path='/group' element={<Group></Group>}></Route>
    <Route path='/Ledger' element={<Ledger></Ledger>}></Route>
    <Route path='/Ledgeredit/:id' element={<Ledgeredit></Ledgeredit>}></Route>
    <Route path='/currency' element={<Currency></Currency>}></Route>
    <Route path='/stock-group' element={<Stock_Group></Stock_Group>}></Route>
    <Route path='/units' element={<Units></Units>}></Route>
    <Route path='/stockitem' element={<StockItem></StockItem>}></Route>
    <Route path='/stockcatagory' element={<StockCategory></StockCategory>}></Route>
    <Route path='/location' element={<Location></Location>}></Route>
    <Route path='/gstregistration' element={<GstRegistration></GstRegistration>}></Route>
    <Route path='/vouchers' element={<Vouch></Vouch>}></Route>
    <Route path='/contra' element={<Contra></Contra>}></Route>
    <Route path='/search' element={<FruitInput></FruitInput>}></Route>
    <Route path='/photo' element={<TransactionIDExtractor></TransactionIDExtractor>}></Route>
    <Route path='/omkar' element={<Myusecontext></Myusecontext>}></Route>
    <Route path='/omkar2' element={<Usethatcontext></Usethatcontext>}></Route>
    <Route path='/number1' element={<Omkarnumber1></Omkarnumber1>}></Route>
    <Route path='/number2' element={<Number2></Number2>}></Route>
    <Route path='/getstate' element={<Getstate></Getstate>}></Route>
    <Route path='/sendstate' element={<Sendstate></Sendstate>}></Route>
    <Route path='/omkarparmaj' element={<Omkarparmaj></Omkarparmaj>}></Route>
   <Route path='/sales' element={<Sales></Sales>}></Route>
   
   </Routes>
   
   </BrowserRouter>
    
   
   
   
   </>
  );
}

export default App;
