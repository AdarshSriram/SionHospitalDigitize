// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientRecordHelpAssignment, Donation } = initSchema(schema);

export {
  PatientRecordHelpAssignment,
  Donation
};