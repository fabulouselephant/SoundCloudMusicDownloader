const CLIENT_ID = '5c120c30964a7647d2fedbb38f97bf63'

var queue = getTracksFromQueue();
var occupied = false;
var downloadsAmount = null;

if(queue.length > 0) {
  var track = getNextTrackFromQueue();
  download(track);
}

chrome.runtime.onMessage.addListener(function(message, sender, callback) {  
  if (message.type == 'download' ||
      message.type == 'redownload') {
    addToQueue(message.data);
    addToTracks(message.data);
  }

  if (message.type == 'delete') {
    var track = message.data;
    removeFromQueue(track);
    removeFromTracks(track);

    if (track.download_id) {
      chrome.downloads.cancel(track.download_id);
    }
  }
});

chrome.downloads.onChanged.addListener(function(item) {
  chrome.browserAction.getBadgeText({}, function(res) {
    downloadsAmount = res || 0;
  });

  var tracks = getTracks();
  var track;

  for (var i = 0; i < tracks.length; i++) {
    if (tracks[i].download_id == item.id) {
      track = tracks[i];
      break;
    }
  }

  if (!track || !item.state) {
    return;
  }

  if (item.state.current == 'complete' ||
      item.state.current == 'interrupted' ||
      item.error) {
    
    console.log("complete download" + track);
    occupied = false;
    downloadsAmount++;

    chrome.browserAction.setBadgeText({
      text: downloadsAmount.toString()
    });

    track.complete = item.state.current == 'complete';
    track.error = item.state.current == 'interrupted' || !!item.error;
    saveTracks(tracks);
    
    queue = getTracksFromQueue();
    queue.shift();
    saveQueue(queue);

    var nextTrack = getNextTrackFromQueue();
    if (nextTrack) {
      download(nextTrack);
    }
  }
});

function addToQueue(track) {
  pushQueue(track);
  if (!occupied) {
    download(track);
  } 
}

function removeFromQueue(track) {
  var index = -1;
  for (var i = 0; i < queue.length; i++) {
    if (track.track_id == queue[i].track_id) {
      index = i;
      break;
    }
  }
  if (index >= 0) {
    queue.splice(index, 1);
    saveQueue(queue);
  }
}

function getNextTrackFromQueue() {
  queue = getTracksFromQueue();
  if(queue.length > 0) {
    var track = queue[0];
    return track;
  }
  return;
}

function pushQueue(track) {
  queue = getTracksFromQueue();
  queue.push(track);
  saveQueue(queue);
}

function getTracksFromQueue() {
  var tracks = localStorage.getItem('queue');
  
  if (tracks) {
    try {
      tracks = JSON.parse(tracks);
    } catch (e) {
      tracks = [];
    }
  } else {
    tracks = [];
  }
  return tracks;
}

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
  return tracks;
}

function saveTracks(tracks) {
  localStorage.setItem('tracks', JSON.stringify(tracks));
}

function saveQueue(queue) {
  localStorage.setItem('queue', JSON.stringify(queue));
}

function addToTracks(track) {
  var tracks = getTracks();
  var trackExists = tracks.some(function(item) {
    return track.track_id == item.track_id;
  });

  if (!trackExists) {
    tracks.push({
      'track_url': track.track_url, 
      'track_title': track.track_title, 
      'track_duration': track.track_duration, 
      'track_id': track.track_id,
      'complete': false,
      'error': false
    });
    saveTracks(tracks);
  }
}

function removeFromTracks(track) {
  var tracks = getTracks();
  var index = -1;
  for (var i = 0; i < tracks.length; i++) {
    if (track.track_id == tracks[i].track_id) {
      index = i;
      break;
    }
  }
  if (index >= 0) {
    tracks.splice(index, 1);
    saveTracks(tracks);
  }
}

function download(track) {
  occupied = true;

  console.log("download" + track.track_title);

  var filename = track.track_title;
  filename = filename.replace(/[^a-z0-9-!()&\s\[\]]/gi, '');
  filename = filename + '.mp3';

  chrome.downloads.download({
    url: track.track_url + '?client_id=' + CLIENT_ID,
    filename: filename
  }, function(id) {
    var tracks = getTracks();
    tracks.forEach(function(item) {
      if (track.track_id == item.track_id) {
        item.download_id = id;
      }
    });
    saveTracks(tracks);
  });
}

// $.ajax({url: 'https://api.soundcloud.com/i1/tracks/' + request.track_id + '/streams?client_id=' + CLIENT_ID}).done(function(response) {
//     chrome.downloads.download({url: response.http_mp3_128_url, filename: request.track_title + '.mp3'}, function(res) {
//       });
//   });
