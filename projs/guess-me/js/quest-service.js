var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
const QUEST_KEY = 'quest';

function createQuestsTree() {
    var quests = loadFromStorage(QUEST_KEY);
    if (!quests || quests.length === 0) {

        gQuestsTree = createQuest('Male?');

        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

        gCurrQuest = gQuestsTree;

        gPrevQuest = null;
    } else {
        gQuestsTree = quests;
        gPrevQuest = null;
        gCurrQuest = gQuestsTree;
    }

}
function addGuess(newQuestTxt, newGuessTxt, res) {
    var newQuest = createQuest(newQuestTxt);
    var newGuess = createQuest(newGuessTxt);
    var newNo = createQuest(gPrevQuest[res].txt);

    gPrevQuest[res].no = newNo;
    gPrevQuest[res].txt = newQuestTxt;
    gPrevQuest[res].yes = {
            txt: newGuessTxt,
            yes: null,
            no: null
        };
    gCurrQuest = gQuestsTree;
    saveToStorage(QUEST_KEY, gCurrQuest);

}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}

function moveToNextQuest(res) {
    gPrevQuest = gCurrQuest;
    gCurrQuest = gCurrQuest[res];
}


function saveToStorage(key, value) {
    var str = JSON.stringify(value);
    localStorage.setItem(key, str);
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key)
    return JSON.parse(str)
}