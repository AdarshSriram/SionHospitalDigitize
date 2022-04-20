import { useState, useEffect, useRef } from "react";
import ReactDOMServer from 'react-dom/server';
import {createPatientRecordHelpAssignment, updatePatientRecordHelpAssignment} from '../graphql/mutations';
import { API } from 'aws-amplify';
import {RecordFields, newRecordFields, initDonations} from './ui_utils_denorm'
import {Form, Button, Container, Stack, Row} from 'react-bootstrap'
import {validatePatient, validateHelp, InputFieldsRaw, TypeSorted, validateDono} from './type_utils_denorm'
import { PrettyColumnMap } from "./type_utils";

export function useFirstRender() {
    const firstRender = useRef(true);
  
    useEffect(() => {
      firstRender.current = false;
    }, []);
  
    return firstRender.current;
  }

function Adder (updateInitRecord){

    const hasInit = updateInitRecord !== undefined && Object.keys(updateInitRecord).length >0 
    var InitForms = {patient: RecordFields.patient, help: []}
    const [initFlag, setInitFlag] = useState(hasInit)
    var InitDonoMap = {}


    if (initFlag){
    console.log(initFlag)
    var forms = newRecordFields({}, updateInitRecord)
    InitForms.patient = forms.patient
    var donationForms = []
    for (var k = 0; k<updateInitRecord["donations"].length;k++){
        const donoForm = 
            <div className="bg-light" style={{"border-style": "dotted", "padding": "15px" }}>
                                <div class="d-flex justify-content-center"><h4>Current Donation {k+1}</h4></div>
                                <div id = {"Help"+0+"Dono"+k}>
                                    {initDonations(updateInitRecord["donations"][k])}
                                </div>
                            </div>

        donationForms.push(donoForm)
    }
    InitDonoMap[0] = donationForms

    InitForms.help = 
    [
        <div className="bg-light" style={{"border-style": "dotted", "padding": "15px" }}>
            <div id={"Help"+0+"div"}>
                <div class="d-flex justify-content-center" ><h4>Request 1</h4></div>

                <div id = {"Help"+0}>
                    {forms['help']}
                </div>
            </div>
            {donationForms}
            <Button variant="secondary" onClick={()=>{addDonation(0)}}>Add Donation</Button>
            <Button variant="secondary" onClick={()=>{removeDonation(0)}}>Remove Current Donation 1</Button>
        </div>
    
    ]
    setInitFlag(false)
    }



    const AddHelpButton = <Button variant="secondary" onClick={addNewReq}>Add Help Request</Button>

    const [submittedFlag, setSubmittedFlag] = useState(null)
    const [helpRequestForms, setHelpRequestForms] = useState(InitForms.help)
    const [patientForm, setPatientForm] = useState(InitForms.patient)
    const [helpDonationMap, setHelpDonationMap] = useState(InitDonoMap)
    const [isEdit, setIsEdit] = useState(hasInit)

    

    function addNewReq(){        
        setHelpRequestForms(
            helpRequestForms.concat(
                [
                    <div className="bg-light" style={{"border-style": "dotted", "padding": "15px" }}>
                        <div id={"Help"+helpRequestForms.length+"div"}>
                            <div class="d-flex justify-content-center" ><h4>Request {helpRequestForms.length+1}</h4></div>

                            <div id = {"Help"+helpRequestForms.length}>
                                {RecordFields['help']}
                            </div>
                        </div>
                        <Button variant="secondary" onClick={()=>{addDonation(helpRequestForms.length)}}>Add Donation</Button>
                        <Button variant="secondary" onClick={()=>{removeDonation(helpRequestForms.length)}}>Remove Donation </Button>
                    </div>
                
                ]
            )
        )
    }

    function addDonation(helpId){
        var Donos = helpDonationMap[helpId]
        var numDonos = Donos === undefined ? 0 :  Donos.length
        const newDonation = <div className="bg-light" id ={"Dono"+numDonos+"Container"} style={{"border-style": "dotted", "padding": "15px" }}>
                                <div class="d-flex justify-content-center"><h4>Donation {numDonos+1}</h4></div>
                                <div id = {"Help"+helpId+"Dono"+numDonos}>
                                    {RecordFields['donation']}
                                </div>
                            </div>
        if (numDonos >0){
            helpDonationMap[helpId].push(newDonation)
        }
        else{
            helpDonationMap[helpId] = [newDonation]
        }
        setHelpDonationMap(helpDonationMap)
        const htmlString = ReactDOMServer.renderToStaticMarkup(newDonation)
        var helpDiv = document.getElementById("Help"+helpId+"div")
        helpDiv.insertAdjacentHTML("beforeend", htmlString)
    }

    function removeDonation(helpId){
        var tmp = {...helpDonationMap}
        const donoidx = helpDonationMap[helpId].length-1
        tmp[helpId].pop()
        setHelpDonationMap(tmp)
        var helpDiv = document.getElementById("Dono"+donoidx+"Container")
        // helpDiv.removeChild(helpDiv.lastChild);
        helpDiv.remove()
    }

    function removeReq(){
        if (helpRequestForms.length >1){
            setHelpRequestForms(helpRequestForms.slice(1))
        }
    }
    function extractFromForm(divList, help = false){
        var tmp = {}
        for (const fieldDiv of divList){
            const inputBox = fieldDiv.getElementsByTagName("input")
            var val = inputBox[0].value
            const fieldName = inputBox[0].id
            if (!help || (help && !InputFieldsRaw.donations.includes(fieldName)) || fieldName !=="donations"){
                val = !TypeSorted.string.includes(fieldName) ? parseInt(val) : val
                tmp[fieldName] = val
            }
        }
        return tmp
    }

    async function handleSubmit(){
        const patientInfo = document.getElementById("PatientDiv").getElementsByClassName("mb-3")
        var patientData = extractFromForm(patientInfo)
        if (isEdit) {patientData["id"] = updateInitRecord["id"]; patientData["_version"] = updateInitRecord["_version"]}
        // if (patientData["state"] === "Maharashtra" || patientData["state"] === "maharastra" || patientData["state"] === "MH") {patientData["is_maha"] = true}
        const patientValidation = validatePatient(patientData)
        var patientGood = true;
        if (Object.keys(patientValidation).length > 0){
            patientGood = false
            console.log(patientValidation)
            console.log(patientData)
            setPatientForm(newRecordFields(patientValidation).patient)
        }
        else{
            patientData["help_given"] =  patientData["help_given"] === "Y" || patientData["help_given"] === "y" ? true : false
        }
        var rows = []
        var allHelpsGood = true;
        var donoGood = true
        for (var i=0; i < helpRequestForms.length; i++){
            const helpForm = document.getElementById("Help"+i).getElementsByClassName("mb-3")
            const helpData = extractFromForm(helpForm)
            const helpValidation = validateHelp(helpData)
            if (Object.keys(helpValidation).length > 0){
                console.log(helpValidation)
                allHelpsGood = false
                const divList = [...helpForm]
                const helpInputBoxes = divList.map(x=>[x.getElementsByTagName("input")[0], x.getElementsByTagName("label")[0]])
                console.log(helpInputBoxes)
                for (const [box, label] of helpInputBoxes){
                    const fieldName = box.id
                    if (Object.keys(helpValidation).includes(fieldName)){
                        label.innerHTML = PrettyColumnMap[fieldName] + " (" + helpValidation[fieldName] + ")"
                    }
                }
            }
            var donationObjs = []
            if (helpDonationMap[i]){
                for (var j=0;j< helpDonationMap[i].length;j++){
                    const donoForm = document.getElementById("Help"+i+"Dono"+j).getElementsByClassName("mb-3")
                    var donoData = extractFromForm(donoForm)
                    const donoVal = validateDono(donoData)
                    if (Object.keys(donoVal).length > 0){
                        console.log(donoVal)
                        donoGood = false
                        var donoDivList = [...donoForm]
                        const donoInputBoxes = donoDivList.map(x=>[x.getElementsByTagName("input")[0], x.getElementsByTagName("label")[0]])
                        console.log(donoInputBoxes)
                        for (const [box, label] of donoInputBoxes){
                            const fieldName = box.id
                            if (Object.keys(donoVal).includes(fieldName)){
                                label.innerHTML = PrettyColumnMap[fieldName] + " (" + donoVal[fieldName] + ")"
                            }
                        }
                    }
                    donationObjs.push(donoData)
                }
            }
            
            helpData["donations"] = donationObjs
            const finalRow = {
                ...patientData,
                ...helpData
            }
            rows.push(finalRow)
        }
        if (!allHelpsGood || !patientGood || !donoGood){
            alert("Please check form inputs again")
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            return
        }
        if (rows.length ===0){
            rows.push({...patientData, donations: []})
        }
        console.log(rows)
        const mutationChoice = isEdit ? updatePatientRecordHelpAssignment : createPatientRecordHelpAssignment
        Promise
        .all(
            rows.map((rowData) => API
            .graphql({ query: mutationChoice, variables: {input: rowData}})
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
                    <h2>Patient Record Form</h2>π
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