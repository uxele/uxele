// import * as React from "react";
import {h, Component} from "preact";
import './FileDropper.scss'
// import { DragEvent } from "react";

export interface IDataLoaderProps {
  onFile(file: File): void;
}
export class FileDropper extends Component<IDataLoaderProps, any> {
  constructor(props: IDataLoaderProps) {
    super(props);
    this.state = {
      curFile:null,
      dragging: "",
    }
  }
  public openFromDisk = () => {
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "plain/*";
    elem.addEventListener('change', (evt) => {
      const file: File = (evt.target as any).files[0];
      // this.loadFile(file);
      this.props.onFile(file);
    });
    elem.click();
  }
  public dragOver = (event: DragEvent) => {
    event.preventDefault();
  }
  // private loadFile(file: File) {
  //   const fr = new FileReader();
  //   fr.onloadend = () => {
  //     const data = fr.result;
  //     this.props.onCSVDataLoad(data);
  //     this.setState({curFile:file});
  //   };
  //   fr.readAsText(file);
  // }
  public dropFile = (event: DragEvent) => {
    this.setState({ dragging: "" });
    event.preventDefault();
    const file=event.dataTransfer.files[0]
    this.props.onFile(file);
    // this.loadFile();
    
  }
  public render() {
    return (
      <div
        onDragEnter={() => { this.setState({ dragging: "dragging" }) }}
        onDragLeave={() => { this.setState({ dragging: "" }) }}
        onDragOver={this.dragOver}
        onDrop={this.dropFile}
        onClick={this.openFromDisk}
        class={`fileDropper ${this.state.dragging}`}>
        <i 
        class=
        {`fas fa-upload 
        ${this.state.dragging?'has-text-success is-size-1':'has-text-primary is-size-3'}`} />
        <div class={`dragDropFiles 
        has-text-grey-light
        has-text-weight-light
        ${this.state.dragging?"is-size-5":"is-size-4"} `}
        >Drag &amp; Drop files here</div>
        <div class="or">OR</div>
        <button class="button">Browse File</button>
        {
          this.state.curFile &&
          <div class="loadedFile">Loaded: {this.state.curFile.name}
          </div>
        }
      </div>
    );
  }
}

