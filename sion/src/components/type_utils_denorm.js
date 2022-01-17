export const InputFieldsRaw = {
        patient: ['name', 'age', 'contact', 'address', 'identity_proof', 'card_no', 'de_by', 'indoor_no',
        'ward_no', 'opd', 'unit', 'cdo_name', 'help_given'],

    help : [
    'referred_for','department','total_cost', 'diagnosis','patient_contribution', "patient_receipt_no",
    'help_remark'
    ],
    donations: [
        'trust_name', 'donation_amount', "donation_receipt_no"
    ]
}


// export const RequiredFieldsRaw = {
//     patient: ['name', 'age', 'identity_proof', 'de_by', 'indoor_no','card_no', 'ward_no'],

//     help : [
//         'referred_for', 'diagnosis'
//         ],
//     donations: [
//         'trust_name', 'donation_amount', "donation_receipt_no"
//     ]
// }

export const RequiredFieldsRaw = {
    patient: [],

    help : [
        
        ],
    donations: [
        
    ]
}

export const FilterFieldsRaw = [
    ['name', 'age', 'contact', 'identity_proof', 'de_by', 'indoor_no','card_no'], 
    ['help_type', 'department', 'unit', 'opd', 'cdo_name', 'cheque_no', 'help_given']
]

export const TypeSorted = {
    "string" : ['name', 'address', 'identity_proof', 'de_by',
    'help_type', 'help_remark', 'department', 'unit', 'cdo_name', 'trust_name', 'diagnosis',
    'additional_comments', "help_given", "referred_for"]
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

export const TableCols = {
    raw: ['id','name', 'age', 'conact', 'help_given', 'referred_for', 'diagnosis', 
    'cdo_name', 'total_cost', 'patient_contribution', "trust_name", "donation_amount"]
}