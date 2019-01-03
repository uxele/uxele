import { h, Component } from "preact"
import { facade, Core } from "uxele-facade/build";
import "./PageList.scss";
import { bindStore } from "../../lib/bindStore";
import { actionChosePage } from "uxele-facade/build/facade";
import { LayerList } from "./LayerList";
interface PageListViewState {
  pages?: Core.IPage[],
  chosePage?: Core.IPage
}
export class PageListView extends Component<{}, PageListViewState> {
  constructor() {
    super();
    bindStore(this, {
      chosePage: (state) => state.chosePage.page
    })
  }
  async componentDidMount() {
    const project = facade.store.getState().project.project;
    if (project) {
      const pages = await project.getPages();
      this.setState({ pages });
    }
  }
  choosePage(page?: Core.IPage) {
    setTimeout(() => {
      facade.store.dispatch(actionChosePage(page));
    }, 10)

  }
  renderLayerList() {
    return (
      <div class="layerListWrapper">
        <div class="back">
          <div onClick={() => this.choosePage()} class="backBtn"><i class="fas fa-arrow-left"></i></div>
          <div class="pageName">{this.state.chosePage!.name}</div>
        </div>
        <LayerList />
      </div>
    )
  }
  renderPageList() {
    return this.state.pages && this.state.pages.map((page) => <div onClick={() => this.choosePage(page)} class="pageItem">{page.name}</div>);
  }
  render() {
    return (
      <div class="pageList">
        {
          this.state.chosePage ? this.renderLayerList() : this.renderPageList()
        }
      </div>
    )
  }
}