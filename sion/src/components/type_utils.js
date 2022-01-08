export const PrettyColumnMap = {
    id: "Sr. No.",
    fname: "First Name",
    lname: "Last Name",
    name: 'Name',
    document_type: "Document Type",
    card_no: "Card No.",
    contact: "Contact No.",
    opd: "OPD No.",
    cdo_name: "CDO Name",
    department: "Dept.",
    address: 'Address',
    help_type: "Request Type",
    self_contribution: "Patient Payment",
    donation_amount: "Donation Amt",
    trust_name: "Trust Name",
    month: "Month",
    date: "Date (DD/MM/YYYY)",
    help_remark: "Help Remark",
    de_by: 'DE By',
    indoor_no: 'Indoor No.',
    age: 'Age',
    ward_no: 'Ward No.',
    before_help_amt: "Amt before help",
    total_self_contribution: "Total self-contribution",
    total_donation_received: "Total donation received",
    total_pbcf: 'Total PBCF',
    total_pending_amt: 'Total Pending Amt',
    rf_rs_name: "RF-RS Name",
    additional_comments: 'Additional comments',
    cheque_no: 'Cheque No.',
    pbcf: "PBCF",
    cdo_or_trust: 'CDO/Trust',
    unit: 'Unit',
    email: 'Email',
    num_help_requests: 'Number of Requests',
    diagnosis: "diagnosis",
    patient_contribution: "Patient contribution",
    pending_help: "Help given",
    help_given: "Help given"
}

  export const RecordFieldNames = {
    required: [
      'fname', 'lname', 'document_type', 'de_by', 'indoor_no', 'card_no', 'age', 'ward_no',
    'before_help_amt', 'num_help_requests'
    ],
    optional: [
        'rf_rs_name', 'address', 'contact', 'additional_comments'
    ],
    combined:[
      'fname', 'lname', 'document_type', 'de_by', 'indoor_no', 'card_no', 'age', 'ward_no',
    'before_help_amt', 'num_help_requests','rf_rs_name', 'address', 'contact', 'additional_comments'
    ],
    extra: 'help_requests'
}

export const HelpFieldNames = {
    required: [
        'help_type', 'department', 'diagnosis', 'unit', 'opd', 'cdo_name', 'trust_name', 
        'patient_contribution', 'pbcf', 'cdo_or_trust', 'donation_amount', 'help_given'
    ],
    optional: [
        'help_remark', 'cheque_no'
    ],
    combined:[
      'help_type', 'department', 'diagnosis', 'unit', 'opd', 'cdo_name', 'trust_name', 
      'patient_contribution', 'donation_amt', 'pbcf', 'cdo_or_trust', 'donation_amount',
      'help_given', 'help_remark', 'cheque_no'
    ]
}

export const TrustFieldNames = {
    required: [
        'email', 'phone', 'name'
    ],
    optional: [
      'address'
    ]
}

export const FilterFieldRawNames = ['fname', 'lname', 'help_type', 'department', 'unit', 'cdo_name', 'trust_name', 'cheqeue_no']

  export function parseAndVerify(form){
    var data = {}
    const elements = form.getElementsByTagName("input")
    for ( var i = 0; i < elements.length; i++ ) {
        var e = elements[i];
        if (encodeURIComponent(e.id) !== ""){
            data[encodeURIComponent(e.id)] = encodeURIComponent(e.value)
        }
     }
     return verifyInput(data)
}
  
  function verifyInput(record, all_fields = true){
    var res = {}
    res["data"] = record
    res["err"] = []
    if (all_fields){
    const record_fields = Object.keys(record)
    for (const field of RecordFieldNames['required']){
      if (record_fields.includes(field) && record[field] === ""){
        var tmp = <ul><span class = "typeErr">Required field: {PrettyColumnMap[field]}</span></ul>
        res["err"].push(tmp)
      }
    }
    }
    return res
  }

   // export const PatientRecordTypes = {
  //   id: "number",
  //   fname: "string",
  //   lname: "string",
  //   document_type: "string",
  //   aadhar: "number", 
  //   contact: "number",
  //   cdo_name: "string",
  // }

  // const DonationTypes = {
  //   opd_no: "number",
  //   department: "string",
  //   request_type: "string",
  //   donor_name: "string",
  //   self_pay: "number",
  //   donor_pay: "number",
  //   cheque_no: "string"
  // }