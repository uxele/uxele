import { h, Component } from "preact";
import { Core,util} from "uxele-facade";
import "./LayerBasic.scss";
import { ClickCopyDiv } from "../ClickCopyDiv";

interface LayerBasicViewProps {
  layer: Core.ILayer
}
interface LayerBasicViewState {
  showCss: boolean
}
export class LayerBasicView extends Component<LayerBasicViewProps, LayerBasicViewState>{
  constructor() {
    super();
    this.state = {
      showCss: false
    }
  }
  renderTable(){
    const layer = this.props.layer;
    return (<table>
      <tr><td>Name</td><td><ClickCopyDiv value={layer.name}></ClickCopyDiv></td></tr>
      <tr><td>Type</td><td><ClickCopyDiv value={layer.layerType}></ClickCopyDiv></td></tr>
      <tr><td>Left</td><td><ClickCopyDiv value={layer.rect.left.toString()}></ClickCopyDiv></td></tr>
      <tr><td>Top</td><td><ClickCopyDiv value={layer.rect.top.toString()}></ClickCopyDiv></td></tr>
      <tr><td>Width</td><td><ClickCopyDiv value={layer.rect.width.toString()}></ClickCopyDiv></td></tr>
      <tr><td>Height</td><td><ClickCopyDiv value={layer.rect.height.toString()}></ClickCopyDiv></td></tr>
      {this.renderTextProps()}
    </table>);
  } 
  renderTextProps(){
    const layer = this.props.layer;
    if (util.layer.isTextLayer(layer)){
      return (
        <tr><td>Text</td><td><ClickCopyDiv value={layer.getText()}></ClickCopyDiv></td></tr>
      )
    }
    return null;
  }
  renderCss(){
    const layer = this.props.layer;
    const css=`left: ${layer.rect.left}px;
top: ${layer.rect.top}px;
width: ${layer.rect.width}px;
height: ${layer.rect.height}px;`
    return (
      <pre>{css}</pre>
    )
  }
  render() {
    return (
      <div class="card layerBasicView">
        <div class="title has-background-grey-dark has-text-white-ter">LAYER INFO 
        <span class="flex1"></span> 
        <span onClick={()=>{this.setState({showCss:!this.state.showCss})}} class={`showCss ${this.state.showCss ? "has-text-info" : ""}`}>CSS</span> </div>
        <div class="cardBody">
          {this.state.showCss?
          this.renderCss():
         this.renderTable()
          }
        </div>

      </div>
    );
  }
}