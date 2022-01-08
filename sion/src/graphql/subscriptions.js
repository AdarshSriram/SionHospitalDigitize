/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePatientRecord = /* GraphQL */ `
  subscription OnCreatePatientRecord {
    onCreatePatientRecord {
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
      help_requests {
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
      }
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdatePatientRecord = /* GraphQL */ `
  subscription OnUpdatePatientRecord {
    onUpdatePatientRecord {
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
      help_requests {
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
      }
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeletePatientRecord = /* GraphQL */ `
  subscription OnDeletePatientRecord {
    onDeletePatientRecord {
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
      help_requests {
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
      }
      additional_comments
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateTrust = /* GraphQL */ `
  subscription OnCreateTrust {
    onCreateTrust {
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
export const onUpdateTrust = /* GraphQL */ `
  subscription OnUpdateTrust {
    onUpdateTrust {
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
export const onDeleteTrust = /* GraphQL */ `
  subscription OnDeleteTrust {
    onDeleteTrust {
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
