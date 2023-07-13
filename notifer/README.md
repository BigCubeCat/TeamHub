# Notificator

Microserver for send information about notifications

## Usage

After create ws connection, send init request:

```json
{
  "user": "username"
}
```

for "read" notification:

```json
{
  "del": "username"
}
```

### Create notification

For add notification, use ordinary `POST` request:
`/:name`
name - user id
