import logo from './logo.svg';
import './App.css';

import { useEffect, useState } from 'react';
import cogoToast from 'cogo-toast';


function App() {

  
  const [tableData, setTableData] = useState([])


  const fetchApi = async () => {
    try {
      console.log("working")
      fetch("http://universities.hipolabs.com/search?country=Australia")
        .then(response => response.text())
        .then(result => {
          cogoToast.success("Data loaded successfully")
          return setTableData(JSON.parse(result))
        })
        .catch(error => console.log('error', error));
    } catch (error) {
      console.log(error)
    }
  }


  const onLoad = () => {
    try {
      fetchApi()
    } catch (error) {
      console.log("Error", error)
    }
  }


  const onDelete = () => {
    try {
      let data = [...tableData]
      data.pop()
      setTableData(data)
      cogoToast.success("Data deleted successfully")
    } catch (error) {
      console.log("Error", error)
    }
  }

  const onAdd = () => {
    try {
      let data = [...tableData]
      data = [...data, data[0]]
      setTableData(data)
      cogoToast.success("Data Added successfully")

    } catch (error) {
      console.log("Error", error)
    }
  }

  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
