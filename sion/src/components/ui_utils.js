import {RecordFieldNames, HelpFieldNames, PrettyColumnMap, FilterFieldRawNames} from "./type_utils"
import styles from "./adder.css"

//PatientRecordTypes {
//     id: ID!
//     fname: String!
//     lname: String!
//     document_type: String!
//     de_by: String!
//     indoor_no: Int!
//     rf_rs_name: String
//     card_no: Int!
//     age: Int! 
//     address: String
//     contact: Int
//     ward_no: Int!
//     before_help_amt: Int!
//     total_self_contribution: Int!
//     total_donation_received: Int!
//     total_pbcf: Int!
//     total_pending_amt: Int!
//     pending_help: Boolean!
//     help_requests: [HelpRequests!]!
//     additional_comments: String
//   }

// type HelpRequests {
//     id: ID!
//     help_type: String!
//     help_remark: String
//     department: String!
//     diagnosis: String!
//     unit: String!
//     opd: Int!
//     cdo_name: String!
//     trust_name: String!
//     patient_contribution: Int!
//     donation_amt: Int!
//     pbcf: Int!
//     cdo_or_trust: String!
//     donation_amount: Int!
//     cheque_no: String
//     help_given: Boolean!
//   }
    
// type Trust @model {
//     id: ID!
//     name: String!
//     email: AWSEmail! 
//     phone: Int!
//     contact_person: String
//     address: String
//   }


export function patientRegForm(){
 return formBuilder(RecordFieldNames)   
}

export function requestsForms(num_reqs){
    var form = []
    for (var i = 0; i < num_reqs; i++){
        
        form.push(
                <div class ="column" id = {"RequestForm"+i}>
                    {formBuilder(HelpFieldNames)}
                </div>
        )
    }
    return form
   }


function formBuilder(RecordFieldNames){
    var formElements = []
    for (const key of RecordFieldNames["required"]){
        const tag = PrettyColumnMap[key]
        formElements.push(
            <>
                <label class = "reqField" for={key}>{tag}*: </label>
                <input type="text" id={key} required/><br/><br/>
            </>
        )
    }
    for (const key of RecordFieldNames["optional"]){
        const tag = PrettyColumnMap[key]
        formElements.push(
            <>
                <label for={key}>{tag}: </label>
                <input type="text" id={key}/><br/><br/>
            </>
        )
    }
    return formElements
}

export function filterOptions(){
    var formElements = []
    for (const key of RecordFieldNames["required"]){
        if (key !== "num_help_requests"){
            const tag = PrettyColumnMap[key]
            formElements.push(
            <>
                <label class = "reqField" for={key}>{tag}: </label>
                <input type="checkbox" id={key} required/><br/><br/>
            </>
                
        )
        }
    }
    return formElements
}

export function fieldCheckBoxes(){

}