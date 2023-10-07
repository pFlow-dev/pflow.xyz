import React from 'react';
import {MetaModel} from "../pflow";

interface ArcProps {
    id: string;
    metaModel: MetaModel;
    sourceId: string;
    targetId: string;
    inhibitor?: boolean;
}

/**
 * Arcs connect places and transition
 * providing either a conduit to transfer tokens
 * Or act as an inhibitor to prevent actions if a token threshold is breached
 */
export default function Arc(props: ArcProps) {

    function positions() {
        const source = props.metaModel.getNode(props.sourceId);
        const target = props.metaModel.getNode(props.targetId);
        // TODO: make line shorter rather than using endpoint decorations to cover up

        const x1 = source.position.x;
        const y1 = source.position.y;
        const x2 = target.position.x;
        const y2 = target.position.y;

        const midX = (x2 + x1) / 2;
        const midY = (y2 + y1) / 2 - 8;
        let offsetX = 4;
        let offsetY = 4;

        if (Math.abs(x2 - midX) < 8) {
            offsetX = 8;
        }

        if (Math.abs(y2 - midY) < 8) {
            offsetY = 0;
        }

        return {
            x1, y1, x2, y2, midX, midY, offsetX, offsetY
        }
    }

    function weight(): number {
        const source = props.metaModel.getNode(props.sourceId);
        const target = props.metaModel.getNode(props.targetId);

        if (props.inhibitor) {
            if (source.metaType === 'transition' && target.metaType === 'place') {
                const g = source.guards.get(target.label);
                if (g) {
                    return g.delta[target.offset];
                }
            } else if (source.metaType === 'place' && target.metaType === 'transition') {
                const g = target.guards.get(source.label);
                if (g) {
                    return g.delta[source.offset];
                }
            }
            throw new Error('Arc.getWeight: invalid source/target');
        } else if (source.metaType === 'transition' && target.metaType === 'place') {
            return source['delta'][target.offset];
        } else if (source.metaType === 'place' && target.metaType === 'transition') {
            return target['delta'][source.offset];
        }
        throw new Error('Arc.getWeight: invalid source/target');
    }

    function onClick(evt: React.MouseEvent<SVGCircleElement, MouseEvent>) {
        evt.stopPropagation();
        // props.metaModel.arcClick(getArcDef());
    }

    function onContextMenu(evt: React.MouseEvent<SVGCircleElement, MouseEvent>) {
        evt.stopPropagation();
        evt.preventDefault();
        // props.metaModel.arcAltClick(getArcDef());
    }

    function getMarker() {
        if (props.inhibitor) {
            return 'url(#markerInhibit1)';
        } else {
            return 'url(#markerArrow1)';
        }
    }

    function stroke() {
        //const obj = {target: props.target, source: props.source};
        if (false) { //props.metaModel.isSelected(obj)) {
            return '#8140ff';
        } else {
            return '#000000';
        }
    }

    const {
        x1, y1, x2, y2, midX, midY, offsetX, offsetY
    } = positions();

    return (
        <g onContextMenu={onContextMenu}>
            <line
                stroke={stroke()}
                strokeWidth={1}
                markerEnd={getMarker()}
                id={props.id}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
            />
            <text id={props.id + '[label]'} x={midX - offsetX} y={midY + offsetY}
                  className="small">{Math.abs(weight())}</text>
            <circle id={props.id + '[handle]'}
                    r={13} cx={midX} cy={midY} fill="transparent" stroke="transparent"
                    onClick={onClick}
            />
        </g>
    );
};