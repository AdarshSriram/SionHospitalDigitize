/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPatientRecord = /* GraphQL */ `
  mutation CreatePatientRecord(
    $input: CreatePatientRecordInput!
    $condition: ModelPatientRecordConditionInput
  ) {
    createPatientRecord(input: $input, condition: $condition) {
      id
      fname
      lname
      Document_type
      Aadhar_no
      Contact
      OPD_no
      CDO_name
      Department
      Request_type
      self_pay
      donor_pay
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePatientRecord = /* GraphQL */ `
  mutation UpdatePatientRecord(
    $input: UpdatePatientRecordInput!
    $condition: ModelPatientRecordConditionInput
  ) {
    updatePatientRecord(input: $input, condition: $condition) {
      id
      fname
      lname
      Document_type
      Aadhar_no
      Contact
      OPD_no
      CDO_name
      Department
      Request_type
      self_pay
      donor_pay
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePatientRecord = /* GraphQL */ `
  mutation DeletePatientRecord(
    $input: DeletePatientRecordInput!
    $condition: ModelPatientRecordConditionInput
  ) {
    deletePatientRecord(input: $input, condition: $condition) {
      id
      fname
      lname
      Document_type
      Aadhar_no
      Contact
      OPD_no
      CDO_name
      Department
      Request_type
      self_pay
      donor_pay
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
