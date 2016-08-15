window.KYF = {
    '_': {
        initialized: false,
        questionsCount: 10,
        currentQuestionIndexAmongAll: 0,
        corrects: 0
    }
};

KYF.pickRandomly = function (arr) {
	return arr[ Math.floor(Math.random()*arr.length) ];
};

KYF.manifest = [
    {
        "questions": [
            { "type": "A", "targetFont": "Times New Roman", "answer": "3" },
            { "type": "A", "targetFont": "Georgia", "answer": "1" },
            { "type": "A", "targetFont": "Palatino", "answer": "1" },
            { "type": "A", "targetFont": "Charter", "answer": "3" },
            { "type": "A", "targetFont": "Garamond", "answer": "2" },
            { "type": "A", "targetFont": "Bodoni", "answer": "2" }
        ]
    },
    {
        "questions": [
            { "type": "A", "targetFont": "Futura", "answer": "3" },
            { "type": "A", "targetFont": "Verdana", "answer": "3" }
        ]
    },
    {
        "questions": [
            { "type": "A", "targetFont": "Myriad Pro", "answer": "2" },
            { "type": "A", "targetFont": "Open Sans", "answer": "1" }
        ]
    }
];

(function () {
    KYF.manifest.forEach(function (v_, i_) {
        v_.questions.map(function (v, i) {
            KYF.manifest[i_].questions[i].optionsArrangement = KYF.pickRandomly(['123', '132', '213', '231', '312', '321']).split('');
            KYF.manifest[i_].questions[i].correctOption = ['A','B','C'][KYF.manifest[i_].questions[i].optionsArrangement.indexOf(KYF.manifest[i_].questions[i].answer)];
        })
    });
})();

KYF.getCurrentChapter = function () {
    // Starts from 1
    return Number(document.body.getAttribute('data-current-chapter').replace('c', ''));
};

KYF.setCurrentChapter = function (chapterId) {
    document.body.setAttribute('data-current-chapter', 'c' + chapterId);
    KYF.setBackgrounds(chapterId);
    if (chapterId === 2 || chapterId === 3) {
        [].map.call(document.querySelectorAll('.js-TheLogo, .js-TheLogo-xl'), function (elem) { elem.src = '/img/logo-w.png' });
    } else {
        [].map.call(document.querySelectorAll('.js-TheLogo'), function (elem) { elem.src = '/img/logo-b.png' });
    };
};

KYF.setBackgrounds = function (chapterId) {
    document.getElementById('grand-bg-layer-1').style.opacity = '1';
    document.getElementById('grand-bg-layer-2').style.opacity = ((chapterId >= 2) ? '1' : '0');
    document.getElementById('grand-bg-layer-3').style.opacity = ((chapterId >= 3) ? '1' : '0');
    document.getElementById('grand-cont').style.opacity = '0';
    document.getElementById('js-StandAloneObjectsContainer').style.opacity = '0';
    window.setTimeout(function () {
        document.getElementById('grand-cont').style.opacity = '1';
        document.getElementById('js-StandAloneObjectsContainer').style.opacity = '1';
    }, 340);
};

KYF.typeTextIntoElement = function (text, elem) {
    elem.innerHTML = '';
    text.split('').map(function (char, index) {
        window.setTimeout(function () {
            elem.innerHTML += char;
        }, 40*(index-(function(){if(text.slice(0, index).match(/\s/g) === null){return 0}else{return text.slice(0, index).match(/\s/g).length}})() ));
    });
};

KYF.userDidClickStartGameButton = function () {
    var this_ = this;
    if (this_.innerText === 'Start Game') {
        // Button
        this_.style.bottom = '20px'
        this_.style.opacity = '0'
        setTimeout(function () {
            this_.style.display = 'none';
        }, 510);
        // Shadow
        document.getElementById('content').style.boxShadow = 'rgba(0, 0, 0, 0.05) 0 -3vh 20vh inset';
        // Logo
        var logo = document.getElementById('grand-logo');
        var logo_cont = document.getElementById('grand-logo-container');
        logo.style.width = '100px';
        logo.style.height = '100px';
        logo_cont.style.height = '100px';
        logo_cont.style.paddingTop = '10px';
        document.getElementById('grand-h1').style.opacity = '0';
        setTimeout(function () {
            document.body.setAttribute('data-page-type', 'question');
            setTimeout(function () {
                document.getElementById('content-2').style.opacity = '1';
                document.getElementById('grand-progress-bar-container').style.top = '5px';
            }, 300);
        // }, 600);
        }, 200);
    } else {

    };
};

