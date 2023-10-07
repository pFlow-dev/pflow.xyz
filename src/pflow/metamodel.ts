import React from "react";
import * as mm from "@pflow-dev/metamodel";
import {Model} from "./model";
import {Action} from "./types";

// useState callback to trigger updates to react app
type UpdateHook = (m: MetaModel) => void;

interface Event {
    schema: string;
    action: string;
    multiple: number;
}

function newStream(m: mm.Model): mm.Stream<Event> {
    return new mm.Stream<Event>({models: [m]});
}

export function getModel(): MetaModel {
    return new MetaModel();
}

export class MetaModel extends Model {
    selectedObject: mm.MetaObject | null = null;
    mode: Action = 'select'
    stream: mm.Stream<Event>;
    protected updateHook: UpdateHook;
    protected running: boolean = false;

    constructor(m?: mm.Model) {
        super(m);
        this.updateHook = (metaModel: MetaModel) => {
            this.stream = newStream(metaModel.m);
        };
        this.stream = newStream(this.m);
        this.unsetCurrentObj = this.unsetCurrentObj.bind(this);
        this.getObj = this.getObj.bind(this);
        this.update = this.update.bind(this);
        this.menuAction = this.menuAction.bind(this);
        this.unsetCurrentObj = this.unsetCurrentObj.bind(this);
    }

    onUpdate(callback: () => void): void {
        this.updateHook = (metaModel: MetaModel) => {
            this.stream = newStream(metaModel.m);
            callback()
        }
    }

    update(): void {
        this.updateHook(this);
    }


    editorClick(evt: React.MouseEvent): void {
        console.log({evt});
    }

    menuAction(action: string): void {
        console.log({action, mode: this.mode}, "menuAction");
    }

    unsetCurrentObj(): void {
        console.log('unsetCurrentObj');
        this.selectedObject = null;
    }

    getState(): mm.Vector {
        return this.state;
    }

    getTokenCount(id: string): number {
        return 0;
    }

    isSelected(id: string): boolean {
        return false;
    }

    getObj(id: string): mm.MetaObject {
        console.log({getObject: id})
        let obj: mm.MetaObject | undefined = this.m.def.transitions.get(id);
        if (obj) {
            return obj
        }
        obj = this.m.def.places.get(id);
        if (obj) {
            return obj
        }
        // TODO lookup arcs?
        throw new Error('undefined object id: ' + id)
    }

    getNode(id: string): mm.Place | mm.Transition {
        const obj = this.getObj(id)
        if (!obj || obj.metaType === 'arc') {
            throw new Error('Failed to select node' + id);
        }
        return obj;
    }

    placeClick(id: string): void {
        this.selectedObject = this.getObj(id);
        this.update();
    }

    placeAltClick(id: string): void {
        this.selectedObject = this.getObj(id);
        this.update();
    }

    getPlace(id: string): mm.Place {
        const obj = this.getObj(id);
        if (obj.metaType === 'place') {
            return obj;
        }
        throw new Error('not a place: ' + id)
    }

    isRunning(): boolean {
        return this.running;
    }

    canFire(id: string): boolean {
        return false;
    }

    transitionFails(id: string): boolean {
        return false;
    }

    transitionClick(id: string): void {

    }

    getTransition(id: string): mm.Transition {
        const obj = this.getObj(id);
        if (obj.metaType === 'transition') {
            return obj;
        }
        throw new Error('not a transition: ' + id)
    }

    getCurrentObj(): mm.MetaObject | null {
        return this.selectedObject;
    }

    toggleInhibitor(id: string): boolean {
        const obj = this.getObj(id);
        if (obj.metaType === 'arc') {
            const arc = obj as mm.Arc;
            arc.inhibit = !arc.inhibit;
            return true;
        }
        return false;
    }

    arcClick(arc: mm.Arc): void {
        console.log({arc}, 'arcClick')
    }

    arcAltClick(arc: mm.Arc): void {
        console.log({arc}, 'arcClick')
    }

}

