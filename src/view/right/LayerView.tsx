import { h, Component } from "preact";
import "./LayerView.scss";
import { ILayer } from "psdetch-core/build";
import { store } from "psdetch-faced/build";
import { LayerBasicView } from "psdetch-studio/src/view/right/LayerBasic";
import { LayerExportView } from "psdetch-studio/src/view/right/LayerExport";

interface LayerViewState {
  layer?: ILayer
}
export class LayerView extends Component<any, LayerViewState>{
  private unsubscribe?: Function;
  get curLayerState() {
    return store.getState().choseLayer;
  }
  componentWillUnmount() {
    this.unsubscribe!();

  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
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