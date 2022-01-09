export const InputFieldsRaw = {
        patient: ['fname', 'lname', 'age', 'contact', 'address', 'document_type', 'de_by', 'indoor_no', 'rf_rs_name',
        'card_no', 'ward_no'],

    help : [
    'help_type','before_help_amt', 'help_remark', 'department', 'unit', 'opd', 'cdo_name', 'trust_name', 'diagnosis',
    'patient_contribution', 'pbcf', 'cdo_or_trust', 'donation_amount', 'cheque_no', 'help_given', 'additional_comments'
    ]
}


export const RequiredFieldsRaw = {
    patient: ['fname', 'lname', 'age', 'document_type', 'de_by', 'indoor_no','card_no', 'ward_no'],

    help : [
    'help_type','before_help_amt', 'department', 'unit', 'opd', 'cdo_name', 'trust_name', 'diagnosis',
    'patient_contribution', 'pbcf', 'cdo_or_trust', 'donation_amount', 'help_given'
    ]
}

export const FilterFieldsRaw = [
    ['fname', 'lname', 'age', 'contact', 'document_type', 'de_by', 'indoor_no','card_no'], 
    ['help_type', 'department', 'unit', 'opd', 'cdo_name','trust_name', 'cheque_no', 'help_given']
]

const TypeSorted = {
    "string" : ['fname', 'lname', 'address', 'document_type', 'de_by', 'rf_rs_name', 'ward_no',
    'help_type', 'help_remark', 'department', 'unit', 'opd', 'cdo_name', 'trust_name', 'diagnosis',
    'cdo_or_trust', 'cheque_no', 'additional_comments', "help_given"]
}


function makeSchema(){
    var schema = {}
    for (var key of InputFieldsRaw.patient){
        var tmp = {}
        tmp.prop = key
        schema[key] = tmp
    }
    for (key of InputFieldsRaw.help){
        tmp = {}
        tmp.prop = key
        schema[key] = tmp
    }
    schema["id"] = {prop:"id"}
    return schema
}

function checkType(key, val){
    if (!isNaN(val) && TypeSorted.string.includes(key)){
        return "Enter valid input"
    }
    if (!TypeSorted.string.includes(key) && isNaN(val)){
        return "Enter numerical value"
    }
    if (key === "help_given" &&  !(val === "Y" || val === "N" || val === "y" || val === "n")){
        return "Enter Y/N"
    }
    return null
}

export function validatePatient(patientInfo){
    var err = {}
    for (const key of InputFieldsRaw.patient){
        if (RequiredFieldsRaw.patient.includes(key) && patientInfo[key] === ""){
            err[key] = "Required"
        }
        else if (patientInfo[key] !== ""){
            const msg = checkType(key, patientInfo[key])
            if (msg !== null){
                err[key] = msg
            }
        }
    }
    return err
}

export function validateHelp(info){
    var err = {}
    for (const key of InputFieldsRaw.help){
        if (RequiredFieldsRaw.help.includes(key) && info[key] === ""){
            err[key] = "Required"
        }
        else if (info[key] !== ""){
            const msg = checkType(key, info[key])
            if (msg !== null){
                err[key] = msg
            }
        }
    }
    return err
}

export const Schema = makeSchema()