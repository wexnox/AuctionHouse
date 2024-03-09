# **Authentication**

Authentication related to Auction House

This authentication is only related to the`/auction`endpoints.

These endpoints are used to authorize yourself with the API server. All`/auction`routes require an authorization token
to be included in the request.

---

## **[Register](https://docs.noroff.dev/docs/v1/auction-house/authentication#register)**

**POST/auction/auth/register**

Register a new user profile.

You will need to send all of the required values in your`POST`request:

Request

```json
{
  "name": "my_username",
  // Required
  "email": "first.last@stud.noroff.no",
  // Required
  "password": "UzI1NiIsInR5cCI",
  // Required
  "avatar": "https://img.service.com/avatar.jpg"
  // Optional
}
```

The`name`value must not contain punctuation symbols apart from underscore (`_`).

The`email`value must be a valid`stud.noroff.no`or`noroff.no`email address.

The`password`value must be at least 8 characters.

You can now use your registered account to log in.

---

## **[Login](https://docs.noroff.dev/docs/v1/auction-house/authentication#login)**

**POST/auction/auth/login**

Login with your registered user.

Request

```json
{
  "email": "first.last@stud.noroff.no",
  "password": "UzI1NiIsInR5cCI"
}
```

Response

```json
{
  "name": "my_username",
  "email": "first.last@stud.noroff.no",
  "credits": 1000,
  "avatar": "https://img.service.com/avatar.jpg",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
}
```

You can now use this access token as the Bearer token in the`Authorization`header for all`/auction`endpoints.

The response object will include your credits to use for bidding. Each user is given 1,000 credits by default.

---

## *
*[Example of sending Authorization header.](https://docs.noroff.dev/docs/v1/auction-house/authentication#example-of-sending-authorization-header)
**

Example

```json
const options = {
  headers: {
    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...."
  }
}

const response = await fetch(`${
API_BASE_URL
}/auction/listings`, options)
const data = await response.json()
```