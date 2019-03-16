// initialize the .js document with this. It contains all of the code for the .js file:
$( document ).ready(function() {

    // this game object holds all of the questions, possible answers, and then the index of the correct answer for each
        var game = {
            questions: [
            {
                question: 'What does a cat say?',
                answers: ['Meow!', 'Woof!', 'Oink!'],
                id: 'question-one',
                correctOne: 0,
             },
             {
                question: 'What color is the sky?',
                answers: ['Red', 'Green', 'Blue'],
                id: 'question-two',
                correctOne: 2,
             },
             {
                question: 'What is the Roman Numeral for 10?',
                answers: ['X', 'V', 'I'],
                id: 'question-three',
                correctOne: 0,
             },
             {
                question: 'What form of water is ice?',
                answers: ['Gas', 'Liquid', 'Solid'],
                id: 'question-four',
                correctOne: 2,
             },
             {
                question: 'What animal can you find on a farm?',
                answers: ['Gorilla', 'Cow', 'Pigeon'],
                id: 'question-',
                correctOne: 1,
             },

            ]}
    
        
        var message = 'Game Over!';
        
    
  
        $(".start").on("click", function (){
            $('.wrapper').show();
            console.log('hello');
    
            $(this).hide();
        });
    
        
        var number = 30;
        $('#timeLeft').on('click', run);
    
      
        function decrement(){
            number--;
            $('#timeLeft').html('<h2>' + number + " seconds"+'</h2>');           
            if (number === 0){         
            stop();          
            $('#timesUp').html('time up!');
            checkAnswers();
            }
        }
       
        function run(){
            timer = setInterval(decrement, 1000);
        }
        
  
        function stop(){
        clearInterval(timer);
        }
    
        
        run();
    
    
    function formTemplate(data) {
    
        var qString = "<form id='questionOne'>"+ data.question +"<br>";
   
        var answers = data.answers;
   
        for (var i = 0; i < answers.length; i++) {
            var answer = answers[i];
            console.log(answer);
            qString = qString + "<input type='radio' name='"+data.id+"' value="+ i +">"+answer;
    
        }
        return qString + "</form>";
    }
    window.formTemplate = formTemplate;
    
   
    function buildQuestions(){
        var questionHTML = ''
        for (var i = 0; i<game.questions.length; i++) {
            questionHTML = questionHTML + formTemplate(game.questions[i]);
        }
        $('#questions').append(questionHTML);
    
    }
    
    
    function isCorrect(question){
        var answers = $('[name='+question.id+']');
        var correct = answers.eq(question.answer);
        var isChecked = correct.is(':checked');
        return isChecked;
    }
    
    
    buildQuestions();
    
    
    function resultsTemplate(question){
        var html = '<div>'
        html = html + question.question + ': ' + isChecked;
        return html + "</div>";
    }
    
    
    function checkAnswers (){
    
   
        var resultsHTML = '';
        var guessedAnswers = [];
        var correct = 0;
        var incorrect = 0;
        var unAnswered =0
    
    
        for (var i = 0; i<game.questions.length; i++) {
            if (isCorrect(game.questions[i])) {
                correct++;
            } else {
    
                if (checkAnswered(game.questions[i])) {
                    incorrect++;
                } else {
                    unAnswered++;
                }
            }
    
        }
   
        $('.results').html('correct: '+correct+ "<br>" +'incorrect: '+incorrect+ "<br>" +'unanswered: '+unAnswered);
    }
    
   
    function checkAnswered(question){
        var anyAnswered = false;
        var answers = $('[name='+question.id+']');
    
        for (var i = 0; i < answers.length; i++) {
            if (answers[i].checked) {
                anyAnswered = true;
            }
        }
   
        return anyAnswered;
    
    }
    
    
        $('#done').on('click', function() {
        checkAnswers();
        stop();
        $("#messageDiv").html("Game Over!");
        })
    });