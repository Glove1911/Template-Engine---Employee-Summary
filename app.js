const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

console.log('Please build your team.')

const teamMembers = [];

const managerInfo = [

    {
        type: 'input',
        message: 'What is your manager' + "'" + 's' + ' name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is your manager' + "'" + 's' + ' id?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is your manager' + "'" + 's' + ' email?',
        name: 'email',
    },

    {
        type: 'input',
        message: 'What is your manager' + "'" + 's' + ' office number?',
        name: 'officeNumber',

    },




]

const engineerInfo = [
    {
        type: 'input',
        message: 'What is your engineer' + "'" + 's' + ' name?',
        name: 'name',
    },

    {
        type: 'input',
        message: 'What is your engineer' + "'" + 's' + ' id?',
        name: 'id',
    },

    {
        type: 'input',
        message: 'What is your engineer' + "'" + 's' + ' email?',
        name: 'email',
    },

    {
        type: 'input',
        message: 'What is your engineer' + "'" + 's' + ' GitHub username?',
        name: 'github',
    },







]

const internInfo = [
    {
        type: 'input',
        message: 'What is your intern' + "'" + 's' + ' name?',
        name: 'name',
    },

    {
        type: 'input',
        message: 'What is your intern' + "'" + 's' + ' id?',
        name: 'id',
    },

    {
        type: 'input',
        message: 'What is your intern' + "'" + 's' + ' email?',
        name: 'email',
    },

    {
        type: 'input',
        message: 'What is your intern' + "'" + 's' + ' School?',
        name: 'school',
    },



]

const addStaff = [
    {
        type: 'list',
        message: 'Which type of team member would you like to add?',
        name: 'team',
        choices: ['Engineer', 'Intern', 'I don' + "'" + 't' + ' want to add any more team members.',]
    },
]
// Function to ask questions specific to engineer or intern and create new objects for  engineer and intern.

function addTeam() {
    inquirer.prompt(addStaff).then((newStaff) => {
        if (newStaff.team === 'Engineer') {
            inquirer.prompt(engineerInfo).then((engineerRole) => {
                let newEngineer = new Engineer(engineerRole.name, engineerRole.id, engineerRole.email, engineerRole.github,);
                teamMembers.push(newEngineer);
                addTeam();
                fs.writeFileSync(outputPath,render(teamMembers),"utf-8")
            });
        }
        else if (newStaff.team === 'Intern') {
            inquirer.prompt(internInfo).then((internRole) => {
                let newIntern = new Intern(internRole.name, internRole.id, internRole.email, internRole.school);
                teamMembers.push(newIntern);
                addTeam();
                fs.writeFileSync(outputPath,render(teamMembers),"utf-8")
            });
        }
    });
}
// Creating new manager object

inquirer.prompt(managerInfo).then((teamInfo) => {
    console.log(teamInfo);
    let managerName = new Manager(teamInfo.name, teamInfo.id, teamInfo.email, teamInfo.officeNumber);
    teamMembers.push(managerName);
    console.log(teamMembers);

    addTeam();
    fs.writeFileSync(outputPath,render(teamMembers),"utf-8")
});



