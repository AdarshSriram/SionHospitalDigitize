const aws = require('aws-sdk')
const ses = new aws.SES()

const InputFieldsRaw = {
  patient: ['fname', 'lname', 'age', 'contact', 'address'],

help : [
'help_type','before_help_amt', 'help_remark', 'department', 'unit', 'opd', 'cdo_name', 'diagnosis',
'patient_contribution', 'donation_amount'
]
}

exports.handler = async (event) => {
  for (const streamedItem of event.Records) {
    if (streamedItem.eventName === 'INSERT') {
      //pull off items from stream
      const data = streamedItem.dynamodb.NewImage
      var patientInfo = []
      for (const pKey of InputFieldsRaw.patient){
        patientInfo.push(
          <il>{PrettyColumnMap[pKey]}: {data.pKey.S}</il>
        )
      }
      var helpInfo = []
      for (const hKey of InputFieldsRaw.help){
        helpInfo.push(
          <il>{PrettyColumnMap[hKey]}: {data.hKey.S}</il>
        )
      }
      await ses
          .sendEmail({
            Destination: {
              ToAddresses: ["adarshsriram10@gmail.com"],
            },
            Source: process.env.SES_EMAIL,
            Message: {
              Subject: { Data: `Donation Request ${data.trust_name.S}` },
              Body: {
                Text: { Data:  
                  `
                  Hello,
                  Donation requested via Sion Hospital MSW department.
                  Patient Details:
                  ${
                    <ul>
                      {patientInfo}
                    </ul>
                  }
                  Reuqest Details:
                  ${
                    <ul>
                      {helpInfo}
                    </ul>
                  }
                  `
                },
              },
            },
          })
          .promise()
    }
  }
  return { status: 'done' }
}




// exports.handler = event => {
//   //eslint-disable-line
//   console.log(JSON.stringify(event, null, 2));
//   event.Records.forEach(record => {
//     console.log(record.eventID);
//     console.log(record.eventName);
//     console.log('DynamoDB Record: %j', record.dynamodb);
//   });
//   return Promise.resolve('Successfully processed DynamoDB record');
// };
const PrettyColumnMap = {
  id: "Sr. No.",
  fname: "First Name",
  lname: "Last Name",
  name: 'Name',
  document_type: "Document Type",
  card_no: "Card No.",
  contact: "Contact No.",
  opd: "OPD No.",
  cdo_name: "CDO Name",
  department: "Department",
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
  before_help_amt: "Amount before help",
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
  diagnosis: "Diagnosis",
  patient_contribution: "Patient contribution",
  pending_help: "Help given",
  help_given: "Help given"
}