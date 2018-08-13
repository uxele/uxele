import { FabricRenderer } from "psdetch-render-fabric";
import { IProject, IPage, BasicEvents } from "psdetch-core/build";

export type SessioEvents="onRenderer" | "onProject" | "onPage";
export type SessionEventArg=FabricRenderer | IProject | IPage;
export class Session extends BasicEvents<SessioEvents,SessionEventArg,(v?:SessionEventArg)=>void>{
  private _renderer?:FabricRenderer;
  private _project?:IProject;
  private _curPage?:IPage;
  get renderer():FabricRenderer | undefined{
    return this._renderer;
  }
  set renderer(v:FabricRenderer | undefined){
    if (this._renderer===v){
      return;
    }
    this._renderer=v;
    this.emit("onRenderer",this._renderer);
  }
  get project():IProject | undefined{
    return this._project;
  }
  set project(v:IProject | undefined){
    if (this._project===v){
      return;
    }
    this._project=v;
    this.emit("onProject",this._project);
  }
  get curPage():IPage | undefined{
    return this._curPage;
  }
  set curPage(v:IPage | undefined){
    if (this._curPage===v){
      return;
    }
    this._curPage=v;
    this.emit("onPage",this._curPage);
  }
}

export const session=new Session();