# **Listings**

Listings related to Auction House

<aside>
💡 Some of these are authenticated endpoints. You can visit [authentication](https://docs.noroff.dev/docs/v1/auction-house/authentication) to get an access token.

</aside>

These endpoints allow you to create, read, update, delete listings. Listings are the main content of an auction house.
They are created by profiles and can be bid on by other profiles.

These endpoints support pagination and sorting. Read more about these
features[here](https://docs.noroff.dev/docs/v1/pagination-sorting).

## **[The Listing model](https://docs.noroff.dev/docs/v1/auction-house/listings#the-listing-model)**

| Prop        | Type          | Default |
|-------------|---------------|---------|
| id          | string        | -       |
| title       | string        | -       |
| description | string        | -       |
| tags        | Array<string> | -       |
| media       | Array<string> | -       |
| created     | string        | -       |
| updated     | string        | -       |
| endsAt      | string        | -       |
| _count      | object        | -       |

---

## **[Query parameters](https://docs.noroff.dev/docs/v1/auction-house/listings#query-parameters)**

Not all of the properties of a listing are returned by default. You can use the following optional query parameters to
include additional properties in the response.

| Prop    | Type    | Default |
|---------|---------|---------|
| _seller | boolean | false   |
| _bids   | boolean | false   |

Example with all optional query parameters

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "media": [
    "https://url.com/image.jpg"
  ],
  "created": "2020-01-01T00:00:00.000Z",
  "updated": "2020-01-01T00:00:00.000Z",
  "endsAt": "2020-01-01T00:00:00.000Z",
  "seller": {
    "name": "string",
    "email": "user@example.com",
    "avatar": "https://url.com/image.jpg"
  },
  "bids": [
    {
      "id": "string",
      "amount": 0,
      "bidderName": "string",
      "created": "2020-01-01T00:00:00.000Z"
    }
  ],
  "_count": {
    "bids": 0
  }
}
```

---

## **[Filtering](https://docs.noroff.dev/docs/v1/auction-house/listings#filtering)**

You can filter for active listings by using the`_active`query flag.

You can filter based on an entry in the tags array by using the`_tag`query flag. You may only filter by one tag at a
time.

| Prop    | Type    | Default |
|---------|---------|---------|
| _tag    | string  | -       |
| _active | boolean | -       |

An example query filtering for active listings with the`my_tag`tag.

**GET/auction/listings?_tag=my_tag&_active=true**

---

## **[All listings](https://docs.noroff.dev/docs/v1/auction-house/listings#all-listings)**

This endpoint does not require authentication.

**GET/auction/listings**

Retrieve all listings.

If you want to get all listings by a specific profile, you can use
the[listings by profile](https://docs.noroff.dev/docs/v1/auction-house/profiles#all-listings-by-profile)endpoint.

Response

```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "tags": [
      "string"
    ],
    "media": [
      "https://url.com/image.jpg"
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
    "tags": [
      "string"
    ],
    "media": [
      "https://url.com/image.jpg"
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

## **[Single listing](https://docs.noroff.dev/docs/v1/auction-house/listings#single-listing)**

This endpoint does not require authentication.

**GET/auction/listings/<id>**

Retrieve a single listing by its id.

Use the`_seller`, and/or`_bids`flags to get more data from this request.

Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "media": [
    "https://url.com/image.jpg"
  ],
  "created": "2020-01-01T00:00:00.000Z",
  "updated": "2020-01-01T00:00:00.000Z",
  "endsAt": "2020-01-01T00:00:00.000Z",
  "_count": {
    "bids": 0
  }
}
```

---

## **[Create listing](https://docs.noroff.dev/docs/v1/auction-house/listings#create-listing)**

**POST/auction/listings**

Create a new listing. The`title`and`endsAt`properties are required, but we recommend at least including the`description`
and`media`properties as well.

Please note that listings`media`property must be an array of fully formed URLs that links to live and publicly
accessible images. The API will check the provided URLs and if any cannot be accessed publicly you will receive a 400
error response.

Request

```json
{
  "title": "string",
  // Required
  "description": "string",
  // Optional
  "tags": [
    "string"
  ],
  // Optional
  "media": [
    "https://url.com/image.jpg"
  ],
  // Optional
  "endsAt": "2020-01-01T00:00:00.000Z"
  // Required - Instance of new Date()
}
```

Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "media": [
    "https://url.com/image.jpg"
  ],
  "created": "2020-01-01T00:00:00.000Z",
  "updated": "2020-01-01T00:00:00.000Z",
  "endsAt": "2020-01-01T00:00:00.000Z",
  "_count": {
    "bids": 0
  }
}
```

---

## **[Update listing](https://docs.noroff.dev/docs/v1/auction-house/listings#update-listing)**

**PUT/auction/listings/<id>**

Update a listing.

Please note that listings`media`property must be an array of fully formed URLs that links to live and publicly
accessible images. The API will check the provided URLs and if any cannot be accessed publicly you will receive a 400
error response.

Request

```json
{
  "title": "string",
  // Optional
  "description": "string",
  // Optional
  "tags": [
    "string"
  ],
  // Optional
  "media": [
    "https://url.com/image.jpg"
  ]
  // Optional
}
```

---

## **[Delete listing](https://docs.noroff.dev/docs/v1/auction-house/listings#delete-listing)**

**DELETE/auction/listings/<id>**

Delete a listing.

Returns an empty 204 response on success.

---

## **[Bid on listing](https://docs.noroff.dev/docs/v1/auction-house/listings#bid-on-listing)**

**POST/auction/listings/<id>/bids**

Create new bid on a listing.

When a listing ends, the winning bid amount will be transferred to the seller's credits. All losing bids will be
refunded to its original bidder's credits.

Request

```json
{
  "amount": 0
  // Required
}
```

Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "media": [
    "https://url.com/image.jpg"
  ],
  "created": "2020-01-01T00:00:00.000Z",
  "updated": "2020-01-01T00:00:00.000Z",
  "endsAt": "2020-01-01T00:00:00.000Z",
  "_count": {
    "bids": 0
  }
}
```