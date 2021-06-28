var CryptoJS = require("crypto-js");
const Problem = require('../models/Problem');
const httpStatus = require("http-status");
const { AppError } = require("../Errors/AppError");

const testsCtrl = {};

const DecryptAnswers = (encryptAnswers, i, j) => {
    //First index refers to the document, second index refers to the number of problem. 
    //The answers of each problem are encrypted in an array
    let decryptedArray = [];
    encryptAnswers[i][j].forEach(item => {
        let bytes = CryptoJS.AES.decrypt(item, 'secret key 123');
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(decryptedData)
        decryptedArray.push(decryptedData)
    })
    return decryptedArray;
}

const DecryptAnswersOneDocument = (encryptAnswers, j) => {
    //First index refers to the document, second index refers to the number of problem. 
    //The answers of each problem are encrypted in an array
    let decryptedArray = [];
    encryptAnswers[j].forEach(item => {
        let bytes = CryptoJS.AES.decrypt(item, 'secret key 123');
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(decryptedData)
        decryptedArray.push(decryptedData)

    })
    return decryptedArray;
}


testsCtrl.getTests = async (req, res, next) => {
    let problems = await Problem.find({}, { area: 1, subject: 1, topic: 1 })
    try {
        if (typeof problems === "undefined") {
            throw new AppError(httpStatus.BAD_REQUEST, "Uninitialize list of topics!");
        }
        //Next code line is not executed if an error occurs
        res.json(problems)
    } catch (e) {
        console.error(e.message, e.statusCode);
        next(e)
    }
};

testsCtrl.updateTest = async (req, res) => {
    const { id } = req.params;
    const test = await Problem.findById(id)
    const data = test.questions[0].A;
    console.log('data:', data);
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();
    console.log('ciphertext:', ciphertext);
    test.questions[0].A = ciphertext
    Problem.updateOne(
        { _id: id }, { $set: { "questions.A": ciphertext } }, { multi: true });
};


testsCtrl.getTest = async (req, res, next) => {
    const { id } = req.params;
    let problem;
    try {
        //https://stackoverflow.com/questions/13850819/can-i-determine-if-a-string-is-a-mongodb-objectid
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // it's an ObjectID
            problem = await Problem.findById(id)
            if (typeof problem === "undefined") {
                throw new AppError(httpStatus.BAD_REQUEST, "Sorry, the topic selected could not be found");
            }
            // encryptAnswers contains all answers to the problems of one document of the collection. Each collection is formed by documents

            const encryptAnswers = problem.questions.map((it) => it.A.map(ite => CryptoJS.AES.encrypt(JSON.stringify(ite), 'secret key 123').toString()))

            // Do insert encrypted answers in problem    
            for (let j = 0; j < problem.questions.length; j++) {
                //console.log(problems.questions[j].A)
                problem.questions[j].A = encryptAnswers[j];
            }
            //console.log(`Number of problems: ${problem.questions.length}. Encrypted answers problem.questions`)
            //console.log(problem.questions)

            // Decrypt answers in problem    --->This part of code is for the sake of testing the decrypting process.
            /*for(let j=0;j<problem.questions.length;j++){
                //console.log(problem.questions[j].A)
                problem.questions[j].A=DecryptAnswersOneDocument(encryptAnswers,j);
            }*/
            //console.log(problem.questions)

            res.json(problem)

        } else {
            // This part is not used by the frontend
            prob = await Problem.find({ subject: id })
            let problem = JSON.parse(JSON.stringify(prob));
            console.log("Problems by subject:", id)
            console.log("Topic:")

            problem.map(item => console.log(item.topic))
            res.json(problem)
        }
    } catch (err) {
        console.error(err.message);
        next(err);
    }

}

module.exports = testsCtrl;