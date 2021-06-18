const statsCtrl = {};
const httpStatus = require("http-status");
const { AppError } = require("../Errors/AppError")


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

        let userAnswerTables = ranking[0].topScores.map(ele => ele.userAnswersTable);
        let participants_number = userAnswerTables.length;
        let topic = ranking[0].topic
        let { answersTable } = ranking[0]



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
        data_["particpant_num"] = participants_number;
        data_["topic"] = topic;

        let data = JSON.parse(JSON.stringify(data_));
        console.log("=====From stats.controller.js===========", data)



        //res.json(statData);
        res.json(data);

    }
    catch (e) {
        console.error(e.message, e.statusCode);
        next(e)
    }
};

module.exports = statsCtrl;