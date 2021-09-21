
<!-- Add banner here -->

# Nearby

API based service to show nearest stores based on the geographical coordinates.
Uses JWT based authentication to validate API requests.
Hosted on AWS.

# Screenshots

Create Token
![CreateToken](https://raw.githubusercontent.com/abhishekverma3189/nearby_jumbo/9d9876fa627673953895c92ee5cc2ff2ec245096/assets/createToken.png)

Fetch token
![FetchToken](https://raw.githubusercontent.com/abhishekverma3189/nearby_jumbo/9d9876fa627673953895c92ee5cc2ff2ec245096/assets/fetchToken.png)

List Nearby stores
![Nearby Stores](https://raw.githubusercontent.com/abhishekverma3189/nearby_jumbo/9d9876fa627673953895c92ee5cc2ff2ec245096/assets/getNearbyStores.png)

# Table of contents

- [Nearby](#nearby)
- [Screenshots](#screenshots)
- [Table of contents](#table-of-contents)
- [Installation](#installation)
- [APIs:](#apis)


# Installation
[(Back to top)](#table-of-contents)

Pre-Requisites:
- nvm
- node v12.x.x
- npm
- mongo db
- python
- node-gyp

Clone And Setup application:
- cd $HOME
- git clone git@github.com:abhishekverma3189/nearby_jumbo.git
- cd nearby_jumbo
- npm install
- npm start

Output on terminal:
```➜  /nearby git:(master) ✗ npm start

> nearby@0.0.0 start /path/to/projects/nearby
> node ./bin/www

Listening on port 3000

```

# APIs:
[(Back to top)](#table-of-contents)

**1. Create Token:**

    curl --location --request POST 'http://localhost:3000/api/auth/createToken' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "XXXXX",
        "password": "XXXX"
    }'

**2. Fetch Token**

    curl --location --request GET 'http://localhost:3000:3000/api/auth/fetchToken' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "XXXXX",
        "password": "XXXX"
    }'

*JWT  NEEDED FOR THE BELOW APIs*

**3. List All Stores**

    curl --location --request GET 'http://localhost:3000:3000/stores' \
    --header 'authorization: JWT_TOKEN'

**4. Show Store Details:**

    curl --location --request GET 'http://localhost:3000/stores/EOgKYx4XFiQAAAFJa_YYZ4At' \
    --header 'authorization: JWT_TOKEN'


**5. Create New Store:**

    curl --location --request POST 'http://localhost:3000/stores' \
    --header 'authorization: JWT_TOKEN' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "addressName": "some name",
        "latitude": "51.778461",
        "locationType": "SupermarktPuP",
        "longitude": "4.615551",
        "postalCode": "3295 BD",
        "street": "Kerkstraat",
        "street2": "37",
        "todayClose": "20:00",
        "todayOpen": "08:00"
    }'

**6. Update Store Details**

    curl --location --request PUT 'http://localhost:3000/stores/EOgKYx4XFiQAAAFJa_YYZ4At' \
    --header 'authorization: JWT_TOKEN' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "street35": "Bailey Road"
    }'

**7. Get Nearby Stores**

    curl --location --request POST 'http://localhost:3000/stores/nearby' \
    --header 'authorization: JWT_TOKEN' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "lat1": "50.002103",
        "long1": "4.163299",
        "unit": "K"
    }'