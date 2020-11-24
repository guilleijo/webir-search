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
                padding: '10px',
                marginTop: '5px'
              }}
            />

            <div className='col'>
              <MultiDropdownList
                componentId='Marca'
                dataField='brand.keyword'
                placeholder='Seleccionar marca'
                style={{
                  padding: '10px',
                  marginTop: '5px'
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
                  ],
                }}
                style={{
                  padding: '10px',
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
                    'Búsqueda',
                    'Marca',
                    'CurrencySensor',
                    'Condición',
                    'Combustible',
                    'Puertas',
                  ],
                }}
                URLParams={false}
                includeNullValues
                style={{
                  paddingLeft: '30px',
                  paddingRight: '30px',
                  marginTop: '5px',
                  marginBottom: '5px'
                }}
              />
            </div>

            <div className='col'>
              <MultiList
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
                  ],
                }}
                style={{
                  padding: '10px',
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
                  ],
                }}
                style={{
                  padding: '10px',
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
                  ],
                }}
                style={{
                  padding: '10px',
                  marginTop: '5px'
                }}
              />
            </div>

            <SelectedFilters
              showClearAll={true}
              clearAllLabel='Clear filters'
              style={{
                padding: '10px',
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