const statsCtrl = {};

const User = require("../models/User");
const Ranking = require("../models/Ranking")
const Problem = require("../models/Problem")


// @route    GET api/statistics
// @desc     Get statistics by topic
// @access   Private
statsCtrl.getStats = async (req, res) => {
    const { id } = req.params
    try {
        //const ranking = await Ranking.find({$and:[{"testID":id},{ "topScores.score" : { $gt: 180 } }]});
        let ranking = await Ranking.find({ "testID": id });

        let userAnswerTables = ranking[0].topScores.map(ele => ele.userAnswersTable);
        let participants_number = userAnswerTables.length;
        let topic = ranking[0].topic
        let { answersTable } = ranking[0]   //Be careful this table may not exist at the moment of displaying stats!

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
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error-->getStats in stats.controller.js");
    }
};

module.exports = statsCtrl;