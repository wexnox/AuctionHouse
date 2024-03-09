# **Profiles**

Profiles related to Auction House

<aside>
💡 These are authenticated endpoints. You can visit [authentication](https://docs.noroff.dev/docs/v1/auction-house/authentication) to get an access token.

</aside>

These endpoints allow you to manage profiles. They are the users of the auction house and are the owners of listings.

These endpoints support pagination and sorting. Read more about these
features[here](https://docs.noroff.dev/docs/v1/pagination-sorting).

## **[The Profile model](https://docs.noroff.dev/docs/v1/auction-house/profiles#the-profile-model)**

| Prop    | Type          | Default |
|---------|---------------|---------|
| name    | string        | -       |
| email   | string        | -       |
| avatar  | string        | -       |
| credits | integer       | -       |
| wins    | Array<string> | -       |
| _count  | Object        | -       |

---

## **[Query parameters](https://docs.noroff.dev/docs/v1/auction-house/profiles#query-parameters)**

Not all of the properties of a post are returned by default. You can use the following optional query parameters to
include additional properties in the response.

| Prop      | Type    | Default |
|-----------|---------|---------|
| _listings | boolean | false   |

Example with all optional query parameters

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "credits": 0,
  "wins": [
    "string"
  ],
  "listings": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "media": [
        "https://url.com/image.jpg"
      ],
      "created": "2020-01-01T00:00:00.000Z",
      "updated": "2020-01-01T00:00:00.000Z",
      "endsAt": "2020-01-01T00:00:00.000Z"
    }
  ],
  "_count": {
    "listings": 0
  }
}
```

---

## **[All profiles](https://docs.noroff.dev/docs/v1/auction-house/profiles#all-profiles)**

**GET/auction/profiles**

Retrieve all profiles.

Response

```json
[
  {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg",
    "credits": 0,
    "wins": [
      "string"
    ],
    "_count": {
      "listings": 0
    }
  },
  {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg",
    "credits": 0,
    "wins": [
      "string"
    ],
    "_count": {
      "listings": 0
    }
  }
]
```

---

## **[Single profile](https://docs.noroff.dev/docs/v1/auction-house/profiles#single-profile)**

**GET/auction/profiles/<name>**

Retrieve a single profile by its id.

Response

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "credits": 0,
  "wins": [
    "string"
  ],
  "_count": {
    "listings": 0
  }
}
```

---

## **[Update profile media](https://docs.noroff.dev/docs/v1/auction-house/profiles#update-profile-media)**

**PUT/auction/profiles/<name>/media**

Update or set profile`avatar`image.

Remove the`avatar`by setting the property to`null`.

Please note that profile`avatar`property must be a fully formed URL that links to a live and publicly accessible image.
The API will check the provided URL and if it cannot be accessed publicly you will receive a 400 error response.

Request

```json
{
  "avatar": "https://url.com/image.jpg"
  // Required
}
```

Request

```json
{
  "name": "string",
  "email": "user@example.com",
  "avatar": "https://url.com/image.jpg",
  "credits": 0,
  "wins": [
    "string"
  ],
  "_count": {
    "listings": 0
  }
}
```

---

## **[All listings by profile](https://docs.noroff.dev/docs/v1/auction-house/profiles#all-listings-by-profile)**

**GET/auction/profiles/<name>/listings**

Retrieve all listings created by profile.

The response is the same as the[listings](https://docs.noroff.dev/docs/v1/auction-house/listings#all-listings)endpoint,
and accepts the same optional query parameters and flags.

Response

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "media": [
      "https://url.com/image.jpg"
    ],
    "tags": [
      "string"
    ],
    "created": "2020-01-01T00:00:00.000Z",
    "updated": "2020-01-01T00:00:00.000Z",
    "endsAt": "2020-01-01T00:00:00.000Z",
    "_count": {
      "bids": 0
    }
  },
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "media": [
      "https://url.com/image.jpg"
    ],
    "tags": [
      "string"
    ],
    "created": "2020-01-01T00:00:00.000Z",
    "updated": "2020-01-01T00:00:00.000Z",
    "endsAt": "2020-01-01T00:00:00.000Z",
    "_count": {
      "bids": 0
    }
  }
  // ...
]
```

---

## **[All bids by profile](https://docs.noroff.dev/docs/v1/auction-house/profiles#all-bids-by-profile)**

**GET/auction/profiles/<name>/bids**

Retrieve all bids made by profile.

Use the`_listing`flag to include the associated listing's data.

Response

```json
[
  {
    "id": "string",
    "amount": 0,
    "bidderName": "string",
    "created": "2020-01-01T00:00:00.000Z"
  },
  {
    "id": "string",
    "amount": 0,
    "bidderName": "string",
    "created": "2020-01-01T00:00:00.000Z"
  }
  // ...
]
```