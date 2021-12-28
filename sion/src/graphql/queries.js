/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPatientRecord = /* GraphQL */ `
  query GetPatientRecord($id: ID!) {
    getPatientRecord(id: $id) {
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
export const listPatientRecords = /* GraphQL */ `
  query ListPatientRecords(
    $filter: ModelPatientRecordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatientRecords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncPatientRecords = /* GraphQL */ `
  query SyncPatientRecords(
    $filter: ModelPatientRecordFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPatientRecords(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
