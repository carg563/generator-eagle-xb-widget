import { React, FormattedMessage } from 'jimu-core';
import { BaseWidgetSetting, AllWidgetSettingProps } from 'jimu-for-builder';
import { IMConfig } from '../config';
import defaultI18nMessages from './translations/default'

export default function Setting(props: AllWidgetSettingProps<IMConfig>) {
    //Listener for when the P1 property changes
    const onP1Change = function (evt: React.FormEvent<HTMLInputElement>) {
        props.onSettingChange({
            id: this.props.id,
            config: this.props.config.set('p1', evt.currentTarget.value)
        });
    };

    //Listener for when the P2 property changes
    const onP2Change = function (evt: React.FormEvent<HTMLInputElement>) {
        props.onSettingChange({
            id: this.props.id,
            config: this.props.config.set('p2', evt.currentTarget.value)
        });
    }

    return (<div className="widget-setting-<%= widgetName %>">
        <div><FormattedMessage id="p1" defaultMessage={defaultI18nMessages.p1} />: <input defaultValue={props.config.p1} onChange={onP1Change} /></div>
        <div><FormattedMessage id="p2" defaultMessage={defaultI18nMessages.p2} />: <input defaultValue={props.config.p2} onChange={onP2Change} /></div>
    </div>);

}