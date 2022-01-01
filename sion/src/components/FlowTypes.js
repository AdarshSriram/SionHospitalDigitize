
// @flow
export type Request = "CT" | "MRI"

// @flow
export type Document = "Aadhar" | "PAN" | "Passport" | "Ration"

// TODO: Manually input list of CDOs as type instead of string
// @flow
export type CDO = string

// @flow
export type PatientRecord = {
    id?: number,
    fname: string,
    lname: string,
    Document_type: string,
    Aadhar_no?: number, 
    Contact?: number,
    OPD_no: number,
    CDO_name: CDO,
    Department: string,
    Request_type: Request,
    donor_name: string,
    self_pay: number,
    donor_pay: number,
    cheque?: string
  }
// Record Schema:

// @flow
export type Query = {
  fname?: string,
  lname?: string,
  Document_type?: Document,
  Aadhar_no?: number,
  Contact?: number,
  OPD_no?: number,
  CDO_name?: CDO,
  Department?: string,
  Request_type?: Request,
  donor_name?: string,
  date?: Date,
  month?: number,
  cheque_no?: number
}

