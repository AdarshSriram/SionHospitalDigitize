import { useState } from "react";
import * as queries from '../graphql/queries';
import { API, } from 'aws-amplify';
import styles from "./finder.css"
import { ExportToCsv } from 'export-to-csv';

function Finder ({ signOut, user }) {

    const [queryErr, setQueryErr] = useState(null)
    const [nextStep, setNextStep] = useState(false)
    const [fieldBoxes, setFieldBoxes] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [tableData, setTableData] = useState({})
    const [querySummary, setQuerySummary] = useState(null)

    function handleQuery(getAll = false){
      if (!getAll){
        const data = parseAndVerify()
        if (!data){
          setQueryErr("")
        }
      var queryFilter = []
      var summary = []
      for (const [key, value] of Object.entries(data)) {
        var tmp = {}
        var tmpVal = {}
        tmpVal["eq"] = value
        tmp[key] = tmpVal
        queryFilter.push(tmp)
        summary.push(
          <li> <span class = "querySummaryList">{PrettyColumnMap[key]} = {value}</span></li>
        )
      }
      const filter = {
              and  : queryFilter
      };
       API
       .graphql({ query: queries.listPatientRecords, variables: { filter: filter}})
       .then((res)=> {
        const records = res["data"]["listPatientRecords"]["items"]
        setQuerySummary(summary)
        generateTable(records)
        setShowTable(true)
       });     
      }
      else{
        API
       .graphql({ query: queries.listPatientRecords, variables : {}})
       .then((res)=> {
        const records = res["data"]["listPatientRecords"]["items"]
        setQuerySummary(null)
        generateTable(records)
        setShowTable(true)
       });     
      }
       
    }

    function parseAndVerify(){
      var data = {}
      const form = document.getElementById("querymaker")
      for ( var i = 0; i < form.elements.length; i++ ) {
          var e = form.elements[i];
          if (encodeURIComponent(e.id) !== ""){
              data[encodeURIComponent(e.id)] = encodeURIComponent(e.value)
          }
        }
        return data;
      }

    function generateTable(records){
      var data = {}
      data["headers"] = []
      data["rows"] = []
      data["raw"] = records
      if (records.length > 0 ){
        for (const col of Object.keys(records[0]).filter(heading => Object.keys(PrettyColumnMap).includes(heading))) {
          data["headers"].push(
            <th>
              {PrettyColumnMap[col]}
            </th>
          )
        }
      }
      data['headers'] = <tr>{data["headers"]}</tr>

      for (var i=0; i<records.length;i++){
        records[i]["id"] = i
        delete records[i]["updatedAt"]; 
        delete records[i]["_version"]; 
        delete records[i]["_lastChangedAt"]; 
        const created = records[i]["createdAt"]
        records[i]["createdAt"] = created.substring(0, created.indexOf("T"))
        
        data["rows"].push(
          <tr>
            {Object.values(records[i]).map(
              x => <td>{x}</td>
            )}
          </tr>
        )
      }
      setTableData(data)
      console.log(querySummary)
    }
  
    function makeValueInputs(){
      var valBoxes = []
      var inputs = document.getElementsByTagName("input");

      for(var i = 0; i < inputs.length; i++) {
          if(inputs[i].type === "checkbox" && inputs[i].checked) {
            var field = inputs[i].id
            if (field === "Full Name"){
              valBoxes.push(
                <>
                  <br/><label for="fname">First Name: </label>
                  <input type="text" id="fname"/><br/>
                  <br/><label for="lname">Last Name: </label>
                  <input type="text" id="lname"/><br/>
                </>
              )              
            }
            else{
              
                valBoxes.push(
                  <>
                    <br/><label for={field}>{PrettyColumnMap[field]}: </label>
                    <input type="text" id={field}/><br/>
                  </>
                )
              
            }
          }  
        }
        setFieldBoxes(valBoxes)
        setNextStep(true)

    }
    
    function downloadCSV(){
      const options = { 
        fieldSeparator: ',',
        filename: "PatientRecordQueryResult",
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'Patient Record Query Result',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
      };
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(tableData["raw"]);
    }

    return (
        <div style={styles.container}>
        <h1 class = 'header'>Hello</h1>
        <div class="row">
          <div class = 'column'>
            <form id="finder">
              <label for="filter">Choose Fields to Filter Records By: </label> <br/>

              <label for="Name">Full Name: </label>
              <input type="checkbox" id="Full Name" name="Name" /><br/><br/>

              <label for="doc_type">Document Type: </label>
              <input type="checkbox" id="Document_type" name="doc_type" /><br/><br/>

              <label for="aadhar">Aadhar No.: </label>
              <input type="checkbox" id="Aadhar_no" /><br/><br/>

              <label for="contact">Contact: </label>
              <input type="checkbox" id="Contact"/><br/><br/>

              <label for="opd">OPD No.: </label>
              <input type="checkbox" id="OPD_no" name="opd" /><br/><br/>

              {/* <label for="unit"> Unit: </label>
              <input type="text" id="unit" /><br/><br/> */}

              <label for="dept"> Department: </label>
              <input type="checkbox" id="Department" /><br/><br/>

              <label for="req_type"> Request Type: </label>
              <input type="checkbox" id="Request_type" /><br/><br/>

              <label for="cdo"> CDO Name: </label>
              <input type="checkbox" id="CDO_name" /><br/><br/>

              <label for="cdo"> Date: </label>
              <input type="checkbox" id="date" /><br/><br/>

              <label for="cdo"> Month: </label>
              <input type="checkbox" id="month" /><br/><br/>

              <button class = 'SubmitFields' type = "button" onClick={makeValueInputs}>Next</button><br/>
            </form>


            <form id = "querymaker">

              {nextStep && 
              <>
                  {fieldBoxes}
                  {fieldBoxes.length >0 &&
                   <><br/><button class = 'SubmitFind' type = "button" onClick={()=>handleQuery(false)}>Find Records</button><br/></>
                 }
              </>}
              {queryErr && <h3>{queryErr}</h3>}
            </form>
          </div>

          <div >
            <h3>OR</h3>
            <button class = 'SubmitFind' type = "button" onClick={()=>handleQuery(true)}>Get All Records</button><br/><br/>    
          </div>

      </div>

      {showTable && tableData["raw"].length > 0 ?
      <>
        <div class = "csvButton">
          <button onClick = {downloadCSV}>Download</button>
        </div>
        {querySummary ? 
        <div>
          <span class = "querySummary">Displaying patient records where:</span>
          {querySummary}
        </div>
        :
        <div class = "querySummary"><h4>Displaying all patient records</h4></div>
        }
        <table class="tablecenter">
          <caption class="tableTitle">Search Results</caption>
          {tableData["headers"]}
          {tableData["rows"]}
        </table>
      </>
      : 
      <div class = "centeredMessage"><h4>No results found</h4></div>
        }
      </div>
    )
};


const PrettyColumnMap = {
  id: "Sr. No.",
  fname: "First Name",
  lname: "Last Name",
  Document_type: "Document Type",
  Aadhar_no: "Aadhar No.",
  Contact: "Contact No.",
  OPD_no: "OPD No.",
  CDO_name: "CDO Name",
  Department: "Dept.",
  Request_type: "Request Type",
  self_pay: "Patient Payment",
  donor_pay: "Donor Payment",
  donor_name: "Donor",
  month: "Month",
  date: "Date (DD/MM/YYYY)"
}

export default Finder;