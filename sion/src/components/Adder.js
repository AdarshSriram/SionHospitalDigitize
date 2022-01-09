import { useState } from "react";
import {createPatientRecordHelpAssignment} from '../graphql/mutations';
import { API, graphqlOperation } from 'aws-amplify';
import {RecordFields, newRecordFields} from './ui_utils_denorm'
import {Form, Button, Container, Stack, Row} from 'react-bootstrap'
import {validatePatient, validateHelp} from './type_utils_denorm'


function Adder (){

    const initialReqBox = [
        <div className="bg-light" style={{"borderStyle": "dotted", "padding": "15px" }}>
                <div class="d-flex justify-content-center"><h4>Request 1</h4></div>

                <div id = {"Help0"}>
                            {RecordFields['help']}
                </div>
            </div>
    ]
    const AddHelpButton = <Button variant="secondary" onClick={addNewReq}>Add Help Request</Button>

    const [submittedFlag, setSubmittedFlag] = useState(null)
    const [helpRequestForms, setHelpRequestForms] = useState(initialReqBox)
    const [patientForm, setPatientForm] = useState(RecordFields.patient)

    function addNewReq(){        
        setHelpRequestForms(
            helpRequestForms.concat(
                [
                    <div className="bg-light" style={{"border-style": "dotted", "padding": "15px" }}>
                        <div class="d-flex justify-content-center"><h4>Request {helpRequestForms.length+1}</h4></div>

                        <div id = {"Help"+helpRequestForms.length}>
                            {RecordFields['help']}
                        </div>

                    </div>
                
                ]
            )
        )
    }

    function removeReq(){
        if (helpRequestForms.length >1){
            setHelpRequestForms(helpRequestForms.slice(1))
        }
    }
    function extractFromForm(divList){
        var tmp = {}
        for (const fieldDiv of divList){
            const inputBox = fieldDiv.getElementsByTagName("input")
            const val = inputBox[0].value
            const fieldName = inputBox[0].id
            tmp[fieldName] = val
        }
        return tmp
    }

    async function handleSubmit(){
        const patientInfo = document.getElementById("PatientDiv").getElementsByClassName("mb-3")
        const patientData = extractFromForm(patientInfo)
        const patientValidation = validatePatient(patientData)
        var patientGood = true;
        if (Object.keys(patientValidation).length > 0){
            patientGood = false
            setPatientForm(newRecordFields(patientValidation).patient)
        }
        var rows = []
        var allHelpsGood = true;
        var TempHelpForms = [...helpRequestForms]
        for (var i=0; i < helpRequestForms.length; i++){
            const helpForm = document.getElementById("Help"+i).getElementsByClassName("mb-3")
            const helpData = extractFromForm(helpForm)
            const helpValidation = validateHelp(helpData)
            if (Object.keys(helpValidation).length > 0){
                console.log(helpValidation)
                allHelpsGood = false
                const newForm_i = newRecordFields(helpValidation).help
                TempHelpForms[i] = 
                <div className="bg-light" style={{"border-style": "dotted", "padding": "15px" }}>
                    <div class="d-flex justify-content-center"><h4>Request {i+1}</h4></div>
                    <div id = {"Help"+i}>{newForm_i}</div>
                </div>
            }
            const finalRow = {
                ...patientData,
                ...helpData
            }
            rows.push(finalRow)
        }
        if (!allHelpsGood){
            setHelpRequestForms(TempHelpForms)
        }
        if (!allHelpsGood || !patientGood){
            return
        }
        console.log(rows)
        Promise
        .all(
            rows.map((rowData) => API
            .graphql({ query: createPatientRecordHelpAssignment, variables: {input: rowData}})
            )
        )
        .then((res) => 
        {
            console.log(res)
            window.location.reload()
        })
        .catch((err)=> {setSubmittedFlag(false); console.log(err)})
    }

    return ( 
        <Container fluid>
            <div class="border">
                <div class="d-flex justify-content-center">
                    <h2>Patient Record Form</h2>
                </div>
            </div>
            <Stack gap={4}>
                <Form>
                <div style={{"borderStyle": "solid", "padding": "15px" }} >
                    <div class="d-flex justify-content-center"><h3>Patient Details</h3></div>
                    <div id="PatientDiv">
                        {patientForm}
                    </div>
                </div>

                <Stack gap={3}>
                    {helpRequestForms}
                    {AddHelpButton}
                    {
                        helpRequestForms.length > 1 &&
                        <Button variant="secondary" onClick={removeReq}>Remove Request</Button>
                    }
                    <Button variant="primary" size="lg" onClick={handleSubmit}>Submit</Button>
                </Stack>
                </Form>
            </Stack>
        </Container>
    )

}


export default Adder;