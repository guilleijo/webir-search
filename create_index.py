#!/usr/bin/python3
from elasticsearch import Elasticsearch
import requests
import json

# Inicializo cliente ELK
elk_client = Elasticsearch(hosts=["localhost:9200"])

# print (client)
if elk_client.indices.exists(index="autos") is True:
    # print ("El indice ya existe");
    elk_client.indices.delete(index="autos")
    elk_client.indices.create(index="autos")
    result = 1
else:
    elk_client.indices.create(index="autos")
    # print ("Indice creado");


publications_url = "https://api.mercadolibre.com/sites/MLU/search?q=autos&offset="
offset = 0

while offset < 1000:
    offset = offset + 50
    url = publications_url + str(offset)
    r = requests.get(url)
    if r.status_code == 200:
        data = r.json()
        data_results = data["results"]
        for result in data_results:
            car_condition = result["condition"]
            publication_link = result["permalink"]
            publication_title = result["title"]
            car_price = result["price"]
            car_price_currency = result["currency_id"]
            car_attributes = result["attributes"]
            publication_thumbnail = result["thumbnail"]

            for attribute in car_attributes:
                attribute_id = attribute["id"]
                attribute_value = attribute["value_name"]
                if attribute_id == "ITEM_CONDITION":
                    car_condition2 = attribute_value
                elif attribute_id == "BRAND":
                    car_brand = attribute_value
                elif attribute_id == "DOORS":
                    car_doors = attribute_value
                elif attribute_id == "FUEL_TYPE":
                    car_fuel_type = attribute_value
                elif attribute_id == "KILOMETERS":
                    car_kilometers = attribute_value
                elif attribute_id == "MODEL":
                    car_model = attribute_value

            publication_document = {
                "brand": car_brand,
                "model": car_model,
                "doors": car_doors,
                "kilometers": car_kilometers,
                "fuel_type": car_fuel_type,
                "price": car_price,
                "currency": car_price_currency,
                "condition": car_condition,
                "publication_link": publication_link,
                "publication_title": publication_title,
                "thumbnail": publication_thumbnail,
            }

            json_document = json.dumps(publication_document)
            log_json_document = json.dumps(publication_document, indent=4)
            elk_client.index(index="autos", body=json_document)

    else:
        print(r)
        print("Error")
