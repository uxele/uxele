import { h, Component } from "preact";
import "./LayerExport.scss";
import { ILayer } from "psdetch-core/build";
import { canExportText, canExportSvg, canExportImage, getExportType, IExportImageParams, exportImageUrl } from "psdetch-faced/build/faced";
type ExportType = "image" | "svg" | "text";
interface LayerExportViewProps {
  layer: ILayer;
}
interface LayerExportViewState {
  exportType: ExportType;
  previewUrl?: string;
  exportImgParams: IExportImageParams;
}
export class LayerExportView extends Component<LayerExportViewProps, LayerExportViewState>{
  constructor(props: LayerExportViewProps) {
    super(props);
    this.state={
      exportType:"image",
      exportImgParams:{
        trim:true,
        scale:1,
        format:"image/png",
        quality:1
      }
    }
    this.initLayer(props);
  }

  componentDidMount() {

  }
  async updatePreview() {
    if (this.state.exportType === "image") {
      const url = await exportImageUrl(this.props.layer, this.state.exportImgParams);
      this.setState({ previewUrl: url });
    }
  }
  initLayer(props:LayerExportViewProps){
    const layer = props.layer;
    const exportType=getExportType(layer);
    this.setState({
      exportType
    });
    setTimeout(()=>{
      this.updatePreview();
    })
    
  }
  componentWillReceiveProps(nextProps: LayerExportViewProps) {
    this.initLayer(nextProps);
    // this.state={exportType: canExportImage(layer) ? "image" : canExportSvg(layer) ? "svg" : "text"}
    // console.log(this.state);
    // this.setState
  }
  
  render() {
    return (
      <div class="card layerExportView">
        <div class="title has-background-grey-dark has-text-white-ter">EXPORT</div>
        <div class="cardBody">
          <div class="formats">
            {canExportImage(this.props.layer) ? <span onClick={() => this.setState({ exportType: "image" })} class={this.state.exportType === "image" ? "active" : ""} >Image</span> : null}
            {canExportSvg(this.props.layer) ? <span onClick={() => this.setState({ exportType: "svg" })} class={this.state.exportType === "svg" ? "active" : ""}>SVG</span> : null}
            {canExportText(this.props.layer) ? <span onClick={() => this.setState({ exportType: "text" })} class={this.state.exportType === "text" ? "active" : ""}>Text</span> : null}
          </div>
          {this.state.exportType === "image" ?
            <div class="imgParam">
              {this.state.previewUrl ? <div class="preview">
                <img src={this.state.previewUrl} />
              </div> : null}
            </div>
            : null}
        </div>

      </div>
    )
  }
}