
# Implement Auth JWT, Redis, Express, MongoDB

Middleware Authentication using JWT, and Redis Caching CRUD using Expres and MongoDB




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`SECRET_KEY`


## Install

To Install this project run

```bash
  npm install
```

If you haven't installed Redis, see the [Redis Documentation](https://developer.redis.com/howtos/quick-start) on your Operating System

And Run this project
```bash
  node server.js
```
## Caching Position

Controllers are defined at `controllers/userController.js`. Cached data is saved as JSON.stringify and loaded as JSON.parse
 - Set Cache from Redis (when C, U, D)
    - `getAll`
    - `create`
    - `udpate`
    - `delete`


## API Reference

#### Create User

```http
  POST /user
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userName` | `string` | **Required** |
| `accountNumber` | `string` | **Required** |
| `emailAddress` | `string` | **Required** |
| `identityNumber` | `string` | **Required** |


##### To generate `Get User`, `Edit User`, and `Delete User`, First request `generate-token` from user you created before

#### Generate Token

```http
  POST /generate-token
```

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accountNumber` | `string` | **Required** |
| `identityNumber` | `string` | **Required** |


##### You can get accessToken and fill the Authorization Header to:
- `GET /user`
- `PUT /user/${userName}`
- `DELETE /user/${userName}`


#### Get All Users

```http
  GET /user
```
| Headers | value      |
| :-------- | :------- |
| `Accepet` | `*/` |
| `Authorization` | `{{accessToken value}}` |

#### Get User by Account Number

```http
  GET /user/account-number
```
| Headers | value      |
| :-------- | :------- |
| `Accepet` | `*/` |
| `Authorization` | `{{accessToken value}}` |


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accountNumber`      | `string` | **Required** |

#### Get User by Identity Number

```http
  GET /user/identity-number
```
| Headers | value      |
| :-------- | :------- |
| `Accepet` | `*/` |
| `Authorization` | `{{accessToken value}}` |


| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `identityNumber`      | `string` | **Required** |


#### Update User By userName

```http
  PUT /user/${userName}
```
| Headers | value      |
| :-------- | :------- |
| `Accepet` | `*/` |
| `Authorization` | `{{accessToken value}}` |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | **Required** |

| Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `accountNumber` | `string` | **Required** |
| `emailAddress` | `string` | **Required** |


#### Delete User By userName

```http
  DELETE /user/${userName}
```
| Headers | value      |
| :-------- | :------- |
| `Accepet` | `*/` |
| `Authorization` | `{{accessToken value}}` |

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userName`      | `string` | **Required** |
"# express-mongodb-redis-jwt" 
