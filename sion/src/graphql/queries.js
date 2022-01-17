/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatientRecordHelpAssignment = /* GraphQL */ `
  query GetPatientRecordHelpAssignment($id: ID!) {
    getPatientRecordHelpAssignment(id: $id) {
      id
      name
      age
      address
      contact
      identity_proof
      card_no
      diagnosis
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
        id
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
export const listPatientRecordHelpAssignments = /* GraphQL */ `
  query ListPatientRecordHelpAssignments(
    $filter: ModelPatientRecordHelpAssignmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientRecordHelpAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        age
        address
        contact
        identity_proof
        card_no
        diagnosis
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
          id
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
      nextToken
      startedAt
    }
  }
`;
export const syncPatientRecordHelpAssignments = /* GraphQL */ `
  query SyncPatientRecordHelpAssignments(
    $filter: ModelPatientRecordHelpAssignmentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPatientRecordHelpAssignments(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        age
        address
        contact
        identity_proof
        card_no
        diagnosis
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
          id
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
      nextToken
      startedAt
    }
  }
`;
