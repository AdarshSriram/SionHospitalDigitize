import {InputFieldsRaw, FilterFieldsRaw, RequiredFieldsRaw} from './type_utils_denorm'
import {PrettyColumnMap} from './type_utils'
import {Form, Col, Row} from 'react-bootstrap'


function makeFieldInputSimple(box_id, errs){
    const tag = PrettyColumnMap[box_id]
    return (
        <>
        <Form.Group className="mb-3" controlId={box_id}>
            <Form.Label>{(errs[box_id] !== undefined) ? tag + " (" + errs[box_id] + ")": tag}</Form.Label>
            <Form.Control placeholder={tag} />
            <h5>{errs.box_id}</h5>
        </Form.Group>
        </>
    )
}

export function newRecordFields(errs={}){
    var res = {}
    var patientfields = []
    var helpfields = []
    for (const field of InputFieldsRaw.patient){
        patientfields.push(makeFieldInputSimple(field, errs))
    }
    for (const helpField of InputFieldsRaw.help){
        helpfields.push(makeFieldInputSimple(helpField, errs))
    }
    res["patient"] = patientfields
    res["help"] = helpfields
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