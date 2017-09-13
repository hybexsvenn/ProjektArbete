var myArr;

function getQuestions() {
    $.ajax({
        url: "/Api/Faq",
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (p) {
            var getName = [];
            for (var i = 0; i < p.length; i++) {
                getName.push({
                    question:
                    p[i].question,
                    answere:
                    p[i].answere,
                    source:
                    p[i].source,
                    id:
                    i + 1
                });

            }
            console.log(getName);

            myArr = getName;
        }
    });
}
app.controller("testController", function ($scope) {

    if (myArr === undefined) {
        getQuestions();
    }
    console.log(myArr);
    $scope.listOfSearch = myArr;
    $scope.ans = false;


    $scope.ShowAnswere = function () {
        
        $scope.ans = !$scope.ans;

    };


    $(document).ready(function () {



        $('.faq_question').click(function () {



            if ($(this).parent().is('.open')) {

                $(this).closest('.faq').find('.faq_answer_container').animate({ 'height': '0' }, 500);

                $(this).closest('.faq').removeClass('open');



            } else {

                var newHeight = $(this).closest('.faq').find('.faq_answer').height() + 'px';

                $(this).closest('.faq').find('.faq_answer_container').animate({ 'height': newHeight }, 500);

                $(this).closest('.faq').addClass('open');

            }



        });



    });

});