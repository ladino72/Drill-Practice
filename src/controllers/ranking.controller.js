var _ = require('lodash')
const httpStatus = require("http-status");
const { AppError } = require("../Errors/AppError")

const rankingCtrl = {};

const User = require("../models/User");
const Ranking = require("../models/Ranking")
const Problem = require("../models/Problem")



// @route    POST api/ranking
// @desc     POST score by token
// @access   Private
rankingCtrl.registerScore = async (req, res) => {
    const { ID, score } = req.body;
    console.log("Score from registerScore point in ranking:controller", score, "typeof(score)", typeof (score))


    console.log("received object:", score)
    let score_t = score.trim().slice(0, -1).split("/")
    console.log('score_*********', score_t)
    let Temp_Table = []
    let column = ["Correct", "id"]
    for (let k = 0; k < score_t.length; k++) {
        let score__ = score_t[k].split("-");
        let tableRow = {};

        score__.forEach((ele, index) => tableRow[column[index]] = ele.substr(ele.indexOf("=") + 1));
        //console.log("tableRow:",tableRow);

        Temp_Table.push(tableRow)
    }
    console.log("Temp_Table", Temp_Table)
    let Table_ = [];
    for (let p = 0; p < Temp_Table.length; p++) {
        //Table_[p] = { "Correct": Temp_Table[p].Correct === ("true"), "id": parseInt(Temp_Table[p].id) }

        //Converting a possible string into integer
        //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
        //console.log("Types of variables",10*Number.parseInt(" 45",10),Number.parseInt("35 ",10));

        Table_[p] = { "Correct": Temp_Table[p].Correct === ("true"), "id": Number.parseInt(Temp_Table[p].id, 10) }

    }

    console.log('From registerScore Table_', Table_);

    //Find an empty id. This happens when user submit the test without selecting an option.
    let empty = false;
    for (let q = 0; q < Table_.length; q++) {
        if (Number.isNaN(Table_[q].id)) {
            empty = true;
            break;
        }
    }
    console.log("Does user submit the test without answers?", empty, "so, in the userAnswersTable no id equals NaN ")


    try {

        let user = await User.findById(req.user.id).select("-password");
        let ranking = await Ranking.findOne({ "testID": ID });


        if (ranking && !empty) {

            let ranking_ = await Ranking.findOne({ "testID": ID });


            let refTable = ranking_.answersTable
            console.log('refTable-------->', refTable[0].Points, refTable[0].id);

            const exist = ranking_.topScores.find(ele => ele.userid === user.id)
            let ranking = ""
            if (exist !== undefined) {
                //console.log('TopScores------***------', ranking_.topScores[0].userid, "user.id", user.id, user.name, "exist", exist);

                console.log("It exist")

                //-------------------------------
                let Table = [];
                let userIndex = ranking_.topScores.findIndex(ele => ele.userid === user.id)
                let userTable = ranking_.topScores[userIndex]
                let { userAnswersTable } = userTable ///-----------equivalent to: userTable.userAnswersTable

                console.log('Input---->>>>>>>>>>>>', Table_);

                console.log('refTable---->>>>>>>>>>>>', refTable);

                console.log('userAnswersTable---->>>>>>>>>>>>', userAnswersTable);


                let score_ = 0
                for (let k = 0; k < Table_.length; k++) {
                    const index1 = refTable.findIndex(ele => ele.id === Table_[k].id);
                    const index2 = userAnswersTable.findIndex(ele => ele.id === Table_[k].id);

                    if (Table_[k].Correct) {
                        //score_ += (refTable[index1].Points + userAnswersTable[index2].Points) / 2;
                        Table[k] = { "Points": (refTable[index1].Points + userAnswersTable[index2].Points) / 2, "id": Table_[k].id }
                    } else {
                        //score_ += userAnswersTable[index2].Points / 2;
                        Table[k] = { "Points": userAnswersTable[index2].Points / 2, "id": Table_[k].id }
                    }
                }
                //--------------------------------
                //Update table
                for (let k = 0; k < Table.length; k++) {
                    const index = userAnswersTable.findIndex(ele => ele.id === Table[k].id);

                    userAnswersTable[index] = Table[k]

                }

                userAnswersTable.forEach(ele => score_ += ele.Points)

                //score_ is now calculated using lodash library. Its result is not used thought. Just for fun! lodash library was installed in the backend!
                let sum_ = 0;
                sum_ = _.sumBy(userAnswersTable, function (o) { return o.Points })
                console.log('--Using lodash-----sum_', sum_, "score_", score_);


                console.log("Table", Table)

                console.log("Output", userAnswersTable)

                //----------------------------------

                ranking = await Ranking.findOneAndUpdate({ "testID": ID, "topScores.userid": user.id }, { $set: { "topScores.$.score": score_, "topScores.$.userAnswersTable": userAnswersTable } });
                // This line does not work: let rank_value = await Ranking.findOneAndUpdate({"testID":ID}, {$set:{"value" :test_value } });

            }
            if (exist === undefined) {
                console.log("It does NOT exist")
                console.log("RefTable", refTable, "refTable[0].Points", refTable[0].Points)

                //-------------------------------



                //--------------------------------
                let resetTable_ = ranking_.answersTable;
                let scaledTable = []
                for (let p = 0; p < resetTable_.length; p++) {
                    scaledTable[p] = { "Points": 0, "id": resetTable_[p].id }
                }
                let score_ = 0
                for (let k = 0; k < Table_.length; k++) {
                    if (Table_[k].Correct) {
                        const index = refTable.findIndex(ele => ele.id === Table_[k].id);
                        //score_ += refTable[index].Points;
                        scaledTable[k] = { "Points": refTable[index].Points, "id": Table_[k].id }
                    } else {
                        scaledTable[k] = { "Points": 0, "id": Table_[k].id }
                    }
                }
                scaledTable.forEach(ele => score_ += ele.Points)
                console.log("Scaled table", scaledTable)
                //----------------------------------

                ranking = await Ranking.findOneAndUpdate({ "testID": ID }, { $addToSet: { topScores: { "name": user.name, "userid": user.id, "score": score_, "userAnswersTable": scaledTable } } });

            }

            return res.json(ranking);
        }


    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error->registerScore in ranking.controller.js");
    }
};

