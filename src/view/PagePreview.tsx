import { h, Component } from "preact";
import { IPage } from "psdetch-core/build";
import { PagePreviewImage } from "./PagePreviewImage";

import "./PagePreview.scss";
interface IPageListItemProps {
  page: IPage;
  index: number;
}

interface IPageListItemState {
  currentImage: HTMLImageElement;
}

export class PagePreview extends Component<IPageListItemProps, IPageListItemState> {
  private canvasContainer?:HTMLElement;
  constructor() {
    super();
  }
  componentWillMount() {
    this.renderPageItem();
  }
  async renderPageItem() {
    const _pagePreview: HTMLImageElement = await this.props.page.getPreview(0);
    this.setState({ currentImage: _pagePreview });

  }
  render() {
    const _index = this.props.index + 1;
    const { currentImage } = this.state;
    return (
      <div class="card no-round-borders">
        <div class="card-content no-borders">
          <div class="media">
            <div class="media-left">
              <span>  {_index} </span>
            </div>
            <div class="media-content">
              {currentImage && <PagePreviewImage image={currentImage} width={this.props.page.width} height={this.props.page.height} />}
             
            </div>
          </div>
        </div>
      </div>

    );


  }
}
