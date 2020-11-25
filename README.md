This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Load and query cars from MercadoLibre using Elasticseach, Python and React.

## Setup
- Install `elasticsearch` in your machine
- Enable cors adding the following lines in `elasticsearch.yml`:
```
http.cors.enabled : true
http.cors.allow-origin: "*"
http.cors.allow-methods: OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers: X-Requested-With,X-Auth-Token,Content-Type,Content-Length
http.cors.allow-credentials: true
```
- Create a python virtual environment
- Install python dependencies: `pip install -r requirements.txt`
- Install js dependencies: `yarn install`

## Run the code
- Load the data to your index: `python create_index.py`
- Run the react app: `yarn start`
