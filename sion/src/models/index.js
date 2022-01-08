// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientRecordHelpAssignment, Trust } = initSchema(schema);

export {
  PatientRecordHelpAssignment,
  Trust
};