import './App.css';
import React, { Component } from 'react';
import {
  ReactiveBase,
  ReactiveList,
  ResultCard,
  SelectedFilters,
  DataSearch,
  MultiDropdownList,
  RangeInput,
  MultiList,
} from '@appbaseio/reactivesearch';

const { ResultCardsWrapper } = ReactiveList;


const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

class App extends Component {
  render() {
    return (
      <ReactiveBase
        url='http://localhost:9200/'
        app='autos'>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%' }}>

            <DataSearch
              componentId='SearchFilter'
              dataField={['model', 'brand']}
              fuzziness={2}
              placeholder='Buscar por marca o modelo'
              style={{
                padding: "5px",
                marginTop: "10px"
              }}
            />

            <div className='col'>
              <MultiDropdownList
                componentId='BrandSensor'
                dataField='brand.keyword'
                placeholder='Seleccionar marca'
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </div>

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId="CurrencySensor"
                dataField="currency.keyword"
                title="Moneda"
                react={{
                  and: [
                    'SearchFilter',
                    'BrandSensor',
                    'RangeInputSensor',
                    'ConditionSensor',
                    'FuelSensor',
                    'DoorsSensor',
                  ],
                }}
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </div>

            <RangeInput
              componentId='RangeInputSensor'
              dataField='price'
              title='Precio'
              range={{
                start: 3000,
                end: 50000,
              }}
              defaultValue={{
                start: 0,
                end: 50000,
              }}
              rangeLabels={{
                start: '$0',
                end: '$50000',
              }}
              showFilter={true}
              stepValue={1}
              showHistogram={true}
              interval={2}
              react={{
                and: [
                  'SearchFilter',
                  'BrandSensor',
                  'CurrencySensor',
                  'ConditionSensor',
                  'FuelSensor',
                  'DoorsSensor',
                ],
              }}
              URLParams={false}
              includeNullValues
              style={{
                padding: "5px",
                marginTop: "10px"
              }}
            />

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId="ConditionSensor"
                dataField="condition.keyword"
                title="Condición"
                react={{
                  and: [
                    'SearchFilter',
                    'BrandSensor',
                    'CurrencySensor',
                    'RangeInputSensor',
                    'FuelSensor',
                    'DoorsSensor',
                  ],
                }}
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </div>

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId="FuelSensor"
                dataField="fuel_type.keyword"
                title="Tipo de combustible"
                react={{
                  and: [
                    'SearchFilter',
                    'BrandSensor',
                    'CurrencySensor',
                    'RangeInputSensor',
                    'ConditionSensor',
                    'DoorsSensor',
                  ],
                }}
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </div>

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId="DoorsSensor"
                dataField="doors.keyword"
                title="Puertas"
                react={{
                  and: [
                    'SearchFilter',
                    'BrandSensor',
                    'CurrencySensor',
                    'RangeInputSensor',
                    'ConditionSensor',
                    'FuelSensor',
                  ],
                }}
                style={{
                  padding: "5px",
                  marginTop: "10px"
                }}
              />
            </div>

            <SelectedFilters
              showClearAll={true}
              clearAllLabel='Clear filters'
              style={{
                padding: "5px",
                marginTop: "10px"
              }}
            />

          </div>

          <ReactiveList
            componentId='results'
            dataField='name'
            size={8}
            pagination={true}
            react={{
              and: [
                'SearchFilter',
                'BrandSensor',
                'CurrencySensor',
                'RangeInputSensor',
                'ConditionSensor',
                'FuelSensor',
                'DoorsSensor',
              ]
            }}
            style={{
              width: "70%",
              textAlign: "center"
            }}


            render={({ data }) => (
              <ResultCardsWrapper>
                {
                  data.map(item => (
                    <ResultCard
                      key={item._id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => { openInNewTab(item.publication_link) }}
                    >
                      <ResultCard.Image
                        src={item.thumbnail}
                      />
                      <ResultCard.Title
                        dangerouslySetInnerHTML={{
                          __html: item.brand + ' - ' + item.model
                        }}
                      />
                      <ResultCard.Description>
                        {item.currency + ' ' + item.price}
                      </ResultCard.Description>
                      <ResultCard.Description>
                        {item.kilometers}
                      </ResultCard.Description>
                    </ResultCard>
                  ))
                }
              </ResultCardsWrapper>
            )}

          />
        </div>

      </ReactiveBase>
    );
  }
}

export default App;