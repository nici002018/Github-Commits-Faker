const jsonfile = require('jsonfile');
const random = require('random');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';


console.log("Starting...");

const makeCommit = n => {
    const x = random.int(0,54)
    const y = random.int(0,6)
    const DATE = moment().subtract(2,'y').add(1,'d') //the year
            .add(x,'w').add(y,'d') //date generator
            .format();
    if (n===0) {
        console.log("commit date:", DATE)
        return simpleGit().push();
    }
    const data = {
        data: DATE
    }
    jsonfile.writeFile(FILE_PATH, data, ()=>{
        simpleGit().add([FILE_PATH]).commit(DATE, {"--date": DATE}, makeCommit.bind(this, --n));
    })
}

function startInterval() {
    setInterval(function () {
        const commits = random.int(1,500) //Random commtis generator
        makeCommit(commits);
    }, 60 * 60 * 1000); //one hour
    const commits = random.int(1,500) //Random commtis generator
    makeCommit(commits);
}
  
startInterval();
  