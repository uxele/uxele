import { h, Component } from "preact";
import "./LayerItem.scss";
import { facade,Core } from "uxele-facade";
import { util } from "uxele-facade";



interface ILayerItemProps {
  layer: Core.ILayer;
  indent?: number;

}
interface ILayerItemState {
  loading: boolean;
  children?: Core.ILayer[];
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
  async initLayer(layer: Core.ILayer) {
    if (util.layer.isFolderLayer(layer)) {
      const children = await layer.children();
      this.setState({ showChild: children.length > 0 })
      this.setState({ children });
    }
  }
  componentWillReceiveProps(nextProps: ILayerItemProps) {
    this.initLayer(nextProps.layer);
  }
  getIcon(layer: Core.ILayer) {
    switch(layer.layerType){
      case Core.LayerType.text:
      return "fa-font";
      case Core.LayerType.folder:
      return "fa-folder";
      case Core.LayerType.pixel:
      return "fa-file-image-o";
      case Core.LayerType.vector:
      return "fa-vector-square";

    }
   
  }

  componentDidMount() {
    // const currentLayer = this.props.layer;
    // this.isLayerInThis(currentLayer)
    //   .then((isNested) => {

    //     this.showChild = true;
    //     this.setState({ loading: false });
    //   }).catch(() => this.setState({ loading: false }));

    this.unsubscribe = facade.store.subscribe(() => {
        this.setState({ active: facade.store.getState().choseLayer && this.props.layer === facade.store.getState().choseLayer.layer });
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


  layerItemClick(layer: Core.ILayer) {
    if (layer.layerType === Core.LayerType.folder) {
      this.setState({ showChild: !this.state.showChild })
    } else {
      facade.store.dispatch(facade.actionChoseLayer(layer));
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
        <div className={"layerItem " + (!layer.visible ? 'invisible' : '') + (isActiveLayer ? ' active' : '')} onClick={() => { this.layerItemClick(layer) }}>
          <span class="indent" style={{ width: indent * 8 }}></span>
          <span class="icon is-small">
            <i className={"fas " + this.getIcon(layer)} aria-hidden="true"></i>
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
