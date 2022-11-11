const mongoose = require("mongoose");
const yargs = require("yargs");
const args = yargs.argv;
const list = require("./models/listModel");
const chalk = require("chalk");
var Spinner = require("cli-spinner").Spinner;
require("dotenv").config();
//database connection
var obj = new Spinner("please wait...%s");
obj.start();
const DbUrl = process.env.DB_URL;
mongoose
  .connect(DbUrl)
  .then(() => {
    obj.stop(true);
    switch (process.argv[2]) {
      case "create":
        create();
        break;
      case "read":
        read();
        break;
      case "update":
        update();
        break;
      case "delete":
        deleteItem();
        break;
      case "crudGuide":
        crudGuide();
        break;
      default:
        console.log(
          chalk.bgRedBright.bold.black(
            `\n${process.argv[2]} is an inValid Operation\n`
          )
        );
        console.log(
          chalk.bgGreenBright.bold.black(
            "Type 'node index crudGuide' to know about the valid operations"
          )
        );
    }
  })
  .catch((err) => {
    obj.stop(true);
    console.log(
      chalk.bgRedBright.bold.black("Database is not connected properly")
    );
  });
const create = () => {
  obj.start();
  list
    .create([
      {
        description: args.description,
        completed: args.status,
      },
    ])
    .then(() => {
      obj.stop(true);
      console.log(chalk.bgGreenBright.black.bold("Task Added!"));
    })
    .catch(() => {
      obj.stop(true);
      console.log(
        chalk.bgRedBright.bold.black("Something went wrong , please try again!")
      );
    });
};
const read = () => {
  obj.start();
  list
    .find({ completed: "false" })
    .then((result) => {
      obj.stop(true);
      if (result.length > 0) {
        console.log(
          chalk.bgYellowBright.black.bold("\nThe incomplete tasks are :\n")
        );
        result.map((value) => {
          console.log(value.description);
        });
      } else {
        console.log(
          chalk.bgYellowBright.black.bold(
            "No tasks are in reading list.All are completed ones!"
          )
        );
      }
    })
    .catch(() => {
      obj.stop(true);
      console.log(
        chalk.bgRedBright.bold.black("Something went wrong , please try again!")
      );
    });
};
const update = () => {
  obj.start();
  list
    .updateMany({ completed: false }, { $set: { completed: true } })
    .then((result) => {
      obj.stop(true);
      if (result.modifiedCount > 0) {
        console.log(
          chalk.bgGreenBright.black.bold(
            "you have marked all the incomplete tasks as complete"
          )
        );
      } else {
        console.log(
          chalk.bgGreenBright.black.bold("All the tasks are already completed")
        );
      }
    })
    .catch(() => {
      obj.stop(true);
      console.log(
        chalk.bgRedBright.bold.black("Something went wrong ,please try again!")
      );
    });
};
const deleteItem = () => {
  obj.start();
  list
    .deleteOne({ _id: args.id })
    .then((result) => {
      obj.stop(true);
      if (result.deletedCount > 0) {
        console.log(chalk.bgRedBright.black.bold("The Task is deleted "));
      } else {
        console.log(
          chalk.bgRedBright.black.bold(
            "The task which you are trying  to delete is not available."
          )
        );
      }
    })
    .catch(() => {
      obj.stop(true);
      console.log(
        chalk.bgRedBright.bold.black("Something went wrong , please try again!")
      );
    });
};
const crudGuide = () => {
  console.log(chalk.bgMagentaBright.bold.black("\nUse the CRUD operations\n"));
  console.log(
    `${chalk.bgYellowBright.bold.black(
      "create:"
    )} - to create the task\n\n${chalk.bgBlueBright.bold.black(
      "create command:"
    )} : 'node index create --description:'descriptionValue' --status='true or false only'\n`
  );
  console.log(
    `${chalk.bgYellowBright.bold.black(
      "read:"
    )} - to read the task which is not completed\n\n${chalk.bgBlueBright.bold.black(
      "read command:"
    )} 'node index read'\n`
  );
  console.log(
    `${chalk.bgYellowBright.bold.black(
      "update:"
    )} - to update the status of the task\n\n${chalk.bgBlueBright.bold.black(
      "update command:"
    )} 'node index update'\n `
  );
  console.log(
    `${chalk.bgYellowBright.bold.black(
      "delete:"
    )} - to remove the task\n\n${chalk.bgBlueBright.bold.black(
      "delete command:"
    )}: 'node index delete --id='document's id value'\n`
  );
};
