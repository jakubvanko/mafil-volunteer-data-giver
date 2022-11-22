# **Web application for sending acquired medical (DICOM) data to volunteers**

This application was created for [the MAFIL laboratory](https://mafil.ceitec.cz/en/) as my bachelor's thesis. The entire text of the thesis can be found at **to be added...**.

#### Table of Contents

- [Installation Tutorial](#installation)
- [API Endpoints](#api-endpoints)

## Installation Tutorial

1. Install Docker
2. Fill out the required env variables in `docker-compose.yml` (for frontend as well as backend!)
   - [Odorik](https://www.odorik.cz/w/api:sms) credentials are needed for sending SMS messages
   - Mail credentials are needed for sending emails
   - INCOMING_API_KEY and OUTGOING_API_KEY are used for communication with other MAFIL microservices
   - PACS_API_URL and LOG_API_URL represent endpoints of MAFIL microservices that are used by this application (application fails gracefully if they are not provided)
   - TOKEN_SECRET and EMAIL_TOKEN_SECRETS are secrets used for signing Json Web Tokens
   - HASH_PEPPER can be used for stronger password hashing
   - LOGIN_URL represents a URL of the frontend login page
   - REACT_APP_API_URL is the URL of the backend API
   - SITE_ADDRESS represents the URL (domain) of the website - it is needed to create an SSL certificate for it
   - The other env variables can be used to change small particularities of the system (timeouts, limits, etc.)
   - For more information about the particular variables see `.env.example` in the respective folders (backend/frontend)
3. Run `docker-compose up`

## API Endpoints

Authorization can be performed either as a bearer tohen in the Authorization header, or as a field "access_token" in the body of the request.

### POST /api/users

**Description:** Create a new volunteer account

**Used by:** MAFILDB

**Authorization:** Incoming API key

**URL params:** none

**Body:**

```json
{
  "email": "example@example.com",
  "phoneNumber": "+420111111111", // must contain +
  "visitDate": "1660000073131", // timestamp of ms
  "name": "John Doe",
  "studyInstanceUID": "study82733"
}
```

**Response:** 201

```json
{
  "id": "18d1521b151fsayh4" // string
}
```

### POST /api/users/tokens

**Description:** Get a USER token (for other actions)

**Used by:** Volunteer

**Authorization:** Email token

**URL params:** none

**Body:**

```json
{
  "secret": "620BBB06C8" // code from SMS
}
```

**Response:** 200

```json
{
  "id": "18d1521b151fsayh4", // string
  "token": "jf81js2basb9b71babsab..." // string
}
```

### GET /api/users/\<userId>

**Description:** Get volunteer details

**Used by:** MAFILDB, Volunteer

**Authorization:** Incoming API key || USER token

**URL params:** userId

**Body:** empty

**Response:** 200

```json
{
  "id": "18d1521b151fsayh4", // string
  "expirationDate": "1660000073131", // timestamp of ms
  "visitDate": "1660000073131", // timestamp of ms
  "dataSize": "2.554815" // size in GB
}
```

### DELETE /api/users/\<userId>

**Description:** Delete a volunteer

**Used by:** MAFILDB, Volunteer

**Authorization:** Incoming API key || USER token

**URL params:** userId

**Body:** empty

**Response:** 204 - empty

### PUT /api/users/\<userId>/data

**Description:** Deliver images from PACS

**Used by:** PACS-API

**Authorization:** Incoming API key

**URL params:** userId

**Body:**

multipart/form-data:

- files: [file1, file2, file3] // array of DICOM files

**Response:** 204 - empty

### POST /api/users/\<userId>/data

**Description:** Download data package with images

**Used by:** Volunteer

**Authorization:** Email token

**URL params:** userId

**Body:** empty

**Response:** 200 - native data download starts

### GET /api/users/study/\<studyInstanceUID>

**Description:** Get IDs of users with specific studyInstanceUID

**Used by:** MAFILDB

**Authorization:** Incoming API key

**URL params:** studyInstanceUID

**Body:** empty

**Response:** 200

```json
[ user1, user2, user3] // array of users
```

### GET /api/users/secrets

**Description:** Send login code to volunteer's mobile phone

**Used by:** Volunteer

**Authorization:** Email token

**URL params:** none

**Body:** empty

**Response:** 204 - empty

### GET /api/users/secrets/details

**Description:** Get details of the sms login code

**Used by:** Volunteer

**Authorization:** Email token

**URL params:** none

**Body:** empty

**Response:** 200

```json
{
  "leftSMSAmount": "21", // number
  "secretExpirationDate": "1660000073131", // timestamp of ms
  "secretTryAmount": "2" // number
}
```
