import { useState } from "react";
import {createPatientRecordHelpAssignment} from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import {RecordFields} from './ui_utils_denorm'
import {Form, Button, Container, Stack, Row} from 'react-bootstrap'
import {Schema} from './type_utils_denorm'
import readXlsxFile from 'read-excel-file'


function Import(){

    const [success, setSuccess] = useState(false)

    function handleSubmit(){
        setSuccess(false)
        const file = document.getElementById("formFile").files[0]
        readXlsxFile(file, { Schema })
        .then((res, errors)=>{
            var keys;
            var parsedData = []
            for (var row of res){
                var data = {}
                if (row[0] === "id"){
                    keys = row.slice(1, row.length-5)
                    console.log(keys)
                }
                else{
                    for (var i = 0; i < keys.length;i++){
                        data[keys[i]] = row[i+1]
                    }
                    parsedData.push(data)
                }
            }
            Promise
            .all( 
                parsedData.map(
                    (rowData) => API.graphql({ query: createPatientRecordHelpAssignment, variables: {input: rowData}})
                )
            )
            .then((res) => {console.log(res); setSuccess(true); document.getElementById("formFile").value = ''} )
        })
        .catch((err)=>console.log(err))
    }

    return (
        <Container fluid>
            <Stack gap = {3}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Patient Records</Form.Label>
                    <Form.Control type="file" />
                </Form.Group>
                <Button onClick={handleSubmit}>Submit</Button>

                {success && <h3>Successfully imported data!</h3>}
            </Stack>
        </Container>
    )
}

export default Import 