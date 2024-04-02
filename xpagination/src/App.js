import './App.css';
import  React, { useEffect, useState } from 'react';

const itemsPerPage = 10;

function App() {
  const [records,setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRecords = async() => {
    try {
      const apidata = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
      const response = await apidata.json();
      console.log(response,"api response");
      setRecords(response);
    } catch(e) {
      console.log(e,"error in api call");
      alert("failed to fetch data");
      setRecords([])
    }
  }

  useEffect(() => {
    fetchRecords();
  },[])

  const totalNoOfPages = Math.ceil(records.length / itemsPerPage);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentPageData = records.slice(start, end);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(currentPageData,"currentpagedata")

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div className="table-container">
      <table>
        <thead className="header-row">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
        {currentPageData.map((emp,i) => {
          return (
            <tr key={i} className='data-row'>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          )})}
        </tbody>
      </table>
      </div>
      <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
      <button onClick={() => handlePageChange()}> {currentPage} </button>
      <button disabled={currentPage === totalNoOfPages} onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    </div>
  );
}

export default App;
