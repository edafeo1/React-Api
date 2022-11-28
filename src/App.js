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


  useEffect(() => {
    tableData.forEach(item => {
      item['state-province'] = item['state-province'] == null ? "null" : item['state-province']
    })
    console.log("table dat", tableData)
  }, [tableData])

  

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
     
    </div>
  );
}

export default App;
