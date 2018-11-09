import { h, Component } from "preact";
import { ILayer } from "psdetch-core/build";
import "./LayerBasic.scss";

interface LayerBasicViewProps {
  layer: ILayer
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
      <tr><td>Name</td><td>{layer.name}</td></tr>
      <tr><td>Type</td><td>{layer.layerType}</td></tr>
      <tr><td>Left</td><td>{layer.rect.left}</td></tr>
      <tr><td>Top</td><td>{layer.rect.top}</td></tr>
      <tr><td>Width</td><td>{layer.rect.width}</td></tr>
      <tr><td>Height</td><td>{layer.rect.height}</td></tr>
    </table>);
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