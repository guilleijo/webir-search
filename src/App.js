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
  SingleList,
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
              componentId='Búsqueda'
              dataField={['model', 'brand']}
              fuzziness={2}
              placeholder='Buscar por marca o modelo'
              style={{
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '15px',
                paddingRight: '15px',
                marginTop: '5px'
              }}
            />

            <div className='col'>
              <MultiDropdownList
                componentId='Marca'
                dataField='brand.keyword'
                placeholder='Seleccionar marca'
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
                react={{
                  and: [
                    'Búsqueda',
                    'CurrencySensor',
                    'Precio',
                    'Condición',
                    'Combustible',
                    'Puertas',
                    'Año',
                  ]
                }}
              />
            </div>

            <div className='col'>
              <MultiDropdownList
                componentId='Año'
                dataField='year.keyword'
                placeholder='Seleccionar año'
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
                react={{
                  and: [
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Precio',
                    'Condición',
                    'Combustible',
                    'Puertas',
                  ]
                }}
              />
            </div>

            <div className='col'>
              <SingleList
                showSearch={false}
                componentId='CurrencySensor'
                dataField='currency.keyword'
                title='Moneda'
                react={{
                  and: [
                    'Búsqueda',
                    'Marca',
                    'Precio',
                    'Condición',
                    'Combustible',
                    'Puertas',
                    'Año',
                  ],
                }}
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
              />
            </div>

            <div className='col'>
              <RangeInput
                componentId='Precio'
                dataField='price'
                title='Precio'
                range={{
                  start: 0,
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
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Condición',
                    'Combustible',
                    'Puertas',
                    'Año',
                  ],
                }}
                URLParams={false}
                includeNullValues
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px',
                  marginBottom: '5px'
                }}
              />
            </div>

            <div className='col'>
              <SingleList
                showSearch={false}
                componentId='Condición'
                dataField='condition.keyword'
                title='Condición'
                react={{
                  and: [
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Precio',
                    'Combustible',
                    'Puertas',
                    'Año',
                  ],
                }}
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
              />
            </div>

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId='Combustible'
                dataField='fuel_type.keyword'
                title='Tipo de combustible'
                react={{
                  and: [
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Precio',
                    'Condición',
                    'Puertas',
                    'Año',
                  ],
                }}
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
              />
            </div>

            <div className='col'>
              <MultiList
                showSearch={false}
                componentId='Puertas'
                dataField='doors.keyword'
                title='Puertas'
                react={{
                  and: [
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Precio',
                    'Condición',
                    'Combustible',
                    'Año',
                  ],
                }}
                style={{
                  paddingTop: '5px',
                  paddingBottom: '5px',
                  paddingLeft: '15px',
                  paddingRight: '15px',
                  marginTop: '5px'
                }}
              />
            </div>

            <SelectedFilters
              showClearAll={true}
              clearAllLabel='Clear filters'
              style={{
                paddingTop: '5px',
                paddingBottom: '5px',
                paddingLeft: '15px',
                paddingRight: '15px',
                marginTop: '5px'
              }}
            />

          </div>

          <ReactiveList
            componentId='results'
            dataField='name'
            size={9}
            pagination={true}
            react={{
              and: [
                'Búsqueda',
                'Marca',
                'CurrencySensor',
                'Precio',
                'Condición',
                'Combustible',
                'Puertas',
                'Año',
              ]
            }}
            style={{
              width: '70%',
              textAlign: 'center'
            }}
            defaultSortOption='Menor precio'
            sortOptions={[
              {
                label: 'Menor precio',
                dataField: 'price',
                sortBy: 'asc',
              },
              {
                label: 'Mayor precio',
                dataField: 'price',
                sortBy: 'desc',
              },
            ]}


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
                          __html: item.brand + ' - ' + item.model + ' (' + item.year + ')'
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