#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
let ask = async () => {
    while (condition) {
        let asking = await inquirer.prompt([
            {
                name: "choose",
                message: "Select an option",
                type: "list",
                choices: ["Read todos", "add todos", "update todos", "delete todos", "exit"],
            },
        ]);
        if (asking.choose === "Read todos") {
            await view();
        }
        else if (asking.choose === "add todos") {
            await add();
        }
        else if (asking.choose === "delete todos") {
            await deltodos();
        }
        else if (asking.choose === "update todos") {
            await updateTodos();
        }
        else if (asking.choose === "exit") {
            condition = false;
        }
    }
};
let add = async () => {
    let newTask = await inquirer.prompt({
        name: "task",
        type: "input",
        message: "Add to your todo list"
    });
    todos.push(newTask.task);
    console.log(`${newTask.task}, is added to your todo list`);
    console.log(`${todos}`);
    view();
};
let deltodos = async () => {
    await view();
    let deleteTodos = await inquirer.prompt({
        name: "delete",
        type: "number",
        message: "Enter your desire index no. to delete a todos"
    });
    todos.splice(deleteTodos.delete - 1, 1);
    console.log(`${deleteTodos.delete - 1},is deleted from your todos list`);
};
let view = () => {
    console.log("\n your Todo list is :-\n ");
    todos.forEach((task, index) => {
        console.log(`${index + 1}:${task}`);
    });
};
let updateTodos = async () => {
    await view();
    let update = await inquirer.prompt([
        {
            name: "remove",
            type: "number",
            message: " Enter the Index No. which you want to update or replace "
        },
        {
            name: "New_update",
            type: "input",
            message: "Enter the new Todo Task to your desire index no."
        }
    ]);
    todos[update.remove - 1] = update.New_update;
    console.log(`\n ToDos at index no.${update.remove - 1} is updated successfully`);
};
ask();
