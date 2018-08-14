import { FabricRenderer } from "psdetch-render-fabric";
import { IProject, IPage, BasicEvents } from "psdetch-core/build";
import { HandTool } from "psdetch-tool-hand";

export interface SessionProps{
  curPage?:IPage;
  curProject?:IProject;
  renderer?:FabricRenderer;
  handtool?:HandTool;
  curTool?:ITool;
}
export interface ITool{
  activate(): void;
  deactivate(): void;
  once(evt:string,handler:any):void;
  activated: boolean;
  name: string;
  slug: string;
}
const props:SessionProps={};
export class Session extends BasicEvents<keyof SessionProps, SessionProps[keyof SessionProps], (v?: SessionProps[keyof SessionProps]) => void>{

  get<T extends keyof SessionProps>(key: T):SessionProps[T] {
    return props[key];
  }
  set<T extends keyof SessionProps>(key: T, val?: SessionProps[T]){
    if (props[key] === val){
      return;
    }
    props[key]=val;
    this.emit(key,val);
  }
  constructor(){
    super();
    this.once("renderer",(r)=>{
      const renderer=r as FabricRenderer;
      // once renderer exists, register all tools.
      this.set("handtool",new HandTool(renderer));
    })
  }
}

export const session = new Session();