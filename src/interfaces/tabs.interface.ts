import {Component} from 'vue';

export namespace ITabs {
  export interface ITabItem {
    name: string;
    label: string;
    componentName: Component;
  }
}
