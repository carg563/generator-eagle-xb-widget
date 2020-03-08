/** @jsx jsx */
import { AllWidgetProps, css, jsx } from 'jimu-core';
import { IMConfig } from '../config';


export default function Widget(props: AllWidgetProps<IMConfig>) {
    return (
        <div className="widget-<%= widgetName %> jimu-widget" style={{ overflow: 'auto' }}>
            <p>Hello World</p>
            <p>Widget Name: {props.label}</p>
        </div>);
}           
