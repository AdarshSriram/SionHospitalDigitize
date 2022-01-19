import {InputFieldsRaw, FilterFieldsRaw, RequiredFieldsRaw} from './type_utils_denorm'
import {PrettyColumnMap} from './type_utils'
import {Form, Col, Row} from 'react-bootstrap'


function makeFieldInputSimple(box_id, errs, value){
    const tag = PrettyColumnMap[box_id]
    const reqTag = RequiredFieldsRaw.patient.includes(box_id) ||
                        RequiredFieldsRaw.donations.includes(box_id) ||
                        RequiredFieldsRaw.help.includes(box_id) ? "*" : ""
    return (
        <>
        <Form.Group className="mb-3" controlId={box_id}>
            <Form.Label>{(errs[box_id] !== undefined) ? tag + " (" + errs[box_id] + ")": tag + reqTag}</Form.Label>
            <Form.Control placeholder={tag} defaultValue={value}/>
            <h5>{errs.box_id}</h5>
        </Form.Group>
        </>
    )
}

export function initDonations(initValues){
    var donationfields = []
    for (const donField of InputFieldsRaw.donations){
        donationfields.push(makeFieldInputSimple(donField, {}, initValues[donField]))
    }
    return donationfields
}

export function newRecordFields(errs={}, initValues={}){
    var res = {}
    var patientfields = []
    var helpfields = []
    var donationfields = []
    var value;
    for (const field of InputFieldsRaw.patient){
        if (initValues[field] !== null || initValues[field]!==undefined){
            value = initValues[field]
        }
        patientfields.push(makeFieldInputSimple(field, errs, value))
        value = null
    }
    for (const helpField of InputFieldsRaw.help){
        if (initValues[helpField] !== null || initValues[helpField]!==undefined){
            value = initValues[helpField]
        }
        helpfields.push(makeFieldInputSimple(helpField, errs, value))
        value = null
    }
    for (const donField of InputFieldsRaw.donations){
        if (initValues[donField] !== null || initValues[donField]!==undefined){
            value = initValues[donField]
        }
        donationfields.push(makeFieldInputSimple(donField, errs, value))
        value = null
    }
    res["patient"] = patientfields
    res["help"] = helpfields
    res["donation"] = donationfields
    return res
}

export const RecordFields = newRecordFields()

function FilterCheckBoxes(){
    var res = [[],[]]
    for (var i=0;i<2;i++){
            res[i] = FilterFieldsRaw[i].map( (field) =>
            <div class="bgn-light border">
                    <Row>
                        <Col>
                        <Form.Group className="mb-3" controlId={field}>
                        <Form.Check type="checkbox" label={PrettyColumnMap[field]} />
                    </Form.Group>
                    </Col>
                    
                    <Col>
                    <Form.Group className="mb-3" controlId={field+"_input"}>
                            <Form.Control placeholder={PrettyColumnMap[field]} />
                        </Form.Group>
                    </Col>
                    </Row>
            </div>
            )
    }
    return res
}

export function CheckBoxInit(){
    const boxes = FilterCheckBoxes()
    return {
        col1: boxes[0],
        col3: boxes[1]
    }
} 