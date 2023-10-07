import React from 'react';
import {TextField} from '@mui/material';
import {MetaModel} from "../pflow";

function valToInt(value: string): number {
    const val = parseInt(value);
    if (!!val && val >= 0) {
        return val;
    }
    return 0;
}

interface TransitionProps {
    selectedObj: any;
    metaModel: MetaModel;
}

export default function Transition(props: TransitionProps) {

    const transition = props.metaModel.getTransition(props.selectedObj.target);

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {

        // construct a new label and avoid collision with existing objects
        function newLabel(): string {
            if (!props.metaModel.getObj(evt.target.value)) {
                return evt.target.value;
            }
            return '';
        }

        switch (evt.target.id) {
            case ('role'): {
                transition.role = {label: evt.target.value};
                break;
            }
            case ('label'): {
                let newIndex: string = newLabel();
                const t = props.metaModel.getTransition(transition.label);
                if (newIndex && t) { // REVIEW: this keeps app from crashing but is inelegant
                    t.label = newIndex;
                    // props.metaModel.currentSelection.target = newIndex; // FIXME
                    props.metaModel.m.def.transitions.set(newIndex, t);
                    props.metaModel.m.def.transitions.delete(transition.label);
                } else {
                    console.warn(`name collision: ${evt.target.value}`);
                }
                break;
            }
            case ('x'): {
                props.metaModel.getTransition(transition.label).position.x = valToInt(evt.target.value);
                break;
            }
            case ('y'): {
                props.metaModel.getTransition(transition.label).position.y = valToInt(evt.target.value);
                break;
            }
            default: {

            }
        }
        props.metaModel.update();
        return true;
    }

    const marginTop = "5px";
    const width = "5em";

    return <React.Fragment>
        <form noValidate autoComplete="off">
            <TextField sx={{marginTop, width: "19em"}} id="label" label="Label" variant="outlined"
                       onChange={handleChange} value={transition.label}/>
            <br/>
            <TextField sx={{marginTop, width: "19em"}} id="role" label="Role" variant="outlined" onChange={handleChange}
                       value={transition.role.label}/>
            <TextField sx={{marginTop, width: "9em"}} id="type" variant="outlined" disabled={true}
                       onChange={handleChange} value="Transition"/>
            <TextField sx={{marginTop, width}} type="number" id="x" label="x" variant="outlined" onChange={handleChange}
                       value={transition.position.x}/>
            <TextField sx={{marginTop, width}} type="number" id="y" label="y" variant="outlined" onChange={handleChange}
                       value={transition.position.y}/>
        </form>
    </React.Fragment>;
}
