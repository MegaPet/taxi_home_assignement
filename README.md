# taxi_home_assignement

# By: Jáger Péter, aka @MegaPet

## Installation

go into the server directory, give out 
``` npm install ```
command.

## Running the server

the application uses .env, wich I did not include.
to make sure the app works, make your own with following example:

````
PORT=5432
NODE_ENV=development
USERNAME=postgres
PASSWORD=admin
HOST=localhost
```

in the root directory give out the next commands:
```bash
npm run build
```
```bash
npm run serve
```

## Testing:

for '/api/getVehicles' :

```
http://localhost:3000/vehicles/api/getVehicles
```

for the others, i had to use the webbrowsers command line :

for '/api/addVehicle' :

```js
fetch('http://localhost:3000/vehicles/api/addVehicle', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    license_plate: 'ABC-223',
    brand: 'Toyota',
    model: 'Corolla',
    capacity: 5,
      fuel: 'gasoline',
      range: 531
  })
})
```

for '/api/listOptimized' :

```js

fetch('http://localhost:3000/vehicles/api/listOptimal', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    distance: 51,
    passanger_count: 3
  }),
})

```