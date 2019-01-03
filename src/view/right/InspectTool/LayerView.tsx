import { h, Component } from "preact";
import "./LayerView.scss";
import { facade,Core } from "uxele-facade";
import { LayerBasicView } from "./LayerBasic";
import { LayerExportView } from "./LayerExport";
import { bindStore } from "../../../lib/bindStore";
import { InspectTool } from "uxele-facade/build/tools";

interface LayerViewState {
  layer?: Core.ILayer
  display:boolean
}
export class LayerView extends Component<any, LayerViewState>{
  constructor(){
    super();
    bindStore(this,{
      layer:(state)=>state.choseLayer.layer,
      display:(state)=>state.choseTool.tool && state.choseTool.tool instanceof InspectTool
    })
  }
  render() {
    if (this.state.display && this.state.layer) {
      return (
        <div>
          <LayerBasicView layer={this.state.layer}/>
          <LayerExportView layer={this.state.layer}/>
        </div>
      )
    } else {
      return null;
    }
  }
}