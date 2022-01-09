import { useState } from "react";
import * as queries from '../graphql/queries';
import { API } from 'aws-amplify';
import { ExportToCsv } from 'export-to-csv';
import {Container, Form, Stack, Button, Table, Row, Col} from 'react-bootstrap'
import {PrettyColumnMap} from './type_utils'
import {FilterFieldsRaw} from './type_utils_denorm'
import {CheckBoxInit} from './ui_utils_denorm'

function Finder (){

    const [tableData, setTableData] = useState({})
    const [filterForm, setFilterForm] = useState(CheckBoxInit())
    const [submitReady, setSubmitReady] = useState(false)
 

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

    function generateTable(records){
        var data = {}
        data["headers"] = []
        data["rows"] = []
        data["raw"] = records
        if (records.length > 0 ){
          for (var j=0; j< Object.keys(records[0]).length-3;j++) {
              const col = Object.keys(records[0])[j]
            data["headers"].push(
            <th>
                {PrettyColumnMap[col]}
            </th>
            )
          }
        }
        data['headers'] = <tr>{data["headers"]}</tr> 
  
        for (var i=0; i<records.length;i++){
            records[i].id = i
          data["rows"].push(
            <tr>
              {Object.values(records[i]).map(
                x => <td>{x}</td>
              ).slice(0, 28)}
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
        generateTable(records)
       })
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
        </Container>
    )
}


export default Finder;