// @route    GET api/ranking
// @desc     Get highest score
// @access   Private
rankingCtrl.getScore = async (req, res, next) => {
    const { id } = req.params
    try {
        //const ranking = await Ranking.find({$and:[{"testID":id},{ "topScores.score" : { $gt: 180 } }]});
        let ranking = await Ranking.find({ "testID": id });

        //This part deals with the case when a new topic is created and the admin has not started the corresponding test.
        //Now the adimin can just merely load the test. It is not necessary that the admin take the test first for the users can take it
        //https://httpstatuses.com/

        if (ranking[0] === undefined) {
            throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, "Uninitialized test. To remove this warning, simply open the test!");
        }

        if (ranking[0].topScores.length == 0) {
            throw new AppError(httpStatus.BAD_REQUEST, "Nobody has taken this test yet. Dare to Take the Challenge!");
        }


        //console.log('ranking', ranking[0].topScores);

        // let winners=ranking[0].topScores.filter(item=>item.score>0.75*ranking[0].value)
        // let winner=winners[Math.floor(Math.random() * winners.length)];
        // console.log('Winner from ranking.controller', winner);

        // if(winner.length>0){
        // ranking[0].winner={"winnerrid":winner[0].userid, "winnername":winner[0].name, "winnerscore":winner[0].score}
        // }
        //console.log("ranging",ranking[0])

        res.json(ranking);
    }
    catch (err) {
        console.error(err.message);
        next(err);
    }
};

// @route    POST api/create_update_ranking
// @desc     POST score by token
// @access   Private
rankingCtrl.cu_testValue_answersTable = async (req, res) => {
    const { ID, packedAnswerTable } = req.body;
    console.log("PackedAnswerTable from ranking:controller", packedAnswerTable, "typeof(packedAnswerTable)", typeof (packedAnswerTable))

    console.log("received object:", packedAnswerTable)
    let packedAnswerTable_t = packedAnswerTable.trim().slice(0, -1).split("/")
    console.log('packedAnswerTable_*********', packedAnswerTable_t)
    let TTable = []
    let column = ["Points", "id"]
    for (let k = 0; k < packedAnswerTable_t.length; k++) {
        let packedAnswerTable__ = packedAnswerTable_t[k].split("-");
        let tableRow = {};

        packedAnswerTable__.forEach((ele, index) => tableRow[column[index]] = ele.substr(ele.indexOf("=") + 1));
        //console.log("tableRow:",tableRow);

        TTable.push(tableRow)
    }

    console.log("From Create and Update the temporal Table is:", TTable)

    //Prepare Table
    let Table = []
    for (let u = 0; u < TTable.length; u++) {
        Table[u] = { "Points": parseFloat(TTable[u].Points), "id": parseInt(TTable[u].id) }
    }


    console.log("From Create and Update, the official table:", Table)


    const rankingField = {};

    try {
        const problem = await Problem.findById(ID)

        let ranking = await Ranking.findOne({ "testID": ID });


        let test_value = 0
        problem.questions.forEach(element => {
            test_value += element.Points;
        });

        console.log("Total Points", test_value)

        rankingField.testID = ID;
        rankingField.name = problem.name;
        rankingField.topic = problem.topic;
        rankingField.description = problem.description;
        rankingField.subject = problem.subject;
        rankingField.area = problem.area;
        rankingField.value = test_value;
        rankingField.answersTable = Table

        if (ranking) {
            //https://www.tutorialspoint.com/mongodb-syntax-for-updating-an-object-inside-an-array-within-a-document

            let ranking = ""

            console.log("It exist")

            ranking = await Ranking.findOneAndUpdate({ "testID": ID }, { $set: { "value": test_value, answersTable: Table } });


            return res.json(ranking);
        }
        // Create
        ranking = new Ranking(rankingField);
        await ranking.save();
        res.json(ranking);


    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error->cu_testvalue in ranking.controller.js");
    }
};


module.exports = rankingCtrl;