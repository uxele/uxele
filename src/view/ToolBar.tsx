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
  activated: boolean;
  name: string;
  slug: string;
}
const faMaper:any={
  "tool_hand":"fas fa-hand-paper"
}
export class ToolBar extends Component<{},ToolBarState>{
  private _toolButtons:JSX.Element[]=[];
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
      this._toolButtons=[
        this.bindButton(this.handTool)
      ]
    })
    this.state={display:false};
  }
  render(){
    if (this.state.display){
      return (
        <div class="toolbar">
          {this._toolButtons}
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
      
      tool.activate();
      this.curTool=tool;

    }
  }
  private bindButton(tool: ITool){
    return (
      <div onClick={()=>this.setTool(tool)} class={`toolBtn ${tool.activated?'has-background-grey-light':''}`}>
        <i class={faMaper[tool.slug]}></i>
      </div>
    )
  }
}
