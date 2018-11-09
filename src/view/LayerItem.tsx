import { h, Component } from "preact";
import { ILayer, LayerType } from "psdetch-core/build";


import "./LayerItem.scss";
import { isFolderLayer } from "psdetch-core/build/layer";
import { store, actionChoseLayer } from "psdetch-faced/build";



interface ILayerItemProps {
  layer: ILayer;
  indent?: number;

}
interface ILayerItemState {
  loading: boolean;
  children?: ILayer[];
  showChild: boolean;
  active: boolean;

}



export class LayerItem extends Component<ILayerItemProps, ILayerItemState> {
  private unsubscribe?: () => void;

  constructor(props: ILayerItemProps) {
    super(props);
    this.state = {
      loading: true,
      showChild: true,
      active: false
    }
    this.initLayer(props.layer);
  }
  async initLayer(layer: ILayer) {
    if (isFolderLayer(layer)) {
      const children = await layer.children();
      this.setState({ showChild: children.length > 0 })
      this.setState({ children });
    }
  }
  componentWillReceiveProps(nextProps: ILayerItemProps) {
    this.initLayer(nextProps.layer);
  }
  getIcon(layer: ILayer) {

    if (isFolderLayer(layer)) {
      return "fa-folder";
    } else {
      return "fa-folder1";
    }
  }

  componentDidMount() {
    // const currentLayer = this.props.layer;
    // this.isLayerInThis(currentLayer)
    //   .then((isNested) => {

    //     this.showChild = true;
    //     this.setState({ loading: false });
    //   }).catch(() => this.setState({ loading: false }));

    this.unsubscribe = store.subscribe(() => {
        this.setState({ active: store.getState().choseLayer && this.props.layer === store.getState().choseLayer.layer });
    })

  }
  componentWillUnmount(){
    this.unsubscribe!();
  }

  // async isLayerInThis(currentLayer: ILayer): Promise<boolean> {
  //   return new Promise<boolean>((resolve, reject) => {
  //     if ( isFolderLayer(currentLayer)) {
  //       currentLayer.children().then((children: ILayer[]) => {

  //         this.children = children;
  //         for (let i = 0; i < this.children!.length; i++) {
  //           if ( isFolderLayer(this.children![i])) {

  //             resolve(true);
  //           }
  //         }
  //       }, reject => false)

  //     } else {
  //       resolve(false);
  //     }
  //   });
  // }


  layerItemClick(layer: ILayer) {
    if (layer.layerType === LayerType.folder) {
      this.setState({ showChild: !this.state.showChild })
    } else {
      store.dispatch(actionChoseLayer(layer));
    }
  }
  renderChildren() {
    const indent = this.props.indent ? this.props.indent! : 0;
    return this.state.children!.map((child) => { return <LayerItem layer={child} indent={indent + 1} /> })
  }
  renderLayerItem() {

    const layer = this.props.layer;
    const indent = this.props.indent ? this.props.indent! : 0;
    const isActiveLayer = this.state.active;
    return (
      <div>
        <div className={"layer " + (!layer.visible ? 'invisible' : '') + (isActiveLayer ? ' active' : '')} onClick={() => { this.layerItemClick(layer) }}>
          <span class="indent" style={{ width: indent * 8 }}></span>
          <span class="icon is-small">
            <i className={"fa " + this.getIcon(layer)} aria-hidden="true"></i>
          </span>
          <span class="name">{layer.name}</span>
        </div>
        {this.state.children && this.state.showChild ? this.renderChildren() : null}
      </div>

    )
    // }
    // return null;
  }
  render(): JSX.Element | null {

    const rtn = this.renderLayerItem();
    return rtn;







  }
}
