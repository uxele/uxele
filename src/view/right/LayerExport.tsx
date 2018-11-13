import { h, Component } from "preact";
import "./LayerExport.scss";
import { facade,Core } from "uxele-facade";
import { SquareButton } from "./SquareButton";
type ExportType = "image" | "svg" | "text";
interface LayerExportViewProps {
  layer: Core.ILayer;
}
interface LayerExportViewState {
  exportType: ExportType;
  exportImgParams:facade.IExportImageParams;
}
export class LayerExportView extends Component<LayerExportViewProps, LayerExportViewState>{
  previewUrl: string = "";
  constructor(props: LayerExportViewProps) {
    super(props);
    this.state = {
      exportType: facade.getExportType(props.layer),
      exportImgParams: {
        trim: true,
        scale: 1,
        format: "image/png",
        quality: 1
      }
    }

  }
  get imgParamsFormat() {
    return this.state.exportImgParams.format.replace("image/", "").toUpperCase();
  }
  componentDidMount() {
    this.updatePreview();
  }
  async updatePreview() {
    if (this.state.exportType === "image") {
      const url = await facade.exportImageUrl(this.props.layer, this.state.exportImgParams);
      if (url !== this.previewUrl) {
        this.previewUrl = url;
        this.forceUpdate();
      }
    }
  }
  initLayer(props: LayerExportViewProps, cb?: Function) {
    const layer = props.layer;
    const exportType = facade.getExportType(layer);
    this.setState({ exportType: exportType }, ()=>{
      if (cb) cb();
    });

  }
  // componentWillUpdate(nextProps: LayerExportViewProps, nextState: LayerExportViewState) {
  //   if (this.state.exportImgParams !== nextState.exportImgParams || this.props.layer !== nextProps.layer) {
  //     this.initLayer(nextProps);
  //   }
  // }
  componentDidUpdate(prevProps: LayerExportViewProps, prevState: LayerExportViewState) {
    if (this.state.exportImgParams !== prevState.exportImgParams || this.props.layer !== prevProps.layer) {
      this.updatePreview();
    }
  }
  componentWillReceiveProps(nextProps: LayerExportViewProps) {
    if (this.props.layer !== nextProps.layer) {
      this.initLayer(nextProps);
    }
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
            {facade.canExportImage(this.props.layer) ? <span onClick={() => this.setState({ exportType: "image" })} class={this.state.exportType === "image" ? "active" : ""} >Image</span> : null}
            {facade.canExportSvg(this.props.layer) ? <span onClick={() => this.setState({ exportType: "svg" })} class={this.state.exportType === "svg" ? "active" : ""}>SVG</span> : null}
            {facade.canExportText(this.props.layer) ? <span onClick={() => this.setState({ exportType: "text" })} class={this.state.exportType === "text" ? "active" : ""}>Text</span> : null}
          </div>
          {this.state.exportType === "image" ?
            this.renderImageParam()
            : null}
        </div>

      </div>
    )
  }
  toogleTrim() {
    this.setState({
      exportImgParams: {
        ...this.state.exportImgParams,
        trim: !this.state.exportImgParams.trim
      }
    })
  }
  setImgScale(scale: number) {
    if (scale !== this.state.exportImgParams.scale) {
      this.setState({
        exportImgParams: {
          ...this.state.exportImgParams,
          scale
        }
      })
    }
  }
  renderImageParam() {
    return (
      <div class="imgParam">
        <div class="preview">
          {this.previewUrl ? <img src={this.previewUrl} /> : null}
        </div>
        <div class="options">
          <SquareButton onClick={() => { this.toogleTrim() }} head="Trim" value={this.state.exportImgParams.trim ? "ON" : "OFF"} active={this.state.exportImgParams.trim} ></SquareButton>
          <div class="dropdown is-hoverable">
            <SquareButton head="Scale" value={`${this.state.exportImgParams.scale}X`} ></SquareButton>
            <div class="dropdown-menu">
              <div class="dropdown-content">
                <a href="javascript:;" onClick={() => { this.setImgScale(0.25) }} class="dropdown-item">0.25X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(0.5) }} class="dropdown-item">0.5X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(0.75) }} class="dropdown-item">0.75X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(1) }} class="dropdown-item">1X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(2) }} class="dropdown-item">2X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(3) }} class="dropdown-item">3X</a>
                <a href="javascript:;" onClick={() => { this.setImgScale(4) }} class="dropdown-item">4X</a>
                <hr class="dropdown-divider" />
                <a onClick={() => { const scale = parseFloat(window.prompt("Please enter scale number: ", this.state.exportImgParams.scale.toString())!); this.setImgScale(scale) }} href="javascript:;" class="dropdown-item">
                  Other Scale
                </a>
              </div>
            </div>
          </div>

          <SquareButton head="Format" value={`${this.imgParamsFormat}`} ></SquareButton>
          <SquareButton head="Quality" value={`${this.state.exportImgParams.quality * 100 + "%"}`}></SquareButton>
        </div>
      </div>
    )
  }
}