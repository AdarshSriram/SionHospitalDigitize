import { useState } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { createPatientRecord} from '../graphql/mutations';

function PatientAdd ({ signOut, user }) {

    const [submittedFlag, setSubmittedFlag] = useState(false);

    function handleSubmit (){
        var form = document.forms.adder;
        console.log(form.elements)
        const formData = parseAndVerify(form)
        console.log(formData)
        if (formData !== {} || formData !== null){
            API.graphql(graphqlOperation(createPatientRecord, {input: formData}))
        .then(()=>{
            document.getElementById("adder").reset();
            console.log("Added Patient");
            setSubmittedFlag(true);
        })
        .catch((err)=>console.log(err))
        ;
        }
    }

    function parseAndVerify(form){
        var data = {}
        for ( var i = 0; i < form.elements.length; i++ ) {
            var e = form.elements[i];
            if (encodeURIComponent(e.id) !== ""){
                data[encodeURIComponent(e.id)] = encodeURIComponent(e.value)
            }
         }
         return data;
    }

    return (
        <>
            <h1 class = 'header'>Hello</h1>
            <div class = 'SubSec'>
                <h2>New Patient Form</h2>
                <form id="adder">
                    <label for="fname">First Name: </label>
                    <input type="text" id="fname" name="fname" /><br/><br/>

                    <label for="lname">Last Name: </label>
                    <input type="text" id="lname" name="lname" /><br/><br/>

                    <label for="doc_type">Document Type: </label>
                    <input type="text" id="Document_type" name="doc_type" /><br/><br/>

                    <label for="aadhar">Aadhar No.: </label>
                    <input type="text" id="Aadhar_no" /><br/><br/>

                    <label for="contact">Contact: </label>
                    <input type="text" id="Contact"/><br/><br/>

                    <label for="opd">OPD No.: </label>
                    <input type="text" id="OPD_no" name="opd" /><br/><br/>

                    {/* <label for="unit"> Unit: </label>
                    <input type="text" id="unit" /><br/><br/> */}

                    <label for="dept"> Department: </label>
                    <input type="text" id="Department" /><br/><br/>

                    <label for="req_type"> Request Type: </label>
                    <input type="text" id="Request_type" /><br/><br/>

                    <label for="cdo"> CDO Name: </label>
                    <input type="text" id="CDO_name" /><br/><br/>

                    <label for="self_pay">Self Payment Amount: </label>
                    <input type="text" id="self_pay" /><br/><br/>

                    <label for="donor_pay">Donor Payment Amount: </label>
                    <input type="text" id="donor_pay" /><br/><br/>
                    
                    <button class = 'SubmitForm' type='button' onClick={handleSubmit}>Submit</button><br/>

                    {submittedFlag && <h3>Successfully added patient record!</h3>}
                </form>
            </div>
        </>
    );
};

export default PatientAdd; 