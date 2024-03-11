## /api/v1/auction/auth/register

```json
{
  "name": "owjTndjSrypX1txOaAwS",
  "email": "user@example.com",
  "avatar": "string",
  "password": "stringst"
}
```

## /api/v1/auction/auth/login

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

## api/v1/auction/profiles

```json
[
  {
    "name": "A2B",
    "email": "user@example.com",
    "avatar": "string",
    "credits": 0,
    "listings": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "title": "string",
        "description": "string",
        "media": [
          "string"
        ],
        "tags": [
          "string"
        ],
        "created": "2024-03-10T17:41:59.831Z",
        "updated": "2024-03-10T17:41:59.831Z",
        "endsAt": "2024-03-10T17:41:59.831Z"
      }
    ],
    "wins": [
      "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    ],
    "_count": {
      "listings": 0
    }
  }
]
```

## /api/v1/auction/profiles/{name}

```json
{
  "name": "P7Xtp",
  "email": "user@example.com",
  "avatar": "string",
  "credits": 0,
  "listings": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "description": "string",
      "media": [
        "string"
      ],
      "tags": [
        "string"
      ],
      "created": "2024-03-10T17:44:31.401Z",
      "updated": "2024-03-10T17:44:31.401Z",
      "endsAt": "2024-03-10T17:44:31.401Z"
    }
  ],
  "wins": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "_count": {
    "listings": 0
  }
}
```

## /api/v1/auction/profiles/{name}/media

```json
{
  "avatar": "string"
}
```

## /api/v1/auction/profiles/{name}/listings

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "tags": [
      "string"
    ],
    "created": "2024-03-10T17:49:45.555Z",
    "updated": "2024-03-10T17:49:45.555Z",
    "endsAt": "2024-03-10T17:49:45.555Z",
    "bids": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "amount": 0,
        "bidderName": "string",
        "created": "2024-03-10T17:49:45.555Z"
      }
    ],
    "seller": {
      "name": "BXjPtUechBYK_8t_J1fl",
      "email": "user@example.com",
      "avatar": "string",
      "wins": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ]
    },
    "_count": {
      "bids": 0
    }
  }
]
```

## /api/v1/auction/profiles/{name}/bids

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "amount": 0,
    "bidderName": "string",
    "created": "2024-03-10T17:50:30.738Z",
    "listing": {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "title": "string",
      "description": "string",
      "media": [
        "string"
      ],
      "tags": [
        "string"
      ],
      "created": "2024-03-10T17:50:30.738Z",
      "updated": "2024-03-10T17:50:30.738Z",
      "endsAt": "2024-03-10T17:50:30.738Z"
    }
  }
]
```

# /api/v1/auction/profiles/{name}/credits

```json
{
  "credits": 0
}
```

# Auction-listings - Auction listings related endpoints

## GET /api/v1/auction/listings

```json
[
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "description": "string",
    "media": [
      "string"
    ],
    "tags": [
      "string"
    ],
    "created": "2024-03-10T17:52:21.867Z",
    "updated": "2024-03-10T17:52:21.867Z",
    "endsAt": "2024-03-10T17:52:21.867Z",
    "bids": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "amount": 0,
        "bidderName": "string",
        "created": "2024-03-10T17:52:21.867Z"
      }
    ],
    "seller": {
      "name": "PD9HBRIgHAhu927ZHauD",
      "email": "user@example.com",
      "avatar": "string",
      "wins": [
        "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      ]
    },
    "_count": {
      "bids": 0
    }
  }
]
```

## POST /api/v1/auction/listings

```json


{
  "title": "string",
  "description": "string",
  "endsAt": "2024-03-10T17:54:22.864Z",
  "tags": [
    "string"
  ],
  "media": "string"
}
```

## GET /api/v1/auction/listings/{id}

## PUT /api/v1/auction/listings/{id}

```json
{
  "title": "string",
  "description": "string",
  "tags": [
    "string"
  ],
  "media": "string"
}
```

## DELETE /api/v1/auction/listings/{id}

## POST /api/v1/auction/listings/{id}/bids

```json
{
  "amount": 1
}
```