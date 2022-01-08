import { useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { createPatientRecord} from '../graphql/mutations';
import {parseAndVerify} from "./type_utils"
import styles from "./adder.css"
import {patientRegForm, requestsForms} from './ui_utils'
import * as Bp from'react-bootstrap';

function PatientAdd ({ signOut, user }) {

    const [submittedFlag, setSubmittedFlag] = useState(false);
    const [typeErr, setTypeErr] = useState([])
    const [regData, setRegData] = useState(
        {
            "num_help_requests":0
        }
    )

    function handleRegInfo (){
        var inputsDiv = document.getElementById("PatientRecordForm");
        var formData = parseAndVerify(inputsDiv)
        if (formData["err"].length > 0){
            setTypeErr(formData["err"])
            return 
        }
        setTypeErr([])
        formData["num_help_requests"] = Number(formData["num_help_requests"])
        setRegData(formData["data"])
    }

    function createRecordAndRequests(){
        var RecordData = regData
        // const reqFormDivs = document.getElementById("reqForms")
        var helpData = []
        for (var i = 0;i<regData["num_help_requests"].length;i++){
            const id = "RequestForm"+i
            const form = document.getElementById(id)
            console.log(form)
            var data = {}
            const elements = form.getElementsByTagName("input")
            for (i = 0; i < elements.length; i++ ) {
                var e = elements[i];
                data[encodeURIComponent(e.id)] = encodeURIComponent(e.value)
            }
            helpData.push(data)
        }
        delete  RecordData["num_help_requests"]
        RecordData["help_requests"] = helpData
        console.log(RecordData)
        API.graphql(graphqlOperation(createPatientRecord, {input: RecordData}))
        .then(()=>{
            document.getElementById("PatientRecordForm").reset();
            console.log("Added Patient");
            setSubmittedFlag(true);
        })
        .catch((err)=>console.log(err))
        ;
    }
    return (
        <div>
            <h1 class = 'header'>Add New Patient Record</h1>
            <div class="container">
                <h5>(* marks a required field)</h5>
                    <div class="row">
                        <form class = "column" id = "PatientRecordForm">
                            {patientRegForm()}
                            {typeErr.length > 0 &&  <><il>{typeErr}</il></> }
                            <Bp.Button class = 'AddDonation' type='button' onClick={handleRegInfo}>Next</Bp.Button><br/>
                        </form>
                    </div>
                    {
                               <div style = {{columnCount: regData["num_help_requests"]}} id = "reqForms">
                                    {requestsForms(regData["num_help_requests"])}
                                </div>
                    }

                    <Bp.Button class = 'submitButton' type='button' onClick = {createRecordAndRequests}>Submit</Bp.Button><br/>

                    {submittedFlag && <h3>Successfully added patient record!</h3>}
            </div>
        </div>
    );
};

export default PatientAdd; 