import { h, Component } from "preact";
import "./LayerExport.scss";
import { facade, Core } from "uxele-facade";
import { SquareButton } from "../SquareButton";
type ExportType = "image" | "svg" | "text";
interface LayerExportViewProps {
  layer: Core.ILayer;
}
interface LayerExportViewState {
  exportType: ExportType;
  exportImgParams: facade.IExportImageParams;
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
  get exportImageFileName(): string {
    return facade.getExportImageFileName(this.props.layer, this.state.exportImgParams);
  }
  get exportSvgFileName(): string {
    return facade.getExportSvgFileName(this.props.layer);
  }
  get exportFileName(): string {
    return this.state.exportType === "image" ? this.exportImageFileName : this.exportSvgFileName;
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
    this.setState({ exportType: exportType }, () => {
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
            {/* {facade.canExportText(this.props.layer) ? <span onClick={() => this.setState({ exportType: "text" })} class={this.state.exportType === "text" ? "active" : ""}>Text</span> : null} */}
          </div>
          {this.state.exportType === "image" ?
            this.renderImageParam()
            : null}
          {["image", "svg"].indexOf(this.state.exportType) > -1 ?
            this.renderFileExporters()
            : null}
        </div>

      </div>
    )
  }
  async exportFile(exporter: Core.IExporter) {
    if (this.state.exportType === "image") {
      await facade.exportImageWithExporter(this.props.layer, exporter, this.state.exportImgParams);

    } else if (this.state.exportType === "svg") {
      const layer: Core.IVectorLayer = this.props.layer as Core.IVectorLayer;
      await facade.exportSvgWithExporter(layer, exporter);
    }
    // TODO add notification

  }
  renderFileExporters() {
    return (
      <div class="fileExport">
        <div class="fileName">Name: {this.exportFileName}</div>
        <div class="exporters">
          {facade.exporters.map((exporter) => {
            return <button onClick={() => { this.exportFile(exporter) }} class="button is-primary is-small"><i class={exporter.iconCls}></i>{exporter.name}</button>
          })}
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
                {[0.25, 5, 0.75, 1, 2, 3, 4].map((scale) => <a href="javascript:;" onClick={() => { this.setImgScale(scale) }} class="dropdown-item">{scale}X</a>)}
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