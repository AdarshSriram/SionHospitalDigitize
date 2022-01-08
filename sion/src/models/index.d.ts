import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class HelpRequests {
  readonly help_type: string;
  readonly help_remark?: string;
  readonly department: string;
  readonly diagnosis: string;
  readonly unit: string;
  readonly opd: string;
  readonly cdo_name: string;
  readonly trust_name: string;
  readonly patient_contribution: number;
  readonly pbcf: number;
  readonly cdo_or_trust: string;
  readonly donation_amount: number;
  readonly cheque_no?: string;
  readonly help_given: boolean;
  constructor(init: ModelInit<HelpRequests>);
}

type PatientRecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TrustMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PatientRecord {
  readonly id: string;
  readonly fname: string;
  readonly lname: string;
  readonly document_type: string;
  readonly de_by: string;
  readonly indoor_no: number;
  readonly rf_rs_name?: string;
  readonly card_no: number;
  readonly age: number;
  readonly address?: string;
  readonly contact?: number;
  readonly ward_no: string;
  readonly before_help_amt: number;
  readonly help_requests: HelpRequests[];
  readonly additional_comments?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PatientRecord, PatientRecordMetaData>);
  static copyOf(source: PatientRecord, mutator: (draft: MutableModel<PatientRecord, PatientRecordMetaData>) => MutableModel<PatientRecord, PatientRecordMetaData> | void): PatientRecord;
}

export declare class Trust {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: number;
  readonly contact_person?: string;
  readonly address?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Trust, TrustMetaData>);
  static copyOf(source: Trust, mutator: (draft: MutableModel<Trust, TrustMetaData>) => MutableModel<Trust, TrustMetaData> | void): Trust;
}