import { h, Component } from "preact";
import { bindStore } from "../../../lib/bindStore";
import { util, facade } from "uxele-facade";
import { ColorTool } from "uxele-facade/build/tools";
import "./ColorPickedView.scss";
interface ColorPickedViewState {
  display: boolean;
  colors: string[];
  hoverColor?: string;
}
export class ColorPickedView extends Component<{}, ColorPickedViewState> {
  constructor() {
    super();
    bindStore(this, {
      display: (state) => !!state.choseTool.tool && state.choseTool.tool! instanceof ColorTool,
      colors: (state) => state.colorTool.pickedColors,
      hoverColor: (state) => state.colorTool.hoverColor
    })
  }
  copyColor(color: string) {
    facade.copyColor(color);
  }
  render() {
    if (this.state.display) {
      return (
        <div class="card colorPickedView">
          <div class="title">Colors</div>
          <div class="cardBody">
            <div class="hoverColor">
              <div class="preview" style={`background-color:${this.state.hoverColor}`} ></div>
              <div class="txt">
                <span class="hex">{util.color.rgbStrToHex(this.state.hoverColor).toUpperCase()}</span>
                <span>Click to Copy</span>
              </div>
            </div>
            <div class="pickedColors">
              {this.state.colors.map((color) =>
                <div onClick={() => this.copyColor(color)} class="pickedColor">
                  <div class="preview" style={`background-color:${color}`} >
                  </div>
                  <span>{util.color.rgbStrToHex(color).toUpperCase()}</span>
                </div>
              )}

            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}