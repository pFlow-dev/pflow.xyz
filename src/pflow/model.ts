// convert x, y to pixel coordinates in SVG
import * as mm from "@pflow-dev/metamodel/index";

export function pos(x: number, y: number): { x: number, y: number } {
    return {x: x * 80, y: y * 80}
}

function defaultDeclaration(fn: mm.Fn, cell: mm.Cell, role: mm.Role): void {
    const defaultRole = role('default');
    const foo = cell('foo2', 1, 0, pos(6, 2));
    const bar = fn('bar', defaultRole, pos(5, 4));
    const baz = fn('baz', defaultRole, pos(7, 4));
    foo.guard(1, baz);
    foo.tx(1, bar);
}

export class Model {
    m: mm.Model;
    state: mm.Vector;

    constructor(m?: mm.Model) {
        if (m) {
            this.m = m;
        } else {
            this.m = mm.newModel({
                schema: 'myModel',
                declaration: defaultDeclaration,
                type: mm.ModelType.petriNet
            });
        }
        this.state = this.m.initialVector();
    }

}
