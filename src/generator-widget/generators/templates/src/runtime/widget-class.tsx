/** @jsx jsx */
import {BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {IMConfig} from '../config';

import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from './translations/default';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  constructor(props){
    super(props);
         
  }

  render(){
     return <div className="widget-<%= widgetName %> jimu-widget" style={{overflow: 'auto'}}>
         <p>Hello World !</p>
         <p>Widget Name: {this.props.widgetName}</p>
    </div>;
  }
}
