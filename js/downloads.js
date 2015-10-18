chrome.browserAction.setBadgeText({text: ''});

var app = angular.module("Downloads", ['ngAnimate']);
app.controller("DownloadsCtrl", function($scope) {
  var tracks = getTracks();
  $scope.Math = Math;
  $scope.downloads = tracks.map(function(track) {
    return {
      track_id: track.track_id,
      track_url: track.track_url,
      track_duration: track.track_duration,
      track_title: track.track_title,
      download_id: track.download_id, 
      complete: track.complete
      //deleted: track.deleted
    }
  });

  setInterval(update, 250);
  update()

  $scope.open = function(track) {
    chrome.downloads.open(track.download_id);
  };
  
  $scope.show = function(track) {
    chrome.downloads.show(track.download_id);
  };
  
  $scope.del = function(track) {
    var index = -1;
    for (var i = 0; i < $scope.downloads.length; i++) {
      if (track.track_id == $scope.downloads[i].track_id) {
        index = i;
        break;
      }
    }
    
    if (index >= 0) {
      $scope.downloads.splice(index, 1);
      chrome.runtime.sendMessage({
        type: 'delete',
        data: track
      });
    }
  };
  
  $scope.redownload = function(track) {
    chrome.runtime.sendMessage({
      type: 'redownload',
      data: {
        track_url: track.track_url,
        track_title: track.track_title,
        track_duration: track.track_duration,
        track_id: track.track_id,
        complete: false
      }
    }, function(responce) {
    });
  }

  chrome.runtime.onMessage.addListener(function(message) {
    if (message.type == 'download') {
      var track = message.data;

      $scope.downloads.unshift({
        track_id: track.track_id,
        track_url: track.track_url,
        track_duration: track.track_duration,
        track_title: track.track_title,
        complete: track.complete
      });
      $scope.$apply()
    }
  });

  function update() {
    var tracks = getTracks();

    tracks.forEach(function(track, i) {
      if (!track.download_id || track.deleted) {
        return;
      }

      if (track.complete) {
        $scope.downloads[i].progress = 100
        $scope.downloads[i].complete = true
        $scope.$apply()
        return;
      }
      
      chrome.downloads.search({id: track.download_id}, function(data) {
        var bytesReceived = data[0].bytesReceived;
        var totalBytes = data[0].totalBytes;
        
        $scope.downloads[i].download_id = track.download_id;
        $scope.downloads[i].progress = data[0].bytesReceived/(data[0].totalBytes/100);
        $scope.$apply()
      });
    });
  }
});

app.directive('tooltip', function(){
  return {
    restrict: 'A',
    link: function(scope, element, attrs){
      $(element).tooltip({
        delay: {show: 500, hide: 100}
      })
    }
  };
});

function getTracks() {
  var tracks = localStorage.getItem('tracks');
  if (tracks) {
    try {
      tracks = JSON.parse(tracks);
    } catch (e) {
      tracks = [];
    }
  } else {
    tracks = [];
  }
  return tracks.reverse();
}

function saveTracks(tracks) {
  localStorage.setItem('tracks', JSON.stringify(tracks));
}
