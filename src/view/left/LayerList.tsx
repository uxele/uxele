
import { h, Component } from "preact";

import { LayerItem } from "./LayerItem"
import { facade, Core } from "uxele-facade";

import "./LayerList.scss";
interface ILayerListState {
  layers: Core.ILayer[];

}

export class LayerList extends Component<{}, ILayerListState> {
  private currentPage?: Core.IPage;
  private unsubscribe?: () => void;
  constructor() {
    super();

  }
  get pageState() {
    return facade.store.getState().chosePage;
  }
  componentWillUnmount() {
    this.unsubscribe!();
  }
  componentDidMount() {
    this.renderLayerItem();
    this.unsubscribe = facade.store.subscribe(() => {

      if (this.pageState.page && this.pageState.page !== this.currentPage) {

        this.renderLayerItem();
      }

    })

  }
  async renderLayerItem() {

    this.currentPage = this.pageState.page;
    const _layers: Core.ILayer[] = await this.currentPage!.getLayers();
    this.setState({ layers: _layers });
  }

  render() {
    const { layers } = this.state;
    return (

      <div class="layerList">
        {layers &&
          layers.map((layer: Core.ILayer, layerIndex: number, array: Core.ILayer[]) => (
            <LayerItem layer={layer} />
          ))}
      </div>
    );


  }

}
