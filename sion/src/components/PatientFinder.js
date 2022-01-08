// import { useState } from "react";
// import * as queries from '../graphql/queries';
// import { API } from 'aws-amplify';
// import styles from "./finder.css"
// import { ExportToCsv } from 'export-to-csv';
// import {parseAndVerify, PrettyColumnMap, HelpFieldNames, } from "./type_utils"
// import {filterOptions} from './ui_utils'

// function Finder ({ signOut, user }) {

//     const [queryErr, setQueryErr] = useState(null)
//     const [nextStep, setNextStep] = useState(false)
//     const [fieldBoxes, setFieldBoxes] = useState([])
//     const [showTable, setShowTable] = useState(false)
//     const [tableData, setTableData] = useState({})
//     const [querySummary, setQuerySummary] = useState(null)
//     const [typeErr, setTypeErr] = useState([])

//     function handleQuery(getAll = false){
//       if (!getAll){
//         const form = document.getElementById("querymaker")
//         const queryData = parseAndVerify(form)
//         if (queryData["err"].length > 0){
//           setTypeErr(queryData["err"])
//           return
//         }
//       const data = queryData["data"]
//       var queryFilter = []
//       var summary = []
//       for (const [key, value] of Object.entries(data)) {
//         var tmp = {}
//         var tmpVal = {}
//         tmpVal["eq"] = value
//         tmp[key] = tmpVal
//         queryFilter.push(tmp)
//         summary.push(
//           <li> <span class = "querySummaryList">{PrettyColumnMap[key]} = {value}</span></li>
//         )
//       }
//       const filter = {
//               and  : queryFilter
//       };
//        API
//        .graphql({ query: queries.listPatientRecords, variables: { filter: filter}})
//        .then((res)=> {
//         const records = res["data"]["listPatientRecords"]["items"]
//         console.log(records)
//         setQuerySummary(summary)
//         generateTable(records)
//         setShowTable(true)
//        })
//        .catch((err)=>console.log(err));     
//       }
//       else{
//         API
//        .graphql({ query: queries.listPatientRecords})
//        .then((res)=> {
//         const records = res["data"]["listPatientRecords"]["items"]
//         setQuerySummary(null)
//         generateTable(records)
//         setShowTable(true)
//        })
//        .catch((err)=>console.log(err));     ;     
//       }
       
//     }

//     function generateTable(records){
//       var data = {}
//       data["headers"] = []
//       data["rows"] = []
//       if (records.length > 0 ){
//         for (const col of Object.keys(records[0]).filter(heading => Object.keys(PrettyColumnMap).includes(heading))) {
//           if (col !== "help_requests"){
//             data["headers"].push(
//               <th>
//                 {PrettyColumnMap[col]}
//               </th>
//             )
//           }
//             else{
//               for (const subCol of HelpFieldNames['combined']){
//                 console.log(subCol)
//                 data["headers"].push(
//                   <th>
//                     {PrettyColumnMap[subCol]}
//                   </th>
//                 )
//               }
//             }
          
//         }
//       }
//       data['headers'] = <tr>{data["headers"]}</tr>

//       for (var i=0; i<records.length;i++){
//         records[i]["id"] = i
//         // delete records[i]["updatedAt"]; 
//         // delete records[i]["_version"]; 
//         // delete records[i]["_lastChangedAt"]; 
//         const NotInc = ["updatedAt", '_version', '_lastChangedAt', 'help_requests']
//         const created = records[i]["createdAt"]
//         records[i]["createdAt"] = created.substring(0, created.indexOf("T"))

//         for (var j = 0; j<records[i]["help_requests"].length;j++){
//           var row = Object.entries(records[i])
//           .filter(x => !NotInc.includes(x))
//           .map(
//             (x, y )=> <td>{y}</td>
//           )
//           row.concat(
//               Object.values(records[i]["help_requests"][j]).map(
//                 x => <td>{x}</td>
//               )
//           )
//         }
//         data["rows"].push(
//           <tr>
//             {row}
//           </tr>
//         )
//       }
//       data["raw"] = records
//       setTableData(data)
//     }
  
//     function makeValueInputs(){
//       var valBoxes = []
//       var inputs = document.getElementsByTagName("input");

//       for(var i = 0; i < inputs.length; i++) {
//           if(inputs[i].type === "checkbox" && inputs[i].checked) {
//             var field = inputs[i].id
//             if (field === "Full Name"){
//               valBoxes.push(
//                 <>
//                   <br/><label for="fname">First Name: </label>
//                   <input type="text" id="fname"/><br/>
//                   <br/><label for="lname">Last Name: </label>
//                   <input type="text" id="lname"/><br/>
//                 </>
//               )              
//             }
//             else{
              
//                 valBoxes.push(
//                   <>
//                     <br/><label for={field}>{PrettyColumnMap[field]}: </label>
//                     <input type="text" id={field}/><br/>
//                   </>
//                 )
              
//             }
//           }  
//         }
//         setFieldBoxes(valBoxes)
//         setNextStep(true)

//     }
    
//     function downloadCSV(){
//       const options = { 
//         fieldSeparator: ',',
//         filename: "PatientRecordQueryResult",
//         quoteStrings: '"',
//         decimalSeparator: '.',
//         showLabels: true, 
//         showTitle: true,
//         title: 'Patient Record Query Result',
//         useTextFile: false,
//         useBom: true,
//         useKeysAsHeaders: true,
//       };
//       const csvExporter = new ExportToCsv(options);
//       csvExporter.generateCsv(tableData["raw"]);
//     }

//     return (
//         <div style={styles.container}>
//         <h1 class = 'header'>Hello</h1>
//         <div class="row">
//           <div class = 'column'>
//             <form id="finder">
//               <label for="filter">Choose Fields to Filter Records By: </label> <br/>
//               {filterOptions()}
//               <button class = 'SubmitFields' type = "button" onClick={makeValueInputs}>Next</button><br/>
//             </form>


//             <form id = "querymaker">

//               {nextStep && 
//               <>
//                   {fieldBoxes}
//                   {typeErr.length > 0 &&
//                         <>
//                         <il>
//                             {typeErr}
//                         </il>
//                         </>
//                     }
//                   {fieldBoxes.length >0 &&
//                    <><br/><button class = 'SubmitFind' type = "button" onClick={()=>handleQuery(false)}>Find Records</button><br/></>
//                  }
//               </>}
//               {queryErr && <h3>{queryErr}</h3>}
//             </form>
//           </div>

//           <div >
//             <h3>OR</h3>
//             <button class = 'SubmitFind' type = "button" onClick={()=>handleQuery(true)}>Get All Records</button><br/><br/>    
//           </div>

//       </div>

//       {showTable && tableData["raw"].length > 0 ?
//       <>
//         <div class = "csvButton">
//           <button onClick = {downloadCSV}>Download</button>
//         </div>
//         {querySummary ? 
//         <div>
//           <span class = "querySummary">Displaying patient records where:</span>
//           {querySummary}
//         </div>
//         :
//         <div class = "querySummary"><h4>Displaying all patient records</h4></div>
//         }
//         <table class="tablecenter">
//           <caption class="tableTitle">Search Results</caption>
//           {tableData["headers"]}
//           {tableData["rows"]}
//         </table>
//       </>
//       : 
//       <div class = "centeredMessage"><h4>No results found</h4></div>
//         }
//       </div>
//     )
// };


// export default Finder;