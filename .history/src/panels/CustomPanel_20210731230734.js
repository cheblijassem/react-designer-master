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
                                <p style={{ backgroundColor: '##e1e1e1', padding: 5, borderRadius: 50, }}>{el.type}</p>
                            </Column>)

                        })

                    }
                </Columns>
            </PropertyGroup>
        );
    }
}
