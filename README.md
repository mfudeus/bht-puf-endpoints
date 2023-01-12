# bhf-puf-endpoint

## Starting

```sh
docker-compose up --build -d
```

# Endpoints

## Authentifizierung

### Sign Up

`POST` /auth/signup

**Beschreibung**

Registrierung eines neuen Benutzers mit Username und Passwort. Die Authentifizierung erfolgt über JSON Web Tokens (JWT) (Erfüllung erster Zusatzanforderung). Der zurückgegebene JWT authentifiziert den Benutzer sofort.

**Body**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiINTZkMTE1YWNkMWYiLCJ1…"
}
```

### Login

`POST` /auth/login

**Beschreibung**

Anmeldung eines registrierten Benutzers mit Username und Passwort. Die Authentifizierung erfolgt über JSON Web Tokens (JWT) (Erfüllung erster Zusatzanforderung). Mit dem zurückgegebene JWT ist der Benutzer authentifiziert und er wird als „angemeldet / online“ dargestellt.

Body

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiINTZkMTE1YWNkMWYiLCJ1…"
}
```

### Logout

`POST` /auth/logout

**Beschreibung**

Abmeldung eines Benutzers. Dieser wird anschließend als „abgemeldet / offline“ dargestellt.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
{
  "_id": "63bbdba3ecfea56d115acd1f",
  "username": "admin",
  "password": "$2b$12$KLStJ8LOwNnKOl2m0khKH.7Q/BHjYglk.QBry5G/snrpCaoWThLF2",
  "role": "admin",
  "active": true,
  "created_at": "2023-01-09T09:17:23.957Z",
  "updated_at": "2023-01-12T10:32:15.571Z",
  "logged_in": false
}
```

## User

### Benutzerinfos

`GET` /api/v1/user

**Beschreibung**

Gibt den vollständigen Datensatz des aktuell angemeldeten Benutzers zurück.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
{
  "_id": "63bbdba3ecfea56d115acd1f",
  "username": "admin",
  "password": "$2b$12$KLStJ8LOwNnKOl2m0khKH.7Q/BHjYglk.QBry5G/snrpCaoWThLF2",
  "role": "admin",
  "active": true,
  "logged_in": true,
  "created_at": "2023-01-09T09:17:23.957Z",
  "updated_at": "2023-01-09T09:17:23.957Z"
}
```

## History / Scoreboard

### Spielerhistory

`GET` /api/v1/histories

**Beschreibung**

Gibt die Spielhistorie (Win/Lose + Punkte) des angemeldeten Spielers zurück.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
[
  {
    "_id": "63bbd8b18d30d9a3797c815e",
    "points": 0,
    "win": false,
    "created_at": "2023-01-09T09:04:40.418Z",
    "updated_at": "2023-01-09T09:05:50.245Z"
  },
  {
    "_id": "63bbd8b18d30d9a3787c815e",
    "points": 2,
    "win": true,
    "created_at": "2023-01-09T09:12:40.418Z",
    "updated_at": "2023-01-09T09:12:50.245Z"
  }
]
```

### Scoreboard

`GET` /api/v1/histories/all

**Beschreibung**

Gibt die Spielhistorie (Win/Lose + Punkte) aller Spieler zurück.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
[
  {
    "_id": "63bbd8b18d30d9a3797c815e",
    "user": {
      "_id": "63b81cba2ff529bb8c25ad65",
      "username": "admin",
      "role": "admin",
      "active": true,
      "created_at": "2023-01-09T09:09:10.168Z",
      "updated_at": "2023-01-09T09:09:10.168Z"
    },
    "points": 0,
    "win": false,
    "created_at": "2023-01-09T09:04:40.418Z",
    "updated_at": "2023-01-09T09:05:50.245Z"
  },
  {
    "_id": "63bbd9c6c37f10e99bfcb857",
    "user": {
      "_id": "63bbd9b6c37f10e99bfcb855",
      "username": "tester",
      "role": "user",
      "active": true,
      "created_at": "2023-01-09T09:09:10.168Z",
      "updated_at": "2023-01-09T09:09:10.168Z"
    },
    "points": 0,
    "win": false,
    "created_at": "2023-01-09T09:09:26.744Z",
    "updated_at": "2023-01-09T09:09:26.744Z"
  },
  {
    "_id": "63bbd9f7c37f10e99bfcb85d",
    "user": {
      "_id": "63bbd9b6c37f10e99bfcb855",
      "username": "tester",
      "role": "user",
      "active": true,
      "created_at": "2023-01-09T09:09:10.168Z",
      "updated_at": "2023-01-09T09:09:10.168Z"
    },
    "points": 5,
    "win": true,
    "created_at": "2023-01-09T09:10:15.470Z",
    "updated_at": "2023-01-09T09:10:15.470Z"
  }
]
```

### Erstellung neuer History-Eintrag

`POST` /api/v1/histories

**Beschreibung**

Erstellt einen neuen Eintrag in der Spielhistorie (Win/Lose + Punkte) des jeweils angemeldeten Spielers.

