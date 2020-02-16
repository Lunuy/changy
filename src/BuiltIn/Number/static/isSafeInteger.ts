import Number from "../Number";
import Boolean from "../../Boolean/Boolean";
import { O, C, S } from "../../../Changeable";
import OriginalNumber from "../OriginalNumber";

export default function isSafeInteger(value : Number) {
    const result = new Boolean(OriginalNumber.isSafeInteger(value[O].value));

    const listener = (value : number) => {
        result.set(OriginalNumber.isSafeInteger(value));
    };

    value[C].on("set", listener);

    result[S] = () => {
        value[C].off("set", listener);
    };

    return result;
}