KYF.getQuestionDetails = function (chapterId, questionIndex, shouldRewriteDOM) {
    // Default args
    chapterId = chapterId || KYF.getCurrentChapter();
    questionIndex = questionIndex || KYF.getCurrentQuestion();

    // Put into DOM
    if (shouldRewriteDOM) {
        for (var i = 0; i < document.querySelectorAll('.option').length; i++) {
            document.querySelectorAll('.option')[i].style.backgroundImage = 'url(/img/can/AA-BB-CC.png)'.replace('AA', chapterId).replace('BB', questionIndex).replace('CC', KYF.manifest[chapterId-1].questions[questionIndex].optionsArrangement[i]);
        };
        KYF.typeTextIntoElement('Which font is Times?'.replace('Times', KYF.manifest[chapterId-1].questions[questionIndex].targetFont), document.getElementById('my-question'));
        document.getElementById('my-chapter-h2').innerHTML = 'Chapter ?'.replace('?', chapterId);
        document.getElementById('my-challenge-h3').innerHTML = 'Challenge ?'.replace('?', questionIndex+1);
        // KYF.
    };

    // Return
    return KYF.manifest[chapterId-1].questions[questionIndex];
};

KYF.getCurrentQuestion = function () {
    // Starts from 0
    return Number(document.body.getAttribute('data-current-question').replace('q', ''));
};

KYF.setCurrentQuestion = function (targetQuestion) {
    document.body.setAttribute('data-current-question', 'q' + targetQuestion);
};

KYF.setProgressBar = function (progressVal) {
    // float progressVal in math range [0,1]
    progressVal = progressVal || ((KYF._.currentQuestionIndexAmongAll+1)/KYF._.questionsCount);
    document.getElementById('grand-progress-bar-inner').style.width = (String(progressVal * 100)).slice(0,5) + '%';
};

KYF.moveToScoreScreen = function () {
    var userScore = 1600;
    if (KYF._.corrects === 0) {
        userScore = 0;
    } else if (KYF._.corrects < KYF._.questionsCount) {
        userScore = Math.floor(KYF._.corrects / KYF._.questionsCount * 1600);
    };
    var userRemark = 'Absolutely Perfect!';
    if (userScore < 1500) {
        userRemark = 'Almost Perfect!';
    };
    if (userScore < 1300) {
        userRemark = 'You\'re very good!';
    };
    if (userScore < 1100) {
        userRemark = 'Good!';
    };
    if (userScore < 900) {
        userRemark = 'Quite Fine!';
    };
    if (userScore < 700) {
        userRemark = 'You are about the average';
    };
    document.getElementById('data-user-score').innerHTML = userScore;
    document.getElementById('data-user-remark').innerHTML = userRemark;
    setTimeout(function () {
        document.body.setAttribute('data-page-type', 'result');
        setTimeout(function () {
            document.getElementById('content-1').remove();
            document.getElementById('content-2').remove();
            document.getElementById('content-3').style.opacity = '1';
            document.getElementById('grand-progress-bar-container').style.top = '-5px';
        }, 300);
    }, 40);
    // alert('Game finished! ' + KYF._.corrects + ' out of ' + KYF._.questionsCount);
};

KYF.userDidClickOptionButton = function (ev_) {
    console.log(KYF._.corrects);
    var that = this;
    KYF.setProgressBar();
    KYF.submitAnswer(that.getAttribute('data-option'));
    // console.log('This is KYF.userDidClickOptionButton', KYF.getCurrentQuestion(), KYF.manifest[KYF.getCurrentChapter()-1].questions.length-1);
    if (KYF.getCurrentQuestion() !== KYF.manifest[KYF.getCurrentChapter()-1].questions.length-1) {
        // The response is not to the last question in current chapter
        // Move to next challenge
        KYF.setCurrentQuestion(KYF.getCurrentQuestion()+1);
        KYF.getQuestionDetails(null,null,true);
    } else {
        // The response is to the last question in current chapter
        if (KYF.getCurrentChapter() != KYF.manifest.length) {
            // Move to next chapter
            KYF.setCurrentChapter(KYF.getCurrentChapter()+1);
            KYF.setCurrentQuestion(0);
            KYF.getQuestionDetails(null,null,true);
        } else {
            // Game ends
            KYF.moveToScoreScreen();
        }
    }
};

KYF.submitAnswer = function (answerStr) {
    // console.log(answerStr, KYF.getCurrentChapter(), KYF.getCurrentQuestion(), KYF.getQuestionDetails(KYF.getCurrentChapter(), KYF.getCurrentQuestion()).correctOption);
    KYF._.currentQuestionIndexAmongAll += 1;
    if (KYF.getQuestionDetails(KYF.getCurrentChapter(), KYF.getCurrentQuestion()).correctOption === answerStr) {
        KYF._.corrects += 1;
    };
};

KYF.shareFB = function () { alert('Functionality not implemented yet.') };
KYF.shareTW = function () { alert('Functionality not implemented yet.') };




KYF.init = function () {
    if (!KYF._.initialized) {
        KYF._.initialized = true;
        KYF.setProgressBar(0.00001);

        (function () {
            // listen to `click` event on `.option` elements
            for (var i = 0; i < document.querySelectorAll('.option').length; i++) {
                document.querySelectorAll('.option')[i].addEventListener('click', KYF.userDidClickOptionButton);
            };
            document.getElementById('js-TheButton').addEventListener('click', KYF.userDidClickStartGameButton);
        })();
        KYF.getQuestionDetails(null,null,true);
    };
}

window.addEventListener('load', KYF.init);
