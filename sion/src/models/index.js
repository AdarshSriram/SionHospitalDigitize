// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientRecord, Trust, HelpRequests } = initSchema(schema);

export {
  PatientRecord,
  Trust,
  HelpRequests
};