import './App.css';

import { useEffect, useState } from 'react';

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import Button from 'react-bootstrap/Button';
import cogoToast from 'cogo-toast';


function App() {

  // Inintializing state
  const [tableData, setTableData] = useState([])

/**
 * This function is used to call the api to get the data 
 */
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

/**
 * This functions is called when user hit load button it will call the fetchApi function to get the data from API.
 */
  const onLoad = () => {
    try {
      fetchApi()
    } catch (error) {
      console.log("Error", error)
    }
  }

/**
 * This functions is called when user hit delete button.
 */
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

  /**
   * This functions is called when user hit add button.
   */
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

/**
 *  useEffect will be called when table data state changes
 */
  useEffect(() => {
    tableData.forEach(item => {
      //checks for the null state province if there is null data it will print "null" in the data field. 
      item['state-province'] = item['state-province'] == null ? "null" : item['state-province']
    })
    console.log("table dat", tableData)
  }, [tableData])

  
// configuring table format.
  const columns = [
    {
      dataField: "country",
      text: "Country",
      sort: true
    },
    {
      dataField: "domains",
      text: "Domains",
      sort: true
    },
    {
      dataField: "web_pages",
      text: "Web pages",
      sort: true
    },
    {
      dataField: "alpha_two_code",
      text: "Alpha two code",
    },
    {
      dataField: "name",
      text: "Name",
      sort: true
    },
    {
      dataField: "state-province",
      text: "State",
      sort: true
    },

  ];




  return (
    <div className="App">
        <BootstrapTable
        bootstrap4
        keyField="id"
        data={tableData}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}
      />
      <div>
        <Button variant="primary" onClick={onLoad}>Load</Button>{' '}
        <Button variant="secondary" onClick={onDelete}>Delete</Button>{' '}
        <Button variant="success" onClick={onAdd}>Add</Button>{' '}
      </div>
    </div>
  );
}

export default App;
