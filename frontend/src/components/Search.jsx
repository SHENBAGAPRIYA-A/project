// import React from 'react'

// const Search = () => {
//   return (
//     <div>
//       <div className="header-container">
//             <div className="search-container">
//                 <input type="text" placeholder="Search Transaction" className="search-input" />
//             </div>

//             <div className="dropdown-container">
//                 <select className="month-dropdown">
//                     <option value="">  Select Month  </option>
//                     <option value="January">January</option>
//                     <option value="February">February</option>
//                     <option value="March">March</option>
//                     <option value="April">April</option>
//                     <option value="May">May</option>
//                     <option value="June">June</option>
//                     <option value="July">July</option>
//                     <option value="August">August</option>
//                     <option value="September">September</option>
//                     <option value="October">October</option>
//                     <option value="November">November</option>
//                     <option value="December">December</option>
//                 </select>
//             </div>
//         </div>
//         <table className="table" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
//                 <thead>
//                     <tr>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Id</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Title</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Description</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Price</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Category</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Sold</th>
//                         <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Image</th>
//                     </tr>
//                 </thead>

//             </table>

//     </div>
//   )
// }

// export default Search

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = ({ecom}) => {
  //console.log(props.ecom);
  const [pageNumber, setPageNumber] = useState(1);
  const handleNext = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handlePrevious = () => {
    setPageNumber((prevPageNumber) => (prevPageNumber > 1 ? prevPageNumber - 1 : 1));
  };
const[ecom,setEcom]=useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7001/data");
        //console.log(response.data);
        setEcom(response.data);
      }
      catch (error) {
        console.error(error)
      }
    }
    fetchData();
  }, [])
  //console.log(ecom);
  return (
    <div>
      <div className="header-container">
        <div className="search-container">
          <input type="text" placeholder="Search Transaction" className="search-input" />
        </div>

        <div className="dropdown-container">
          <select className="month-dropdown">
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>
      </div>
      <table className="table" style={{ border: "2px solid black", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Id</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Title</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Description</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Price</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Category</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Sold</th>
            <th style={{ border: "2px solid black", borderCollapse: "collapse" }}>Image</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(ecom) || ecom.length > 0 ? (
            ecom.map((user, index) => (
              <tr key={index}>
                <td style={{ border: '2px solid black' }}>{user.id}</td>
                <td style={{ border: '2px solid black' }}>{user.title}</td>
                <td style={{ border: '2px solid black' }}>{user.description}</td>
                <td style={{ border: '2px solid black' }}>{user.price}</td>
                <td style={{ border: '2px solid black' }}>{user.category}</td>
                <td style={{ border: '2px solid black' }}>{user.sold ? 'Yes' : 'No'}</td>
                <td style={{ border: '2px solid black' }}>
                  <img src={user.image} alt={user.title} style={{ width: '50px', height: '50px' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ border: '2px solid black' }}>No data available</td>
            </tr>
          )}
        </tbody>

      </table>
      <div className="pagination-container">
        <div className="pagination-item">
          <label>Page No:</label>
          <input type="number" value={pageNumber} readOnly className="page-number-input" />
        </div>
        <div>
          <button onClick={handlePrevious}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <label>Per Page: 10</label>
      </div>
    </div>
  );
};

export default Search;

