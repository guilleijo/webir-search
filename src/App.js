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
  ToggleButton,
} from '@appbaseio/reactivesearch';

const { ResultCardsWrapper } = ReactiveList;

// brand
// model
// doors
// km
// fuel type
// price
// currency
// condition
// publication link
// publication Title
// thumbnail 

// seller
//  - reputation 
//    - transactions: total, canceled, completed, ratings 
// available quantity
// address
//   - state name (location eg montevideo)
//   - city name (sayago)
// sigle owner
// control de traccion


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

        <DataSearch
          componentId='SearchFilter'
          dataField={['model', 'brand']}
          fuzziness={2}
          placeholder='Buscar por marca o modelo'
        />

        <div className='col'>
          <MultiDropdownList
            componentId='BrandSensor'
            dataField='brand.keyword'
            placeholder='Seleccionar marca'
          />
        </div>

        <div className='col'>
          <MultiList
            showSearch={false}
            componentId="CurrencySensor"
            dataField="currency.keyword"
            title="Moneda"
          />
        </div>

        <div className='col'>
          <MultiList
            showSearch={false}
            componentId="ConditionSensor"
            dataField="condition.keyword"
            title="Condición"
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
            start: 3000,
            end: 50000,
          }}
          rangeLabels={{
            start: 'Start',
            end: 'End',
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
            ],
          }}
          URLParams={false}
          includeNullValues
        />

        <SelectedFilters
          showClearAll={true}
          clearAllLabel='Clear filters'
        />

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
              'TagCloud01'
            ]
          }}


          render={({ data }) => (
            <ResultCardsWrapper>
              {
                data.map(item => (
                  <ResultCard key={item._id}
                    onClick={() => {openInNewTab(item.publication_link)}}
                  >
                    <ResultCard.Image
                      src={item.thumbnail}
                    />
                    <ResultCard.Title
                      dangerouslySetInnerHTML={{
                        __html: item.model
                      }}
                    />
                    <ResultCard.Description>
                      {item.brand}
                    </ResultCard.Description>
                    <ResultCard.Description>
                      {item.currency + ' ' + item.price}
                    </ResultCard.Description>
                  </ResultCard>
                ))
              }
            </ResultCardsWrapper>
          )}

        />

      </ReactiveBase>
    );
  }
}

export default App;