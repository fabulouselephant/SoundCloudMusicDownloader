const icon = "\
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzAxQTQ3MEFFNTQ3MTFFNEExMDk4MTE2Mzg1MUQyODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzAxQTQ3MEJFNTQ3MTFFNEExMDk4MTE2Mzg1MUQyODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDMDFBNDcwOEU1NDcxMUU0QTEwOTgxMTYzODUxRDI4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMDFBNDcwOUU1NDcxMUU0QTEwOTgxMTYzODUxRDI4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Plpze/4AAAHsSURBVHja3FRBa9RAGH2TTDabTUGRoqVSLfgHelDQSimI2vUgeFBQRDy0UvEHFMG72LuXnjyIXnoRqYggCLYseFpFD+KyIpRFaQ/VZrNtMsmMb3YXKnZRhB6kH7wwfPO+l/d9M4kwxmAnwsEOxf8nJMylv3L2E6eJ44RHPCMW/kVoDxER5yHwBAXLJlIixwuuy7+SZQ+BEcKSitDtJ8NN3qxKP+cBj/YzGagJNHGbYvd6CQkYDDJzAWH7rSwAFus+7tR8vdigHQrtCwXuH81wZSi+gchUWNUgs25bG+DiGkkhC1VTSW/mnY8PkcahvQ4efaFAomeCoglsaxsxHeVFvD6XYmxgA3RmY0py8zr6KMEZZJH0DjwtodVSnbE2NCRb832asfeWCEsO4ijB3U8FPB+iaEiu0nOSFyC6VQmDr9pgfdNti/SxNW26Z2Tr9Vb/Nu1TvLJCx/M+DhYLeDiqP8tT9ZG1Vx/f84hpSWQdEf3n+yAdgVaSYb1lsLymcKZ65If7LVYXsyRGKfDgud0WtsfJLX8dW64Q8KRAnit8jzcHncmrl5fsnkoVsiyDUmobmA/s3u+wNXYE4yeOPZDTN6df1mq1ZvVttb8gPSGcnl/NYyLujqhjitbTNBGHh4eXz5bLs2L3/kZ+CjAA3bLRv9e5DG8AAAAASUVORK5CYII=');\
  background-position: center;\
  background-repeat: no-repeat;\
  width: 34px;";

const CLIENT_ID = '5c120c30964a7647d2fedbb38f97bf63'
const buttonNormal = '<button class="sc-button sc-button-small sc-button-responsive" style="' + icon + '"></button>'
const buttonNormalAligned = '<button class="sc-button sc-button-small sc-button-responsive" style="' + icon + 'vertical-align:top;"></button>'
const buttonMedium = '<button class="sc-button sc-button-medium sc-button-responsive sc-button-icon" style="' + icon + '"></button>'
const buttonSmall = '<button class="sc-button sc-button-small sc-button-responsive sc-button-icon" style="' + icon + '" ></button>'

SC.initialize({client_id: CLIENT_ID});

var selectors = [{
  track      : '.sound:not(.playlist)',
  buttons    : '.soundActions__small .sc-button-group-small:first-child',
  link       : '.soundTitle__title',
  buttonHTML : buttonNormal
}, {
  track      : '.trackList__item',
  buttons    : '.soundActions__small .sc-button-group-small',
  link       : '.trackItem__trackTitle',
  buttonHTML : buttonSmall
}, {
  track      : '.soundBadgeList__item',
  buttons    : '.soundActions__small .sc-button-group-small',
  link       : '.soundBadge__avatarLink',
  buttonHTML : buttonSmall
}, {
  track      : '.playlist',
  buttons    : '.soundActions__small .sc-button-group-small:first-child',
  link       : '.soundTitle__title',
  buttonHTML : buttonNormal
},{
  track      : '.l-listen-wrapper',
  buttons    : '.soundActions__medium .sc-button-group-medium:first-child',
  buttonHTML : buttonMedium
}, {
  track      : '.collection:not(.m-overview)',
  buttons    : '.collectionSection__actions .collectionSection__action:first-child',
  buttonHTML : buttonNormal
}, {
  track      : '.l-main.g-main-scroll-area',
  buttons    : '.userNetwork__likeActions',
  buttonHTML : buttonNormalAligned
}];

selectors.forEach(function(selector) {
  $sounds = $(selector.track);
  $sounds.each(function() {
    addDownloadButton($(this), selector);
  });

  $(document).arrive(selector.track, function() {
    addDownloadButton($(this), selector);
  });
});  

function addDownloadButton($sound, selector) {
  var $buttons = $sound.find(selector.buttons);
  var $button = $(selector.buttonHTML);

  var link;
  var url = document.location.href;
  var parts = url.split('/');
  var user;

  if (selector.link) {
    link = $sound.find(selector.link).attr('href');
    url = document.location.origin + link;
  }
  else if (parts[parts.length-1] == "likes") {
    if (parts[parts.length-2] == "you") {
      user = $('.userNav__usernameButton').attr('href');
      url = document.location.origin + user;
      SC.get('/resolve.json', {url: url}, function(data) {
        user = data.id;
      });
    } else {
      user = parts[parts.length-2];
    }
  }

  $buttons.append($button);
  $button.on('click', function() { 
    if (!user) {
      SC.get('/resolve.json', {url: url}, function(data) {
        if (data.kind == "track" && data && data.stream_url) {
          sendTrackData(data);
        } else if (data.kind == "playlist") {
          data.tracks.forEach(function(track) {
            if (track && track.stream_url) {
              sendTrackData(track);
            }
          });
        } else {
          $button.css('background', 'red');
        }
      });  
    } else {
      var page_number = 200;
      SC.get('/users/' + user + '/favorites', {limit: page_number}, function(likes) {
        likes.forEach(function(track) {
          if (track && track.stream_url) {
            sendTrackData(track);
          };
        });
      });
    }
  });
}

function sendTrackData(track) {
  console.log(track);
  var stream_url = track.uri;
  var track_duration = track.duration;
  var track_title = track.title;
  var track_id = track.id;

  if (stream_url == null) {
    stream_url = track.download_url;
  }      
  
  chrome.runtime.sendMessage({
    type: 'download',
    data: {
      track_url: stream_url,
      track_title: track_title,
      track_duration: track_duration,
      track_id: track_id,
    }
  }, function(responce) {
  });
}