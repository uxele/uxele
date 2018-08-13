import {h, Component} from "preact";
import "./ToolBar.scss";
import {HandTool} from "psdetch-tool-hand";
import { session } from "../model/Session";
import { FabricRenderer } from "psdetch-render-fabric";

interface ToolBarState{
  display:boolean
}
interface ITool{
  activate(): void;
  deactivate(): void;
  once(evt:string,handler:any):void;
  activated: boolean;
  name: string;
  slug: string;
}
const faMaper:any={
  "tool_hand":"fas fa-hand-paper"
}
export class ToolBar extends Component<{},ToolBarState>{
  private _toolButtons:ITool[]=[];
  private handTool?:HandTool;
  private curTool?:ITool;
  constructor(){
    super();
    session.once("onRenderer",(r)=>{
      const renderer=r as FabricRenderer;
      this.setState({display:true});
      this.handTool=new HandTool(r as FabricRenderer)
      this.handTool.activate();
      this.setTool(this.handTool);

    })
    this.state={display:false};
  }
  render(){
    if (this.state.display){
      return (
        <div class="toolbar">
          {this.bindTool(this.handTool!)}
        </div>
      )
    }else{
      return null;
    }
    
  }
  private setTool(tool:ITool){
    if (this.curTool!==tool){
      if (this.curTool){
        this.curTool.deactivate();
      }
      tool.once("onActivated",()=>{
        this.forceUpdate();
      })
      tool.activate();
      this.curTool=tool;

    }else{
      this.render();
    }
  }
  private bindTool(tool: ITool){
    return (
      <div onClick={()=>this.setTool(tool)} class={`toolBtn ${tool.activated?'has-background-black-ter':''}`}>
        <i class={faMaper[tool.slug]}></i>
      </div>
    )
  }
}
