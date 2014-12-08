var ideapadApp = angular.module("ideapadApp", ["firebase"]);

ideapadApp.controller('ChatCtrl', ['$scope', '$firebase', function($scope, $firebase) {

  var sock = new SockJS('http://192.168.0.100:9000/chat');

  var ref = new Firebase("https://vivid-heat-7601.firebaseIO.com/");
  $scope.messages = $firebase(ref.child('messages')).$asArray();
  $scope.decisions = $firebase(ref.child('decisions')).$asArray();
  $scope.keypoints = $firebase(ref.child('keypoints')).$asArray();
  $scope.proposals = $firebase(ref.child('proposals')).$asArray();

  $scope.sendMessage = function() {
    // sock.send($scope.messageText);
    var data = $scope.messageText;
    if (data.match(/^#decision/i)) {
      $scope.decisions.$add({'msg' : data.replace(/^#decision/i, '')});
    }

    if (data.match(/^#keypoint/i)) {
      $scope.keypoints.$add({'msg' : data.replace(/^#keypoint/i, '')});
    }

    if (data.match(/^#propose/i)) {
      $scope.proposals.$add({'msg' : data.replace(/^#propose/i, '')});
    }

    $scope.messages.$add({ 'msg' : data });

    $scope.messageText = "";
  };

  // sock.onmessage = function(e) {
  //   var data = JSON.parse(e.data),
  //     msg = '';
  //
  //   console.log('Receiving message', data);
  //
  //   if (data.message.match(/^#decision/i)) {
  //     $scope.decisions.$add({'msg' : data.message.replace(/^#decision/i, '')});
  //   }
  //
  //   if (data.message.match(/^#keypoint/i)) {
  //     $scope.keypoints.$add({'msg' : data.message.replace(/^#keypoint/i, '')});
  //   }
  //
  //   if (data.message.match(/^#propose/i)) {
  //     $scope.proposals.$add({'msg' : data.message.replace(/^#propose/i, '')});
  //   }
  //
  //   msg = 'User ' + data.user + ' : ' + data.message;
  //   if (data.type === 'Welcome') {
  //     msg = data.message + ', User' + data.user + '!';
  //   }
  //
  //   $scope.messages.$add({'msg' : msg});
  //   $scope.$apply();
  // };
}]);
