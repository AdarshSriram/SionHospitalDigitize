// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientRecord } = initSchema(schema);

export {
  PatientRecord
};