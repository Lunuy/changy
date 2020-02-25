import Array from "../Array";
import Primitive from "../../Primitive/Primitive";
import Function from "../../Function/Function";
import Boolean from "../../Boolean/Boolean";
import { O, C, S } from "../../../Changeable";
import OriginalFunction from "../../Function/OriginalFunction";


/*
Array.every give target array and index to the callback.
So, if array is changed, "Array.every(...)" result can change.

If you want check only value of array, use everyElement.
*/

type Callback<T> = (element : T, index : number, array : T[]) => boolean;

export default function every<T>(
    this : Array<T>,
    callback : Function<Callback<T>>,
    thisArg : Primitive<any> = new Primitive(undefined)
) {
    const result = new Boolean(this[O].every(<any>callback[O].value, thisArg[O].value));

    const listener = (start : number, deleted : T[], inserted : T[]) => {
        result.set(this[O].every(callback[O].value, thisArg[O].value));
    };
    const callbackListener = (f : Callback<T>) => {
        result.set(this[O].every(f, thisArg[O].value));
    };
    const thisArgListener = (thisArg : any) => {
        result.set(this[O].every(callback[O].value, thisArg));
    };

    this[C].on("insert", listener);
    callback[C].on("set", callbackListener);
    thisArg[C].on("set", thisArgListener);

    result[S] = () => {
        this[C].off("insert", listener);
        callback[C].off("set", callbackListener);
        thisArg[C].on("set", thisArgListener);
    };

    return result;
}