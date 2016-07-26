window.KYF = {
    "_": {
        initialized: false
    }
};

KYF.manifest = [
    {
        "questions": [
            { "type": "A", "target": "Times New Roman", "candidates": [ "1011", "1012", "1013" ], "answer": "1013" },
            { "type": "A", "target": "Georgia", "candidates": [ "1021", "1022", "1023" ], "answer": "1021" },
            { "type": "A", "target": "Palatino", "candidates": [ "1031", "1032", "1033" ], "answer": "1031" },
            { "type": "A", "target": "Bodoni", "candidates": [ "1041", "1042", "1043" ], "answer": "1042" },
            { "type": "A", "target": "Charter", "candidates": [ "1051", "1052", "1053" ], "answer": "1051" },
            { "type": "A", "target": "Minion", "candidates": [ "1061", "1062", "1063" ], "answer": "1061" }
        ]
    },
    {
        "questions": [
            { "type": "A", "target": "Futura", "candidates": [ "2011", "2012", "2013" ], "answer": "1013" },
            { "type": "A", "target": "Verdana", "candidates": [ "2021", "2022", "2023" ], "answer": "1013" }
        ]
    },
    {
        "questions": [
            { "type": "A", "target": "Myriad Pro", "candidates": [ "3011", "3012", "3013" ], "answer": "1013" },
            { "type": "A", "target": "Open Sans", "candidates": [ "3021", "3022", "3023" ], "answer": "1013" }
        ]
    }
];

KYF.getCurrentChapter = function () {
    return document.body.getAttribute('data-current-chapter').replace('c', '');
};

KYF.setCurrentChapter = function (chapterId) {
    document.body.setAttribute('data-current-chapter', 'c' + chapterId);
    KYF.setBackgrounds(chapterId);
    if (chapterId === 2 || chapterId === 3) {
        [].map.call(document.querySelectorAll('.js-TheLogo'), function (elem) { elem.src = '/img/logo-w.png' });
    } else {
        [].map.call(document.querySelectorAll('.js-TheLogo'), function (elem) { elem.src = '/img/logo-b.png' });
    }
};

KYF.setBackgrounds = function (chapterId) {
    document.getElementById('grand-bg-layer-1').style.opacity = '1';
    document.getElementById('grand-bg-layer-2').style.opacity = ((chapterId >= 2) ? '1' : '0');
    document.getElementById('grand-bg-layer-3').style.opacity = ((chapterId >= 3) ? '1' : '0');
    document.getElementById('grand-cont').style.opacity = '0';
    window.setTimeout(function () {
        document.getElementById('grand-cont').style.opacity = '1';
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
        // Logo
        var logo = document.getElementById('grand-logo');
        var logo_cont = document.getElementById('grand-logo-container');
        logo.style.width = '100px';
        logo.style.height = '100px';
        logo_cont.style.paddingTop = '10px';
        document.getElementById('grand-h1').style.opacity = '0';
        setTimeout(function () {
            document.body.setAttribute('data-page-type', 'question');
            setTimeout(function () {
                document.getElementById('content-2').style.opacity = '1';
            }, 300);
        }, 600);
    } else {

    };
};

KYF.userDidClickOptionButton = function (ev_) {
    console.log(this);
};

KYF.submitAnswer = function (answerObj) {

};







window.addEventListener('load', function () {
    if (!KYF._.initialized) {
        // KYF.setCurrentChapter(1);

        (function () {
            for (var i = 0; i < document.querySelectorAll('.option').length; i++) {
                document.querySelectorAll('.option')[i].addEventListener('click', KYF.userDidClickOptionButton);
            }
            document.getElementById('js-TheButton').addEventListener('click', KYF.userDidClickStartGameButton);
        })();
    };
});
