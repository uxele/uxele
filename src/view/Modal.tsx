import { h, Component } from "preact";
import {lang} from "psdetch-i18n";
import "./Modal.scss";
interface ModalState {
  active: boolean;
  mode?: "alert" | "confirm";
  title?: string;
  content?: JSX.Element | string;
  onClose?: (data?: any) => void;
  backgroundDrop: boolean;
}

let modalInst: Modal;
export async function falert(msg: JSX.Element | string, title = "Alert"): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    modalInst.setState({
      active: true,
      mode: "alert",
      title,
      content: msg,
      onClose: () => {
        resolve()
      },
      backgroundDrop: true
    })
  })
}
export async function fconfirm(msg: JSX.Element | string, title = "Confirm"): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    modalInst.setState({
      active: true,
      mode: "confirm",
      title,
      content: msg,
      onClose: (d:any) => {
        resolve(!!d);
      },
      backgroundDrop: false
    })
  })
}
export async function show(state:ModalState){
  modalInst.setState({
    ...state,
    active:true
  });
}
export class Modal extends Component<{}, ModalState> {

  constructor() {
    super();
    this.state = {
      active: false,
      backgroundDrop: true
    }
    modalInst = this;
  }
  close(data?: any) {
    if (this.state.onClose) {
      this.state.onClose(data);
    }
    this.setState({ active: false });
  }
  render() {
    return (
      <div class={`psdetch-modal modal ${this.state.active ? 'is-active' : ''}`}>

        <div class="modal-background" onClick={() => {
          if (this.state.backgroundDrop) this.close();
        }
        }></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class={`modal-card-title`}>{this.state.title}</p>
          </header>
          <section class="modal-card-body">
            {this.state.content}
          </section>
          <footer class="modal-card-foot">
            {this.state.mode === 'alert' &&
              <button onClick={() => this.close()} class="button is-primary">{lang("ok")}</button>
            }
            {
              this.state.mode === 'confirm' &&
              [<button onClick={() => this.close(false)} class="button is-danger">{lang("no")}</button>,
              <button onClick={() => this.close(true)} class="button is-success">{lang("yes")}</button>]
            }
          </footer>
        </div>
      </div>
    )
  }
}
