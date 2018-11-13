import { h, Component } from "preact";
import { Core } from "uxele-facade";
import { PagePreviewImage } from "./PagePreviewImage";

import "./PagePreview.scss";
interface IPageListItemProps {
  page: Core.IPage;
  onPageSelect?: (data: any) => void,
  index: number;
  isActive: boolean;
}

interface IPageListItemState {
  currentImage: HTMLImageElement;

}

export class PagePreview extends Component<IPageListItemProps, IPageListItemState> {
  private canvasContainer?: HTMLElement;
  constructor() {
    super();
    this.onPageSelect = this.onPageSelect.bind(this);
  }
  private onPageSelect(event: any) {
    this.props.onPageSelect!(this.props.page);
  }
  componentWillMount() {
    this.renderPageItem();
  }
  async renderPageItem() {
    const _pagePreview: HTMLImageElement = await this.props.page.getPreview(1);

    this.setState({ currentImage: _pagePreview });

  }
  render() {
    const _index = this.props.index + 1;
    const _pageName = this.props.page.name;
    const { currentImage } = this.state;
    const _isActive = this.props.isActive;
    return (
      <div class={`pagePreview card no-round-borders ${_isActive ? "has-background-black-ter has-text-primary" : ""}`} onClick={this.onPageSelect}>
        <header class="card-header">
          <div class="card-header-title">
            <div class="media">
             
              <div class="media-content">
              <span>  {_index}.&nbsp;</span>
                <span> {_pageName}</span>
              </div>
            </div>
          </div>
        </header>
        <div class="card-content no-borders">
          <div class="media">

            <div class="media-content">
              {currentImage && <PagePreviewImage image={currentImage} width={this.props.page.width} height={this.props.page.height} />}

            </div>

          </div>
        </div>
        

      </div>

    );


  }
}
