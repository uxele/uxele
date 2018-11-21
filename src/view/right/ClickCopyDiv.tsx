import { h, Component } from "preact";
import { facade, util, i18n } from "uxele-facade";
import "./ClickCopyDiv.scss";
interface ClickCopyDivProps {
  value: string | Promise<string>
}
interface ClickCopyDivState {
  value: string;
  copied: boolean;
}
export class ClickCopyDiv extends Component<ClickCopyDivProps, ClickCopyDivState> {
  constructor(props: ClickCopyDivProps) {
    super(props);
    this.state = { value: typeof props.value === "string" ? props.value : "", copied: false };
    if (props.value instanceof Promise) {
      props.value.then((v) => {
        this.setState({ value: v });
      });
    }
  }
  get label() {
    if (this.props.children) {
      if (this.props.children instanceof Array && this.props.children.length > 0) {
        return this.props.children;
      } else {
        if (!(this.props.children instanceof Array)) {
          return this.props.children;
        }

      }
    }
    return this.state.value;
  }
  componentWillReceiveProps(nextProps: ClickCopyDivProps) {
    if (nextProps.value instanceof Promise) {
      nextProps.value.then((v) => {
        this.setState({ value: v });
      })
    } else {
      this.setState({ value: nextProps.value });
    }
  }
  copy() {
    util.copyToClipboard(this.state.value);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000)
  }
  render() {
    return (
      <div onClick={() => this.copy()} class="clickCopyDiv">
        <span class="label">{this.label}</span>
        {this.state.copied ? <div class="copied animated fadeOutUp">{i18n.lang("copied") + "!"}</div> : null}
      </div>
    )
  }
}