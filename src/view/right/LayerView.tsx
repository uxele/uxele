import { h, Component } from "preact";
import "./LayerView.scss";
import { facade,Core } from "uxele-facade";
import { LayerBasicView } from "./LayerBasic";
import { LayerExportView } from "./LayerExport";

interface LayerViewState {
  layer?: Core.ILayer
}
export class LayerView extends Component<any, LayerViewState>{
  private unsubscribe?: Function;
  get curLayerState() {
    return facade.store.getState().choseLayer;
  }
  componentWillUnmount() {
    this.unsubscribe!();

  }
  componentDidMount() {
    this.unsubscribe = facade.store.subscribe(() => {
      if (this.state.layer !== this.curLayerState.layer) {
        this.setState({ layer: this.curLayerState.layer });
      }
    });

  }
  render() {
    if (this.state.layer) {
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