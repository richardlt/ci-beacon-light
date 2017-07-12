# ci trafficlight engine

To start the engine, clone this repository then install dependencies with "npm install".

You should create your own config in configs folder that match your Jenkins setup. Example:
```javascript
{
    "refreshDelay": 5000,
    "url": "localhost:8080",
    "username": "",
    "password": "",
    "jobs": ["my-pipeline/job/develop"]
}
```

Then start the engine with the following command:
```sh
node app.js --config your_file_name.json
```

