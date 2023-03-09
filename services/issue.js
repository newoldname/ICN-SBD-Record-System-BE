const Sequelize = require("sequelize");
const User = require('../models/user');
const Event = require('../models/event');
const Machine = require('../models/machine');
const Question = require('../models/question');

exports.addNewIssue = async(req, res, next) => {
    try{
        const {userEmail, machineString, questionString, etcQuestion} = req.body
        if(!userEmail || !machineString || !questionString){
            return res.status(400).json({
                code: 400,
                message: "입력 오류"
            })
        }
        const nowUser = await User.findOne({
            where: { email: userEmail }
        })
        if(!nowUser){
            return res.status(401).json({
                code: 401,
                message: "사용자 없음"
            })
        }
        
        await Event.create({
            etcQuestion: etcQuestion,
            UserId: nowUser.id,
            MachineId: parseInt(machineString.substring(1)),
            QuestionId: parseInt(questionString.substring(1))
        })

        return res.status(200).json({
            code: 200,
            message: "입력 성공"
        })
    }catch(err){
        console.error(err);
        next(err);
    }
}

exports.findAllEventToday = async(req, res, next) => {
    //location, today, allissue 
    // const {locationId} = req.body;
    // if(!locationId){
    //     return res.status(400).json({
    //         code: 400,
    //         message: "입력 오류"
    //     })
    // }
    const events = await Event.findAll({
        include: [
            {
                model: Question
            },
            {
                model: Machine
            }
        ]
    });
    const returnArray = Array();
    events.forEach(it => {
        const oneObject = Object()
        oneObject["name"] = it.Machine.name
        oneObject["question"] = it.Question.name
        oneObject["time"] = it.createdAt
        returnArray.push(oneObject)
    });
    res.status(200).send(returnArray);
}

exports.findWorkTimeEvents = async(req, res, next) => {
    //location, today, allissue, userEmail(for know work time)
}

exports.getTodayIssuesText = async(req, res, next) => {
    let {starthour, endhour} = req.headers;
    if(!starthour || !endhour){
        return res.status(400).json({
            code: 400,
            message: "입력 오류"
        })
    }
    else{
        console.log(starthour);
        starthour = parseInt(starthour);
        endhour = parseInt(endhour);
    }
    const Op = Sequelize.Op;
    const NOW = new Date();

    let returnText = `Lzone ${NOW.getMonth()}/${NOW.getDate()}\n\n`
    for (let tempHour = starthour; tempHour < endhour; tempHour++) {
        const startDate = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), tempHour, 0, 0, 0);
        const endDate = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate(), tempHour+1, 0, 0, 0);

        const events = await Event.findAll({
            where: {
                createdAt: {
                    [Op.between]: [
                        startDate, endDate
                    ]
                }
            },
            include: [
                {model: Question},
                {model: Machine}
            ]
        })
        if(events){
            returnText += `#${tempHour}-${tempHour+1}\n`;
            returnText += returnHourIssueText(events) + "\n";
        }   
    }
    console.log(returnText);
    return res.status(200).set({ charset: 'utf-8' }).json({
        message: returnText
    })
}

const returnHourIssueText = (events) => {
    //해당 시간 이슈 통계
    const issuesMap = new Map();
    events.forEach(element => {
        if(element.Question.name in issuesMap){
            issuesMap[element.Question.name] += 1
        }else{
            issuesMap[element.Question.name] = 1
        }
    });
    console.log(typeof(issuesMap));

    let returnText = ""
    for (let issueName in issuesMap) {
        returnText += `${issueName}: ${issuesMap[issueName]}건(`;
        machineNameList = ""
        events.forEach(element => {
            if(element.Question.name === issueName){
                machineNameList += element.Machine.name + ", "
            }
        });
        returnText += machineNameList.slice(0,-2) + ")\n";
        console.log(returnText);
    }
    return returnText;
}