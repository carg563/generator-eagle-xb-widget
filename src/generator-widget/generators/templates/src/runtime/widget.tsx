/** @jsx jsx */
import {BaseWidget, classNames, FormattedMessage, defaultMessages as jimuCoreDefaultMessage} from 'jimu-core';
import {AllWidgetProps, css, jsx, styled} from 'jimu-core';
import {IMConfig} from '../config';

import { TabContent, TabPane, Nav, NavItem, NavLink, Button} from 'jimu-ui';
import defaultMessages from './translations/default';

export default class Widget extends BaseWidget<AllWidgetProps<IMConfig>, any>{
  constructor(props){
    super(props);

    this.state = {
      activeTab: 'properties'
    };
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render(){
    const styleLiteral = css`
      color: ${this.props.theme.colors.danger};
      font-size: 1.25rem;
    `;

    const styleObject = {
      backgroundColor: this.props.theme.colors.palette.light[500],
      padding: '1rem'
    };

    const StyledButton = styled.button`
      color: white;
      background-color: ${this.props.theme.colors.primary};
      transition: 0.15s ease-in all;
      &:hover {
        background-color: ${this.props.theme.colors.danger};
      }
    `;

    const StyledBSButton = styled(Button)`
      background-color: hotpink !important;
      border: 0 !important;
      transition: 0.15s ease-in all;
      &:hover {
        background-color: purple !important;
      }
    `;

    const styleTag = `
      .danger-color {
        color: red;
      }
    `;

    const rtlStyle = css`
      border: solid 1px;
      width: 100px;
      padding-left: 20px;
    `;

    // console.log(`...Render ${this.props.manifest.name}`);
    
    let propsTr = Object.keys(this.props).map((prop, i) => {
      if(['manifest', 'user', 'intl'].indexOf(prop) > -1
        || typeof this.props[prop] === 'string'){
        return <tr key={i}><td>{prop}</td><td>{this.props[prop] && this.props[prop].toString()}</td></tr>;
      }

      return <tr key={i}>
        <td>{prop}</td>
        <td>
          {
            JSON.stringify(this.props[prop], null, 2)
          }
        </td></tr>;
    });

      return <div className="widget-<%= widgetName %> jimu-widget" style={{overflow: 'auto'}}>
      <Nav tabs>
        <NavItem><NavLink
          className={classNames({active: this.state.activeTab === 'properties'})}
          onClick={() => this.toggle('properties')}
          ><FormattedMessage id="widgetProperties" defaultMessage={defaultMessages.widgetProperties}/></NavLink></NavItem>
        <NavItem><NavLink
          className={classNames({active: this.state.activeTab === 'fn'})}
          onClick={() => this.toggle('fn')}
        ><FormattedMessage id="widgetFunctions" defaultMessage={defaultMessages.widgetFunctions}/></NavLink></NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="properties">
          <div className="title font-weight-bold">NLS messages from jimu-core (OK)</div>
          <div className="content"><FormattedMessage id="ok" defaultMessage={jimuCoreDefaultMessage.ok}></FormattedMessage></div>
          <hr/>
          {/* demo how to use theme variables */}
          <div css={styleLiteral}><span css={styleObject}>Theme danger color</span></div>
          <br/>

          <StyledButton>A styled HTML Button</StyledButton>
          <br/>
          <br/>

          <StyledBSButton>A Re-styled Button Component</StyledBSButton>
          <br/>
          <br/>

          <div css={rtlStyle}>right to left demo</div>
          <br/>
          <br/>

          <style>
            {styleTag}
          </style>
          <p className="danger-color">
            Text color is from a named CSS class
          </p>
          {/* demo how to format string by call API */}
          <div className="title font-weight-bold"><FormattedMessage id="widgetName" defaultMessage={defaultMessages.widgetName}/></div>
          <div className="content">{this.props.intl.formatMessage({id: '_widgetLabel', defaultMessage: defaultMessages._widgetLabel})}</div>

          <div className="title font-weight-bold"><FormattedMessage id="widgetProps" defaultMessage={defaultMessages.widgetProps}/></div>
          <div className="content">
            <table>
              <tbody>{propsTr}</tbody>
            </table>
          </div>
        </TabPane>
        <TabPane tabId="fn">
          TODO
        </TabPane>
      </TabContent>


    </div>;
  }
}
