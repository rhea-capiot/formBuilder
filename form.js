var app = angular.module('app', []);
app.controller('elementCntrl', ['$scope', '$sce', '$http', function ($scope, $sce, $http) {
    $scope.showArrow = false;
    $scope.showOptions = false;
    $scope.thisCanBeusedInsideNgBindHtml = $sce.trustAsHtml($scope.try);
    $scope.listOfElements = [
           "<input type='text' id='element1' class='form-control' placeholder='Text Box'></input>",
            "<input type='email' id='element2' class='form-control' placeholder='Email' ></input>",
          "<input type='password' id='element3' class='form-control' placeholder='Password field' ></input>",
           "<input type='file' id='element4' ></input>",
            "<input type='checkbox' id='element5'></input>",
           "<input type='radio' id='element6'></input>",
           "<textarea class='form-control' rows='3'></textarea>",
            "<label class='checkbox-inline'><input type='checkbox' id='inlineCheckbox1' value='option1'> 1</label><label class='checkbox-inline'><input type='checkbox' id='inlineCheckbox2' value='option2'> 2</label><label class='checkbox-inline'><input type='checkbox' id='inlineCheckbox3' value='option3'> 3</label> ",
            "<label class='radio-inline'><input type='radio' name='inlineRadioOptions' id='inlineRadio1' value='option1'> 1</label><label class='radio-inline'><input type='radio' name='inlineRadioOptions' id='inlineRadio2' value='option2'> 2</label><label class='radio-inline'><input type='radio' name='inlineRadioOptions' id='inlineRadio3' value='option3'> 3</label>",
    "<select class='form-control'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>",
    "<div class='form-group'><label class='sr-only' for='exampleInput'>input</label><div class='input-group'><div class='input-group-addon'>Prepend</div><input type='text' class='form-control' id='exampleInputAmount' placeholder='placeholder'></div></div>", "<div class='form-group'><label class='sr-only' for='exampleInput'>input</label><div class='input-group'><input type='text' class='form-control' id='exampleInputAmount' placeholder='placeholder'><div class='input-group-addon'>Append</div></div></div>", "<select multiple class='form-control'><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>"];
    //  $scope.try= "<element.tag type='element.type" class="element.class formElements" placeholder="element.placeholder" ng-mouseover="catchHover(true)" ng-mouseleave="catchHover(false, $index)"></input>"
    //$scope.thisIsHTML= $sce.trustAsHtml($scope.listOfElements); 
    $scope.renderHtml = function (element) {
        return $sce.trustAsHtml(element);
    }
    $scope.listOfFormElements = [];
    $scope.addElement = function (index) {
        $scope.listOfFormElements.push($scope.listOfElements[index]);
        console.log($scope.listOfElements[index]);
        console.log("index: " + index);
    }
    $scope.catchMouse = function (_condition) {
        $scope.showArrow = _condition;
    }
    $scope.catchHover = function (_condition) {
        $scope.showOptions = _condition;
    }
    $scope.goUp = function (index) {
        console.log("Go Up function called!!");
        if (index > 0) {
            var temp = $scope.listOfFormElements[index - 1];
            $scope.listOfFormElements[index - 1] = $scope.listOfFormElements[index];
            $scope.listOfFormElements[index] = temp;
        }
    }
    $scope.goDown = function (index) {
        console.log("Go Down function called!!");
        console.log($scope.listOfFormElements.length);
        console.log("length:" + ($scope.listOfFormElements.length - 1));
        if (($scope.listOfFormElements.length - 1) > index) {
            var temp = $scope.listOfFormElements[index + 1];
            $scope.listOfFormElements[index + 1] = $scope.listOfFormElements[index];
            $scope.listOfFormElements[index] = temp;
        }   
    }
    $scope.removeElement = function (index) {
        $scope.listOfFormElements.splice(index, 1);
    }
    $scope.sendForm = function () {
        $http.post('/generateForm', JSON.stringify($scope.listOfFormElements)).
        then(function (res) {
            console.log(res);
            console.log("post called!!");            
        }, function (response) {
            console.log("error!!");
        });
    }
}]);