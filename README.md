# **Web application for sending acquired medical (DICOM) data to volunteers**

This application was created for [the MAFIL laboratory](https://mafil.ceitec.cz/en/) as my bachelor's thesis. The entire text of the thesis can be found at **to be added...**.

#### Table of Contents

- [Installation Tutorial](#installation)

## Installation Tutorial

1. Install Docker
2. Fill out the required env variables in `docker-compose.yml`
   - [Twilio](https://www.twilio.com/) credentials are needed for sending SMS messages
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