**Header**

Bearer mit Benutzer-Token

**Body**

```json
{
  "win": true,
  "points": 5
}
```

Response

```json
{
  "user": "63bbd9b6c37f10e99bfcb855",
  "win": true,
  "points": 5,
  "_id": "63bbd9f7c37f10e99bfcb85d",
  "created_at": "2023-01-09T09:10:15.470Z",
  "updated_at": "2023-01-09T09:10:15.470Z"
}
```

## Players

### Online-Player

`GET` /api/v1/players/online

**Beschreibung**

Liste alle Benutzer mit dem Status „angemeldet / online“.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
[
  {
    "_id": "63bbdb9aecfea56d115acd1b",
    "username": "tester",
    "role": "user",
    "active": true,
    "created_at": "2023-01-09T09:17:14.645Z",
    "updated_at": "2023-01-09T09:17:14.645Z",
    "logged_in": true
  },
  {
    "_id": "63bbdba3ecfea56d115acd1f",
    "username": "admin",
    "role": "admin",
    "active": true,
    "created_at": "2023-01-09T09:17:23.957Z",
    "updated_at": "2023-01-12T10:34:42.111Z",
    "logged_in": true
  }
]
```

## Lobbies

### Verfügbare Lobbies

`GET` /api/v1/lobbies

**Beschreibung**

Gibt die erstellten Lobbys zurück.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
[
  {
    "_id": "63bfe4e38cc5ef6488efb2d1",
    "name": "Hello World Lobby",
    "created_at": "2023-01-12T10:45:55.655Z",
    "updated_at": "2023-01-12T10:45:55.655Z"
  },
  {
    "_id": "63bfe5378cc5ef6488efb2d5",
    "name": "Meine Spiele-Lobby",
    "created_at": "2023-01-12T10:47:19.867Z",
    "updated_at": "2023-01-12T10:47:19.867Z"
  }
]
```

### Lobby erstellen

POST /api/v1/lobbies

**Beschreibung**

Erstellt eine neue Lobby.

**Header**

Bearer mit Benutzer-Token

**Body**

```json
{
  "name": "Meine Spiele-Lobby"
}
```

Response

```json
{
  "name": "Meine Spiele-Lobby",
  "_id": "63bfe4e38cc5ef6488efb2d1",
  "created_at": "2023-01-12T10:45:55.655Z",
  "updated_at": "2023-01-12T10:45:55.655Z"
}
```

## Game

### Aktion einer Lobby

`GET` /api/v1/game/:id

**Beschreibung**

Alle Aktionen eines Games.

**Header**

Bearer mit Benutzer-Token

**Response**

```json
[
  {
    "_id": "63bfff42648f2dbf710ec9b1",
    "lobby": "63bfe5378cc5ef6488efb2d5",
    "player": "63bbdba3ecfea56d115acd1f",
    "action": "MOVE_FORWARD",
    "created_at": "2023-01-12T12:38:26.427Z",
    "updated_at": "2023-01-12T12:38:26.427Z",
    "__v": 0
  },
  {
    "_id": "63bfff87648f2dbf710ec9b4",
    "lobby": "63bfe5378cc5ef6488efb2d5",
    "player": "63bbdba3ecfea56d115acd1f",
    "action": "MOVE_BACKWARD",
    "created_at": "2023-01-12T12:39:35.390Z",
    "updated_at": "2023-01-12T12:39:35.390Z",
    "__v": 0
  },
  {
    "_id": "63bfff8b648f2dbf710ec9b6",
    "lobby": "63bfe5378cc5ef6488efb2d5",
    "player": "63bbdba3ecfea56d115acd1f",
    "action": "MOVE_LEFT",
    "created_at": "2023-01-12T12:39:39.636Z",
    "updated_at": "2023-01-12T12:39:39.636Z",
    "__v": 0
  },
  {
    "_id": "63bfff90648f2dbf710ec9b8",
    "lobby": "63bfe5378cc5ef6488efb2d5",
    "player": "63bbdba3ecfea56d115acd1f",
    "action": "MOVE_RIGHT",
    "created_at": "2023-01-12T12:39:44.684Z",
    "updated_at": "2023-01-12T12:39:44.684Z",
    "__v": 0
  }
]
```

### Erstellung einer neuen Aktion

`POST` /api/v1/game/:id

**Beschreibung**

Erstellen einer neuen Aktion für ein Game.

**Header**

Bearer mit Benutzer-Token

**Body**

```json
{
  "lobby": "63bfe5378cc5ef6488efb2d5",
  "action": "MOVE_FORWARD"
}
```

**Response**

```json
{
  "lobby": "63bfe5378cc5ef6488efb2d5",
  "player": "63bbdba3ecfea56d115acd1f",
  "action": "MOVE_FORWARD",
  "_id": "63bfff42648f2dbf710ec9b1",
  "created_at": "2023-01-12T12:38:26.427Z",
  "updated_at": "2023-01-12T12:38:26.427Z"
}
```
