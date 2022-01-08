/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientRecordHelpAssignment = /* GraphQL */ `
  mutation CreatePatientRecordHelpAssignment(
    $input: CreatePatientRecordHelpAssignmentInput!
    $condition: ModelPatientRecordHelpAssignmentConditionInput
  ) {
    createPatientRecordHelpAssignment(input: $input, condition: $condition) {
      id
      fname
      lname
      document_type
      de_by
      indoor_no
      rf_rs_name
      card_no
      age
      address
      contact
      ward_no
      before_help_amt
      help_type
      help_remark
      department
      diagnosis
      unit
      opd
      cdo_name
      trust_name
      patient_contribution
      pbcf
      cdo_or_trust
      donation_amount
      cheque_no
      help_given
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePatientRecordHelpAssignment = /* GraphQL */ `
  mutation UpdatePatientRecordHelpAssignment(
    $input: UpdatePatientRecordHelpAssignmentInput!
    $condition: ModelPatientRecordHelpAssignmentConditionInput
  ) {
    updatePatientRecordHelpAssignment(input: $input, condition: $condition) {
      id
      fname
      lname
      document_type
      de_by
      indoor_no
      rf_rs_name
      card_no
      age
      address
      contact
      ward_no
      before_help_amt
      help_type
      help_remark
      department
      diagnosis
      unit
      opd
      cdo_name
      trust_name
      patient_contribution
      pbcf
      cdo_or_trust
      donation_amount
      cheque_no
      help_given
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePatientRecordHelpAssignment = /* GraphQL */ `
  mutation DeletePatientRecordHelpAssignment(
    $input: DeletePatientRecordHelpAssignmentInput!
    $condition: ModelPatientRecordHelpAssignmentConditionInput
  ) {
    deletePatientRecordHelpAssignment(input: $input, condition: $condition) {
      id
      fname
      lname
      document_type
      de_by
      indoor_no
      rf_rs_name
      card_no
      age
      address
      contact
      ward_no
      before_help_amt
      help_type
      help_remark
      department
      diagnosis
      unit
      opd
      cdo_name
      trust_name
      patient_contribution
      pbcf
      cdo_or_trust
      donation_amount
      cheque_no
      help_given
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTrust = /* GraphQL */ `
  mutation CreateTrust(
    $input: CreateTrustInput!
    $condition: ModelTrustConditionInput
  ) {
    createTrust(input: $input, condition: $condition) {
      id
      name
      email
      phone
      contact_person
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateTrust = /* GraphQL */ `
  mutation UpdateTrust(
    $input: UpdateTrustInput!
    $condition: ModelTrustConditionInput
  ) {
    updateTrust(input: $input, condition: $condition) {
      id
      name
      email
      phone
      contact_person
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteTrust = /* GraphQL */ `
  mutation DeleteTrust(
    $input: DeleteTrustInput!
    $condition: ModelTrustConditionInput
  ) {
    deleteTrust(input: $input, condition: $condition) {
      id
      name
      email
      phone
      contact_person
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
