import {h, Component} from "preact";
import "./ToolBar.scss";
import {HandTool} from "psdetch-tool-hand";
import { session, ITool } from "../model/Session";
import { FabricRenderer } from "psdetch-render-fabric";

interface ToolBarState{
  display:boolean
}

const faMaper:any={
  "tool_hand":"fas fa-hand-paper"
}
export class ToolBar extends Component<{},ToolBarState>{
  private handTool?:HandTool;
  get curTool(){
    return session.get("curTool");
  }
  set curTool(v:ITool | undefined){
    session.set("curTool",v);
  }
  constructor(){
    super();
    session.once("renderer",(r)=>{
      this.setState({display:true});
      this.setExclusiveTool(session.get('handtool'));

    })
    this.state={display:false};
  }
  render(){
    if (this.state.display){
      return (
        <div class="toolbar">
          {this.bindExclusiveTool(session.get('handtool'))}
        </div>
      )
    }else{
      return null;
    }
    
  }
  private setExclusiveTool(tool?:ITool){
    if (tool && this.curTool!==tool){
      if (this.curTool){
        this.curTool.deactivate();
      }
      tool.once("onActivated",()=>{
        this.forceUpdate();
      })
      tool.activate();
      this.curTool=tool;

    }
  }
  private bindExclusiveTool(tool?: ITool){
    if (tool){
      return (
        <div onClick={()=>this.setExclusiveTool(tool)} class={`toolBtn ${tool.activated?'has-background-black-ter has-text-primary':''}`}>
          <i class={faMaper[tool.slug]}></i>
        </div>
      )
    }else{
      return null;
    }
    
  }
}
