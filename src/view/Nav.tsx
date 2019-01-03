import { h, Component } from "preact"
import { LogoText } from "./LogoText";
import { ToolBar } from "./ToolBar";
import "./Nav.scss";
import { bindStore } from "../lib/bindStore";
import { Core, facade } from "uxele-facade/build";
import { Pillar, actionChoosePillar } from "uxele-facade/build/facade/states/GeneralView";
const pillars: Pillar[] = ["inspect", "prototype"];
interface NavState {
  pillar: Pillar;
  loaded: boolean;
  title: string;
  coords: Core.IPoint;
  zoomLevel: number;
}
export class Nav extends Component<{}, NavState> {
  changePillar(pillar: Pillar): any {
    facade.switchPillars(pillar);
  }
  constructor() {
    super();
    bindStore(this, {
      pillar: (state) => state.genearlView.pillar,
      loaded: (state) => state.project.project ? true : false,
      title: (state) => state.project.project ? state.project.project.name : "",
      coords: (state) => state.canvasStatus.coords,
      zoomLevel: (state) => state.canvasStatus.zoomLevel
    })
  }
  render() {
    return (
      <nav class="navbar is-dark">
        <div class="title">{this.state.title}</div>
        <div class="navbar-item is-size-4 has-text-weight-bold"><LogoText></LogoText></div>
        {this.state.loaded ? this.renderNavTools() : null}
      </nav>
    )
  }
  zoomIn() {
    facade.zoomIn();
  }
  zoomOut() {
    facade.zoomOut();
  }
  renderNavTools() {
    return (
      [<div class="pillars">
        {pillars.map((pillar) => <div onClick={() => this.changePillar(pillar)} class={`pillar ${this.state.pillar === pillar ? "active" : ""}`}><span>{pillar.toUpperCase()}</span></div>)}
      </div>,
      <span class="flex1"></span>,
        // <div class="tools">
        //   <span class="zoom" onClick={() => this.zoomOut()} ><i class="fas fa-search-minus"></i></span>
        //   <span class="text zoomLevel">{(this.state.zoomLevel || 1) * 100}%</span>
        //   <span class="zoom" onClick={() => this.zoomIn()}><i class="fas fa-search-plus"></i></span>
        //   <span class="flex1"></span>
        //   {this.state.coords ? <span class="text">X: {this.state.coords!.x}</span> : null}
        //   {this.state.coords ? <span class="text">Y: {this.state.coords!.y}</span> : null}


        // </div>
      ]
    )
  }
}