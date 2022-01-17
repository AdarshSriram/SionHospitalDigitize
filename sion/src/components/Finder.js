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

function Finder (){

    const [tableData, setTableData] = useState([])
    const [filterForm, setFilterForm] = useState(CheckBoxInit())
    const [editRecord, setEditRecord] = useState({})
 

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

    function handleEdit(record){
        console.log(record)
        setEditRecord(record)
    }

    function handleDelete(record, idx){
        if (tableData["raw"]){
            const id = record["id"]
            tableData["raw"].splice(idx, 1)
            tableData["rows"].splice(idx, 1)
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
        const goodKeys = TableCols.raw.map((x)=>PrettyColumnMap[x]).filter((x)=>x !== undefined)
        var headers = goodKeys.map(x=><th>{x}</th>)
        data['headers'] = <tr>
            <th>Edit/Delete Record</th>
            {headers}
            </tr> 
  
        for (var i=0; i<records.length;i++){
            const donos = records[i]['donations']
            const numDonos = donos.length
            const donoNames = <td rowspan = {numDonos}>{donos.map(dono=><>{dono["trust_name"]}<br/></>)}</td>
            const donoAmts = <td rowspan = {numDonos}>{donos.map(dono=><>{dono["donation_amount"]}<br/></>)}</td>
            
            const row = Object.entries(records[i])
                .filter((tpl)=> tpl[0] !== "id" && goodKeys.includes(PrettyColumnMap[tpl[0]]))
                .map((tpl)=> <td rowspan={numDonos}>{tpl[1]}</td>)
                console.log(row)
            
            const rawRecord = data['raw'][i]
          data["rows"].push(
            <tr>
                <td rowspan={numDonos}>
                <Button variant = "secondary" size="sm" onClick={()=>handleEdit(rawRecord)}>Edit</Button>
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
        console.log(records)
        generateTable(records)
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
              tmpVal["eq"] = val
              tmp[key] = tmpVal
              queryFilter.push(tmp)
          }
          const filter = {and  : queryFilter};
          console.log(queryFilter)
          API
          .graphql({ query: queries.listPatientRecordHelpAssignments, variables: { filter: filter}})
          .then((res)=>{
            const records = res["data"]["listPatientRecordHelpAssignments"]["items"]
            generateTable(records)
          })
          .catch((err)=> console.log(err))
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
            <Table striped bordered hover>
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