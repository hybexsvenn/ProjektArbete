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
        //console.log(id);
        //switch (id) {
        //    case 1:
        //        $scope.id = !$scope.id;
        //        break;
        //    case 2:
        //        $scope.ans = !$scope.ans;
        //        break;
        //    default:
        //        $scope.ans = !$scope.ans;
        //}
        
    };


});