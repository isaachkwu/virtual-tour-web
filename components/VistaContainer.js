import Head from 'next/head'

const VistaContainer = () => {
  return (
    <div>
      <Head>
      <title>Sample Virtual Tour</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" id="metaViewport" content="user-scalable=no, initial-scale=1, width=device-width, viewport-fit=cover" data-tdv-general-scale="0.5"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <script src="lib/tdvplayer.js"></script>
    <link rel="preload" href="locale/en.txt" as="fetch" crossorigin="anonymous"/>
	<link rel="preload" href="script.js" as="script"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/r/2/0_0.jpg" as="image"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/l/2/0_0.jpg" as="image"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/u/2/0_0.jpg" as="image"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/d/2/0_0.jpg" as="image"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/f/2/0_0.jpg" as="image"/>
	<link rel="preload" href="media/panorama_AC192B06_BC7E_924D_41A0_04DB39C1B535_0/b/2/0_0.jpg" as="image"/>
	<meta name="description" content="Virtual Tour"/>
	<meta name="theme-color" content="#FFFFFF"/>
    <script src="script.js"></script>
    <script type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
        var tour;
        var devicesUrl = {"general":"script_general.js"};

        (function()
        {
            var deviceType = ['general'];
            if(TDV.PlayerAPI.mobile)
                deviceType.unshift('mobile');
            if(TDV.PlayerAPI.device == TDV.PlayerAPI.DEVICE_IPAD)
                deviceType.unshift('ipad');
            var url;
            for(var i=0; i<deviceType.length; ++i) {
                var d = deviceType[i];
                if(d in devicesUrl) {
                    url = devicesUrl[d];
                    break;
                }
            }
            if(typeof url == "object") {
                var orient = TDV.PlayerAPI.getOrientation();
                if(orient in url) {
                    url = url[orient];
                }
            }
            var link = document.createElement('link');
            link.rel = 'preload';
            link.href = url;
            link.as = 'script';
            var el = document.getElementsByTagName('script')[0];
            el.parentNode.insertBefore(link, el);
        })();

        function loadTour()
        {
            if(tour) return;

            if (/AppleWebKit/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent)) {
                var preloadContainer = document.getElementById('preloadContainer');
                if(preloadContainer)
                    document.body.style.backgroundColor = window.getComputedStyle(preloadContainer).backgroundColor;
            }

            var settings = new TDV.PlayerSettings();
            settings.set(TDV.PlayerSettings.CONTAINER, document.getElementById('viewer'));
            settings.set(TDV.PlayerSettings.WEBVR_POLYFILL_URL, 'lib/WebVRPolyfill.js');
            settings.set(TDV.PlayerSettings.HLS_URL, 'lib/Hls.js');
            settings.set(TDV.PlayerSettings.QUERY_STRING_PARAMETERS, 'v=1653039641778');

            tour = new TDV.Tour(settings, devicesUrl);
            tour.bind(TDV.Tour.EVENT_TOUR_INITIALIZED, onVirtualTourInit);
            tour.bind(TDV.Tour.EVENT_TOUR_LOADED, onVirtualTourLoaded);
            tour.bind(TDV.Tour.EVENT_TOUR_ENDED, onVirtualTourEnded);
            tour.load();
        }

        function pauseTour()
        {
            if(!tour)
                return;

            tour.pause();
        }

        function resumeTour()
        {
            if(!tour)
                return;

            tour.resume();
        }

        function onVirtualTourInit()
        {
            var updateTexts = function() {
                document.title = this.trans("tour.name")
            };

            tour.locManager.bind(TDV.Tour.LocaleManager.EVENT_LOCALE_CHANGED, updateTexts.bind(tour.locManager));
            
            if (tour.player.cookiesEnabled)
                enableCookies();
            else
                tour.player.bind('enableCookies', enableCookies);
        }

        function onVirtualTourLoaded()
        {
            disposePreloader();
        }

        function onVirtualTourEnded()
        {

        }

        function enableCookies()
        {
            
        }

        function setMediaByIndex(index) {
            if(!tour)
                return;

            tour.setMediaByIndex(index);
        }

        function setMediaByName(name)
        {
            if(!tour)
                return;

            tour.setMediaByName(name);
        }

        function showPreloader()
        {
            var preloadContainer = document.getElementById('preloadContainer');
            if(preloadContainer != undefined)
                preloadContainer.style.opacity = 1;
        }

        function disposePreloader()
        {
            var preloadContainer = document.getElementById('preloadContainer');
            if(preloadContainer == undefined)
                return;

            var transitionEndName = transitionEndEventName();
            if(transitionEndName)
            {
                preloadContainer.addEventListener(transitionEndName, hide, false);
                preloadContainer.style.opacity = 0;
                setTimeout(hide, 500); 
            }
            else
            {
                hide();
            }

            function hide()
            {
                
                document.body.style.backgroundColor = window.getComputedStyle(preloadContainer).backgroundColor;
                preloadContainer.style.visibility = 'hidden';
                preloadContainer.style.display = 'none';
                var videoList = preloadContainer.getElementsByTagName("video");
                for(var i=0; i<videoList.length; ++i)
                {
                    var video = videoList[i];
                    video.pause();
                    while (video.children.length)
                        video.removeChild(video.children[0]);
                }
            }

            function transitionEndEventName () {
                var el = document.createElement('div');
                var transitions = {
                        'transition':'transitionend',
                        'OTransition':'otransitionend',
                        'MozTransition':'transitionend',
                        'WebkitTransition':'webkitTransitionEnd'
                    };

                var t;
                for (t in transitions) {
                    if (el.style[t] !== undefined) {
                        return transitions[t];
                    }
                }

                return undefined;
            }
        }

        function onBodyClick(){
            document.body.removeEventListener("click", onBodyClick);
            document.body.removeEventListener("touchend", onBodyClick);
            
        }

        function onLoad() {
            if (/AppleWebKit/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent))
            {
                var onOrientationChange = function()
                {
                    document.documentElement.style.height = 'initial';
                    Array.from(document.querySelectorAll('.fill-viewport')).forEach(function(element)
                    {
                        element.classList.toggle('landscape-right', window.orientation == -90);
                        element.classList.toggle('landscape-left', window.orientation == 90);
                    });
                    setTimeout(function()
                    {
                        document.documentElement.style.height = '100%';
                    }, 500);
                };
                window.addEventListener('orientationchange', onOrientationChange);
                onOrientationChange();
            }

            var params = getParams(location.search.substr(1));
            if(params.hasOwnProperty("skip-loading"))
            {
                loadTour();
                disposePreloader();
                return;
            }

            if (isOVRWeb()){
                showPreloader();
                loadTour();
                return;
            }

            showPreloader();
			loadTour();
        }

        

        function playVideo(video, autoplayMuted, clickComponent) {

            function hasAudio (video) {
                return video.mozHasAudio ||
                       Boolean(video.webkitAudioDecodedByteCount) ||
                       Boolean(video.audioTracks && video.audioTracks.length);
            }

            function detectUserAction() {
                var component = clickComponent || document.getElementById('preloadContainer');
                var onVideoClick = function(e) {
                    if(video.paused) {
                        video.play();
                    }
                    video.muted = false;
                    if(hasAudio(video))
                    {
                        e.stopPropagation();
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }

                    component.removeEventListener('click', onVideoClick);
                    component.removeEventListener('touchend', onVideoClick);

                    if(component == clickComponent) {
                        setComponentVisibility(false);
                    }
                };
                component.addEventListener("click", onVideoClick);
                component.addEventListener("touchend", onVideoClick);
            }

            function setComponentVisibility(visible) {
                clickComponent.style.visibility = visible ? 'visible' : 'hidden';
            }

            if (isSafariDesktopV11orGreater()) {
                if(autoplayMuted) {
                    video.muted = true;
                    video.play();
                }
            } else {
                var canPlay = true;
                var promise = video.play();
                if (promise) {
                    promise.catch(function() {
                        if(clickComponent)
                            setComponentVisibility(true);
                        canPlay = false;
                        if(autoplayMuted) {
                            video.muted = true;
                            video.play();
                        }
                        detectUserAction();
                    });
                } else {
                    canPlay = false;
                }

                if (!canPlay || video.muted) {
                    detectUserAction();
                } else if(clickComponent) {
                    setComponentVisibility(false);
                }
            }
        }

        function isOVRWeb(){
            return window.location.hash.substring(1).split('&').indexOf('ovrweb') > -1;
        }

        function getParams(params) {
            var queryDict = {}; params.split("&").forEach(function(item) {var k = item.split("=")[0], v = decodeURIComponent(item.split("=")[1]);queryDict[k.toLowerCase()] = v});
            return queryDict;
        }

        document.addEventListener('DOMContentLoaded', onLoad);
        `
      }}
    >
    </script>
      </Head>
      <div id="preloadContainer" className="fill-viewport">
        <div className="div2" >
          <div className="div3">
            <div className="div4">
              <span className="span1">
                Loading virtual tour. Please wait...
              </span>
            </div>
          </div>
        </div>
      </div>
      <div id="viewer" className="fill-viewport"></div>
    </div>
  )
}

export default VistaContainer