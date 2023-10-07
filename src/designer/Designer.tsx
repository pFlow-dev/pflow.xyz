import React from 'react';
import Model from './Model';
import {MetaModel} from "../pflow";

interface DesignerProps {
    metaModel: MetaModel;
}

export default function Designer(props: DesignerProps): React.ReactElement {
    const onClick = (evt: React.MouseEvent) => {
        props.metaModel.editorClick(evt);
    };

    const [svgWidth, setSvgWidth] = React.useState(window.screen.width);

    window.addEventListener('orientationchange', () => {
        setSvgWidth(window.screen.width);
    });

    // REVIEW: why does adding a key like this break drag/drop?
    //   <svg id={props.metaModel.m.def.schema}
    //++     key={props.metaModel.m.def.schema+"_"+props.version}

    return <React.Fragment>
        <svg id={props.metaModel.m.def.schema}
             width={svgWidth}
             height={600}
             onContextMenu={(evt) => evt.preventDefault()}
             onClick={onClick}
        >
            <defs>
                <marker id="markerArrow1" markerWidth="23" markerHeight="13" refX="31" refY="6" orient="auto">
                    <rect className="arrowSpace1" width="28" height="3" fill="#ffffff" stroke="#ffffff" x="3" y="5"/>
                    <path d="M2,2 L2,11 L10,6 L2,2"/>
                </marker>
                <marker id="markerInhibit1" markerWidth="23" markerHeight="13" refX="31" refY="6" orient="auto">
                    <rect className="inhibitSpace1" width="28" height="3" fill="#ffffff" stroke="#ffffff" x="3" y="5"/>
                    <circle cx="5" cy="6.5" r={4}/>
                </marker>
            </defs>
            <Model metaModel={props.metaModel}/>
        </svg>
    </React.Fragment>;
}