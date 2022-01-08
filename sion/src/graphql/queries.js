/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatientRecordHelpAssignment = /* GraphQL */ `
  query GetPatientRecordHelpAssignment($id: ID!) {
    getPatientRecordHelpAssignment(id: $id) {
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
      nextToken
      startedAt
    }
  }
`;
export const getTrust = /* GraphQL */ `
  query GetTrust($id: ID!) {
    getTrust(id: $id) {
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
export const listTrusts = /* GraphQL */ `
  query ListTrusts(
    $filter: ModelTrustFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrusts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncTrusts = /* GraphQL */ `
  query SyncTrusts(
    $filter: ModelTrustFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTrusts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
