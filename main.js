import { clear, getRandomNr } from "./utils.js";
clear();

class Persson {
    name;

    constructor(name = "My Name") {
        this.name = name;
    }
}

class Student extends Persson {
    year;
    grade; 
    onEnroll;

    constructor (name, year = -1, grade = -1) {
        super(name);
        this.year = year ;
        this.grade = grade;
        this.onEnroll = () => {} ;
    }

    getNotified(success) {
        console.log(this.name);

        if (success === true) {
            this.onEnroll();
        }
    }
}

class Academy {
    name;
    students;

    constructor(name="Default", students=[]) {
        this.name = name ;
        this.students = students ;
    }

    join(student) {
        this.students.push(student);
        student.getNotified(true);
    }

    static exam(thisAcademy) {
        let students = thisAcademy.students;
        students.forEach(student => {
            student.grade = Math.ceil(getRandomNr(1, 10));
        });
    }

    static graduate(thisAcademy) {
        let students = thisAcademy.students;
        let filterdStudents = students.filter((student) => {
            if(student.grade >= 5) {
                return student
            }
        }
        )
        
        return filterdStudents
    }

    static studentLevels(thisAcademy) {
        let students = thisAcademy.students;
        let filterdStudetns = students.map((student) => {
            if (student.grade < 5 ) {
                return "Failed"
            } else if (student.grade >= 5 && student.grade < 7) {
                return "Average"
            } else if (student.grade >= 7 && student.grade < 8) {
                return "Above Average"
            } else if (student.grade >= 8 && student.grade <= 10) {
                return "Great"
            }
        })

        return filterdStudetns
    }

    static failedStudents(thisAcademy) {
        let students = thisAcademy.students;
        students.filter(student => student < 5)

    }
}

let std1 = new Student("Xhoni", 2);
let std2 = new Student("Addel", 1);
let std3 = new Student("Delad", 2);
let std4 = new Student("Lead", 1);
let std5 = new Student("Leaddsa", 1);


let studentArray = [std1, std2, std3, std4, std5];

let happyFunc = () => console.log("I'm happy to join!") ;

let setHappyFunc = studentArray.forEach(student => student.onEnroll = happyFunc);

let academy = new Academy("Develhope", studentArray) ;

Academy.exam(academy) ;

let graduateStudents = Academy.graduate(academy) ;

console.log(graduateStudents)

let studentLevel = Academy.studentLevels(academy);
console.log(studentLevel);

let jsonSuccess = JSON.stringify(Academy.graduate(academy));
console.log(jsonSuccess)