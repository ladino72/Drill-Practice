const statsCtrl = {};
const httpStatus = require("http-status");
const { AppError } = require("../Errors/AppError");


const User = require("../models/User");
const Ranking = require("../models/Ranking")
const Problem = require("../models/Problem")


// @route    GET api/statistics
// @desc     Get statistics by topic
// @access   Private
statsCtrl.getStats = async (req, res, next) => {
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
        //ranking[0].topScores is an array of arrays, where each array contains an object whose structure is 
        //{_id:xxxxx, userid:cccc,score:bbbb, name:zzzzz,userAnswersTable:{Points:xx,id:vv}}

        console.log("-------->>>>>>ranking[0].topScores from getStats:", ranking[0].topScores)
        //userAnswerTables is an array with structure [{Points:xx1,id:vv1},{Points:xx2,id:vv2},{Points:xx3,id:vv3} ...] for each user

        let userAnswerTables = ranking[0].topScores.map(ele => ele.userAnswersTable);
        let participants_number = userAnswerTables.length;
        let topic = ranking[0].topic
        let { answersTable } = ranking[0]


        console.log("*****************Problem identified!   userAnswerTables", userAnswerTables, "Contents:", "Points", userAnswerTables[0][0].Points, "id", userAnswerTables[0][0].id)

        console.log("*****************Problem identified!   answersTable", answersTable, "First element:", answersTable[0].Points, answersTable[0].id)


        let statData = [];
        let sum = 0;

        for (let p = 0; p < answersTable.length; p++) {
            sum = 0;
            for (let q = 0; q < userAnswerTables.length; q++) {
                let index = userAnswerTables[q].findIndex(ele => ele.id === answersTable[p].id);
                sum += userAnswerTables[q][index].Points;
            }
            statData[p] = { "Points": sum / (answersTable[p].Points) * 100 / participants_number, "id": answersTable[p].id }

        }


        console.log("userAnswerTables", userAnswerTables);
        console.log("answerTables", answersTable)

        console.log("statData", statData)
        console.log("Topic", topic, "Num of participants:", participants_number)

        let data_ = {};
        data_["data"] = statData;
        data_["participant_num"] = participants_number;
        data_["topic"] = topic;

        let data = JSON.parse(JSON.stringify(data_));
        console.log("=====From stats.controller.js===========", data)



        //res.json(statData);
        res.json(data);

    }
    catch (e) {
        console.error("The problem is here:", e.message, e.statusCode);
        next(e)
    }
};

module.exports = statsCtrl;