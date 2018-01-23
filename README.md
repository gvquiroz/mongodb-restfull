# MongoDB API RESTful

## Description
Elastcsearch RESTful api alike for mongo db.

## Methods

### Find record by id
**GET** 
'/:database/:collection/:id'

### Query by field
**POST**
'/:database/:collection/_search'

Body example

```json
{
  "query": {
		 "name": "BMW"
  }
}
```


### Get 1000 records of collection
**GET**
'/:database/:collection'

### Insert single document
**PUT**
'/:database/:collection/'

Body example

```json
{
  "name": "BMW",
  "models": [
    "M3",
    "M4",
    "E66"
  ]
}
```

### Insert bulk
**POST** 
'/:database/:collection/_bulk'

Body example (Its important to maintain the bulk array at the start of the json body)

```json
{
  "bulk": [
    {
      "name": "Ford",
      "models": [
        "Fiesta",
        "Focus",
        "Mustang"
      ]
    },
    {
      "name": "BMW",
      "models": [
        "320",
        "X3",
        "X5"
      ]
    },
    {
      "name": "Fiat",
      "models": [
        "500",
        "Panda"
      ]
    }
  ]
}
```


