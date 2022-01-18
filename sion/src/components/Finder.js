import { useState } from "react";
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';
import { ExportToCsv } from 'export-to-csv';
import {Container, Form, Stack, Button, Table, Row, Col} from 'react-bootstrap'
import {PrettyColumnMap} from './type_utils'
import {TableCols} from './type_utils_denorm'
import {CheckBoxInit} from './ui_utils_denorm'
import { deletePatientRecordHelpAssignment } from "../graphql/mutations";
import Adder from './Adder'
import TableToExcel from "@linways/table-to-excel";


function Finder (){

    const [tableData, setTableData] = useState([])
    const [filterForm, setFilterForm] = useState(CheckBoxInit())
    const [editRecord, setEditRecord] = useState({})
 

    function downloadCSV(){
        var csvData = []
        for (var k = 0;k<tableData["raw"].length;k++){
            const record = tableData["raw"][k]
            const donos = [...record["donations"]]
            delete record["donations"]
            for (var dono of donos){
                dono = {...dono}
                delete dono["id"]
                const newrow = {...record, ...dono}
                csvData.push(newrow)
            }
        }
        const options = { 
        fieldSeparator: ',',
        filename: "PatientRecordQueryResult",
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(csvData);
    }

    function handleEdit(record){
        console.log(record)
        setEditRecord(record)
    }

    function handleDelete(record, idx){
        if (tableData["raw"]){
            console.log("delet")
            const id = record["id"]
            tableData["raw"].splice(idx, 1)
            tableData["rows"].splice(idx, 1)
            setTableData(tableData)
            var recordDelete = {}
            recordDelete["id"] = id
            recordDelete["_version"] = record["_version"]
            console.log(recordDelete)
            API
            .graphql({ query: deletePatientRecordHelpAssignment, variables: {input: recordDelete}})
            .then((res)=>console.log(res))
            .catch((res)=>console.log(res))
        }
        


    }

    function generateTable(records){
        var data = {}
        data["rows"] = []
        data["raw"] = records
        records = [...records]
        console.log(records)
        const goodKeys = TableCols.raw.filter((x)=>PrettyColumnMap[x] !== undefined)
        var headers = goodKeys.map(x=><th>{PrettyColumnMap[x]}</th>)
        data['headers'] = <tr>
            <th>Edit/Delete Record</th>
            {headers}
            </tr> 
  
        for (var i=0; i<records.length;i++){
            const donos = records[i]['donations']
            const numDonos = donos.length
            const donoNames = <td rowspan = {numDonos}>{donos.map(dono=><>{dono["trust_name"]}<br/></>)}</td>
            const donoAmts = <td rowspan = {numDonos}>{donos.map(dono=><>{dono["donation_amount"]}<br/></>)}</td>
            
            // const row = Object.entries(records[i])
            //     .filter((tpl)=> tpl[0] !== "id" && goodKeys.includes(tpl[0]))
            //     .map((tpl)=> <td rowspan={numDonos}>{tpl[1]}</td>)
            const row = goodKeys.filter(x=>!['id', 'trust_name', 'donation_amount'].includes(x)).map(k=><td rowspan={numDonos}>{records[i][k]}</td>)
            
            const rawRecord = data['raw'][i]
          data["rows"].push(
            <tr>
                <td rowspan={numDonos}>
                <Button variant = "secondary" size="sm" onClick={()=>handleEdit(rawRecord)}>Edit</Button>
                <Button variant = "secondary" size="sm" onClick={()=>handleDelete(rawRecord, i)}>Delete</Button>
                </td>
                <td rowspan={numDonos}>{i+1}</td>
                {row}
                {donoNames}
                {donoAmts}
            </tr>
          )
        }

        setTableData(data)
      }

      async function getAllRecords(){
        API
       .graphql({ query: queries.listPatientRecordHelpAssignments})
       .then((res)=> {
        const records = res["data"]["listPatientRecordHelpAssignments"]["items"]
        generateTable(records.filter((rec)=> !rec["_deleted"]))
       })
       .catch((err)=>console.log(err))
      }


      function handleFilter(){ 
          const filterFieldList = [...document.getElementsByTagName("input")]
          .filter((el)=> el.type === "checkbox" && el.checked)
          .map((el)=>el.id)

          if (filterFieldList.length ===0 ){
              return
          }

          var queryFilter = []
          for (var key of filterFieldList){
              const val = document.getElementById(key+"_input").value
              var tmp = {}
              var tmpVal = {}
              if (key !=="trust_name"){
                tmpVal["eq"] = val
                tmp[key] = tmpVal
                queryFilter.push(tmp)
              }
          }
          const filter = {and  : queryFilter};
          console.log(queryFilter)
          API
          .graphql({ query: queries.listPatientRecordHelpAssignments, variables: { filter: filter}})
          .then((res)=>{
            var records = res["data"]["listPatientRecordHelpAssignments"]["items"]
            if (filterFieldList.includes("trust_name")){
                console.log(records)
                const trust = document.getElementById("trust_name_input").value
                records = records.filter((rec)=>rec["donations"].some(el=>Object.values(el).includes(trust)))
            }
            records = records.filter((rec)=> !rec["_deleted"])
            generateTable(records)
          })
          .catch((err)=> console.log(err))
    }

    function downloadXlsx(){
        TableToExcel.convert(document.getElementById("QueryTable"), {
            name: "test.xlsx",
            sheet: {
              name: "Sheet 1"
            }
          });
    }

    return (
        <Container fluid>
            {editRecord !== undefined && Object.keys(editRecord).length > 0 ? <Adder {...editRecord}/> : 
            <>
            <div class="d-flex justify-content-center"><h2>Find Records</h2></div>
            <Stack gap={4}>
                Select Field and Enter Filter Value
                <div class="bgn-light border">
                    <Stack gap={2}>
                        <Row>
                            <Col>
                                {filterForm.col1}
                            </Col>

                            <Col>
                                {filterForm.col3}
                            </Col>
                        </Row>
                        <Button onClick={handleFilter}>Search records with selected filters</Button>
                        <div class="d-flex justify-content-center"><h3>OR</h3></div>
                        <Button onClick={getAllRecords}>Get All Records</Button>
                    </Stack>
                </div>

            {tableData.raw && tableData.raw.length > 0 && 
            
            <><Button onClick={downloadCSV}>Download Spreadsheet</Button>
            <Table striped bordered hover id="QueryTable">
                <caption class="tableTitle">Search Results</caption>
                {tableData["headers"]}
                <tbody>
                    {tableData["rows"]}
                </tbody>
            </Table>
            </>}
            </Stack>
            </>}
        </Container>
    )
}


export default Finder;