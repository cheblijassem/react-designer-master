import React, {Component} from 'react';
import _ from 'lodash';
import { Portal } from 'react-portal';

import Icon from '../Icon';

import styles from './styles';
import PropertyGroup from './PropertyGroup';
import Button from './Button';
import SwitchState from './SwitchState';
import Columns from './Columns';
import Column from './Column';
import CustomPanel from './CustomPanel';

class PanelList extends Component {
  componentDidMount() {
    console.log(this.props.object)
  }
  render() {
    let {object, objectComponent, id} = this.props;

    return (
      <div style={{...styles.propertyPanel}}>
        {objectComponent.panels.map((Panel, i) => <Panel key={i} id={id} {...this.props} />)}
        <CustomPanel objects={this.props.objects} />
      </div>
    );
  }
};

export default PanelList;
