# CRUD APPLICATION

### Tech Stacks Used

- Node.js
- MongoDB

### Demo Video:

https://user-images.githubusercontent.com/84177086/201355937-d92e0b39-3b66-4186-86a3-a84364fe2d2f.mp4

### CRUD Operations

- create - to create the task
- read - to read the task which is not completed
- update - to update the status of the task
- delete - to delete the task

## :point_down:Steps to initialize the project:

- Clone the repository

```
$ git clone
```

- Redirect to the cloned repo directory

- Open up the terminal

- Install the dependencies

```
npm install
```

#### Important : Create .env file and include the database connection url which will be obtained from mongoDB official site (https://www.mongodb.com/atlas) after creating the database in it.

```
DB_URL= database_url
```

- To know about the CRUD Commands,run

```
node index crudGuide
```

- To run create command,

```
node index create --description="writeDescription" --status="boolean value like either true or false"
```

- To run read command,

```
node index read
```

- To run update command,

```
node index update
```

- To run delete command,

```
node index delete --id="document's id"
```
