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

export const Schema = makeSchema()