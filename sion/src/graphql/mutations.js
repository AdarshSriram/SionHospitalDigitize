/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientRecordHelpAssignment = /* GraphQL */ `
  mutation CreatePatientRecordHelpAssignment(
    $input: CreatePatientRecordHelpAssignmentInput!
    $condition: ModelPatientRecordHelpAssignmentConditionInput
  ) {
    createPatientRecordHelpAssignment(input: $input, condition: $condition) {
      id
      name
      gender
      age
      address
      city
      district
      state
      contact
      identity_proof
      card_no
      diagnosis
      departments
      referred_for
      total_cost
      help_given
      de_by
      indoor_no
      ward_no
      help_remark
      department
      unit
      opd
      cdo_name
      additional_comments
      donations {
        trust_name
        donation_amount
        donation_receipt_no
      }
      patient_contribution
      patient_receipt_no
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
      name
      gender
      age
      address
      city
      district
      state
      contact
      identity_proof
      card_no
      diagnosis
      departments
      referred_for
      total_cost
      help_given
      de_by
      indoor_no
      ward_no
      help_remark
      department
      unit
      opd
      cdo_name
      additional_comments
      donations {
        trust_name
        donation_amount
        donation_receipt_no
      }
      patient_contribution
      patient_receipt_no
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
      name
      gender
      age
      address
      city
      district
      state
      contact
      identity_proof
      card_no
      diagnosis
      departments
      referred_for
      total_cost
      help_given
      de_by
      indoor_no
      ward_no
      help_remark
      department
      unit
      opd
      cdo_name
      additional_comments
      donations {
        trust_name
        donation_amount
        donation_receipt_no
      }
      patient_contribution
      patient_receipt_no
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
