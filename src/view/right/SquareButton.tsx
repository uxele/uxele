import { h, Component } from "preact";
import "./SquareButton.scss";
interface SquareButtonProps {
  head: string;
  value: string;
  active?: boolean;
  onClick?:()=>void;
}
export class SquareButton extends Component<SquareButtonProps, any>{
  render() {
    return (
      <div onClick={this.props.onClick} class={`squareButton ${this.props.active?"active":""}`}>
        <div class="head">{this.props.head}</div>
        <span class="value">{this.props.value}</span>
      </div>
    )
  }
}