

## Difficulties
Making an entirely new Panel to be rendred along with the others was very time consuming and needs a lot of changes in several components since the Panels appear according to the selected object type, thus an easier solution was making a  component seperated  from the renderd panels that shows objects

### CustomPanel.js


```javascript
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
```
Adding `<CustomPanel/>` inside `<PanelList/>`

```javascript
class PanelList extends Component {
  render() {
    let {object, objectComponent, id} = this.props;

    return (
      <div style={{...styles.propertyPanel}}>
        {objectComponent.panels.map((Panel, i) => <Panel key={i} id={id} {...this.props} />)}
        
        <CustomPanel objects={this.props.objects} />`

      </div>
    );
  }
};
```