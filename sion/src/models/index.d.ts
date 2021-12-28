import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PatientRecordMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PatientRecord {
  readonly id: string;
  readonly fname: string;
  readonly lname: string;
  readonly Document_type: string;
  readonly Aadhar_no?: number;
  readonly Contact?: number;
  readonly OPD_no: number;
  readonly CDO_name: string;
  readonly Department: string;
  readonly Request_type: string;
  readonly self_pay: number;
  readonly donor_pay: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<PatientRecord, PatientRecordMetaData>);
  static copyOf(source: PatientRecord, mutator: (draft: MutableModel<PatientRecord, PatientRecordMetaData>) => MutableModel<PatientRecord, PatientRecordMetaData> | void): PatientRecord;
}