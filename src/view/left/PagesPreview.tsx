import { h, Component } from "preact";

import "./PagesPreview.scss";
// import { session } from "psdetch-faced";
import { PagePreview } from "./PagePreview";
import { facade,Core } from "uxele-facade";





interface IPagePreviewState {
  pages: Core.IPage[];
  activePage?: Core.IPage;
}


export class PagesPreview extends Component<{}, IPagePreviewState> {
  private currentProject?: Core.IProject;
  constructor() {
    super();
    this.state = {
      pages: [],
      activePage: undefined
    }
    this.onPageSelect = this.onPageSelect.bind(this);

  }

  private onPageSelect(page:Core.IPage){
    facade.store.dispatch(facade.actionChosePage(page));
    this.setState({activePage:page});
  }
  private async setPages() {
    const _pages = await this.currentProject!.getPages();
    this.setState({ pages: _pages })
    this.setState({ activePage: _pages[0] })
    //trigger event
  }


  componentDidMount() {

      // this.currentProject = session.get("curProject") as IProject;
      this.currentProject=facade.store.getState().project.project;
      this.setPages();
  }

  render() {
    const { pages } = this.state;
    return (

      <div class="page-list">
        {pages &&
          pages.map((page: Core.IPage, pageIndex: number, array: Core.IPage[]) => (
            <PagePreview page={page} index={pageIndex} onPageSelect={this.onPageSelect} isActive={this.state.activePage! && this.state.activePage! === page} />
          ))}

      </div>
      

    );
  }
}
