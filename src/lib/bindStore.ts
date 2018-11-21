import { Component } from "preact";
import { facade } from "uxele-facade";
// bind component to store


const state = facade.store.getState();
type stateType = typeof state;
interface Selector<T> {
  [key: string]: (state: stateType) => T[keyof T];
}
/**
 * Bind redux store to a react component
 * constraints:
 * 1. the state type T should be flat object -- nested object not supported.
 * 2. this function has to be called in component constructor and pass in initState.
 */
export function bindStore<T extends { [key: string]: any }>(component: Component<any, T>, initState: T, selector: Selector<T>) {

  const keys = Object.keys(initState);
  const selectorKeys = Object.keys(selector);
  const oldComponentDidMount = component.componentDidMount;
  const oldComponentWillUnmount = component.componentWillUnmount;


  //setup init state
  component.state = initState;

  let unsubscribe: Function;
  component.componentDidMount = function () {
    //listen to store change . call selector and compare to cache to update component state.
    unsubscribe = facade.store.subscribe(() => {
      const state = facade.store.getState();
      selectorKeys.forEach((key) => {
        const curVal = selector[key](state);
        this.setState({ [key]: curVal });
      });
    })
    // call custom defined componentdidMount hook
    if (oldComponentDidMount) {
      oldComponentDidMount.call(component);
    }
  }
  component.componentWillUnmount = function () {
    // unsubscribe from store
    unsubscribe();
    // call custom defined hook.
    if (oldComponentWillUnmount) {
      oldComponentWillUnmount.call(component);
    }
  }
}