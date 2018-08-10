import {sprintf} from "sprintf-js";
import { ILang } from "./ILang";
import {en} from "./langs/en";
const langs: ILang[] = [en];
let curLang: ILang = en;
export function lang(key: keyof ILang["dict"], ...args: any[]): string {
  return sprintf(curLang.dict[key], ...args);
}
export function setCurLang(_lang: ILang) {
  curLang = _lang;
}

export function getLangs(): ILang[] {
  return langs;
}

export function getCurLang(): ILang {
  return curLang;
}

