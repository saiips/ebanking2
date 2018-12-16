$(function() {});

var featureSlider = new FeatureSlider({
  autoplay: {

    disableOnInteraction: false,
  },
});

// var ebankingTab = new Tab();
// ebankingTab.init();

var username = new inputObj({
  className: '.username',
});

var password = new inputObj({
  className: '.password',
});

var pWS_29_Desktop_Ebanking_Login_1_default = new formObj({
  className: '.pWS_29_Desktop_Ebanking_Login_1_default',
  inputList: [username, password],
  beforeInitCallBack: function() {
    $('.pushnotification').click(function(e) {
      pWS_29_Desktop_Ebanking_Login_1_default.gotoStep = '.pWS_29_Desktop_Ebanking_Login_1_push';
    });
  },
});
pWS_29_Desktop_Ebanking_Login_1_default.init();

var pWS_29_Desktop_Ebanking_Login_1_push = new formObj({
  className: '.pWS_29_Desktop_Ebanking_Login_1_push',
});

// global header function
var header = new Header({
  className: '.header--ebanking',
});
header.init();
