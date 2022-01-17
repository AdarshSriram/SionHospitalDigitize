import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Donation {
  readonly id: string;
  readonly trust_name: string;
  readonly donation_amount: number;
  readonly donation_receipt_no?: number;
  constructor(init: ModelInit<Donation>);
}

type PatientRecordHelpAssignmentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PatientRecordHelpAssignment {
  readonly id: string;
  readonly name: string;
  readonly age: number;
  readonly address?: string;
  readonly contact?: number;
  readonly identity_proof: string;
  readonly card_no: number;
  readonly diagnosis: string;
  readonly referred_for: string;
  readonly total_cost?: number;
  readonly help_given: boolean;
  readonly de_by?: string;
  readonly indoor_no?: number;
  readonly ward_no?: string;
  readonly help_remark?: string;
  readonly department?: string;
  readonly unit?: string;
  readonly opd?: number;
  readonly cdo_name?: string;
  readonly additional_comments?: string;
  readonly donations?: (Donation | null)[];
  readonly patient_contribution?: number;
  readonly patient_receipt_no?: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PatientRecordHelpAssignment, PatientRecordHelpAssignmentMetaData>);
  static copyOf(source: PatientRecordHelpAssignment, mutator: (draft: MutableModel<PatientRecordHelpAssignment, PatientRecordHelpAssignmentMetaData>) => MutableModel<PatientRecordHelpAssignment, PatientRecordHelpAssignmentMetaData> | void): PatientRecordHelpAssignment;
}