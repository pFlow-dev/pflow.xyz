import React from 'react';
import {MenuItem, Select, TextField} from '@mui/material';
import {MetaModel} from "../pflow";

// TODO: selectedObj has diverged from the metamodel type
export default function Arc(props: { metaModel: MetaModel, selectedObj: { source: string, target: string } }) {

    const target = props.metaModel.getObj(props.selectedObj.target);
    const source = props.metaModel.getObj(props.selectedObj.source);
    let weight;
    let subtype = 'Arc';
    if (target.metaType === 'transition' && source.metaType === 'place') {
        weight = 0 - target.delta[source.offset];
    }
    if (source.metaType === 'transition' && target.metaType === 'place') {
        weight = source.delta[target.offset];
    }
    if (weight === 0) {
        subtype = 'Inhibitor';
        if (target.metaType === 'transition' && source.metaType === 'place') {
            const g = target.guards.get(source.label);
            if (g) {
                weight = 0 - g.delta[source.offset];
            }
        }
    }

    function handleTypeChange() {
        const {update, toggleInhibitor} = props.metaModel;
        if (toggleInhibitor("FIXME")) {
            update();
        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
        const v = parseInt(evt.target.value);
        if (v <= 0) {
            evt.stopPropagation();
            return;
        }
        if (target.metaType === 'transition' && source.metaType === 'place' && subtype === 'Inhibitor') {
            const g = target.guards.get(source.label);
            if (g) {
                g.delta[source.offset] = 0 - v;
            }
        } else if (target.metaType === 'transition' && source.metaType === 'place') {
            target.delta[source.offset] = 0 - v;
        } else if (target.metaType === 'place' && source.metaType === 'transition') {
            source.delta[target.offset] = v;
        }
        props.metaModel.update();
        evt.stopPropagation();
    }

    const marginTop = "5px";
    const width = "19em";

    const SelectType = () => {
        if (target.metaType === 'transition') {
            return <Select sx={{marginTop, width: "14em"}} label="Type" id="selected-arc" value={subtype}
                           onChange={handleTypeChange}>
                <MenuItem value="Arc" key="selected-Arc">Arc</MenuItem>,
                <MenuItem value="Inhibitor" key="selected-Inhibitor">Inhibitor</MenuItem>,
            </Select>;
        } else {
            return <TextField sx={{width: "14em", marginTop}} id="selected-arc-type" label="Type" variant="outlined"
                              aria-readonly={true} disabled={true} value={"Arc"}/>;
        }
    };

    return <React.Fragment>
        <form noValidate autoComplete="off">
            <TextField sx={{width: "5em", marginTop}} type="number" id="weight" label="Weight"
                       variant="outlined" onChange={handleChange} value={weight}/>
            <SelectType/>
            <br/>
            <TextField sx={{width, marginTop}} id="source" label="Source" variant="outlined" aria-readonly={true}
                       disabled={true} value={"source.label"}/>
            <TextField sx={{width, marginTop}} id="target" label="Target" variant="outlined" aria-readonly={true}
                       disabled={true} value={"target.label"}/>
        </form>
    </React.Fragment>;
}