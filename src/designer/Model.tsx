import React, {ReactElement} from 'react';
import Place from './Place';
import Arc from './Arc';
import Transition from './Transition';
import {MetaModel} from "../pflow";
import * as mm from "@pflow-dev/metamodel";

interface ModelProps {
    metaModel: MetaModel;
    schema?: string;
}

export default function Model(props: ModelProps) {


    const {metaModel} = props;
    const {places, transitions} = metaModel.m.def;
    const place_index: string[] = [];

    places.forEach((pl: mm.Place, label: string) => {
        place_index[pl.offset] = label;
    })

    const placeElements = Array.from(places.keys()).map((label) =>
        <Place key={label} id={label} metaModel={metaModel}/>,
    );

    const transitionElements = Array.from(transitions.keys()).map((label) =>
        <Transition key={label} id={label} metaModel={props.metaModel}/>,
    );

    const arcs: ReactElement[] = [];

    transitions.forEach((txn) => {
        txn.guards.forEach((g) => {
            const label = txn.label + '-i' + g.label;
            arcs.push(
                <Arc key={label} id={label}
                     metaModel={metaModel}
                     sourceId={g.label}
                     targetId={txn.label}
                     inhibitor={true}></Arc>
            );
        });
    });

    transitions.forEach((txn) => {
        for (const i in txn.delta) {
            const v = txn.delta[i];
            if (v > 0) {
                const id = txn.label + '++' + place_index[i];
                arcs.push(
                    <Arc key={id} id={id}
                         metaModel={metaModel}
                         sourceId={txn.label}
                         targetId={place_index[i]}
                    ></Arc>
                );
            } else if (v < 0) {
                const id = place_index[i] + '--' + txn.label;
                arcs.push(
                    <Arc key={id} id={id}
                         metaModel={metaModel}
                         sourceId={place_index[i]}
                         targetId={txn.label}
                    ></Arc>
                );
            }
        }
    });

    return (
        <g id={props.schema} key={props.schema}>
            {arcs}
            {placeElements}
            {transitionElements}
        </g>
    );
}