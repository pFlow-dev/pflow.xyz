import React from 'react';
import Place from './Place';
import Arc from './Arc';
import {Box} from '@mui/material';
import Transition from "./Transition";
import SourceView from "./SourceView";
import {MetaModel} from "../pflow";

interface EditorProps {
    metaModel: MetaModel;
}

export default function Editor(props: EditorProps): React.ReactElement {
    const selectedObj = props.metaModel.getCurrentObj();
    const marginTop = '1em';
    const marginLeft = '1em';

    if (!selectedObj) {
        return <React.Fragment>
            <Box sx={{m: 2}}>
                <SourceView metaModel={props.metaModel}/>
            </Box>
        </React.Fragment>;
    }

    switch (selectedObj.metaType) {
        case 'place': { // FIXME: update selected object system
            return <React.Fragment>
                <Box sx={{marginTop, marginLeft}}>
                    <Place selectedObj={{target: 'FIXME'}} metaModel={props.metaModel}/>
                </Box>
            </React.Fragment>;
        }
        case 'transition': {
            return <React.Fragment>
                <Box sx={{marginTop, marginLeft}}>
                    <Transition selectedObj={selectedObj} metaModel={props.metaModel}/>
                </Box>
            </React.Fragment>;
        }
        case 'arc': {
            // FIXME: selectedObj has diverged from the metamodel type
            return <React.Fragment>
                <Box sx={{marginTop, marginLeft}}>
                    <Arc selectedObj={{source: '', target: ''}} metaModel={props.metaModel}/>
                </Box>
            </React.Fragment>;
        }
        // case 'history': {
        //     return <React.Fragment>
        //         <Box sx={{marginTop, marginLeft}}>
        //             <History metaModel={props.metaModel}/>
        //         </Box>
        //     </React.Fragment>;
        // }
        default: {
            return <React.Fragment>
                <Box sx={{m: 2}}>
                    <SourceView metaModel={props.metaModel}/>
                </Box>
            </React.Fragment>;
        }
    }
}
