import React, { Component } from 'react';
import _ from 'lodash';
import PropertyGroup from './PropertyGroup';
import Columns from './Columns';
import Column from './Column';

export default class CustomPanel extends Component {
    render() {
        let { object } = this.props;
        return (
            <PropertyGroup>
                <Columns label="Custom">
                    {
                        this.props.objects.map(el => {
                            return (<Column>
                                <div style={{ backgroundColor: el.fill, padding: 10, margin: 5, borderRadius: 50 }}><p style={{ margin: 0, color: el.fill, filter: 'invert(100%)' }}>{el.type}</p></div>
                            </Column>)

                        })

                    }
                </Columns>
            </PropertyGroup>
        );
    }
}
