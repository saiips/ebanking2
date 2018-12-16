/**
 * It is form Obj
 * @param {obj} options - options
 */
function Animation(options) {
  this.defaultsettings= {
    className: 'animation',
    top: '90%',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
    $('.'+_setting.className).waypoint(function(direction) {
      var _class = $(this.element).data('animateClass');
      var _delay = $(this.element).data('delay') || 10;
      var _element = $(this.element);

      if (_delay != 10) {
        setTimeout(function() {
          _element.addClass(_class);
        }, _delay);
      } else {
        _element.addClass(_class);
      }
    }, {
      offset: _setting.top,
    });
  };
}
/* =====  End of new  ======*/

/**
 * It is Appbg Obj
 * @param {obj} options - options
 */
function Appbg(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  	$('.app-bg__video')[0].play();
  };
}
/* =====  End of Appbg  ======*/



/**
 * It is AppTnc Obj
 * @param {obj} options - options
 */
function AppTnc(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  	$('.app-tnc__trigger').click(function() {
  		var $this = $(this);
  		if (!$this.is('.active')) {
  			_this.open();
  		} else {
  			_this.close();
  		}
  	});
  };
  this.open = function() {
  	$('.app-tnc__trigger').addClass('active');
  	$('.app-tnc').addClass('active');
  };
  this.close = function() {
  	$('.app-tnc__trigger').removeClass('active');
  	$('.app-tnc').removeClass('active');
  };
}
/* =====  End of AppTnc  ======*/

/**
 * It is Apptools Obj
 * @param {obj} options - options
 */
function Apptools(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  	$('.app__tools__trigger').click(function(e) {
  		e.preventDefault();
  		var $this = $(this);
  		if ($this.is('.active')) {
  			_this.closetool();
  		} else {
  			_this.opentool();
  		}
  	});
  };
  this.opentool = function() {
  	$('.app__tools__trigger').addClass('active');
  	$('.app__tools--hide').slideDown(500);
  };
  this.closetool = function() {
  	$('.app__tools__trigger').removeClass('active');
  	$('.app__tools--hide').slideUp(500);
  };
}
/* =====  End of Apptools  ======*/


/**
 * It is BannerInner Obj
 * @param {obj} options - options
 */
function BannerInner(options) {
  this.defaultsettings= {
    duration: 4000,
    triggerClass: '.hero__thumbnail__item',
    targerClass: '.hero__slide',
  };
  this.setting= jQuery.extend(this.defaultsettings, options);
  var _this = this;
  var _setting = _this.setting;
  this.current = 0;
  this.init = function() {
    $(_setting.triggerClass).click(function() {
      var $this = $(this);
      _this.updateSlide($this.index());
    }).hover(function() {
      $(this).parent().addClass('hovering');
    }, function() {
      $(this).parent().removeClass('hovering');
    });
    _this.updateSlide(0);
    _this.changeTime();
  };

  this.updateSlide = function(index) {
    _this.current = index;
    var _index = index+1;
    $(_setting.targerClass).hide();
    $(_setting.targerClass+_index).show();
    $(_setting.triggerClass).removeClass('active');
    $(_setting.triggerClass).eq(index).addClass('active');
  };

  this.changeTime = function() {
    setInterval(function() {
      $(_setting.triggerClass+'.active').each(function() {
        var $this = $(this);
        var _index = $this.index();
        if ($this.parent().is('.hovering')) {
          return;
        }
        if (_this.current+1<$(_setting.triggerClass).length) {
          var target = _this.current+1;
          _this.updateSlide(target);
        } else {
          _this.updateSlide(0);
        }
      });
    }, _setting.duration);
  };
}
/* =====  End of BannerInner  ======*/



/**
 * It is btnWrapper
 */
function btnWrapper() {
  this.init = function() {
    this.reload();
  };
  this.reload = function() {
    if (editModeOn == true) {
      $('.btn-wrapper:visible').addClass('btn-wrapper--editing');
    } else {
      $('.btn-wrapper:visible').removeClass('btn-wrapper--editing');
    }

    $('.btn-wrapper:visible').each(function() {
      var _this = $(this);
      var formWrapper = _this.parents('.form__wrapper');


      if ($(window).width() > 768) return;
      _this.removeClass('btn-wrapper--fixed');
      formWrapper.css('padding-bottom', 32);


      var wrapperTop = _this.offset().top;
      var wrapperHeight = _this.outerHeight();
      var wHeight = $(window).height();


      if (wrapperTop + wrapperHeight < wHeight) {
        _this.addClass('btn-wrapper--fixed');
        _this.css('opacity', 1);
        formWrapper.css('padding-bottom', wrapperHeight-32);
      }
    });
  };
}
/* =====  End of btn-wrapper  ======*/

/**
 * It is Card Obj
 * @param {obj} options - options
 */
function Card(options) {
  this.defaultsettings= {
    cardTitle: '.card-title',
    cardText: '.card-text',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;

  this.init = function() {
    _this.callClamp();
    $(window).resize(function() {
      _this.callClamp();
    });
  };

  this.reload = function(el, height, amt) {
    if (!$(el).is(':visible')) {
      return;
    }
    if ($(el).data('text') === undefined) {
      $(el).attr('data-text', $(el).html());
    } else {
      $(el).html($(el).data('text'));
    }
    var titleLHeight = height;
    var elHeight = $(el)[0].getClientRects()[0].height;
    var dataLines = parseInt($(el).attr('data-lines'));
    var clampAmt = amt;
    if (dataLines > amt) {
      titleLHeight = titleLHeight * dataLines;
      clampAmt = dataLines;
    } else if (amt > 1) {
      titleLHeight = titleLHeight * amt;
    }
    if (elHeight > titleLHeight) {
      $clamp($(el)[0], {clamp: clampAmt, useNativeClamp: false});
    }
  };

  this.callClamp = function() {
    var _lineHeight;
    $(_setting.cardTitle + ', '+ _setting.cardText).each(function(i) {
      _lineHeight = parseFloat($(this).css('line-height'));

      if (_lineHeight % 1 !== 0) {
        _lineHeight = _lineHeight / 1 + 1;
      }
      _this.reload(this, _lineHeight, 2);
    });
  };
}
/* =====  End of New  ======*/


/**
 * @param {string} name of the param
 * @param {string} url of the window url
 * @return {obj} results the value of the param
 */
function gup( name, url ) {
  if (!url) url = location.href;
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  var regexS = '[\\?&]'+name+'=([^&#]*)';
  var regex = new RegExp( regexS );
  var results = regex.exec( url );
  return results == null ? null : results[1];
}

/* =====  start of app config  ======*/
var dMode = gup('dMode') ? true : false;
var edm = gup('edm') ? true : false;
window.lang = ($('html').attr('lang') === 'zh-Hant') ? 'tc' : 'en';
/* =====  End of app config  ======*/

// add lazyload to all img with lazy class
var myLazyLoad = new LazyLoad({
  elements_selector: '.lazy',
  skip_invisible: false,
});
// reset lazy load in slider
$('.feature-slider').find('img').each(function() {
  var _this = $(this);
  var _imgSrc = _this.data('img');
  $(this).attr('src', _imgSrc);
});

// global menu function
var menu = new Menu();
menu.init();

// global menu login button
var menuLogin = new MenuLogin();

// Way point animation function
var animation = new Animation();
animation.init();

window.cardClamp = new Card();
cardClamp.init();


$(window).load(function() {
  var pageLocate = new Pagelocator();
  pageLocate.init();
});

/**
 * It is Countstar Obj
 * @param {obj} options - options
 */
function Countstar(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  	$('.count-star__star').click(function(e) {
  		e.preventDefault();
  		var $this = $(this);
  		$('.count-star__star').removeClass('active');
  		$this.prevAll().addClass('active');
  		$this.addClass('active');
      $('#countstarModal').modal('hide');
  	});
  };
}
/* =====  End of Countstar  ======*/

/**
 * data-content
 * @param {obj} options of the obj
 */
function dataContent(options) {
  var _this = this;
  // if the data is dollar, calc and show the data with ,
  // i.e. 1000 => 1,000
  var priceShowVal = function(val) {
    var newVal;
    val = val.toString();
    for (var i = val.length - 1; i >= 0; i -= 3) {
      if (i - 2 > 0) {
        newVal = ',' + val.substr(i - 2, 3) + newVal;
      } else {
        newVal = val.substr(0, i + 1) + newVal;
      }
    }
    return newVal.replace('undefined', '');
  };

  this.init = function() {
    this.reload();
  };
  // Inverse of _.property. Takes an object and returns a function which
  // will return the value of a provided property.
  // var stooge = {name: 'moe'};
  // _.propertyOf(stooge)('name');
  // => 'moe'
  this.getData = function(_array, _dataToFind) {
    return _.propertyOf(_array)(_dataToFind);
  };
  this.reload = function() {
    // find all the data-content component to import data.
    $('.data-content__wrapper').each(function() {
      var contentWrapper = $(this).find('.data-content__content');
      var _dataToFind = contentWrapper.attr('data-target-data');
      var _type = contentWrapper.attr('data-type');
      var _promoindex = contentWrapper.attr('data-promoindex');
      var dateObj = userData[contentWrapper.attr('data-obj')] ? userData[contentWrapper.attr('data-obj')] : userData;
      var dataToShow = _this.getData(dateObj, _dataToFind);
      var dataToShowInject;
      var dataInputObj = contentWrapper.attr('data-input-obj');
      var _inputObj;

      // if the component hasnot imported obj to find.
      // find the key in userData.
      if (contentWrapper.attr('data-obj') === '') {
        // find_.find(list, predicate, [context]) Alias: detect
        // Looks through each value in the list, returning the first one that passes a truth test (predicate)
        _.find(dateObj, function(prop) {
          if (_.isObject(prop)) {
            if (_this.getData(prop, _dataToFind)) {
              dataToShow = _this.getData(prop, _dataToFind);
            }
          }
        });
      }

      // if the imported obj is promotion
      if (contentWrapper.attr('data-obj') === 'promotion') {
        // if the promotion is empty
        // if there is input for the data, use the input's get Display Value func
        // if there is no input for the data, use the data.
        if (!userData['promotion']) userData['promotion'] = [{}];
        dataToShow = typeof window[_dataToFind] === 'object' ? window[_dataToFind].getDisplayValue() : (typeof userData['promotion'][0] !== 'undefined' ? userData['promotion'][0][_dataToFind] : '');
      }

      // if can't find the data, hide the data content wrapper
      // otherwise, show the data content wrapper
      if ((typeof dataToShow === 'undefined' || dataToShow === null || dataToShow === '') && _type !== 'hardCode') {
        $(this).parent('.col-12').hide();
        $(this).hide();
        return;
      } else {
        $(this).parent('.col-12').show();
        $(this).show();
      }

      // if the target is promoCode, find the data in promoCode
      if (_dataToFind === 'promoCode') {
        dataToShowInject = '';
        for (var i = 0; i < dataToShow.length; i++) {
          dataToShowInject += dataToShow[i] + (i === dataToShow.length - 1 ? '' : ', ');
        }
        contentWrapper.html(dataToShowInject);
        return;
      }

      if (_type !== 'hardCode') {
        if (contentWrapper.attr('data-obj') !== 'promotion') {
          // with data input obj is not a obj,
          // find the data in userData by target.
          _inputObj = typeof dataInputObj !== 'undefined' && dataInputObj !== null ? window[dataInputObj] : window[_dataToFind];
          // with no data - obj
          // go to find userData and show the data with first character uppercase
          if (typeof _inputObj === 'undefined' || _inputObj === null) {
            _inputObj = window[contentWrapper.attr('data-obj') + _dataToFind.substr(0, 1).toUpperCase() + _dataToFind.substr(1)];
          }
          if (typeof _inputObj !== 'undefined' && _inputObj !== null) {
            // with data - obj and found it
            // input obj with display value func
            if (typeof _inputObj.getDisplayValue === 'function') {
              // with input but not imported
              if (dataToShow !== _inputObj.getValue()) {
                _inputObj.setValue(dataToShow);
              }
              dataToShowInject = _inputObj.getDisplayValue();
            }
          } else dataToShowInject = _dataToFind;
        } else dataToShowInject = dataToShow;
      } else dataToShowInject = _dataToFind;

      // if there is class name data-content-mask
      // mask the display data
      if ($(this).is('.data-content--mask')) {
        var maskEnd;
        switch (_type) {
          case 'tel':
            maskEnd=9;
            break;
          default:
            maskEnd=4;
        }
        var reverse = dataToShowInject.slice(0, maskEnd).split('').join('');
        var masked = reverse.concat(dataToShowInject.slice(maskEnd).replace(/(\d)|([a-zA-Z\s])/g, '*'));
        contentWrapper.html(masked);
      } else {
        contentWrapper.html(dataToShowInject);
      }
    });
  };
}


/* =====  End of data-content  ======*/

/**
 * It returns test + 10
 * @param {options} options of the obj
 */
function customDatepicker(options) {
  /* ----------  default setting  ----------*/
  this.className = options ? (options.className ? options.className : '') : '';
  this.type = 'date';
  this.lang = options ? (options.lang ? options.lang : 'en') : 'en';
  this.label = options ? (options.label ? options.label : false) : false;
  this.onChange = options ? (options.onChange ? options.onChange : '') : '';
  this.valid = false;
  this.required = options ? (options.required || typeof options.required === 'undefined') : true;
  this.max = options ? (options.max ? options.max : null) : null;
  this.min = options ? (options.min ? options.min : null) : null;
  this.events = options ? (options.events ? options.events : null) : null;
  this.saveTarget = options ? (options.saveTarget ? options.saveTarget : 'userData') : 'userData';
  this.saveKey = options ? (options.saveKey ? options.saveKey : '') : '';
  this.notSave = options ? (options.notSave ? options.notSave : false) : false;
  this.promoIndex = options ? (options.promoIndex ? options.promoIndex : null) : null;
  this.errorMessage = options ? (options.errorMessage ? options.errorMessage : null) : null;

  // extend the input object
  var _inputObj = new inputObj({
    required: this.required,
    className: this.className,
    type: this.type,
    max: this.max,
    min: this.min,
    events: this.events,
    label: this.label,
    errorMessage: this.errorMessage,
  });

    /* ----------  private function  ----------*/
  var _this = this;

  /* ----------  public function  ----------*/
  this.init = function() {
    /**
     * getOffset
     * @param {el} el get Bounding Client Rect
     * @return {obj} the value and el left and top
     */
    function getOffset(el) {
      el = el.getBoundingClientRect();
      return {
        left: el.left + window.scrollX,
        top: el.top + window.scrollY,
      };
    }

    // call the datapicker plugin
    $(this.className).datepicker({
      showOtherMonths: true,
      dateFormat: 'dd/mm/yy',
      minDate: this.min,
      maxDate: this.max,
      beforeShow: function(input, inst) {
        // adjust the position of the data picker in mobile
        // before showing the data picker
        setTimeout(function() {
          console.log(inst.dpDiv);
          var viewHeight = window.scrollY + 60;
          inst.dpDiv.css('min-width', $(input).outerWidth());
          $('a.ui-state-default').eq(0).focus();
          if (getOffset(input).top - 381 < viewHeight) {
            $(window).scrollTop(window.scrollY - 58);
          }
        }, 0);
      },
      onChangeMonthYear: function(year, month, inst) {
        setTimeout(function() {
          inst.dpDiv.css('min-width', $(_this.className).outerWidth());
        }, 0);
      },
      onClose: function() {
        $('.datepicker__wrapper__icon').focus();
      },
    });

    $('.datepicker__wrapper__icon').click(function(e) {
      e.preventDefault();
      $(this).parent().find('input').focus();
    });

    // if the land in the datepicker obj is tc,
    // check the datepciker lange to tranditional chinese.
    if (_this.lang === 'tc') {
      (function(factory) {
        if (typeof define === 'function' && define.amd) {
          define(['../widgets/datepicker'], factory);
        } else {
          factory(jQuery.datepicker);
        }
      }(function(datepicker) {
        datepicker.regional['zh-HK'] = {
          closeText: '關閉',
          prevText: '&#x3C;上月',
          nextText: '下月&#x3E;',
          currentText: '今天',
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月',
          ],
          monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月',
          ],
          dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
          dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
          dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
          weekHeader: '周',
          dateFormat: 'dd-mm-yy',
          firstDay: 0,
          isRTL: false,
          showMonthAfterYear: true,
          yearSuffix: '',
        };
        datepicker.setDefaults(datepicker.regional['zh-HK']);
        return datepicker.regional['zh-HK'];
      }));
    }

    // hide the year of the data picker
    $(this.className).focus(function() {
      $('.ui-datepicker-year').hide();
    });

    // call the on change call back in the datepicker obj
    if (typeof _this.onChange === 'function') {
      $(this.className).change(function() {
        _this.onChange();
      });
    }
  };

  this.getValue = _inputObj.getValue;
  this.getDisplayValue = _inputObj.getDisplayValue;
  this.setValue = _inputObj.setValue;
  this.setError = _inputObj.setError;
  this.setReadonly = _inputObj.setReadonly;
  this.setDisabled = _inputObj.setDisabled;
  this.checkValidation = _inputObj.checkValidation;
}

/* =====  End of datepicker  ======*/

$(document).ready(function() {
  $('body').keydown(function(event) {
    if ($('#ui-datepicker-div').length > 0) {
      if (event.key === 'ArrowRight') {
        $('body').find('.ui-datepicker-next').click();
        $('body').find('a.ui-state-default').eq(0).focus();
      } else if (event.key === 'ArrowLeft') {
        $('body').find('.ui-datepicker-prev').click();
        $('body').find('a.ui-state-default').eq(0).focus();
      }
    }
  });
});

/**
 * It is expand-collapse
 * @param {obj} options of the obj
 */
function expandCollapse(options) {
  /* ----------  default setting  ----------*/
  this.className = options ? (options.className ? options.className : '') : '';
  this.target = options ? (options.target ? options.target : '') : '';

  /* ----------  private function  ----------*/
  var _this = this;
  // after the wrapper open of close,
  // call the func below
  var afterCallBack = function() {
    btnWrapperInit.reload();
  };
  /* ----------  public function  ----------*/

  // call to show the wrapper
  this.open = function($this) {
    $(_this.target).slideDown(0, function() {
      afterCallBack();
    });
  };

  // call to hide the wrapper
  this.close = function($this) {
    $(_this.target).slideUp(0, function() {
      afterCallBack();
    });
  };

  // the wrapper will hide by default
  this.init = function() {
    $(_this.target).hide();
  };
  this.init();
}

/* =====  End of expand-collapse  ======*/

/**
 * It is form Obj
 * @param {obj} options - options
 */
function New(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  };
}
/* =====  End of New  ======*/

/**
 * It is form Feature Slider
 * @param {obj} options - options
 */
function FeatureSlider(options) {
  this.defaultsettings= {
    className: '.feature-slider',
    desktopMinWidth: 768,
    slideClass: 'swiper-slide',
    autoHeight: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    desktopSpaceBetween: 30,
    mobileSpaceBetween: 15,
    slidesPerView: 'auto',
    centeredSlides: true,
    loop: true,
    speed: 2000,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function(index, className) {
        // wcag focus bullet
        return '<a href="javascript" class="' + className + '"><span class="is-visually-hidden">' + featureSliderText.pagination[lang] + (index + 1) + '</span></a>';
      },
    },
    on: {
      transitionEnd: function() {
        _transitionEnd(this.el);
      },
    },
  };
  this.setting = jQuery.extend(this.defaultsettings, options);
  this.options = options;

  // wcag - set not active slide link to tabindex="-1"
  var _transitionEnd = function(ele) {
    $(ele).find('.' + _setting.slideClass).find('a, button, input, select, textarea, submit').attr('tabindex', '-1');
    $(ele).find('.swiper-slide-active').find('a, button, input, select, textarea, submit').attr('tabindex', '');
  };

  var _this = this;
  var _setting = _this.setting;

  // media
  var _desktop = window.matchMedia('(min-width: ' + _setting.desktopMinWidth + 'px)');

  // calc slides show
  var _calcSlides = function(media) {
    var _slides = [];
    var _slideCol = 12;
    var _parentCount;
    var _slideItems = 0;
    var _rowMax;
    var _itemCol;
    var _itemCount;
    var _nextSlide = true;

    $(_setting.className).each(function() {
      _slides = [];
      _slideCol = 12;
      _parentCount;
      _slideItems = 0;
      _rowMax = null;
      _itemCol = null;
      _itemCount = null;
      _nextSlide = true;

      if (typeof this.featureSlider !== 'undefined') {
        if (media.matches) { // desktop
          _setting.spaceBetween = _setting.desktopSpaceBetween;
          _rowMax = $(this).attr('data-desktop-items-each-row');
          if (typeof _rowMax !== 'string') {
            _rowMax = '-1';
          }
          _rowMax = parseInt(_rowMax);
          if (12 % _rowMax !== 0) {
            _rowMax = -1;
          }

          _slideCol = 12;
          _maxCol = 12;

          for (var i = 0; i < this.featureSlides.length; i++) {
            _itemCount = this.featureSlides[i].attr('data-desktop-items');

            if (typeof _itemCount !== 'string') {
              _itemCount = '1';
            }

            _itemCount = parseInt(_itemCount);

            if (_slideCol % _itemCount !== 0) {
              _itemCol = _slideCol;
            } else if (_rowMax > 1) {
              _itemCol = _slideCol / _rowMax;
            } else {
              _itemCol = _slideCol / _itemCount;
            }

            if (_nextSlide === true || _parentCol !== _itemCount) {
              _nextSlide = true;
              _slideItems = _itemCol;

              if (_itemCol === _slideCol) {
                _slides.push(this.featureSlides[i].clone(true));
              } else {
                _nextSlide = false;
                _slides.push($('<div class="' + _setting.slideClass + '"><div class="row"></div></div>'));
                _slides[_slides.length - 1].find('.row').append(this.featureSlides[i].clone(true).removeClass(_setting.slideClass).addClass('col-' + _itemCol));
              }
            } else {
              _nextSlide = false;
              _slideItems += _itemCol;
              if (_slides[_slides.length - 1].find('.row').length < _slideItems / 12) {
                _slides[_slides.length - 1].append('<div class="row"></div>');
              }
              _slides[_slides.length - 1].find('.row').eq(_slides[_slides.length - 1].find('.row').length - 1).append(this.featureSlides[i].clone(true).removeClass(_setting.slideClass).addClass('col-' + _itemCol));
            }

            if (_slides[_slides.length - 1].find('.feature-slider__slide').length >= _itemCount) {
              _nextSlide = true;
              _slideItems = 0;
            }

            _parentCol = _itemCount;
          }
        } else { // mobile
          _setting.spaceBetween = _setting.mobileSpaceBetween;
          for (var k = 0; k < this.featureSlides.length; k++) {
            _slides.push(this.featureSlides[k].clone(true));
          }
        }


        this.featureSlider.destroy();

        $(this).find('.' + _setting.slideClass).remove();

        for (var j = 0; j < _slides.length; j++) {
          $(this).find('.swiper-wrapper').append(_slides[j]);
        }

        if (_slides.length <= 1) {
          _setting.longSwipes = false;
          _setting.shortSwipes = false;
          _setting.followFinger = false;
          _setting.simulateTouch = false;
        } else {
          _setting.longSwipes = _this.options.longSwipes === false ? false : true;
          _setting.shortSwipes = _this.options.shortSwipes === false ? false : true;
          _setting.followFinger = _this.options.followFinger === false ? false : true;
          _setting.simulateTouch = _this.options.simulateTouch === false ? false : true;
        }

        this.featureSlider = new Swiper(this, _setting);

        _onceSlide(this);

        if (typeof _setting.afterCalcSlides === 'function') {
          _setting.afterCalcSlides(_this, this);
        }
      }
    });
  };

  // once slide setting
  var _onceSlide = function(element) {
    var _slidesLength = $(element).find('.' + _setting.slideClass).length - $(element).find('.swiper-slide-duplicate').length;

    if (typeof element.featureSlider !== 'undefined') {
      if (_slidesLength <= 1) {
        $(element).addClass('feature-slider--once-slide');

        $(element).parents('.feature-slider__container').removeClass('no-padding');
      } else {
        $(element).removeClass('feature-slider--once-slide');

        if (!_desktop.matches && !$(element).hasClass('feature-slider--mobile-full-width')) {
          $(element).parents('.feature-slider__container').addClass('no-padding');
        } else {
          $(element).parents('.feature-slider__container').removeClass('no-padding');
        }
      }

      element.featureSlider.update();

      if (_setting.autoHeight === true) {
        element.featureSlider.updateAutoHeight();
      }

      if (element.featureSlider.autoplay) {
        element.featureSlider.autoplay.stop();
      }

      if (typeof _setting.autoplay !== 'undefined') {
        if (_slidesLength > 1 && $(element).height() !== 0) {
          if (element.featureSlider.autoplay) {
            element.featureSlider.autoplay.start();
          }
        }
      }
    }
  };

  // load image
  var _loadImage = function() {
    $(_setting.className).each(function() {
      for (var i = 0; i < this.featureSlides.length; i++) {
        this.featureImageCount = 0;
        this.featureImageLoaded = 0;
        this.featureSlides[i].find('.swiper-lazy').each(function() {
          this.featureImageCount++;
          $(this).removeClass('swiper-lazy').attr('src', $(this).attr('data-src')).load(function() {
            var _featureSlider = $(this).parents(_setting.className);
            if (_featureSlider.length > 0) {
              _featureSlider[0].featureImageLoaded += 1;
              if (_featureSlider[0].featureImageLoaded >= _featureSlider[0].featureImageCount) {
                _featureSlider.removeClass('feature-slider--lazy');
              }
            }
          });
        });
      }
    });

    _calcSlides(_desktop);
    cardClamp.callClamp();
  };

  this.init = function(setting) {
    // init Swiper and clone slides element
    $(setting.className).each(function() {
      _featureSlides = [];

      $(this).find('.' + setting.slideClass).each(function() {
        var _slide = $(this).clone(true);

        _slide.find('.lazy').removeClass('lazy').addClass('swiper-lazy');
        // _slide.find('.lazy').each(function() {
        //   $(this).removeClass('lazy').attr('src', $(this).attr('data-src'));
        // });

        _featureSlides.push(_slide);
        $(this).remove();
      });

      this.featureSlides = _featureSlides;

      this.featureSlider = new Swiper(this, setting);

      // stop autoplay when hover / focus
      if (typeof setting.autoplay !== 'undefined') {
        $(this).hover(function() {
          if (!$(this).hasClass('feature-slider--once-slide') && typeof this.featureSlider !== 'undefined') {
            if (this.featureSlider.autoplay) {
              this.featureSlider.autoplay.stop();
            }
          }
        }, function() {
          if (!$(this).hasClass('feature-slider--once-slide') && typeof this.featureSlider !== 'undefined') {
            if (this.featureSlider.autoplay) {
              this.featureSlider.autoplay.start();
            }
          }
        });

        $(this).focusin(function() {
          if (!$(this).hasClass('feature-slider--once-slide') && typeof this.featureSlider !== 'undefined') {
            if (this.featureSlider.autoplay) {
              this.featureSlider.autoplay.stop();
            }
          }
        });

        $(this).focusout(function() {
          if (!$(this).hasClass('feature-slider--once-slide') && typeof this.featureSlider !== 'undefined') {
            if (this.featureSlider.autoplay) {
              this.featureSlider.autoplay.start();
            }
          }
        });
      }
    });

    // add media listener
    _calcSlides(_desktop);
    _desktop.addListener(_calcSlides);
    cardClamp.reload();

    if ($(setting.className + '.feature-slider--lazy').length > 0) {
      // set waypoint load image
      var waypoint = new Waypoint({
        element: $(setting.className + '.feature-slider--lazy'),
        handler: function(direction) {
          _loadImage();

          this.destroy();
        },
        offset: '150%',
      });
    }
  };

  this.update = function() {
    $(_setting.className).each(function() {
      if (typeof this.featureSlider !== 'undefined') {
        if (_setting.autoHeight === true) {
          this.featureSlider.updateAutoHeight();
        }
        _onceSlide(this);
      }
    });
    cardClamp.reload();
  };

  this.reload = function() {
    $(_setting.className).addClass('feature-slider--lazy');
    _loadImage();
  };

  this.init(_setting);
}
/* =====  End of FeatureSlider  ======*/

/**
 * It is FinanceDetails Obj
 * @param {obj} options - options
 */
function FinanceDetails(options) {
  this.defaultsettings= {
    searchBar: '.finance-details__searchbar input',
    searchIcon: '.finance-details__searchbar__icon',
    searchIconLink: '.finance-details__searchbar__iconlink',
    targetUrl: 'https://google.com',
  };
  this.setting= jQuery.extend(this.defaultsettings, options);
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
    $(_setting.searchBar).on('keyup', function(e) {
      if (e.keyCode == 13) {
        console.log($(_setting.searchBar).val());
        window.location.href = _setting.targetUrl;
      }
    });
    $(_setting.searchIcon).on('click', function() {
      window.location.href = _setting.targetUrl;
    });
  };
}
/* =====  End of FinanceDetails  ======*/




/**
 * formObj
 * @param {options} options of the obj
*/
function formObj(options) {
  /* ----------  default setting  ----------*/
  this.valid = false;
  this.duration = 0;
  this.active = options ? (typeof options.active !== 'undefined' ? options.active : true) : true;
  this.inputList = options ? (options.inputList ? options.inputList : []) : [];
  this.className = options ? (options.className ? options.className : '') : '';
  this.gotoStep = options ? (options.gotoStep ? options.gotoStep : '') : '';
  this.noSaveHistory = options ? (options.noSaveHistory ? options.noSaveHistory : '') : '';
  this.withBackBtn = options ? (typeof options.withBackBtn !== 'undefined' ? options.withBackBtn : true) : true;
  this.withProgressBar = options ? (typeof options.withProgressBar !== 'undefined' ? options.withProgressBar : true) : true;
  this.beforeInitCallBack = options ? (options.beforeInitCallBack ? options.beforeInitCallBack : '') : '';
  this.initCallBack = options ? (options.initCallBack ? options.initCallBack : '') : '';
  this.afterSaveDataCallBack = options ? (options.afterSaveDataCallBack ? options.afterSaveDataCallBack : '') : '';
  this.afterReloadData = options ? (options.afterReloadData ? options.afterReloadData : '') : '';
  this.beforeCheckValidationCallBack = options ? (options.beforeCheckValidationCallBack ? options.beforeCheckValidationCallBack : '') : '';
  this.afterCheckValidationCallBack = options ? (options.afterCheckValidationCallBack ? options.afterCheckValidationCallBack : '') : '';
  this.beforeSubmitCallBack = options ? (options.beforeSubmitCallBack ? options.beforeSubmitCallBack : '') : '';
  this.submitCallBack = options ? (options.submitCallBack ? options.submitCallBack : false) : false;

  /* ----------  private function  ----------*/
  var _this = this;

  // if there is error in input show the error
  // if (dMode) console.log('Form(', _this.className, ') submit has error');
  var showError = function() {
    var wrapper = $(_this.className);
    checkExist(wrapper.find('.form__error'), function() {
      wrapper.find('.form__error').show();
    });
  };

    // if there is no error, hide the error message
  var hideError = function() {
    var wrapper = $(_this.className);
    checkExist(wrapper.find('.form__error'), function() {
      wrapper.find('.form__error').hide();
    });
  };

    // check the element is existing or not
  var checkExist = function(ele, callback) {
    if (ele.length > 0) return callback();
    else {
      // if (dMode) console.log('Form(', _this.className, ') ', ele, ' does not exist.');
      return;
    }
  };

    // check the value is true
  var isTrue = function(currentValue) {
    return currentValue == true;
  };

    /* ----------  public function  ----------*/
    // check the first visible error in page
    // scroll to the first visible error
  this.scrollToError = function() {
    if ($(_this.className).find('.select--error:visible,.input--error:visible,.input__error:visible').length > 0) {
      var firstErrorTop = $(_this.className).find('.select--error:visible,.input--error:visible,.input__error:visible').eq(0).offset().top;
      $('html,body').stop().animate({scrollTop: firstErrorTop - $('.header').outerHeight() - 50}, 0);
    }
  };

  // check the input and find the data in userData
  // preset into the input
  this.reloadData = function() {

  };

  this.init = function() {
    if (_this.beforeInitCallBack) _this.beforeInitCallBack();
    _this.reloadData();
    if (_this.initCallBack) _this.initCallBack();
    if (_this.afterReloadData) _this.afterReloadData();
    $(this.className).slideDown(_this.duration, function() {
      // $(window).scrollTop(0);
      _this.checkSubmitAble();
    });
  };

  this.checkValidation = function() {
    // call the inputs in form and check the validation
    if (_this.beforeCheckValidationCallBack) _this.beforeCheckValidationCallBack();
    var arr = this.inputList;
    if (arr.length <= 0) {
      _this.valid = true;
      this.submit();
      return;
    }
    var checkValidationArr = [];
    for (var i = arr.length - 1; i >= 0; i--) {
      checkValidationArr.push(arr[i].checkValidation());
    }
    if (typeof _this.afterCheckValidationCallBack == 'function') checkValidationArr.push(_this.afterCheckValidationCallBack());
    _this.scrollToError();
    if (checkValidationArr.every(isTrue) !== false) {
      _this.valid = true;
      this.submit();
    } else showError();
  };

  this.checkSubmitAble = function() {
    if (!_this.active) $(_this.className).find('.btn-wrapper').hide();
    else $(_this.className).find('.btn-wrapper').show();
  };

  this.submit = function() {
    // submit, hide the error, save the date and go other page
    hideError();
    if (_this.beforeSubmitCallBack) _this.beforeSubmitCallBack();
    if (_this.valid == false) return;
    if (_this.afterSaveDataCallBack) _this.afterSaveDataCallBack();
    if (_this.valid == false) return;
    if (_this.gotoStep != '') gotoStepFunc(_this.gotoStep);
    if (_this.submitCallBack) _this.submitCallBack();
  };
}

function gotoStepFunc(className) {
  $('.modal').modal('hide');
  $('.form__wrapper:visible').slideUp(0, function() {
    window[className.replace(/\./g, '').replace(/\#/g, '')].init();
  });
};



/**
* It is header Obj
* @param {obj} options - options
*/
function Header(options) {
  this.defaultsettings= {
    className: '.header',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  _setting.scrollRecord;
  _setting.currentScrollRecord;
  this.init = function() {
    console.log('updated header', _setting.className.replace('.', ''));
    _this.detectHeaderType();
    $('.header__btn--menu').click(function() {
      var $this = $(this);
      if ($this.is('.active')) {
        $this.removeClass('active');
        _this.closeMenu();
      } else {
        $this.addClass('active');
        _this.showMenu();
      }
    });
  };
  this.turnOnMini = function() {
    $(_setting.className).addClass(_setting.className.replace('.', '')+'--mini');
  };
  this.turnOffMini = function() {
    $(_setting.className).removeClass(_setting.className.replace('.', '')+'--mini');
  };
  this.detectHeaderType = function() {
    $(window).scroll(/* _.debounce(*/function() {
      var _headerHeight = $(_this.setting.className).height();
      $('.aler--page-top').each(function() {
        _headerHeight += $(this).height();
      });
      _setting.currentScrollRecord = $(window).scrollTop();
      if (_setting.currentScrollRecord <= _headerHeight) {
        $('body').removeClass('body-header--fixed');
        $(_setting.className).removeClass(_setting.className.replace('.', '')+'--fixed');
        _this.turnOffMini();
      } else {
        $('body').addClass('body-header--fixed');
        $(_setting.className).addClass(_setting.className.replace('.', '')+'--fixed');

        if (_setting.currentScrollRecord <= _setting.scrollRecord ||
          _setting.currentScrollRecord < 0
        ) {
          _this.turnOffMini();
        } else {
          _this.turnOnMini();
        }
      }

      _setting.scrollRecord = _setting.currentScrollRecord;
    }/* , 300)*/);
  };
  this.showMenu = function() {
    $(_setting.className).removeClass(_setting.className.replace('.', '')+'--showlogin');
    $('body,html').removeClass('body--showlogin');
    $(_setting.className).addClass(_setting.className.replace('.', '')+'--showmenu');
    $('body,html').addClass('body--showmenu');
  };
  this.closeMenu = function() {
    $(_setting.className).removeClass(_setting.className.replace('.', '')+'--showmenu');
    $('body,html').removeClass('body--showmenu');
  };
}
/* =====  End of menu  ======*/






/**
 * It is input Obj
 * @param {obj} options - options
 */
function inputObj(options) {
  /* ----------  default setting  ----------*/

  this.valid = false;
  this.required = options ? (options.required || typeof options.required === 'undefined') : true;
  this.type = options ? (options.type ? options.type : '') : '';
  this.className = options ? (options.className ? options.className : '') : '';
  this.max = options ? (options.max ? options.max : null) : null;
  this.min = options ? (options.min ? options.min : null) : null;
  this.charLength = options ? (options.charLength ? options.charLength : null) : null;
  this.events = options ? (options.events ? options.events : null) : null;
  this.saveTarget = options ? (options.saveTarget ? options.saveTarget : 'userData') : 'userData';
  this.saveKey = options ? (options.saveKey ? options.saveKey : '') : '';
  this.notSave = options ? (options.notSave ? options.notSave : false) : false;
  this.disable = options ? (options.disable ? options.disable : false) : false;
  this.label = options ? (options.label || options.label === '' ? options.label : false) : false;
  this.dataValue = options ? (options.dataValue ? options.dataValue : '') : '';
  this.errorMessage = options ? (options.errorMessage ? options.errorMessage : null) : null;
  this.promoIndex = options ? (options.promoIndex ? options.promoIndex : null) : null;
  if (this.max < this.min && this.max !== null && this.min !== null) {
    var _min = this.max;
    this.max = this.min;
    this.min = _min;
  }

  var errorSetting = {
    email: inputError.invalid2[lang],
    tel: inputError.invalid[lang],
    hkTel: inputError.invalid[lang],
    number: inputError.invalid[lang],
    price: inputError.invalid[lang],
    price1000: inputError.invalid[lang],
    range: inputError.invalid[lang], // inputError.range[lang],
    english: inputError.english[lang],
    name: inputError.english[lang],
    address: inputError.english[lang],
    hkid: inputError.engNum[lang],
    passport: inputError.engNum[lang],
    username: inputError.english[lang],
    password: inputError.invalid[lang],
    date: inputError.select[lang],
    confirm: inputError.confirmPW[lang],
    yesno: inputError.checkboxRadioRequired[lang],
    checkbox: inputError.checkboxRadioRequired[lang],
    radio: inputError.checkboxRadioRequired[lang],
    withLabel: inputError.select[lang],
    selectAtLeast: inputError.selectAtLeast[lang],
    tnc: inputError.tnc[lang],
    tncAbove: inputError.tncAbove[lang],
    required: inputError.required[lang],
  };

  var regexSetting = {
    email: /^(([^<>()\[\]\\.,;:\s@\u4E00-\u9FA5"]+(\.[^<>()\[\]\\.,;:\s@\u4E00-\u9FA5"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    tel: /^(\+?[0-9\-])+$/,
    hkTel: /^([456789]{1}[0-9]{7})$/,
    number: /^[0-9]+$/,
    english: /^[a-zA-Z\s]+$/,
    name: /^[a-zA-Z\s']+$/,
    address: /^[a-zA-Z0-9\s',]+$/,
    hkid: /^([a-zA-Z]{1,2}[0-9]{6}[0-9Aa]{1})$/,
    passport: /^([a-zA-Z0-9]{1,15})$/,
    username: /^([a-zA-Z0-9\-_]{6,20})$/,
    password: /^(?=.*[a-zA-Z])([a-zA-Z0-9]{8,15})$/,
    date: /^([0-9]{1,2}\/{1}[0-9]{1,2}\/{1}[0-9]{4})$/,
  };

    /* callback events */
  if (typeof this.events === 'object') {
    for (var key in this.events) {
      if (typeof this.events[key] === 'function') {
        $(this.className).on(key, function(events) {
          _this.events[key](events);
        });
      }
    }
  }

  /* keyup function */

  var group = $(this.className).parents('.input__group');

  switch (this.type) {
    case 'tel':
      $(this.className + 'CountryCode').keyup(function() {
        if ($(this).val().substr(0, 1) !== '+') {
          $(this).val('+' + $(this).val());
        }
      });
      break;
    case 'price':
    case 'price1000':
      $(this.className).keyup(function() {
        var val = $(this).val();
        var valInt;
        var newVal = '';

        val = val.replace(/[\D\s\._\-]+/g, '');
        valInt = priceToInt(val);

        if (valInt !== null) {
          for (var i = val.length - 1; i >= 0; i -= 3) {
            if (i - 2 > 0) {
              newVal = ',' + val.substr(i - 2, 3) + newVal;
            } else {
              newVal = val.substr(0, i + 1) + newVal;
            }
          }
        }

        $(this).val(function() {
          return (valInt === null) ? '' : newVal;
        });
      });
      break;
    default:
      break;
  }

  // remove input group item auto next focus
  // if (group.length > 0) {
  //     group.find('.input__input').keyup(function (events) {
  //         if ($(this).attr('maxlength') && events.key !== 'Tab') {
  //             if ($(this).val().length >= parseInt($(this).attr('maxlength')) && $(this).parents('.input__group__item').next('.input__group__item').length > 0) {
  //                 var inputId = $(this).parents('.input__group__item').next('.input__group__item').find('.input__input').attr('id');
  //                 $('#' + inputId).focus();
  //             }
  //         }
  //     });
  // }

  /* on change set error false */
  $(this.className).parents('.input').find('.input__input').change(function() {
    _this.setError({error: false});
  }).keyup(function() {
    _this.setError({error: false});
  });


  /* ----------  private function  ----------*/

  var _this = this;
  var addComma = function(val) {
    var newVal;
    var val = val + '';
    for (var i = val.length - 1; i >= 0; i -= 3) {
      if (i - 2 > 0) {
        newVal = ',' + val.substr(i - 2, 3) + newVal;
      } else {
        newVal = val.substr(0, i + 1) + newVal;
      }
    }
    return newVal.replace('undefined', '');
  };
  var testExist = function(callback) {
    var input = $(_this.className);
    if (input.length > 0) return callback();
    else {
      if (dMode) console.log('Input(', _this.className, ') does not exist.');
      return false;
    }
  };
  var checkRegex = function(val, regex) {
    return testExist(function() {
      return val.match(regex) ? true : false;
    });
  };
  var checkHasVal = function(val) {
    var input = $(_this.className);
    var _val = true;
    return testExist(function() {
      if (typeof val === 'object' && !Array.isArray(val) && val !== null) {
        for (k in val) {
          if (typeof val[k] === 'undefined' || val[k] === '' || val[k] === null) {
            _val = false;
          }
        }
        return _val;
      } else if (typeof val === 'string' || Array.isArray(val)) {
        return val && val.length > 0 ? true : false;
      } else {
        return val ? true : false;
      }
    });
  };
  var checkRange = function(val) {
    if (_this.min === null && _this.max === null) {
      return true;
    } else if (_this.min === null && val <= _this.max) {
      return true;
    } else if (_this.max === null && val >= _this.min) {
      return true;
    } else if (_this.min !== null && val <= _this.max && _this.max !== null && val >= _this.min) {
      return true;
    }

    return false;
  };
  var checkLength = function(val) {
    var _val = val.toString();

    if (_this.charLength !== null) {
      return _val.length === _this.charLength;
    } else return true;
  };
  var rangeError = function() {
    if (_this.min === null && _this.max !== null) {
      return inputError.max[lang];
    } else if (_this.max === null && _this.min !== null) {
      return inputError.min[lang];
    } else {
      return errorSetting.range;
    }
  };
  var getNoInputLabel = function() {
    var input = $(_this.className);
    var _index = 0;
    var _findNoInput = false;

    return testExist(function() {
      if (input.parents('.input__group').length) {
        input.parents('.input__group').find('.input__input').each(function(index) {
          if (!($(this).val() && $(this).val().length > 0) && !_findNoInput) {
            _index = index;
            _findNoInput = true;
          }
        });

        return input.parents('.input__group').find('.input__label').length > _index ? _index : 0;
      } else {
        return _index;
      }
    });
  };
  var getInputValue = function(input) {
    var val;
    if (input.length > 0) {
      switch (input.attr('type')) {
        case 'checkbox':
          val = [];
          inputChecked = $('input[name=' + input.attr('name') + ']:checked');
          for (var i = 0; i < inputChecked.length; i++) {
            val.push(inputChecked.eq(i).val());
          }
          break;
        case 'radio':
          inputChecked = $('input[name=' + input.attr('name') + ']:checked');
          if (inputChecked.length > 0) {
            val = inputChecked.val();
          }
          break;
        default:
          val = input.val();
          break;
      }
    }
    return val;
  };
  var setInputValue = function(input, value) {
    var checked = false;
    if (input.length > 0) {
      switch (input.attr('type')) {
        case 'checkbox':
          if (Array.isArray(value)) {
            $('input[name=' + input.attr('name') + ']').each(function() {
              checked = false;
              for (var i = 0; i < value.length; i++) {
                if (!checked) {
                  if (value[i] === $(this).val()) {
                    checked = true;
                    this.checked = true;
                  } else this.checked = false;
                }
              }
            });
          } else {
            input.each(function() {
              this.checked = value ? true : false;
            });
          }
          break;
        case 'radio':
          if (typeof value === 'string') {
            $('input[name=' + input.attr('name') + ']').each(function() {
              this.checked = value === $(this).val();
            });
          } else {
            input.each(function() {
              this.checked = value ? true : false;
            });
          }
          break;
        default:
          input.val(value);
          break;
      }
    }
  };
  var getCheckboxRadioLabbel = function(value) {
    var input = $(_this.className);
    var item;
    var _value = value === false ? '' : value;

    if (input.attr('type') === 'checkbox' || input.attr('type') === 'radio') {
      item = $('input[name="' + input.attr('name') + '"][value="' + _value + '"]');

      if (item.length > 0) {
        item = item.next('.input__label');

        if (item.length > 0) {
          if (!item.hasClass('input--icon-text__label')) {
            return item.text();
          } else {
            return item.find('.icon-text__text__content').text();
          }
        } else {
          return _value;
        }
      } else {
        return _value;
      }
    } else return _value;
  };
  var priceToInt = function(val) {
    var valInt = val && val !== '' ? val.replace(/[\D\s\._\-]+/g, '') : null;
    val = val.replace(/[\D\s\._\-]+/g, '');
    if (valInt !== null) {
      valInt = val === '0' ? 0 : parseInt(val);
    }

    return valInt;
  };

    /* ----------  public function  ----------*/

  this.getValue = function() {
    var input = $(this.className);
    var group = input.parents('.input__group');
    var inputChecked;

    return testExist(function() {
      var val;
      var _dateArr;
      if (group.length > 0 && group.find('.input__input').length > 1) {
        switch (_this.type) {
          case 'tel':
            val = {
              countryCode: $(_this.className + 'CountryCode').val(),
              phoneNumber: input.val(),
            };
            break;
          case 'price':
          case 'price1000':
            if ($(_this.className + 'Currency').length > 0) {
              val = {
                currency: $(_this.className + 'Currency').val(),
                amount: priceToInt(input.val()),
              };
            } else {
              val = {
                currency: group.find('.input__group__item--unit').text(),
                amount: priceToInt(input.val()),
              };
            }
            break;
          default:
            val = [];
            group.find('.input__input').each(function(index) {
              val.push(getInputValue($(this)));
            });
            break;
        }
      } else {
        switch (_this.type) {
          case 'price':
          case 'price1000':
            val = priceToInt(input.val());
            break;
          case 'date':
            _dateArr = input.val().split('/');
            val = {
              day: _dateArr[0] ? _dateArr[0] : null,
              month: _dateArr[1] ? _dateArr[1] : null,
              year: _dateArr[2] ? _dateArr[2] : null,
            };
            break;
          case 'tnc':
          case 'tncAbove':
            val = getInputValue(input);

            if (Array.isArray(val)) {
              val = val.length > 0;
            } else {
              val = false;
            }
            break;
          default:
            val = getInputValue(input);
            break;
        }
      }

      return val;
    });
  };
  this.getDisplayValue = function() {
    var input = $(this.className);
    var unit = input.parents('.input').find('.input__group__item--unit');
    var val = this.getValue();
    var displayVal = '';

    return testExist(function() {
      switch (_this.type) {
        case 'tel':
          if (typeof val === 'object' && val !== null) {
            displayVal = typeof val.countryCode !== 'undefined' && val.countryCode !== null ? (val.countryCode + ' ') : '';
            displayVal += typeof val.phoneNumber !== 'undefined' && val.phoneNumber !== null ? val.phoneNumber : '';
          } else {
            displayVal = typeof val !== 'undefined' && val !== null ? val : '';
          }
          break;
        case 'price':
        case 'price1000':
          if (typeof val === 'object' && val !== null) {
            displayVal = typeof val.currency !== 'undefined' && val.currency !== null ? (val.currency) : '';
            displayVal += typeof val.amount !== 'undefined' && val.amount !== null ? addComma(val.amount) : '';
          } else {
            displayVal = unit.length > 0 ? unit.text() : '';
            if (typeof val !== 'undefined' && val !== null) displayVal += addComma(val);
          }
          break;
        case 'date':
          displayVal = input.val();
          break;
        default:
          if (Array.isArray(val)) {
            for (var i = 0; i < val.length; i++) {
              if (i === 0) {
                displayVal = getCheckboxRadioLabbel(val[i]);
              } else {
                displayVal += ', ' + getCheckboxRadioLabbel(val[i]);
              }
            }
          } else {
            displayVal = typeof val !== 'undefined' && val !== null ? getCheckboxRadioLabbel(val) : '';
          }
          break;
      }

      return displayVal;
    });
  };
  this.setValue = function(value) {
    var input = $(this.className);

    return testExist(function() {
      if (group.length > 0) {
        switch (_this.type) {
          case 'tel':
            if (value) {
              if (typeof value.countryCode !== 'undefined') {
                $(_this.className + 'CountryCode').val(value.countryCode).keyup().blur();
              }
              if (typeof value.phoneNumber !== 'undefined') {
                input.val(value.phoneNumber);
              }
            }

            input.keyup().blur();
            break;
          case 'price':
          case 'price1000':
            if (value) {
              if (typeof value === 'object') {
                if (typeof value.currency !== 'undefined') {
                  $(_this.className + 'Currency').val(value.currency).keyup().blur();
                }
                if (typeof value.amount !== 'undefined') {
                  input.val(value.amount);
                }
              } else {
                input.val(value);
              }
            }

            input.keyup().blur();
            break;
          default:
            if (Array.isArray(value)) {
              group.find('.input__input').each(function(index) {
                if (value[index]) {
                  setInputValue($(this), value[index]);
                }

                $(this).keyup().blur();
              });
            }

            break;
        }
      } else if (_this.type === 'date') {
        if (typeof value === 'object') {
          setInputValue(input, value.day + '/' + value.month + '/' + value.year);
        } else {
          setInputValue(input, value);
        }

        input.keyup().blur();
      } else {
        setInputValue(input, value);

        input.keyup().blur();
      }

      _this.setError({error: false});
    });
  };
  this.setUnit = function(unit) {
    $(this.className).parents('.input').find('.input__group__item--unit').html('<b>' + unit + '</b>');
    $(this.className).parents('.input').find('.input__comment--unit').html(unit);
  };
  this.setError = function(options) {
    var error = options ? (typeof options.error === 'undefined' || options.error) : true;
    var msg = options ? (options.message ? options.message : '') : '';
    var labelIndex = options ? (options.labelIndex ? options.labelIndex : 0) : 0;
    var input = $(this.className).parents('.input');
    var labelText = '';
    var maxValue;
    var minValue;
    var unit = input.find('.input__group__item--unit');

    testExist(function() {
      if (typeof _this.label === 'string') {
        labelText = _this.label.toLowerCase();
      } else if (input.find('.input__label').length > labelIndex) {
        labelText = input.find('.input__label').eq(labelIndex).html().toLowerCase();
      }

      if (labelText === '') {
        msg = msg.replace(' a [label]', '').replace(' the [label]', '').replace('[label]', '');
      } else {
        labelText.replace(' hkid ', ' HKID ').replace(' id ', ' ID ');
        if (msg.search(' a [label]') !== -1 && (labelText[0] === 'a'||labelText[0] === 'e'||labelText[0] === 'i'||labelText[0] === 'o'||labelText[0] === 'u')) {
          msg = msg.replace(' a [label]', ' an ' + labelText);
        } else {
          msg = msg.replace('[label]', labelText);
        }

        maxValue = _this.max !== null ? addComma(_this.max) : '-';
        minValue = _this.min !== null ? addComma(_this.min) : '-';

        if (unit.length > 0) {
          if (unit.next().length > 0) {
            maxValue = unit.text() + maxValue;
            minValue = unit.text() + minValue;
          } else {
            maxValue += unit.text();
            minValue += unit.text();
          }
        }

        msg = msg.replace('[max]', maxValue).replace('[min]', minValue);
      }

      if (error) {
        _this.setDisabled(false);
        _this.setReadonly({error: false});
        if (msg !== '') {
          input.find('.input__error').removeClass('input__error--noMessage').html(msg);
        } else {
          input.find('.input__error').addClass('input__error--noMessage').html('');
        }

        input.addClass('input--error');
      } else {
        input.removeClass('input--error');
        input.find('.input__error').html('');
      }
    });
  };
  this.setDisabled = function(disabled) {
    var input = $(this.className).parents('.input');

    testExist(function() {
      if (typeof disabled === 'undefined' || options.disabled) {
        _this.setError({error: false});
        _this.setReadonly({error: false});
        input.addClass('input--disabled');
        input.find('.input__input, .input__select').each(function() {
          this.disabled = true;
        });
      } else {
        input.removeClass('input--disabled');
        input.find('.input__input, .input__select').each(function() {
          this.disabled = false;
        });
      }
    });
  };
  this.setReadonly = function(readonly) {
    var input = $(this.className).parents('.input');

    testExist(function() {
      if (typeof readonly === 'undefined' || options.readonly) {
        _this.setError({error: false});
        _this.setDisabled({error: false});
        input.addClass('input--readonly');
        input.find('.input__input, .input__select').each(function() {
          this.readonly = true;
        });
      } else {
        input.removeClass('input--readonly');
        input.find('.input__input, .input__select').each(function() {
          this.readonly = false;
        });
      }
    });
  };
  this.checkValidation = function() {
    var val = this.getValue();
    var errorMsg = this.errorMessage;
    switch (this.type) {
      case 'tel':
        if (checkHasVal(val.phoneNumber)) {
          if (checkRegex(val.countryCode, regexSetting.tel) && checkRegex(val.phoneNumber, regexSetting.number)) {
            if (val.countryCode === '+852') {
              if (checkRegex(val.phoneNumber, regexSetting.hkTel)) {
                this.setError({error: false});
                return true;
              } else {
                if (dMode) console.log('If +852 is selected as country code, mobile number must begin with 4, 5, 6, 7, 8, or 9 only. ');
                this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
                return false;
              }
            } else {
              this.setError({error: false});
              return true;
            }
          } else {
            if (dMode) console.log('mobile must number only');
            this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
            return false;
          }
        } else if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('input has not value');
          this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required, labelIndex: getNoInputLabel()});
          return false;
        }
      case 'price':
      case 'price1000':
        var _val = val;
        if (checkHasVal(val)) {
          if (checkRange(_val)) {
            if (_val % 1000 === 0 || _this.type === 'price') {
              this.setError({error: false});
              return true;
            } else {
              if (dMode) console.log('price % 1000 must 0');
              this.setError({error: true, message: errorMsg !== null ? errorMsg : inputError.mod1000[lang]});

              return false;
            }
          } else {
            if (dMode) console.log('must ' + _this.min + '-' + _this.max);
            this.setError({error: true, message: errorMsg !== null ? errorMsg : rangeError()});
            return false;
          }
        } else if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('input has not value');
          this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required, labelIndex: getNoInputLabel()});
          return false;
        }
      case 'number':
        if (checkHasVal(val)) {
          if (checkRegex(val, regexSetting.number)) {
            if (checkRange(val)) {
              if (checkLength(val)) {
                this.setError({error: false});
                return true;
              } else {
                if (dMode) console.log('value length must ' + _this.charLength);
                this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
                return false;
              }
            } else {
              if (dMode) console.log('must ' + _this.min + '-' + _this.max);
              this.setError({error: true, message: errorMsg !== null ? errorMsg : rangeError()});
              return false;
            }
          } else {
            if (dMode) console.log('must number only');
            this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
            return false;
          }
        } else if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('input has not value');
          this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required, labelIndex: getNoInputLabel()});
          return false;
        }
      case 'confirm':
        if (checkHasVal(val)) {
          if (val === _this.dataValue) {
            this.setError({error: false});
            return true;
          } else {
            if (dMode) console.log(val + '!==' + _this.dataValue);
            this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
            return false;
          }
        } else if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('input has not value');
          this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required, labelIndex: getNoInputLabel()});
          return false;
        }
      case 'date':
        val = $(_this.className).val();
        if (checkHasVal(val)) {
          if (checkRegex(val, regexSetting.date)) {
            this.setError({error: false});
            return true;
          } else {
            if (dMode) console.log('not date format');
            this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
            return false;
          }
        } else if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('input has not value');
          this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required, labelIndex: getNoInputLabel()});
          return false;
        }
      default:
        if (checkHasVal(val)) {
          if (typeof regexSetting[this.type] !== 'undefined' && regexSetting[this.type] !== null) {
            if (checkRegex(val, regexSetting[this.type])) {
              this.setError({error: false});
              return true;
            } else {
              if (dMode) console.log('invalid');
              this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
              return false;
            }
          } else {
            this.setError({error: false});
            return true;
          }
        }
        if (!this.required) {
          this.setError({error: false});
          return true;
        } else {
          if (dMode) console.log('no value');
          switch (this.type) {
            case 'yesno':
            case 'checkbox':
            case 'radio':
            case 'withLabel':
            case 'selectAtLeast':
            case 'tnc':
            case 'tncAbove':
            case 'date':
              this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting[this.type]});
              break;
            default:
              this.setError({error: true, message: errorMsg !== null ? errorMsg : errorSetting.required});
              break;
          }

          return false;
        }
    }
  };
  if (this.disable == true) this.setDisabled();
}

/* =====  End of input Object  ======*/

/**
 * It is loading
 * @param {obj} options - options
 */
function loading(options) {
  /* ----------  default setting  ----------*/
  this.className = options ? (options.className ? options.className : '') : '';
  /* ----------  private function  ----------*/
  /* ----------  public function  ----------*/
  this.open = function() {
    $(this.className).addClass('loading--active');
  };
  this.close = function() {
    $(this.className).removeClass('loading--active');
  };
}

/* =====  End of loading  ======*/



/**
 * It is form Obj
 * @param {obj} options - options
 */
function New(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  };
}
/* =====  End of New  ======*/


/**
 * It is BranchLocator Obj
 * @params {int} obj - options
 * todo list,
 * 1. update service then location
 * 2. list service detail
 * 3. more dynamic change service function
 */
function BranchLocator() {
  this.objName;
  this.map;
  this.markers;
  this.currentMarkers;
  this.serviceList;
  this.currentService = [0];
  this.directionsService;
  this.directionsDisplay;
  this.autocompleteInput = 'map__search';
  this.OpeningHoursTable = branchlist[0]
      .Config
      .BranchATM
      .OpeningHoursTable
      .Tr;
  this.currentLatLng;
  this.currentDistrict = 'ALL';
  this.districtBtn =$('.map__tools__detail__list .map__button');
  this.branchWrapper = $('.map__branches__list .map__scroll-pane');
  this.currentLocationTrigger = '.map__currentLocation';
  this.scrollapi;
  this.img = 'http://dahsing.com/images/common/components/pin.png';
  this.distanceHtml = '<span class="badge badge-pill badge-secondary">value</span>';
  this.init = function() {
    if ($('#map').length > 0) {
      var script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js'+
      '?key=AIzaSyD1dBeKhrg5lYl4hN_iDTj91ClUy1Prnrg'+
      '&libraries=places,geometry'+
      '&output=embed'+
      '&callback='+
      this.objName+
      '.createMap';
      document.getElementsByTagName('head')[0].appendChild(script);
    };
  };
  var _this = this;
  this.createMap = function() {
    var myLatlng = new google.maps.LatLng(
        22.396427,
        114.109497
    );
    var mapOptions = {
      zoom: 11,
      center: myLatlng,
      mapTypeControl: false,
    };
    _this.map = new google.maps.Map(
        document.getElementById('map'),
        mapOptions
    );
    _this.markers = [];
    _this.autocomplete();
    _this.marker();
    _this.createService();
    _this.directionsService =
    new google.maps.DirectionsService;
    _this.directionsDisplay =
    new google.maps.DirectionsRenderer;

    $('.map__tools__trigger>a').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      var $index = $this.index();
      if ($this.is('.active')) return;
      $('.map__tools__trigger a').removeClass('active');
      $('.map__tools__detail').children().slideUp(500);
      $this.addClass('active');
      $('.map__tools__detail').children().eq($index).slideDown(500);
    });
    _this.districtBtn.click(function(e) {
      e.preventDefault();
      var $this = $(this);
      var showDistrict = $this.data('showDistrict');
      if (!$this.is('.active')) {
        _this.districtBtn
            .removeClass('active');
        $this.addClass('active');
        _this.filterMarker(showDistrict);
      }
    });
    $(_this.currentLocationTrigger).click(function(e) {
      e.preventDefault();

      if ($(_this.currentLocationTrigger)
          .is('.map__currentLocation--loading')) {
        return;
      }
      _this.resetAll();
      $('.map__branches__list')
          .addClass('map__branches__list--showdistance');
      $(_this.currentLocationTrigger)
          .addClass('map__currentLocation--loading');
      _this.getCurrentLocation();
    });
    $('.map__clear').click(function(e) {
      e.preventDefault();
      _this.resetAll();
    });
  };

  this.resetAll = function() {
    _this.clearPath();
    _this.removeErrorToInput();
    $('#'+_this.autocompleteInput).val('');
    $('.map__branches__list')
        .removeClass('map__branches__list--showdistance');
    _this.filterMarker('ALL');
  };

  this.createService= function() {
    _this.serviceList = branchlist[0]
        .Config
        .BranchATM
        .Services
        .Service;
    var _serviceHtml = serviceHTML;
    for (var i = _this.serviceList.length - 1; i >= 0; i--) {
      var _serviceInsertContent = _serviceHtml
          .replace(/serviceID/g,
              'service_'+_this.serviceList[i].ID
          )
          .replace(/serviceContent/g,
              _this.serviceList[i].TcText
          );
      $('.map__facility__content')
          .prepend(_serviceInsertContent);

      _this.serviceList[i]['obj'] = new inputObj({
        className: '.service_'+_this.serviceList[i].ID,
        type: 'tnc',
      });
    }

    _this.serviceList[0]['obj'].setValue(true);
    $('.service__input').on('change', function() {
      var $this = $(this);
      var $id = $this.attr('id')+'';
      var $idNum = $id.replace('service_', '');
      if ($this.is(':checked') == true) {
        // if selected not all
        if ($idNum != 0) {
          // reset the all item
          _this.serviceList[0]['obj'].setValue(false);

          for (var i = _this.serviceList.length - 1; i >= 0; i--) {
            if (i == $idNum) {
              _this.serviceList[i].active = true;
              _this.currentService.push($idNum);
            }
          }
        } else {
          // if checked all
          _this.currentService = [0];
          for (var i = _this.serviceList.length - 1; i >= 0; i--) {
            if (i != 0) {
              _this.serviceList[i]['obj'].setValue(false);
              _this.serviceList[i].active = false;
            }
          }
        }
      } else {
        _this.removeArray(_this.currentService, $idNum);
      }
      _this.debounceFilter();
    });
  };

  this.debounceFilter = _.debounce(function($idNum) {
    _this.updateFiter();
  }, 500);

  this.removeArray = function(array, item) {
    var index = array.indexOf(item);
    if (index !== -1) array.splice(index, 1);
  };

  this.updateFiter = function() {
    _this.filterMarker(_this.currentDistrict);
    var number = '<span class="map__button__number">value</span>';
    $('.map__facility').find('.map__button__number').remove();
    if (_this.currentService.length != 1) {
      $('.map__facility').append(number.replace('value', _this.currentService.length-1));
    }
  };

  this.filterMarker = function(val) {
    if (val === 'ALL') {
      _this.districtBtn.removeClass('active');
      _this.districtBtn.eq(0).addClass('active');
    }
    _this.currentDistrict = val;
    for (var i = _this.markers.length - 1; i >= 0; i--) {
      if (_this.markers[i].district !== val && val != 'ALL') {
        _this.markers[i].visible = false;
        _this.markers[i].setVisible(false);
      } else {
        _this.markers[i].visible = true;
        _this.markers[i].setVisible(true);
        _this.checkFilter(_this.markers[i]);
      }
    }
    _this.insertData();
  };

  this.checkFilter = function(marker) {
    var obj = [];
    var properties = marker.services.split(',');
    properties.forEach(function(property) {
      obj.push(property);
    });
    for (var r = _this.currentService.length - 1; r >= 0; r--) {
      if (_.contains(obj, _this.currentService[r]) == false
        && _this.currentService[r] != 0
      ) {
        marker.visible = false;
      }
    }
  };

  /**
   * It is map init function
   */
  this.autocomplete = function() {
    /**
    * auto complete
    */
    var autocomplete = new google.maps.places.Autocomplete(
        document.getElementById(_this.autocompleteInput)
    );
    autocomplete.bindTo('bounds', _this.map);
    autocomplete.setFields(['geometry', 'name']);
    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        alert('No details available for input: \'' + place.name + '\'');
        return;
      }
      var latA = place.geometry.location.lat();
      var lngA = place.geometry.location.lng();
      var latLngA = new google.maps.LatLng(latA, lngA);
      _this.resetAll();
      _this.sortMarkers(latA, lngA);
    });
  };

  this.sortMarkers = function(latA, lngA) {
    var latLngA = new google.maps.LatLng(latA, lngA);
    _this.moveToLocation(latLngA);
    for (var i = _this.markers.length - 1; i >= 0; i--) {
      var latLngB = new google.maps.LatLng(
          _this.markers[i].position.lat(),
          _this.markers[i].position.lng()
      );
      var distance = google
          .maps
          .geometry
          .spherical
          .computeDistanceBetween(
              latLngA,
              latLngB
          );
      _this.markers[i].distance = distance;
    }
    var sortingPromise = new Promise(function(resolve, reject) {
      _this.currentMarkers = _.filter(_this.markers, function(val) {
        return val.visible == true;
      });
      _this.currentMarkers = _.sortBy(_this.currentMarkers, 'distance');
      _this.markers = _.sortBy(_this.markers, 'distance');
      resolve(_this.currentMarkers);
    });
    sortingPromise.then(function(value) {
      var nearestBranchLatLng = new google.maps.LatLng(
          value[0].position.lat(),
          value[0].position.lng()
      );
      _this.updateDirection(
          latLngA,
          nearestBranchLatLng
      );
      _this.insertData();
    });
  };

  this.setErrorToInput = function(message) {
    var _parent = $('#'+_this.autocompleteInput).parent();
    _parent.addClass('input--error');
    _parent.find('.input__error').html(message);
    $(_this.currentLocationTrigger)
        .removeClass('map__currentLocation--loading');
  };

  this.removeErrorToInput = function(message) {
    var _parent = $('#'+_this.autocompleteInput).parent();
    _parent.removeClass('input--error');
    _parent.find('.input__error').html('');
    $(_this.currentLocationTrigger)
        .removeClass('map__currentLocation--loading');
  };

  this.getCurrentLocation = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          function(position) {
            var latA = position.coords.latitude;
            var lngA = position.coords.longitude;
            _this.displayLocation(latA, lngA);
            _this.removeErrorToInput();
          },
          function(err) {
            _this.setErrorToInput(err.message);
          });
    } else {
      _this.setErrorToInput('not allowed geolocation');
    }
  };

  this.displayLocation = function(latitude, longitude) {
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);
    geocoder.geocode(
        {'latLng': latlng},
        function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              $('#'+_this.autocompleteInput).val(results[0].formatted_address);
              var latA = results[0].geometry.location.lat();
              var lngA = results[0].geometry.location.lng();
              _this.sortMarkers(latA, lngA);
              $(_this.currentLocationTrigger)
                  .removeClass('map__currentLocation--loading');
              _this.removeErrorToInput();
            } else {
              _this.setErrorToInput('address not found');
            }
          } else {
            _this.setErrorToInput('Geocoder failed due to: ' + status);
          }
        }
    );
  };

  this.updateDirection= function(_origin, _destination) {
    _this.directionsService.route({
      origin: _origin,
      destination: _destination,
      travelMode: 'WALKING',
    }, function(response, status) {
      _this.clearPath(function() {
        if (status === 'OK') {
          // this is to render again,
          // otherwise your route wont show for the second time searching
          _this.directionsDisplay = new google.maps.DirectionsRenderer();
          _this.directionsDisplay.setDirections(response);
          _this.directionsDisplay.setMap(_this.map);
        } else {
          console.log('Directions request failed due to ' + status);
        }
      });
    });
  };

  this.moveToLocation = function(center) {
    _this.map.panTo(center);
    _this.map.setZoom(17);
  };

  this.clearPath = function(callback) {
    if (_this.directionsDisplay != null) {
      // clear direction from the map
      _this.directionsDisplay.setMap(null);
      // clear directionpanel from the map
      _this.directionsDisplay.setPanel(null);
      _this.directionsDisplay = null;
    }
    if (callback) callback();
  };

  this.clearData = function() {
    _this.branchWrapper.html('');
    if (_this.scrollapi) {
      _this.scrollapi.destroy();
    }
  };

  this.calcDistance = function(val) {
    var _var = parseInt(val);
    if (_var>1e3) {
      return _var/1e3+' km';
    } else {
      return _var+' m';
    }
  };

  this.insertData = function() {
    _this.clearData();
    for (var i = _this.markers.length - 1; i >= 0; i--) {
      var marker = _this.markers[i];
      var insetItem = branchItemHTML
          .replace(/htmlBranchId/g,
              marker.branchId
          )
          .replace(/htmlBranchDistance/g,
              marker.distance
              ? _this.distanceHtml.replace('value', _this.calcDistance(marker.distance))
              : ''
          )
          .replace(/htmlBranchName/g,
              marker.detail.NameTc
          )
          .replace(/htmlBranchAddress/g,
              marker.detail.AddTc
          )
          .replace(/htmlBranchTel/g,
              marker.detail.Tel
          )
          .replace(/OpeningHoursTableTitle/g,
              _this.OpeningHoursTable[0]
                  .Td[0].TcText
          )
          .replace(/OpeningHoursTableTd1Text/g,
              _this.OpeningHoursTable[1]
                  .Td[0].TcText
          )
          .replace(/OpeningHoursTableTd2Text/g,
              _this.OpeningHoursTable[1]
                  .Td[1].TcText
          )
          .replace(/OpeningHoursTableTd3Text/g,
              _this.OpeningHoursTable[2]
                  .Td[0].TcText
          )
          .replace(/OpeningHoursTableTd4Text/g,
              _this.OpeningHoursTable[2]
                  .Td[1].TcText
          )
          .replace(/htmlBranchOpeningHours/g,
              marker.detail.OpeningHours
          )
          .replace(/additionalClass/g,
              marker.district
          );
      if (marker.visible === true) {
        _this.branchWrapper.prepend(insetItem);
      }
    }
    $('.map__branches__result__num').html(
        $('.map__branches__list__item:visible').length
    );
    var branchScrollpane = $('.map__branches__list .scroll-pane');
    branchScrollpane.jScrollPane({
      autoReinitialise: true,
    });
    _this.scrollapi = branchScrollpane.data('jsp');
    $('.collapse').collapse();
    _this.clearPath();
  };

  this.marker = function() {
    /**
    *district
    */
    var createMarker = new Promise(function(resolve, reject) {
      var district = branchlist[0].Config.BranchATM.Districts.District;
      for (var i = district.length - 1; i >= 0; i--) {
        var districtId = district[i].ID;
        var districtBranch = district[i].Branch;
        for (var r = districtBranch.length - 1; r >= 0; r--) {
          var branch = districtBranch[r];
          var _lat = Number(branch.LocLat);
          var _lng = Number(branch.LocLon);
          var Services = branch.Services;
          var branchId = branch.NameEn.replace(/ /g, '_');
          var marker = new google.maps.Marker({
            map: _this.map,
            position: {lat: _lat, lng: _lng},
            icon: _this.img,
            district: districtId,
            services: Services,
            branchId: branchId,
            detail: branch,
            visible: true,
          });
          _this.markers.push(marker);
        }
      }
      resolve(_this.markers);
    });
    createMarker.then(function(value) {
      _this.insertData();
    });
  };
}
/* =====  End of BranchLocator  ======*/

/**
* It is Menu Obj
*/
function Menu() {
  var _this = this;
  var _mobile = window.matchMedia('(max-width: 992px)');

  this.searchInput = '.menu__search__input';
  this.targetItem = '.menu__target';
  this.triggerItem = '.menu__trigger';

  var _show = function (trigger) {
    if ($(trigger).parent().find(_this.targetItem).length > 0) {
      $(trigger).addClass('active');

      $(trigger).parent().find(_this.targetItem).stop(true).slideDown(300);
    }
  };

  var _hide = function (target) {
    $(target).parent().find(_this.triggerItem).removeClass('active');
    $(target).stop(true).slideUp(300);
  };

  var _hideAll = function () {
    $(_this.targetItem).hide();
    $(_this.triggerItem).removeClass('active');
  }

  this.init = function() {
    // for submenu menu
    $(_this.triggerItem).on('mouseenter click focus', function(event) {
      if (event.type === 'click') {
        if (!_mobile.matches) {
          $(this).trigger('focus');
        } else if ($(this).hasClass('active')) {
          _hide($(this).parent().find(_this.targetItem));
        } else {
          event.preventDefault();
          _hideAll();
          _show(this);
        }
      } else if (!_mobile.matches) {
        _hideAll();
        _show(this);
      }
    });
    $(_this.triggerItem).parent().on('mouseleave', function(event) {
      if (!_mobile.matches)
        _hide($(this).find(_this.targetItem));
    });
    $('body').on('focus touchstart', 'a:not(' + _this.triggerItem + ')', function(e) {
      if ($(e.target).parents(_this.targetItem).length == 0) {
        if (!_mobile.matches) {
          _hideAll();
        } else {
          if ($(e.target).parents('.header__bottom__menu').length == 0)
            _hideAll();
        }
      }
    });
  };
}
/* =====  End of menu  ======*/

/**
 * Modal in bootstrag
 */
$('.modal').on('shown.bs.modal', function(e) {
  if ($(this).find('.scroll-pane').length > 0) {
    var _this = this;
    if ($(_this).find('.modal-dialog').height() - 60 < $(_this).find('.jspPane').height()) {
      $(_this).find('.modal-body').height($(_this).find('.modal-dialog').height() - 60);
    } else {
      $(_this).find('.modal-body').height($(_this).find('.jspPane').height());
    }

    setTimeout(function() {
      $(_this).addClass('scrollpane-ready');
    }, 1200);
  } else {
    $(this).addClass('scrollpane-ready');
  }
}).on('hidden.bs.modal', function(e) {
  if ($(this).find('.scroll-pane').length > 0) {
    $(this).find('.modal-body').css('height', '');
  }

  $(this).removeClass('scrollpane-ready');
});

/* =====  End of modal  ======*/

/**
 * It is MenuLogin Obj
 */
function MenuLogin() {
  var _login = '.menu-login';
  var _loginButton = '.menu-login__button';
  var _loginMenu = '.menu-login__menu';
  var _this = this;
  var _mobile = window.matchMedia('(max-width: 992px)');
  
  this.init = function() {
    $(_loginButton).on('mouseenter click focus', function(event) {
      if (event.type === 'click') {
        if (!_mobile.matches) {
          $(this).trigger('focus');
        } else if ($(this).hasClass('active'))
          _this.hide();
        else
          _this.show();
      } else if (!_mobile.matches) {
        _this.show();
      }
    });

    $(_login).parent().on('mouseleave', function(event) {
      if (!_mobile.matches)
        _this.hide();
    });

    $('body').on('focus touchstart', 'a', function(event) {
      if ($(event.target).parents(_login).length == 0) {
        _this.hide();
      }
    });
  };

  this.show = function () {
    $('.header').removeClass('header--showmenu');
    $('body,html').removeClass('body--showmenu');
    $('.header__btn--menu').removeClass('active');
    $('.header').addClass('header--showlogin');
    $('body,html').addClass('body--showlogin');

    $(_loginButton).addClass('active');

    $(_loginMenu).stop(true, true).slideDown(200);
  }

  this.hide = function () {
    $('.header').removeClass('header--showlogin');
    $('body,html').removeClass('body--showlogin');

    $(_loginButton).removeClass('active');

    $(_loginMenu).stop(true, true).slideUp(200);
  }

  this.init();
}
/* =====  End of New  ======*/

/**
 * It is form Obj
 * @param {obj} options - options
 */
function New(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  };
}
/* =====  End of New  ======*/

/**
* It is pagelocator Obj
* @param {obj} options - options
*/
function Pagelocator(options) {
  this.defaultsettings= {
    htmlContent: '<a href="#" class="pagelocator__item" data-target="pagelocatorTextTarget"><span class="pagelocator__item__text">pagelocatorText</span><span class="pagelocator__item__indicator"></span></a>',
    target: '.sectionWaypoint',
    tigger: '.pagelocator__tigger',
    item: '.pagelocator__item',
    header: '.pagelocator__header',
    wrapper: '.pagelocator',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
    _this.checkLocator();

    $(_setting.target).each(function() {
      var $this = $(this);
      var _id = $this.attr('id');
      var _text = $this.data('locatorName');
      var _injectHTML = _setting.htmlContent
          .replace('pagelocatorTextTarget', _id)
          .replace('pagelocatorText', _text || _id);
      $(_setting.tigger).append(_injectHTML);
    }).waypoint(function(direction) {
      var _id = this.element.id;

      if ($('body').is('.scrolling')) {
        return;
      }

      if (direction === 'down') {
        $(_setting.item).each(function() {
          var _target = $(this).data('target');
          var $this = $(this);
          if (_target === _id) {
            _this.updateCurrent($(this));
          }
        });
      } else {
        var _index = $('.pagelocator__item.current').index();
        if (_index != 0) {
          var preItem = $('.pagelocator__item.current').prev();
          _this.updateCurrent(preItem);
        }
      }
    }, {
      offset: $('.header').outerHeight(),
    });

    $(_setting.item).click(function(e) {
      e.preventDefault();
      var target = $(this).data('target');
      _this.scrollToTarget(target);
      _this.updateCurrent($(this));
    });

    $(_setting.header).click(function(e) {
      $(_setting.wrapper).addClass('active');
    });

    $('body').on('click', function(e) {
      if ($(e.target).parents(_setting.wrapper).length == 0) {
        $(_setting.wrapper).removeClass('active');
      }
    });
  };

  this.updateheader = function(target) {
    $('.pagelocator__header .current').html(target.find('.pagelocator__item__text').text());
  };

  this.scrollToTarget =function(target) {
    var targetTop = $('#'+target).offset().top - $('.header').height();
    $(_setting.wrapper).removeClass('active');
    $('body').addClass('scrolling');
    $('html, body')
        .stop(true)
        .animate(
            {
              scrollTop: targetTop,
            },
            300,
            function() {
              $('body').removeClass('scrolling');
            }
        );
  };

  this.checkLocator = function() {
    if ($('.sectionWaypoint').length==0) {
      $('.pagelocator').hide();
    }
  };

  this.updateCurrent= function(ele) {
    $(_setting.item).blur().removeClass('current');
    ele.addClass('current');
    _this.updateheader(ele);
  };
}
/* =====  End of pagelocator  ======*/


/**
 * It is ProductList Obj
 * @param {obj} options - options
 */
function ProductList(options) {
  this.defaultsettings= {
    productList: '.product-list__filter',
    productListButton: '.product-list__filter > .button'
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
    $(_setting.productListButton).on('click', function(e){
      e.preventDefault();
      $(_setting.productListButton).addClass('button--blue--outline');
      $(this).removeClass('button--blue--outline');
    })
  };
}
/* =====  End of ProductList  ======*/


/**
 * It is Qrcode Obj
 * @param {obj} options - options
 */
function Qrcode(options) {
  this.defaultsettings= {};
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  };
}
/* =====  End of Qrcode  ======*/

/* =============================
=            scrollpane            =
=============================*/
$('.scroll-pane').jScrollPane({
  autoReinitialise: true,
  autoReinitialiseDelay: 200,
});
/* =====  End of scrollpane  ======*/




/**
 * It is select Obj
 * @param {obj} options - options
 */
function selectObj(options) {
  /* ----------  default setting  ----------*/
  this.valid = false;
  this.required = options ? (options.required || typeof options.required === 'undefined') : true;
  this.type = options ? (options.type ? options.type : '') : '';
  this.className = options ? (options.className ? options.className : '') : '';
  this.selectType = options ? (options.selectType ? options.selectType : '') : '';
  this.events = options ? (options.events ? options.events : null) : null;
  this.group = $(this.className).parents('.select__group').length > 0;
  this.maxItems = options ? (options.maxItems ? options.maxItems : -1) : -1;
  this.mulit = $(this.className).parents('.select.row').length > 0;
  this.saveTarget = options ? (options.saveTarget ? options.saveTarget : 'userData') : 'userData';
  this.saveKey = options ? (options.saveKey ? options.saveKey : '') : '';
  this.label = options ? (options.label || options.label === '' ? options.label : false) : false;
  this.errorMessage = options ? (options.errorMessage ? options.errorMessage : inputError.checkboxRadioRequired[lang]) : inputError.checkboxRadioRequired[lang];
  this.importData = options ? (options.importData ? options.importData : '') : '';
  this.promoIndex = options ? (options.promoIndex ? options.promoIndex : null) : null;

  /* group select */
  if (this.group) {
    $(this.className).parents('.select').find('.select__add-item__link').click(function() {
      _this.addGroupItem();
    });
  }

  /* callback events */
  if (typeof this.events === 'object') {
    for (var key in this.events) {
      if (typeof this.events[key] === 'function') {
        $(this.className).on(key, function(events) {
          _this.events[key](events);
        });
      }
    }
  }


  /* on change set error false */
  $(this.className).change(function() {
    _this.setError({error: false});
  });


  /* ----------  private function  ----------*/
  var _this = this;
  var testExist = function(callback) {
    var select = $(_this.className);
    if (select.length > 0) return callback();
    else {
      if (dMode) console.log('Select(', _this.className, ') does not exist.');
      return false;
    }
  };
  var checkHasVal = function(val) {
    var select = $(_this.className);
    var hasVal = false;
    return testExist(function() {
      if (_this.group) {
        select.parents('.select').find('.select__select').each(function() {
          if ($(this).val() && $(this).val().length > 0) {
            hasVal = true;
          }
        });

        return hasVal;
      } else if (_this.mulit) {
        hasVal = true;

        select.parents('.select').find('.select__select').each(function() {
          if (!($(this).val() && $(this).val().length > 0)) {
            hasVal = false;
          }
        });

        return hasVal;
      } else {
        return val && val.length > 0 ? true : false;
      }
    });
  };
  var checkMaxItems = function() {
    if (_this.maxItems === -1) {
      return false;
    } else if ($(_this.className).parents('.select__group').find('.select__group__item').length >= _this.maxItems) {
      return true;
    } else {
      return false;
    }
  };

  if (_this.importData) {
    var targetSelf = $(_this.className);
    var showLang = (lang === 'en') ? 'en' : 'tc';
    var firstOption = '<option value="" selected="" disabled="">'+((showLang ==='en')?'Please select...':'請選擇')+'</option>';
    targetSelf.empty(); // remove old options
    targetSelf.append(firstOption);
    $.each(_this.importData, function(data) {
      switch (_this.selectType) {
        case 'branch':
          var name = $(this)[0].name[showLang];
          var value = $(this)[0].address[showLang];
          targetSelf.append($('<option></option>') .attr('value', name+' - '+value).text(name));
          break;
        case 'country':
        case 'position':
          var name = $(this)[0][showLang];
          var val = $(this)[0]['en'];
          targetSelf.append($('<option></option>') .attr('value', val).text(name));
          break;
        default:
          var name = $(this)[0][showLang];
          var val = $(this)[0]['en'];
          targetSelf.append($('<option></option>') .attr('value', val).text(name));
          break;
      }
    });
  }

  /* ----------  public function  ----------*/

  this.getValue = function() {
    var select = $(this.className);
    var val = [];
    return testExist(function() {
      if (_this.group) {
        select.parents('.select').find('.select__select').each(function() {
          if ($(this).val() && $(this).val().length > 0) {
            val.push($(this).val());
          }
        });

        return val;
      } else if (_this.mulit) {
        switch (_this.type) {
          case 'date':
          case 'age18':
          case 'hkidDate':
          case 'passportDate':
            val = {
              day: select.parents('.select').find('.select__select[name="day"]').val(),
              month: select.parents('.select').find('.select__select[name="month"]').val(),
              year: select.parents('.select').find('.select__select[name="year"]').val(),
            };
            break;
          default:
            select.parents('.select').find('.select__select').each(function() {
              if ($(this).val() && $(this).val().length > 0) {
                val.push($(this).val());
              }
            });
            break;
        }

        return val;
      } else {
        return $(_this.className).val();
      }
    });
  };
  this.getDisplayValue = function() {
    var select = $(this.className);
    var val = this.getValue();
    var displayVal = '';

    return testExist(function() {
      if (typeof val === 'object' && val !== null) {
        if (_this.type === 'date' || _this.type === 'age18' || _this.type === 'hkidDate' || _this.type === 'passportDate') {
          displayVal = val.day === null || val.month === null || val.year === null ? '' : (val.day + '/' + val.month + '/' + val.year);
        } else {
          for (var i = 0; i < val.length; i++) {
            if (i == 0) {
              displayVal += select.find('option[value="' + val[i] + '"]').html();
            } else {
              displayVal += ', ' + select.find('option[value="' + val[i] + '"]').html();
            }
          }
        }
      } else {
        displayVal = select.find('option[value="' + val + '"]').length > 0 ? select.find('option[value="' + val + '"]').text() : '';
      }

      return displayVal;
    });
  };
  this.setValue = function(value) {
    var select = $(this.className);
    var val = Array.isArray(value) ? value : [value];

    testExist(function() {
      _this.setError({error: false});

      if (_this.group) {
        select.parents('.select').find('.select__select').each(function(index) {
          if (val[index]) {
            $(this).val(val[index]);
          } else {
            $(this).val('');
          }
        });
      } else if (_this.mulit) {
        if (Array.isArray(value) || typeof value !== 'object') {
          select.parents('.select').find('.select__select').each(function(index) {
            if (val[index]) {
              $(this).val(val[index]);
            } else {
              $(this).val('');
            }
          });
        } else {
          switch (_this.type) {
            case 'date':
            case 'age18':
            case 'hkidDate':
            case 'passportDate':
              if (value.day) select.parents('.select').find('.select__select[name="day"]').val(value.day);
              if (value.month) select.parents('.select').find('.select__select[name="month"]').val(value.month);
              if (value.year) select.parents('.select').find('.select__select[name="year"]').val(value.year);
              break;
            default:
              break;
          }
        }
      } else {
        $(_this.className).val(value);
      }
    });
  };
  this.setError = function(options) {
    var error = options ? (typeof options.error === 'undefined' || options.error) : true;
    var msg = options ? (options.message ? options.message : '') : '';
    var select = $(this.className).parents('.select');

    testExist(function() {
      var labelText = '';

      if (typeof _this.label === 'string') {
        labelText = _this.label.toLowerCase();
      } else if (select.find('.select__label').length > 0) {
        labelText = select.find('.select__label').html().toLowerCase();
      }

      if (labelText === '') {
        msg = msg.replace(' a [label]', '').replace(' the [label]', '').replace('[label]', '');
      } else {
        labelText.replace(' hkid ', ' HKID ').replace(' id ', ' ID ');
        if (msg.search(' a [label]') !== -1 && (labelText[0] === 'a'||labelText[0] === 'e'||labelText[0] === 'i'||labelText[0] === 'o'||labelText[0] === 'u')) {
          msg = msg.replace(' a [label]', ' an ' + labelText);
        } else {
          msg = msg.replace('[label]', labelText);
        }
      }

      if (error) {
        _this.setDisabled(false);
        if (msg !== '') {
          select.find('.select__error').removeClass('select__error--noMessage').html(msg);
        } else {
          select.find('.select__error').addClass('select__error--noMessage').html('');
        }

        select.addClass('select--error');
      } else {
        select.removeClass('select--error');
        select.find('.select__error').html('');
      }
    });
  };
  this.setDisabled = function(disabled) {
    var select = $(this.className).parents('.select');

    testExist(function() {
      if (typeof disabled === 'undefined' || options.disabled) {
        _this.setError({error: false});
        select.addClass('select--disabled');
        select.find('.select__select').each(function() {
          this.disabled = true;
        });
      } else {
        select.removeClass('select--disabled');
        select.find('.select__select').each(function() {
          this.disabled = false;
        });
      }
    });
  };
  this.checkValidation = function() {
    var val = this.getValue();
    var date;
    var today;
    if (!this.required || checkHasVal(val)) {
      if (this.group) {
        this.setValue(this.getValue());

        $(this.className).each(function(index) {
          if (!($(this).val() && $(this).val().length > 0)) {
            _this.removeGroupItem(index);
          }
        });
      }

      switch (this.type) {
        case 'hkidDate':
          today = new Date();
          date = new Date(parseInt(val.year), parseInt(val.month) - 1, parseInt(val.day));

          if (date > today) {
            if (dMode) console.log('must before today');
            this.setError({error: true, message: inputError.selectInvalidBeforeToday[lang]});
            return false;
          } else {
            this.setError({error: false});
            return true;
          }
        case 'passportDate':
          today = new Date();
          date = new Date(parseInt(val.year), parseInt(val.month) - 1, parseInt(val.day));

          if (date < today) {
            if (dMode) console.log('must after today');
            this.setError({error: true, message: this.errorMessage});
            return false;
          } else {
            this.setError({error: false});
            return true;
          }
          // case 'age18':
          //     today = new Date();
          //     date = new Date(parseInt(val.year) + 18, parseInt(val.month) - 1, val.day);

          //     if (date > today) {
          //         if (dMode) console.log('age < 18');
          //         this.setError({error: true, message: inputError.age18[lang]});
          //         return false;
          //     } else {
          //         this.setError({error: false});
          //         return true;
          //     }
        default:
          this.setError({error: false});
          return true;
      }
    } else {
      if (dMode) console.log('has not select value');
      this.setError({error: true, message: this.errorMessage});
      return false;
    }
  };
  this.addGroupItem = function() {
    if (!checkMaxItems()) {
      testExist(function() {
        var item = $(_this.className).parents('.select__group').find('.select__group__item').eq(0).clone(true);
        var itemId = $(_this.className).parents('.select__group').find('.select__select').eq(0).attr('id');
        var index = $(_this.className).parents('.select__group').find('.select__group__item').length;

        item.addClass('select__group__item--new-item');
        item.find('.select__label').attr('for', itemId + '-' + (index + 1)).addClass('select__label--hide');
        item.find('.select__select').attr('id', itemId + '-' + (index + 1));
        item.find('.select__group__cross').click(function() {
          var _id = parseInt($(this).parents('.select__group__item').find('.select__select').attr('id').replace(itemId + '-', '')) - 1;
          _this.removeGroupItem(_id);
        });

        $(_this.className).parents('.select__group').append(item);

        if (checkMaxItems()) {
          $(_this.className).parents('.select').addClass('select--max-items');
        } else {
          $(_this.className).parents('.select').removeClass('select--max-items');
        }
      });
    }
  };
  this.removeGroupItem = function(index) {
    if (index !== 0) {
      testExist(function() {
        var item = $(_this.className).parents('.select__group').find('.select__group__item');
        var itemId = $(_this.className).parents('.select__group').find('.select__select').eq(0).attr('id');
        if (item.length > index) {
          item.eq(index).remove();

          item.each(function(_index) {
            if (_index !== 0) {
              $(this).find('.select__label').attr('for', itemId + '-' + (_index + 1));
              $(this).find('.select__select').attr('id', itemId + '-' + (_index + 1));
            }
          });
        }
      });

      if (checkMaxItems()) {
        $(_this.className).parents('.select').addClass('select--max-items');
      } else {
        $(_this.className).parents('.select').removeClass('select--max-items');
      }
    }
  };
}

/* =====  End of select  ======*/


/**
 * It is custom Slider
 * @param {obj} options - options
 */
function customSlider(options) {
  /* ----------  default setting  ----------*/
  this.className = options ? (options.className ? options.className : '') :'';
  this.min = options ? (options.min ? options.min : '') :'';
  this.max = options ? (options.max ? options.max : '') :'';
  this.onChange = options ? (options.onChange ? options.onChange : '') :'';
  this.amount = options ? (options.max ? options.max : '') :'';

  /* ----------  private function  ----------*/

  var _this = this;
  /* ----------  public function  ----------*/
  this.init = function() {
    $(this.className).slider({
      range: 'min',
      min: this.min,
      max: this.max,
      value: 2,
      slide: function( event, ui ) {
        // $( ".slider__amount" ).val( ui.value );
        _this.onChange(event, ui, _this.amount);
      },
    });
  };

  this.setValue = function(val) {
    $(this.className).slider('value', val);
  };
}

/* =====  End of slider  ======*/

/**
 * It is SideMenu Obj
 * @param {obj} options - options
 */
function SideMenu (options) {
  this.defaultsettings= {
    className: '.side-menu'
  };
  this.setting = jQuery.extend(this.defaultsettings, options); ;
  this.select = null;
  this.collapse = null
  var _this = this;
  var _setting = _this.setting;
  var _selectId = '';

  this.init = function() {
    var _item;

    this.collapse = $(_setting.className).find('.side-menu__collapse');
    this.select = $(_setting.className).find('.side-menu__select .select__select');

    if (this.select.length > 0) {
      _selectId = '#' + this.select.attr('id');

      if (this.collapse.length > 0) {
        this.collapse.find('.side-menu__title').each(function (index) {
          _item = $('<optgroup label="' + $(this).html() + '"></optgroup>');

          _this.collapse.find($(this).attr('data-target') + ' .side-menu__item').each(function (subIndex) {
            if ($(this).hasClass('active')) {
                $(this).parents('.collapse').collapse('show');
                _item.append('<option value="">' + $(this).text() + '</option>');
            } else {
              _item.append('<option value="' + $(this).find('.side-menu__link').attr('href') + '">' + $(this).text() + '</option>');
            }
          });

          _this.select.append(_item);
        });
      }

      this.select = new selectObj({
        className: _selectId,
        events: {
          change: function (events) {
            window.location.href = _this.select.getValue();
          }
        },
      });

      this.select.setValue('');
    }
  };

  this.init();
}
/* =====  End of SideMenu  ======*/

/**
 * It is StepSlide Obj
 * @param {obj} options - options
 */
function StepSlide(options) {
  this.defaultsettings= {
    className: '.step-slide',
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
      renderFraction: function (currentClass, totalClass) {
        return stepSlideText.pagination[lang].replace('{{current}}', '<span class="' + currentClass + '"></span>').replace('{{total}}', '<span class="' + totalClass + '"></span>');
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    device: 'desktop',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  var _deviceClass = [
    {
      mobile: 'step-slide--mobile',
      desktop: 'step-slide--desktop'
    }
  ];
  
  this.init = function () {
    $(_setting.className).each(function () {
        this.stepSlide = new Swiper(this, _setting);
    });

    _this.reload();
  };

  this.setDevice = function (device) {
    _this.device = device;
    _this.reload();
  }

  this.reload = function () {
    $(_setting.className).addClass('step-slide--loading');
    if (typeof _deviceClass === 'object') {
      for (var key in _deviceClass) {
        if (key === _this.device)
          $(_setting.className).addClass(_deviceClass[key]);
        else
          $(_setting.className).removeClass(_deviceClass[key]);
      }
    }
    $(_setting.className).each(function () {
      var _stepSlide = this;
      if (typeof this.stepSlide !== 'undefined') {
        this.stepSlide.slideReset(0, function () {
          _stepSlide.stepSlide.update();
          $(_stepSlide).removeClass('step-slide--loading');
        });
      }
    });
  }

  this.init();
}
/* =====  End of StepSlide  ======*/


/**
 * It is table Obj
 * @param {obj} options - options
 */
function tableObj(options) {
  /* ----------  default setting  ----------*/

  this.className = options ? (options.className ? options.className : '') : '';

  /* ----------  private function  ----------*/

  var _this = this;
  var testExist = function(callback) {
    var table = $(_this.className).find('.ai-table__wrapper--with-fixed-col');
    if (table.length > 0) return callback();
    else {
      if (dMode) console.log('Table(', _this.className, ') does not exist.');
      return false;
    }
  };

    /* ----------  public function  ----------*/

  this.reload = function() {
    var table;

    testExist(function() {
      $(_this.className).find('.ai-table__wrapper--clone').remove();
      table = $(_this.className).find('.ai-table__wrapper--with-fixed-col').clone();

      table.removeClass('ai-table__wrapper--with-fixed-col').addClass('ai-table__wrapper--clone');

      $(_this.className).prepend(table);
    });
  };

  /* ----------  init  ----------*/

  this.reload();
}

/* =====  End of table  ======*/


/**
 * It is Tab Obj
 * @param {obj} options - options
 */
function Tab(options) {
  this.defaultsettings= {
  	triggerClass: '.tab__trigger',
  	targetClass: '.tab__content',
  };
  this.setting= jQuery.extend(this.defaultsettings, options); ;
  var _this = this;
  var _setting = _this.setting;
  this.init = function() {
  	$(_setting.triggerClass).each(function() {
  		var $this = $(this);
  		if ($this.is('.active')) {
  			var $id = $this.data('targetId');
        _this.changeTab($id);
  		}
  	}).click(function(e) {
      e.preventDefault();
      var $this = $(this);
      var $id = $this.data('targetId');
      $(_setting.triggerClass).removeClass('active');
      $(this).addClass('active');
      _this.changeTab($id);
    });
  };

  this.changeTab = function($id) {
    $(_setting.targetClass).each(function() {
      var contentId = $(this).data('contentId');
      if (contentId == $id) {
        $(_setting.targetClass).removeClass('active');
        $(this).addClass('active');
      }
    });
  };
}
/* =====  End of Tab  ======*/

/**
* Tab Obj
* @param {obj} options - options
*/
function CustomTabs(options) {
  this.defaultsettings= {
    className: '.tab-iconwithtext',
    animationTime: 200,
    toggle: false,
    desktopMinWidth: 992,
  };
  this.setting= jQuery.extend(this.defaultsettings, options);
  var _this = this;
  var _setting = _this.setting;
  var _tabItem = '.tab-iconwithtext__item';
  var _tabAnchor = '.tab-iconwithtext__item__tab';
  var _tabContent = '.tab-iconwithtext__item__content';
  var _desktopTabs = '.tab-iconwithtext__desktop-tab'; 

  // media
  var _desktop = window.matchMedia('(min-width: ' + _setting.desktopMinWidth + 'px)');
  
  this.init = function() {
    $(_setting.className).each(function () {console.log();
      $(this).find(_desktopTabs).html('');

      $(this).find(_tabAnchor).each(function () {
        var _desktopTab = $(this).clone().addClass('tab-iconwithtext__item__tab--desktop');

        // reset icon-text style
        _desktopTab.find('.icon-text').removeClass('icon-text--valigncenter icon-text--inline icon-text--large-icon').addClass('icon-text--center');
        _desktopTab.find('.icon-text__icon').removeClass('icon-text--inline__icon icon-text--large-icon__icon');
        _desktopTab.find('.icon-text--inline__icon__image').removeClass('icon-text--inline__icon__image');
        _desktopTab.find('.icon-text--inline__text').removeClass('icon-text--inline__text');

        // clone desktopTabs
        $(this).parents(_setting.className).find(_desktopTabs).append(_desktopTab);
      });

      // find default active item
      var _self = this;
      setTimeout(function() {
        if ($(_self).find(_tabItem + '.active').length > 0) {
          $(_self).find(_tabItem + '.active').each(function () {
            _this.show($(this).find(_tabAnchor).attr('data-tab-target'), $(this).parents(_setting.className), true);
          });
        } else {
          _this.hideAll();
        }
      }, 1);

      // tab click
      $(this).find(_tabAnchor).click(function (event) {
        event.preventDefault();

        var _active = $(this).parents(_setting.className).find(_tabContent + '[data-tab-id="' + $(this).attr('data-tab-target') + '"]');

        if (!_active.parents(_tabItem).hasClass('active')) {
          _this.show($(this).attr('data-tab-target'), $(this).parents(_setting.className));
        } else if (_setting.toggle === true || !_desktop.matches) {
          _this.hide($(this).attr('data-tab-target'), $(this).parents(_setting.className));
        }
      });

      _desktop.addListener(function () {
        if (_desktop.matches) {
          $(_setting.className).each(function () {
            $(this).find('.tab-iconwithtext__wrapper').height($(this).find(_tabItem + '.active').height());
          });
        }
      });
    });
  };

  this.show = function (tabId, tabEle, init) {
    var _tabIdContent;
    var _tabTab;
    var _tabTabVisible;
    var _tabEle;
    var _fixedItemsOffsetTop;

    if (typeof tabId === 'string') {
      if (typeof tabEle !== 'undefined')
        _tabEle = $(tabEle);
      else
        _tabEle = $(_setting.className);

      _tabEle.each(function () {
        if (tabId !== '') {
          _tabIdContent = $(this).find(_tabContent + '[data-tab-id="' + tabId + '"]');
          _tabTab = $(this).find(_desktopTabs + ' ' + _tabAnchor + '[data-tab-target="' + tabId + '"]');
          _tabTabVisible = $(this).find(_tabAnchor + '[data-tab-target="' + tabId + '"]:visible');
        } else {
          _tabIdContent = $(this).find(_tabContent);
          _tabTab = $(this).find(_desktopTabs + ' ' + _tabAnchor);
          _tabTabVisible = $(this).find(_tabAnchor + ':visible');
        }
      
        if (tabId === '' && _tabTab.length > 0) {
          _this.show(_tabTab[_tabTab.length - 1].attr('data-tab-target'), tabEle);
        } else {
          _this.hideAll();

          setTimeout(function () {
            if (_tabTabVisible.length > 0 && init !== true) {
              if (_tabTabVisible.parents(_desktopTabs).length === 0) {
                _fixedItemsOffsetTop = $('.pagelocator__header').length > 0 ? $('.pagelocator__header').height() : 0;
                $('html, body').scrollTop(_tabTabVisible.offset().top - _fixedItemsOffsetTop);
              }
            }
            _tabIdContent.parents(_tabItem).addClass('active');
            _tabTab.addClass('active');

            setTimeout(function () {
              _tabIdContent.parents('.tab-iconwithtext__wrapper').height($(_tabIdContent).parents(_tabItem).height());
            }, 10);

            if (_desktop.matches) {
              _tabIdContent.fadeIn(_setting.animationTime, function () {
              });
            } else
              _tabIdContent.slideDown(_setting.animationTime);
          }, _setting.animationTime);
        }
        
      });
    }
  };

  this.showAll = function (tabEle) {
    this.show('', tabEle);
  }

  this.hide = function (tabId, tabEle) {
    var _tabIdContent;
    var _tabTab;
    var _tabEle

    if (typeof tabId === 'string') {
      if (typeof tabEle !== 'undefined')
        _tabEle = $(tabEle);
      else
        _tabEle = $(_setting.className);

      _tabEle.each(function () {
        if (tabId !== '') {
          _tabIdContent = $(this).find(_tabContent + '[data-tab-id="' + tabId + '"]');
          _tabTab = $(this).find(_desktopTabs + ' ' + _tabAnchor + '[data-tab-target="' + tabId + '"]');
        } else {
          _tabIdContent = $(this).find(_tabContent);
          _tabTab = $(this).find(_desktopTabs + ' ' + _tabAnchor);
        }
      
        _tabIdContent.parents(_tabItem).removeClass('active');
        _tabTab.removeClass('active');

        if (_desktop.matches)
          _tabIdContent.fadeOut(_setting.animationTime);
        else
          _tabIdContent.slideUp(_setting.animationTime);
      });
    }
  };

  this.hideAll = function (tabEle) {
    this.hide('', tabEle);
  };

  this.init();
}
/* =====  End of New  ======*/

/* ================================
=            tooltips            =
================================*/

$('[data-toggle="tooltip"]').tooltip({
  html: true,
  delay: {show: 100},
});

/* =====  End of tooltips  ======*/


var branchlist = [{
  'Config': {
    'LastUpdate': '2018-08-04 00:00',
    'BranchATM': {
      'Services': {
        'Service': [{
          'ID': '0',
          'EnText': 'Any Services',
          'TcText': '任何服務',
          'ScText': '任何服務',
          'Image': {
            'RelativePath': 'images/services-icon/ico-any.gif',
            'AbsolutePath': '/images/common/components/ico-0.png',
          },
        },
        {
          'ID': '1',
          'EnText': 'ATM (HKD & RMB)',
          'TcText': '自動櫃員機 (港幣及人民幣)',
          'ScText': '自動櫃員機 (港幣及人民幣)',
          'Image': {
            'RelativePath': 'images/services-icon/ico-atm.gif',
            'AbsolutePath': '/images/common/components/ico-1.png',
          },
        },
        {
          'ID': '2',
          'EnText': 'Cash & Cheque Deposit Machine',
          'TcText': '現金及支票存款機',
          'ScText': '現金及支票存款機',
          'Image': {
            'RelativePath': 'http://m.dahsing.com/app/images/branch/ico-cash-cheque-deposit.gif',
            'AbsolutePath': '/images/common/components/ico-2.png',
          },
        },
        {
          'ID': '3',
          'EnText': 'Easy Cash Deposit Machine',
          'TcText': '「易存款」現金存款機',
          'ScText': '「易存款」現金存款機',
          'Image': {
            'RelativePath': 'images/services-icon/ico-personal-cash-deposit-machine.gif',
            'AbsolutePath': '/images/common/components/ico-3.png',
          },
        },
        {
          'ID': '4',
          'EnText': 'Safe Deposit Box',
          'TcText': '保管箱服務',
          'ScText': '保管箱服務',
          'Image': {
            'RelativePath': 'http://m.dahsing.com/app/images/branch/ico-safe-deposit-box.gif',
            'AbsolutePath': '/images/common/components/ico-4.png',
          },
        },
        {
          'ID': '5',
          'EnText': 'Tradelink',
          'TcText': '貿易通服務站',
          'ScText': '貿易通服務站',
          'Image': {
            'RelativePath': 'images/services-icon/ico-tradelink.gif',
            'AbsolutePath': '/images/common/components/ico-5.png',
          },
        },
        {
          'ID': '6',
          'EnText': 'Securities Trading Centre / Counter',
          'TcText': '證券服務中心/櫃位',
          'ScText': '證券服務中心/櫃位',
          'Image': {
            'RelativePath': 'images/services-icon/ico-securities-trading-centre-counter.gif',
            'AbsolutePath': '/images/common/components/ico-6.png',
          },
        },
        {
          'ID': '7',
          'EnText': 'Investment Services Section',
          'TcText': '投資服務區',
          'ScText': '投資服務區',
          'Image': {
            'RelativePath': 'http://m.dahsing.com/app/images/branch/ico-investment-services-section.gif',
            'AbsolutePath': '/images/common/components/ico-7.png',
          },
        },
        {
          'ID': '8',
          'EnText': 'Passbook Update Machine',
          'TcText': '打簿機',
          'ScText': '打簿機',
          'Image': {
            'RelativePath': 'http://m.dahsing.com/app/images/branch/ico-passbook-update-machine.gif',
            'AbsolutePath': '/images/common/components/ico-8.png',
          },
        },
        {
          'ID': '9',
          'EnText': 'VIP Banking Centre',
          'TcText': 'VIP銀行服務中心',
          'ScText': 'VIP銀行服務中心',
          'Image': {
            'RelativePath': 'images/services-icon/ico-vip-banking-centre.gif',
            'AbsolutePath': '/images/common/components/ico-9.png',
          },
        },
        ],
      },
      'OpeningHoursTable': {
        'Tr': [{
          'Td': [{
            'EnText': 'Branch Business Hours',
            'TcText': '分行營業時間',
            'ScText': '分行營業時間',
          },
          '',
          ],
        },
        {
          'Td': [{
            'EnText': 'Monday - Friday',
            'TcText': '星期一至星期五',
            'ScText': '星期一至星期五',
          },
          {
            'EnText': '09:00 - 17:00',
            'TcText': '上午九時至下午五時',
            'ScText': '上午九時至下午五時',
          },
          ],
        },
        {
          'Td': [{
            'EnText': 'Saturday',
            'TcText': '星期六',
            'ScText': '星期六',
          },
          {
            'EnText': '09:00 - 13:00',
            'TcText': '上午九時至下午一時',
            'ScText': '上午九時至下午一時',
          },
          ],
        },
        ],
      },
      'Districts': {
        'District': [{
          'ID': 'HKI',
          'Branch': [{
            'NameEn': 'Aberdeen',
            'NameTc': '香港仔分行',
            'NameSc': '香港仔分行',
            'AddEn': 'Shop 1, G/F and Portion of the Basement of Site 3, Aberdeen Centre, Aberdeen',
            'AddTc': '香港仔中心商場第三期一號舖及地庫',
            'AddSc': '香港仔中心商場第三期一號舖及地庫',
            'Tel': '2554 5463',
            'LocLat': '22.247994',
            'LocLon': '114.154127',
            'Services': '1,2,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Admiralty Centre',
            'NameTc': '金鐘海富中心分行',
            'NameSc': '金鐘海富中心分行',
            'AddEn': 'Shop No. 10, 1st Floor of the Podium, Admiralty Centre, No. 18 Harcourt Road',
            'AddTc': '夏慤道18號海富中心商場一樓10號舖',
            'AddSc': '夏慤道18號海富中心商場一樓10號舖',
            'Tel': '2529 1338',
            'LocLat': '22.27955',
            'LocLon': '114.16509',
            'Services': '1,2,4,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Causeway Bay',
            'NameTc': '銅鑼灣分行',
            'NameSc': '銅鑼灣分行',
            'AddEn': '482 Hennessy Road, Causeway Bay (Near junction of Percival Street and Hennessy Road)',
            'AddTc': '銅鑼灣軒尼詩道482號(近波斯富街和軒尼詩道交界)',
            'AddSc': '銅鑼灣軒尼詩道482號(近波斯富街和軒尼詩道交界)',
            'Tel': '2891 2201',
            'LocLat': '22.279770',
            'LocLon': '114.182526',
            'Services': '1,3,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Central',
            'NameTc': '中區分行',
            'NameSc': '中區分行',
            'AddEn': 'Shop A, G/F, Worldwide House, 19 Des Voeux Road Central',
            'AddTc': '德輔道中19號環球大廈地下A號舖',
            'AddSc': '德輔道中19號環球大廈地下A號舖',
            'Tel': '2521 8134',
            'LocLat': '22.282445',
            'LocLon': '114.157761',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Fortress Hill',
            'NameTc': '炮台山分行',
            'NameSc': '炮台山分行',
            'AddEn': 'Shop No. 15-22, G/F and basement, Empire Apartments, Nos. 293-299 King\'s Road',
            'AddTc': '北角英皇道293-299號璇宮大廈地下15-22號舖及地庫',
            'AddSc': '北角英皇道293-299號璇宮大廈地下15-22號舖及地庫',
            'Tel': '2922 3389',
            'LocLat': '22.290471',
            'LocLon': '114.195896',
            'Services': '1,2,4,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'Remark': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Gloucester Road',
            'NameTc': '告士打道分行',
            'NameSc': '告士打道分行',
            'AddEn': 'Shop B, G/F, Everbright Centre, 108 Gloucester Road',
            'AddTc': '告士打道108號光大中心地下B號舖',
            'AddSc': '告士打道108號光大中心地下B號舖',
            'Tel': '2507 8866',
            'LocLat': '22.279153',
            'LocLon': '114.173816',
            'Services': '1,2,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'Y',
          },
          {
            'NameEn': 'Happy Valley',
            'NameTc': '跑馬地分行',
            'NameSc': '跑馬地分行',
            'AddEn': 'Shop A, G/F, Kam Yuk Mansion, No. 13 Yuk Sau Street, Happy Valley',
            'AddTc': '跑馬地毓秀街13號金毓大廈地下A號舖',
            'AddSc': '跑馬地毓秀街13號金毓大廈地下A號舖',
            'Tel': '2572 0708',
            'LocLat': '22.268508',
            'LocLon': '114.185611',
            'Services': '1,2,7',
            'OpeningHours': 'true',
            'Times': {
              'Tr': {
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Heng Fa Chuen',
            'NameTc': '杏花邨分行',
            'NameSc': '杏花邨分行',
            'AddEn': 'Unit G59, G/F, Heng Fa Chuen Paradise Mall, 100 Shing Tai Road, Chaiwan',
            'AddTc': '柴灣盛泰街100號杏花邨杏花新城地下G59號',
            'AddSc': '柴灣盛泰街100號杏花邨杏花新城地下G59號',
            'Tel': '2558 7485',
            'LocLat': '22.276811',
            'LocLon': '114.239901',
            'Services': '1,7',
            'OpeningHours': 'true',
            'Times': {
              'Tr': {
                'Td': {
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Johnston Road',
            'NameTc': '莊士敦道分行',
            'NameSc': '莊士敦道分行',
            'AddEn': '164 Johnston Road, Wanchai (Opposite to Tai Yau Plaza)',
            'AddTc': '灣仔莊士敦道164號(大有廣場對面)',
            'AddSc': '灣仔莊士敦道164號(大有廣場對面)',
            'Tel': '2572 8849',
            'LocLat': '22.276652',
            'LocLon': '114.174592',
            'Services': '1,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': {
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Kennedy Town',
            'NameTc': '堅尼地城分行',
            'NameSc': '堅尼地城分行',
            'AddEn': 'Shop A2, G/F, & Unit A, 1/F, Man Kwong Court, 12 Smithfield Road',
            'AddTc': '士美菲路12號文光閣地下A2號舖及1樓A室',
            'AddSc': '士美菲路12號文光閣地下A2號舖及1樓A室',
            'Tel': '2849 2280',
            'LocLat': '22.282188',
            'LocLon': '114.128468',
            'Services': '1,2,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'North Point',
            'NameTc': '北角分行',
            'NameSc': '北角分行',
            'AddEn': 'Chu Kee Building, 433-437 King\'s Road (Near Sunbeam Theatre)',
            'AddTc': '英皇道433-437號珠璣大廈(近新光戲院)',
            'AddSc': '英皇道433-437號珠璣大廈(近新光戲院)',
            'Tel': '2561 8241',
            'LocLat': '22.291469',
            'LocLon': '114.200654',
            'Services': '1,2,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Shaukiwan',
            'NameTc': '筲箕灣分行',
            'NameSc': '筲箕灣分行',
            'AddEn': 'Shop G8, G/F, Tai On Building, 57-87 Shaukiwan Road',
            'AddTc': '筲箕灣道57-87號太安樓地下G8號舖',
            'AddSc': '筲箕灣道57-87號太安樓地下G8號舖',
            'Tel': '2568 5271',
            'LocLat': '22.282708',
            'LocLon': '114.221772',
            'Services': '1,3,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Shek Tong Tsui',
            'NameTc': '石塘咀分行',
            'NameSc': '石塘咀分行',
            'AddEn': 'Shop 15-16, G/F, 443-453 Queen\'s Road West',
            'AddTc': '皇后大道西443-453號地下15-16號舖',
            'AddSc': '皇后大道西443-453號地下15-16號舖',
            'Tel': '2857 7473',
            'LocLat': '22.286292',
            'LocLon': '114.134989',
            'Services': '1,2,5,6,7',
            'OpeningHours': 'true',
            'Times': {
              'Tr': {
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Sheung Wan',
            'NameTc': '上環分行',
            'NameSc': '上環分行',
            'AddEn': 'G/F & 1/F, No. 288 Des Voeux Road Central, Sheung Wan',
            'AddTc': '德輔道中288號易通商業大廈地下B2號舖連一樓B室',
            'AddSc': '德輔道中288號易通商業大廈地下B2號舖連一樓B室',
            'Tel': '2851 6281',
            'LocLat': '22.286620',
            'LocLon': '114.151106',
            'Services': '1,2,5,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Taikoo Shing',
            'NameTc': '太古城分行',
            'NameSc': '太古城分行',
            'AddEn': 'Shop No. G501, On Shing Terrace, No. 28 Taikoo Shing Road & No. 1-9 Tai Yue Avenue, Taikoo Shing',
            'AddTc': '港島東太古城太裕路1號安盛台地下501號舖',
            'AddSc': '港島東太古城太裕路1號安盛台地下501號舖',
            'Tel': '2884 4802',
            'LocLat': '22.287081',
            'LocLon': '114.214675',
            'Services': '1,2,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'APITA Cityplaza2',
            'NameTc': '太古城中心商場2期APITA',
            'NameSc': '太古城中心商場2期APITA',
            'AddEn': 'B1/F, Cityplaza2, 18 Taikoo Shing Road, Quarry Bay',
            'AddTc': '太古城道18號太古城中心商場2期B1層APITA',
            'AddSc': '太古城道18號太古城中心商場2期B1層APITA',
            'Tel': '',
            'LocLat': '22.286759',
            'LocLon': '114.217182',
            'Services': '1',
            'OpeningHours': 'false',
            'Times': {
              'Tr': {
                'Td': {
                  'Ico': '1',
                  'TextEn': 'Within business hour of APITA',
                  'TextTc': 'APITA營業時間',
                  'TextSc': 'APITA營業時間',
                },
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          ],
        },
        {
          'ID': 'KLN',
          'Branch': [{
            'NameEn': 'Shing Yip Street',
            'NameTc': '成業街分行',
            'NameSc': '成業街分行',
            'AddEn': 'Shop A, G/F, 10 Shing Yip Street, Kwun Tong',
            'AddTc': '觀塘成業街10號地下A舖',
            'AddSc': '觀塘成業街10號地下A舖',
            'Tel': '2191 8103',
            'LocLat': '22.3104645',
            'LocLon': '114.2260513',
            'Services': '1,3,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Hunghom',
            'NameTc': '紅磡分行',
            'NameSc': '紅磡分行',
            'AddEn': 'Shop No. 3 and 4 on G/F, Shop No. 2 on 1/F and Shop 3 on 2/F, Cheron Court, 28 Wuhu Street, Hunghom',
            'AddTc': '紅磡蕪湖街28號昌隆閣地下3及4號舖，1樓2號舖及2樓3號舖',
            'AddSc': '紅磡蕪湖街28號昌隆閣地下3及4號舖，1樓2號舖及2樓3號舖',
            'Tel': '2365 8110',
            'LocLat': '22.30687',
            'LocLon': '114.18694',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Jordan',
            'NameTc': '佐敦分行',
            'NameSc': '佐敦分行',
            'AddEn': '335 Nathan Road, Jordan (Exit A of Jordan MTR Station, towards Yue Hwa Chinese Products Emporium Ltd)',
            'AddTc': '佐敦彌敦道335號(港鐵佐敦站A出口裕華國貨方向)',
            'AddSc': '佐敦彌敦道335號(港鐵佐敦站A出口裕華國貨方向)',
            'Tel': '2385 0161',
            'LocLat': '22.306772',
            'LocLon': '114.171338',
            'Services': '1,3,4,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Kwun Tong',
            'NameTc': '觀塘分行',
            'NameSc': '觀塘分行',
            'AddEn': 'Shop Nos. 7-9, G/F, Yee On Centre, 45 Hong Ning Road, Kwun Tong, Kowloon',
            'AddTc': '觀塘康寧道45號宜安中心地下7-9號舖',
            'AddSc': '觀塘康寧道45號宜安中心地下7-9號舖',
            'Tel': '2389 3911',
            'LocLat': '22.315247',
            'LocLon': '114.223491',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Lok Fu',
            'NameTc': '樂富分行',
            'NameSc': '樂富分行',
            'AddEn': 'Shop Nos. 1101 and 1102, 1/F, Lok Fu Plaza, Wang Tau Hom',
            'AddTc': '橫頭磡樂富廣場一樓1101至1102號舖',
            'AddSc': '橫頭磡樂富廣場一樓1101至1102號舖',
            'Tel': '2337 6300',
            'LocLat': '22.338803',
            'LocLon': '114.186831',
            'Services': '1,3,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Mei Foo Sun Chuen',
            'NameTc': '美孚新邨分行',
            'NameSc': '美孚新邨分行',
            'AddEn': 'Shop No. N26E & F, G/F, 10A Nassau Street, Stage V, Mei Foo Sun Chuen',
            'AddTc': '美孚新邨五期蘭秀道10A地下N26E及F號舖',
            'AddSc': '美孚新邨五期蘭秀道10A地下N26E及F號舖',
            'Tel': '2370 2660',
            'LocLat': '22.338478',
            'LocLon': '114.138757',
            'Services': '1,3,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Mongkok',
            'NameTc': '旺角分行',
            'NameSc': '旺角分行',
            'AddEn': '697 Nathan Road, Mongkok (Exit A1 of Mongkok MTR Station)',
            'AddTc': '旺角彌敦道697號(港鐵旺角站A1出口)',
            'AddSc': '旺角彌敦道697號(港鐵旺角站A1出口)',
            'Tel': '2394 4261',
            'LocLat': '22.320039',
            'LocLon': '114.169045',
            'Services': '1,2,4,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Cheung Sha Wan',
            'NameTc': '長沙灣分行',
            'NameSc': '長沙灣分行',
            'AddEn': 'Shop 1, G/F, CRE Centre, 889 Cheung Sha Wan Road',
            'AddTc': '長沙灣道889號華創中心地下1號舖',
            'AddSc': '長沙灣道889號華創中心地下1號舖',
            'Tel': '2361 0951',
            'LocLat': '22.336743',
            'LocLon': '114.147121',
            'Services': '1,2,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Telford Gardens',
            'NameTc': '德福花園分行',
            'NameSc': '德福花園分行',
            'AddEn': 'Units F5A-F6A, Level 2, Telford Plaza I, Kowloon Bay',
            'AddTc': '九龍灣德福廣場一期二樓F5A-F6A號',
            'AddSc': '九龍灣德福廣場一期二樓F5A-F6A號',
            'Tel': '2927 4130',
            'LocLat': '22.322939',
            'LocLon': '114.213319',
            'Services': '1,2,5,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tokwawan',
            'NameTc': '土瓜灣分行',
            'NameSc': '土瓜灣分行',
            'AddEn': 'Ground Floor, Mei King Mansion, Phase II, No.245B and 247 To Kwa Wan Road',
            'AddTc': '土瓜灣道245B及247號美景樓第2期地下',
            'AddSc': '土瓜灣道245B及247號美景樓第2期地下',
            'Tel': '2365 9035',
            'LocLat': '22.3161020',
            'LocLon': '114.1896640',
            'Services': '1,2,5,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tseung Kwan O',
            'NameTc': '將軍澳分行',
            'NameSc': '將軍澳分行',
            'AddEn': 'Shop G58, G/F, PopCorn, 9 Tong Chun Street, Tseung Kwan O',
            'AddTc': '將軍澳唐俊街9號PopCorn商場地下層G58號商舖',
            'AddSc': '將軍澳唐俊街9號PopCorn商場地下層G58號商舖',
            'Tel': '2752 1223',
            'LocLat': '22.309039',
            'LocLon': '114.261256',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tseung Kwan O Metro City Plaza',
            'NameTc': '將軍澳新都城中心分行',
            'NameSc': '將軍澳新都城中心分行',
            'AddEn': 'Shop 127, Level 1, MCP Discovery, Tseung Kwan O',
            'AddTc': '將軍澳MCP Discovery一樓127號舖',
            'AddSc': '將軍澳MCP Discovery一樓127號舖',
            'Tel': '2927 2101',
            'LocLat': '22.322175',
            'LocLon': '114.257179',
            'Services': '1,2,4,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tsimshatsui',
            'NameTc': '尖沙咀分行',
            'NameSc': '尖沙咀分行',
            'AddEn': 'Golden Crown Court, 66-70 Nathan Road, Tsimshatsui (Turn Right at the exit D1 of Tsimshatsui MTR Station. Near junction of Nathan Road and Carnarvon Road.)',
            'AddTc': '尖沙咀彌敦道66-70號金冠大廈(港鐵尖沙咀站D1出口右轉，近彌敦道和加拿芬道交界)',
            'AddSc': '尖沙咀彌敦道66-70號金冠大廈(港鐵尖沙咀站D1出口右轉，近彌敦道和加拿芬道交界)',
            'Tel': '2366 9121',
            'LocLat': '22.297776',
            'LocLon': '114.172538',
            'Services': '1,3,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Wong Tai Sin',
            'NameTc': '黃大仙分行',
            'NameSc': '黃大仙分行',
            'AddEn': 'Shop No. G3C, Ground Floor, Wong Tai Sin Plaza, Wong Tai Sin',
            'AddTc': '黃大仙正德街103號黃大仙中心地下G3C號舖',
            'AddSc': '黃大仙正德街103號黃大仙中心地下G3C號舖',
            'Tel': '2326 5165',
            'LocLat': '22.341423',
            'LocLon': '114.194606',
            'Services': '1,3,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Yaumatei',
            'NameTc': '油麻地分行',
            'NameSc': '油麻地分行',
            'AddEn': '561 Nathan Road, Yaumatei (Exit A1 of Yaumatei MTR Station. Near junction of Nathan Road and Hamilton Road)',
            'AddTc': '油麻地彌敦道561號(港鐵油麻地站A1出口，近彌敦道和咸美頓街交界)',
            'AddSc': '油麻地彌敦道561號(港鐵油麻地站A1出口，近彌敦道和咸美頓街交界)',
            'Tel': '2782 1339',
            'LocLat': '22.314428',
            'LocLon': '114.170185',
            'Services': '1,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': {
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Emax-HITEC',
            'NameTc': '國際展貿中心',
            'NameSc': '國際展貿中心',
            'AddEn': 'Display showcase 1B on Ground Floor of Hongkong International Trade & Exhibition Centre',
            'AddTc': '九龍灣展貿徑一號國際展貿中心地下陳列櫃01B',
            'AddSc': '九龍灣展貿徑一號國際展貿中心地下陳列櫃01B',
            'Tel': '',
            'LocLat': '22.324056',
            'LocLon': '114.203707',
            'Services': '1',
            'OpeningHours': 'false',
            'Times': {
              'Tr': {
                'Td': {
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
              },
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          ],
        },
        {
          'ID': 'NT',
          'Branch': [{
            'NameEn': 'Kwai Fong',
            'NameTc': '葵芳分行',
            'NameSc': '葵芳分行',
            'AddEn': 'Shop No. 116, First Floor, Kwai Fong Plaza, Kwai Fong Estate, 177 Hing Fong Road, Kwai Chung',
            'AddTc': '葵涌興芳路177號葵芳邨葵芳廣場1樓116號',
            'AddSc': '葵涌興芳路177號葵芳邨葵芳廣場1樓116號',
            'Tel': '2487 8033',
            'LocLat': '22.357771',
            'LocLon': '114.129748',
            'Services': '1,3,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Ma On Shan Plaza',
            'NameTc': '馬鞍山廣場分行',
            'NameSc': '馬鞍山廣場分行',
            'AddEn': 'Shop 335 on Level 3, Ma On Shan Plaza, 608 Sai Sha Road, Ma On Shan',
            'AddTc': '馬鞍山西沙路608號馬鞍山廣場三樓335號舖',
            'AddSc': '馬鞍山西沙路608號馬鞍山廣場三樓335號舖',
            'Tel': '2929 4137',
            'LocLat': '22.425479',
            'LocLon': '114.231527',
            'Services': '1,2,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Maritime Square',
            'NameTc': '青衣城分行',
            'NameSc': '青衣城分行',
            'AddEn': 'Shop Unit 108D-E, Maritime Square, 33 Tsing King Road, Tsing Yi',
            'AddTc': '青衣青敬路33號青衣城108D-E號舖',
            'AddSc': '青衣青敬路33號青衣城108D-E號舖',
            'Tel': '2435 1368',
            'LocLat': '22.359217',
            'LocLon': '114.107842',
            'Services': '1,2,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '2',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Ocean Walk',
            'NameTc': '海趣坊分行',
            'NameSc': '海趣坊分行',
            'AddEn': 'Shop 11 and 93-95, Ocean Walk (Previous Pierhead Plaza), 168-236 Wu Chui Road, Tuen Mun',
            'AddTc': '屯門湖翠路168-236號海趣坊11及93-95號舖',
            'AddSc': '屯門湖翠路168-236號海趣坊11及93-95號舖',
            'Tel': '2404 6931',
            'LocLat': '22.372777',
            'LocLon': '113.966455',
            'Services': '1,3,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Shatin',
            'NameTc': '沙田分行',
            'NameSc': '沙田分行',
            'AddEn': 'Shop 9, G/F, Lucky Plaza, Shatin',
            'AddTc': '沙田好運中心地下9號舖',
            'AddSc': '沙田好運中心地下9號舖',
            'Tel': '2606 3533',
            'LocLat': '22.383036',
            'LocLon': '114.190360',
            'Services': '1,3,4,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Sha Tsui Road',
            'NameTc': '沙咀道分行',
            'NameSc': '沙咀道分行',
            'AddEn': 'G/F, Nos. 286-288 Sha Tsui Road, Tsuen Wan',
            'AddTc': '荃灣沙咀道286-288號地下',
            'AddSc': '荃灣沙咀道286-288號地下',
            'Tel': '2615 1510',
            'LocLat': '22.369423',
            'LocLon': '114.117018',
            'Services': '1,2,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Sheung Shui',
            'NameTc': '上水分行',
            'NameSc': '上水分行',
            'AddEn': 'Shop B, G/F, Siu Kai House, 55-59 San Fung Avenue, Sheung Shui',
            'AddTc': '上水新豐路55-59號兆啟樓地下B號舖',
            'AddSc': '上水新豐路55-59號兆啟樓地下B號舖',
            'Tel': '2671 5030',
            'LocLat': '22.505032',
            'LocLon': '114.127007',
            'Services': '1,2,5,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tai Po',
            'NameTc': '大埔分行',
            'NameSc': '大埔分行',
            'AddEn': 'Units 53-54 on Level 1, Tai Po Plaza, No.1 On Tai Road, Tai Po',
            'AddTc': '大埔安泰路1號大埔廣場地下53號及54號舖',
            'AddSc': '大埔安泰路1號大埔廣場地下53號及54號舖',
            'Tel': '2667 2588',
            'LocLat': '22.453211',
            'LocLon': '114.169825',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tai Wai',
            'NameTc': '大圍分行',
            'NameSc': '大圍分行',
            'AddEn': 'Shops 1 and 2 on Ground Floor, Grandeur Garden, 14-18 Chik Fai Street, 55-56 Tai Wai Road, Shatin',
            'AddTc': '沙田大圍道55-56號積輝街14-18號金禧花園地下1及2號舖',
            'AddSc': '沙田大圍道55-56號積輝街14-18號金禧花園地下1及2號舖',
            'Tel': '2691 1272',
            'LocLat': '22.374662',
            'LocLon': '114.177464',
            'Services': '1,2,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tin Shui Wai',
            'NameTc': '天水圍分行',
            'NameSc': '天水圍分行',
            'AddEn': 'Shop No. L120, First Floor, Tin Shing Shopping Centre, Tin Shing Court, 3 Tin Ching Street, Tin Shui Wai',
            'AddTc': '天水圍天靖街3號天盛苑天盛商場1樓L120號舖',
            'AddSc': '天水圍天靖街3號天盛苑天盛商場1樓L120號舖',
            'Tel': '2448 9008',
            'LocLat': '22.4486571',
            'LocLon': '114.0029617',
            'Services': '1,3,5,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tsuen Wan',
            'NameTc': '荃灣分行',
            'NameSc': '荃灣分行',
            'AddEn': 'Dang Fat Mansion, 14-16 Tai Ho Road, Tsuen Wan',
            'AddTc': '荃灣大河道14-16號登發大廈',
            'AddSc': '荃灣大河道14-16號登發大廈',
            'Tel': '2492 8102',
            'LocLat': '22.372696',
            'LocLon': '114.116366',
            'Services': '1,3,5,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': 'CCC',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tuen Mun',
            'NameTc': '屯門分行',
            'NameSc': '屯門分行',
            'AddEn': 'Shops 4 and 5 on G/F, Man Cheung Mansion, 52-62 Tuen Mun Heung Sze Wui Road',
            'AddTc': '屯門鄉事會道52-62號萬祥樓地下4號及5號舖',
            'AddSc': '屯門鄉事會道52-62號萬祥樓地下4號及5號舖',
            'Tel': '2441 6218',
            'LocLat': '22.396490',
            'LocLon': '113.974872',
            'Services': '1,3,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Tung Chung',
            'NameTc': '東涌分行',
            'NameSc': '東涌分行',
            'AddEn': 'Shop 23, G/F, Tung Chung Crescent, 1 Hing Tung Street, Tung Chung, Lantau Island',
            'AddTc': '大嶼山東涌慶東街1號東堤灣畔地下23號舖',
            'AddSc': '大嶼山東涌慶東街1號東堤灣畔地下23號舖',
            'Tel': '2109 3484',
            'LocLat': '22.288506',
            'LocLon': '113.940625',
            'Services': '1,2,6,7,8',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '2',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Fanling',
            'NameTc': '粉嶺分行',
            'NameSc': '粉嶺分行',
            'AddEn': 'Shop Nos. A11-A14 & 110-112, Ground Floor, Flora Plaza, No. 88 Pak Wo Road, Fanling',
            'AddTc': '粉嶺百和路88號花都廣場地下A11-A14及110-112號舖',
            'AddSc': '粉嶺百和路88號花都廣場地下A11-A14及110-112號舖',
            'Tel': '2677 8830',
            'LocLat': '22.4847102',
            'LocLon': '114.1418990',
            'Services': '1,3,4,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                {
                  'Ico': '3',
                  'TextEn': 'Within business hour of the mall / shopping centre',
                  'TextTc': '商場營業時間',
                  'TextSc': '商場營業時間',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          {
            'NameEn': 'Yuen Long Castle Peak Road',
            'NameTc': '元朗青山道分行',
            'NameSc': '元朗青山道分行',
            'AddEn': 'Shop C, G/F, Len Shing Mansion, 162-168 Castle Peak Rd, Yuen Long',
            'AddTc': '元朗青山公路元朗段162-168號聯昇樓地下C號舖',
            'AddSc': '元朗青山公路元朗段162-168號聯昇樓地下C號舖',
            'Tel': '2479 4555',
            'LocLat': '22.444307',
            'LocLon': '114.027027',
            'Services': '1,3,4,6,7,8,9',
            'OpeningHours': 'true',
            'Times': {
              'Tr': [{
                'Td': [{
                  'Ico': '1',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                {
                  'Ico': '3',
                  'TextEn': '24 Service hours',
                  'TextTc': '24小時服務',
                  'TextSc': '24小時服務',
                },
                ],
              },
              {
                'Td': {
                  'Ico': '8',
                  'TextEn': 'Within business hour of the bank',
                  'TextTc': '分行營業時間',
                  'TextSc': '分行營業時間',
                },
              },
              ],
            },
            'RemarkEn': '',
            'RemarkTc': '',
            'RemarkSc': '',
            'DefaultFlag': 'N',
          },
          ],
        },
        ],
      },
      'Map': {
        'FilterMax': '2000',
        'FilterMin': '1000',
        'FilterDefault': '1000',
        'FilterInterval': '500',
      },
    },
  },
},
];

var branchItemHTML = '<div class="map__branches__list__item additionalClass" id="htmlBranchId">'+
'<p class="map__branches__list__trigger">'+
    '<a href="#" data-toggle="collapse" data-target="#htmlBranchIdCollapse" aria-expanded="true" aria-controls="htmlBranchIdCollapse"> '+
    'htmlBranchName htmlBranchDistance<br>'+
          '<span class="small">htmlBranchAddress </span>'+
          '<span class="icon-chevron"></span>'+
          '</a>                            '+
        '</p>'+
    '<div id="htmlBranchIdCollapse" class="collapse map__branches__list__collapse show" aria-labelledby="headingOne">'+
    '<p>'+
        '<!-- icon-text start -->'+
            '<span class="icon-text icon-text--no-margin icon-text--inline ">'+
            '<span class="icon-text__icon icon-text--inline__icon">'+
                '<img src="../assets/img/icon/img--identification-document.jpg" alt="" class="icon-text__icon__image   icon-text--inline__icon__image ">'+
                    '</span>'+
                '<span class="icon-text__text icon-text--inline__text ">'+
                '<span class="icon-text__text__content icon-text__text__content--title">htmlBranchAddress</span>'+
                    '</span>'+
                '</span>'+
            '<!-- icon-text end -->'+
            '</p>'+
        '<p>'+
        '<a href="javascript:;">'+
            '<!-- icon-text start -->'+
                '<span class="icon-text icon-text--no-margin icon-text--inline ">'+
                '<span class="icon-text__icon icon-text--inline__icon">'+
                    '<img src="../assets/img/icon/img--identification-document.jpg" alt="" class="icon-text__icon__image   icon-text--inline__icon__image ">'+
                        '</span>'+
                    '<span class="icon-text__text icon-text--inline__text ">'+
                    '<span class="icon-text__text__content icon-text__text__content--title">htmlBranchTel</span>'+
                        '</span>'+
                    '</span>'+
                '<!-- icon-text end -->'+
                '</a>'+
            '</p>'+
        '<!-- icon-text start -->'+
            '<div class="icon-text icon-text--no-margin icon-text--inline ">'+
            '<div class="icon-text__icon icon-text--inline__icon">'+
                '<img src="../assets/img/icon/img--identification-document.jpg" alt="" class="icon-text__icon__image   icon-text--inline__icon__image ">'+
                    '</div>'+
                '<div class="icon-text__text icon-text--inline__text ">'+
                '<div class="icon-text__text__content icon-text__text__content--title">'+
                    'OpeningHoursTableTitle  <br>'+
                      '<div class="row align-items-center">'+
                      '<div class="col-9">'+
                        '<div class="row">'+
                          '<div class="col col-sm-5">OpeningHoursTableTd1Text</div>'+
                            '<div class="col col-sm-7">OpeningHoursTableTd2Text</div>'+
                            '<div class="col col-sm-5">OpeningHoursTableTd3Text</div>'+
                            '<div class="col col-sm-7">OpeningHoursTableTd4Text</div>'+
                            '</div>'+
                          '</div>'+
                        '<div class="col-3 text-right">'+
                        '<div class="badge badge-pill badge-primary">htmlBranchOpeningHours</div>'+
                          '</div> '+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                '</div>'+
            '<!-- icon-text end -->'+
          '<ul>'+
          '</ul>'+
          '<p class="small"><strong>Notes:</strong> htmlBranchRemark</p>'+
          '</div>'+
    '</div>';

var countrylist = [
  {
    'en': 'HONG KONG',
    'tc': '香港',
  },
  {
    'en': 'ANDORRA',
    'tc': '安道爾',
  },
  {
    'en': 'UN\'TD ARAB EMIRATES ',
    'tc': '阿聯酋',
  },
  {
    'en': 'AFGHANISTAN',
    'tc': '阿富汗',
  },
  {
    'en': 'ANTIGUA AND BARBUDA ',
    'tc': '安提瓜和巴布達',
  },
  {
    'en': 'ANGUILLA',
    'tc': '安圭拉',
  },
  {
    'en': 'ALBANIA',
    'tc': '阿爾巴尼亞',
  },
  {
    'en': 'ARMENIA',
    'tc': '亞美尼亞',
  },
  {
    'en': 'NETHERLANDS ANT\'    ',
    'tc': '荷属安的列斯',
  },
  {
    'en': 'ANGOLA',
    'tc': '安哥拉',
  },
  {
    'en': 'ANTARCTICA',
    'tc': '南極洲',
  },
  {
    'en': 'ARGENTINA',
    'tc': '阿根廷',
  },
  {
    'en': 'AMERICAN SAMOA      ',
    'tc': '美屬薩摩亞',
  },
  {
    'en': 'AUSTRIA',
    'tc': '奧地利',
  },
  {
    'en': 'AUSTRALIA',
    'tc': '澳洲',
  },
  {
    'en': 'ARUBA',
    'tc': '阿魯巴',
  },
  {
    'en': 'ALAND ISLANDS',
    'tc': '奧蘭群島',
  },
  {
    'en': 'AZERBAIJAN',
    'tc': '阿塞拜疆',
  },
  {
    'en': 'BOSNIA & HERZEGO\'   ',
    'tc': '波士尼亞與赫塞哥維納',
  },
  {
    'en': 'BARBADOS',
    'tc': '巴巴多斯',
  },
  {
    'en': 'BANGLADESH',
    'tc': '孟加拉國',
  },
  {
    'en': 'BELGIUM',
    'tc': '比利時',
  },
  {
    'en': 'BURKINA FASO        ',
    'tc': '布基納法索',
  },
  {
    'en': 'BULGARIA',
    'tc': '保加利亞',
  },
  {
    'en': 'BAHRAIN',
    'tc': '巴林',
  },
  {
    'en': 'BURUNDI',
    'tc': '布隆迪',
  },
  {
    'en': 'BENIN',
    'tc': '貝寧',
  },
  {
    'en': 'BERMUDA',
    'tc': '百慕大',
  },
  {
    'en': 'BRUNEI DARUSSALAM   ',
    'tc': '汶萊',
  },
  {
    'en': 'BOLIVIA',
    'tc': '玻利維亞',
  },
  {
    'en': 'BRAZIL',
    'tc': '巴西',
  },
  {
    'en': 'BAHAMAS',
    'tc': '巴哈馬',
  },
  {
    'en': 'BHUTAN',
    'tc': '不丹',
  },
  {
    'en': 'BOUVET IS.',
    'tc': '布韋島',
  },
  {
    'en': 'BOTSWANA',
    'tc': '博茨瓦納',
  },
  {
    'en': 'REPUBLIC OF BELARUS ',
    'tc': '白俄羅斯',
  },
  {
    'en': 'BELIZE',
    'tc': '伯利茲',
  },
  {
    'en': 'CANADA',
    'tc': '加拿大',
  },
  {
    'en': 'COCOS (KEELING) IS. ',
    'tc': '科科斯（基林）群島',
  },
  {
    'en': 'CONGO, DEMOCRATIC   ',
    'tc': '剛果民主共和國',
  },
  {
    'en': 'CEN\'L AFI\' REPUBLIC ',
    'tc': '中非',
  },
  {
    'en': 'CONGO, REPUBLIC     ',
    'tc': '剛果共和國',
  },
  {
    'en': 'SWITZERLAND',
    'tc': '瑞士',
  },
  {
    'en': 'IVORY COAST (CDI)   ',
    'tc': '科特迪瓦',
  },
  {
    'en': 'COOK ISLANDS        ',
    'tc': '庫克群島',
  },
  {
    'en': 'CHILE',
    'tc': '智利',
  },
  {
    'en': 'CAMEROON',
    'tc': '喀麥隆',
  },
  {
    'en': 'CHINA',
    'tc': '中國',
  },
  {
    'en': 'COLOMBIA',
    'tc': '哥倫比亞',
  },
  {
    'en': 'COSTA RICA',
    'tc': '哥斯達黎加',
  },
  {
    'en': 'CUBA',
    'tc': '古巴',
  },
  {
    'en': 'CAPE VERDE',
    'tc': '佛得角',
  },
  {
    'en': 'CURACAO',
    'tc': '古拉索',
  },
  {
    'en': 'CHRISTMAS IS.       ',
    'tc': '聖誕島',
  },
  {
    'en': 'CYPRUS',
    'tc': '塞浦路斯',
  },
  {
    'en': 'CZECH REPUBLIC      ',
    'tc': '捷克',
  },
  {
    'en': 'GERMANY',
    'tc': '德國',
  },
  {
    'en': 'REP. OF DJIBOUTI    ',
    'tc': '吉布提',
  },
  {
    'en': 'DENMARK',
    'tc': '丹麥',
  },
  {
    'en': 'DOMINICA',
    'tc': '多米尼克',
  },
  {
    'en': 'DOMINICAN REPUBLIC  ',
    'tc': '多明尼加',
  },
  {
    'en': 'ALGERIA',
    'tc': '阿爾及利亞',
  },
  {
    'en': 'ECUADOR',
    'tc': '厄瓜多爾',
  },
  {
    'en': 'ESTONIA',
    'tc': '愛沙尼亞',
  },
  {
    'en': 'EGYPT',
    'tc': '埃及',
  },
  {
    'en': 'WESTERN SAHARA      ',
    'tc': '撒拉威阿拉伯民主共和',
  },
  {
    'en': 'ERITREA',
    'tc': '厄立特里亞',
  },
  {
    'en': 'SPAIN',
    'tc': '西班牙',
  },
  {
    'en': 'ETHIOPIA',
    'tc': '埃塞俄比亞',
  },
  {
    'en': 'EUROPE UNION',
    'tc': '歐盟',
  },
  {
    'en': 'FINLAND',
    'tc': '芬蘭',
  },
  {
    'en': 'FIJI ISLAND',
    'tc': '斐濟',
  },
  {
    'en': 'FALKLAND IS. (MAL\') ',
    'tc': '福克蘭群島',
  },
  {
    'en': 'MICRONESIA',
    'tc': '密克羅尼西亞聯邦',
  },
  {
    'en': 'FAROE IS.',
    'tc': '法羅群島',
  },
  {
    'en': 'FRANCE',
    'tc': '法國',
  },
  {
    'en': 'GABON',
    'tc': '加蓬',
  },
  {
    'en': 'UNITED KINGDOM      ',
    'tc': '英國',
  },
  {
    'en': 'GRENADA',
    'tc': '格林納達',
  },
  {
    'en': 'GEORGIA',
    'tc': '格魯吉亞',
  },
  {
    'en': 'FRENCH GUIANA       ',
    'tc': '法屬圭亞那',
  },
  {
    'en': 'GUERNSEY',
    'tc': '耿西',
  },
  {
    'en': 'GHANA',
    'tc': '加納',
  },
  {
    'en': 'GIB',
    'tc': '直布羅陀',
  },
  {
    'en': 'GREENLAND',
    'tc': '格陵蘭',
  },
  {
    'en': 'GAMBIA',
    'tc': '岡比亞',
  },
  {
    'en': 'GUINEA',
    'tc': '畿內亞',
  },
  {
    'en': 'GUADELOUPE',
    'tc': '瓜德羅普',
  },
  {
    'en': 'EQUATORIAL GUINEA   ',
    'tc': '赤道畿內亞',
  },
  {
    'en': 'GREECE',
    'tc': '希臘',
  },
  {
    'en': 'GEOR\' & SAND\' IS.   ',
    'tc': '南喬治亞和南桑威奇群',
  },
  {
    'en': 'GUATEMALA',
    'tc': '危地馬拉',
  },
  {
    'en': 'GUAM',
    'tc': '關島',
  },
  {
    'en': 'GUINEA-BISSAU       ',
    'tc': '畿內亞比紹',
  },
  {
    'en': 'GUYANA',
    'tc': '圭亞那',
  },

  {
    'en': 'HEARD & MCD\' ISDS   ',
    'tc': '赫德島和麥克唐納群島',
  },
  {
    'en': 'HONDURAS',
    'tc': '洪都拉斯',
  },
  {
    'en': 'CROATIA',
    'tc': '克羅地亞',
  },
  {
    'en': 'HAITI',
    'tc': '海地',
  },
  {
    'en': 'HUNGARY',
    'tc': '匈牙利',
  },
  {
    'en': 'INDONESIA',
    'tc': '印尼',
  },
  {
    'en': 'IRELAND',
    'tc': '愛爾蘭',
  },
  {
    'en': 'ISRAEL',
    'tc': '以色列',
  },
  {
    'en': 'ISLE OF MAN',
    'tc': '萌島',
  },
  {
    'en': 'INDIA',
    'tc': '印度',
  },
  {
    'en': 'BRI\' IND\' OCN TERR\' ',
    'tc': '英屬印度洋領地',
  },
  {
    'en': 'IRAQ',
    'tc': '伊拉克',
  },
  {
    'en': 'IRAN',
    'tc': '伊朗',
  },
  {
    'en': 'ICELAND',
    'tc': '冰島',
  },
  {
    'en': 'ITALY',
    'tc': '意大利',
  },
  {
    'en': 'JERSEY',
    'tc': '澤西岛',
  },
  {
    'en': 'JAMAICA',
    'tc': '牙買加',
  },
  {
    'en': 'JORDAN',
    'tc': '約旦',
  },
  {
    'en': 'JAPAN',
    'tc': '日本',
  },
  {
    'en': 'KENYA',
    'tc': '肯雅',
  },
  {
    'en': 'KYRGYZSTAN',
    'tc': '吉爾吉斯',
  },
  {
    'en': 'CAMBODIA',
    'tc': '柬埔寨',
  },
  {
    'en': 'KIRIBATI',
    'tc': '基里巴斯',
  },
  {
    'en': 'COMOROS',
    'tc': '科摩羅',
  },
  {
    'en': 'SAINT KITTS & NEVIS ',
    'tc': '聖吉斯納域斯',
  },
  {
    'en': 'NORTH KOREA',
    'tc': '北韓',
  },
  {
    'en': 'SOUTH KOREA',
    'tc': '南韓',
  },
  {
    'en': 'KUWAIT',
    'tc': '科威特',
  },
  {
    'en': 'CAYMAN ISLANDS      ',
    'tc': '開曼群島',
  },
  {
    'en': 'KAZAKHSTAN',
    'tc': '哈薩克',
  },
  {
    'en': 'LAOS',
    'tc': '老撾',
  },
  {
    'en': 'LEBANON',
    'tc': '黎巴嫩',
  },
  {
    'en': 'SAINT LUCIA',
    'tc': '聖盧西亞',
  },
  {
    'en': 'LIECHTENSTEIN       ',
    'tc': '列支敦士登',
  },
  {
    'en': 'SRI LANKA',
    'tc': '斯里蘭卡',
  },
  {
    'en': 'LIBERIA',
    'tc': '利比里亞',
  },
  {
    'en': 'LESOTHO',
    'tc': '萊索托',
  },
  {
    'en': 'LITHUANIA',
    'tc': '立陶宛',
  },
  {
    'en': 'LUXEMBOURG',
    'tc': '盧森堡',
  },
  {
    'en': 'LATVIA',
    'tc': '拉脫維亞',
  },
  {
    'en': 'LIBYA',
    'tc': '利比亞',
  },
  {
    'en': 'MOROCCO',
    'tc': '摩洛哥',
  },
  {
    'en': 'MONACO',
    'tc': '摩納哥',
  },
  {
    'en': 'MOLDOVA',
    'tc': '摩爾多瓦',
  },
  {
    'en': 'MONTENEGRO',
    'tc': '黑山',
  },
  {
    'en': 'MADAGASCAR',
    'tc': '馬達加斯加',
  },
  {
    'en': 'MARSHALL ISLANDS    ',
    'tc': '馬紹爾群島',
  },
  {
    'en': 'MACEDONIA',
    'tc': '馬其頓',
  },
  {
    'en': 'MALI',
    'tc': '馬里',
  },
  {
    'en': 'BURMA/MYANMAR       ',
    'tc': '緬甸',
  },
  {
    'en': 'MONGOLIA',
    'tc': '蒙古',
  },
  {
    'en': 'MACAU',
    'tc': '澳門',
  },
  {
    'en': 'N. MARIANA ISLANDS  ',
    'tc': '北馬里亞納群島',
  },
  {
    'en': 'MARTINIQUE',
    'tc': '馬提尼克',
  },
  {
    'en': 'MAURITANIA',
    'tc': '毛里塔尼亞',
  },
  {
    'en': 'MONTSERRAT',
    'tc': '蒙特塞拉特',
  },
  {
    'en': 'MALTA',
    'tc': '馬爾他',
  },
  {
    'en': 'MAURITIUS',
    'tc': '毛里裘斯',
  },
  {
    'en': 'MALDIVES',
    'tc': '馬爾代夫',
  },
  {
    'en': 'MALAWI',
    'tc': '馬拉維',
  },
  {
    'en': 'UN\'TD MEXICAN ST.   ',
    'tc': '墨西哥',
  },
  {
    'en': 'MALAYSIA',
    'tc': '馬來西亞',
  },
  {
    'en': 'MOZAMBIQUE',
    'tc': '莫桑比克',
  },
  {
    'en': 'NAMIBIA',
    'tc': '納米比亞',
  },
  {
    'en': 'NEW CALEDONIA       ',
    'tc': '新喀里多尼亞',
  },
  {
    'en': 'NIGER',
    'tc': '尼日爾',
  },
  {
    'en': 'NORFOLK ISLAND      ',
    'tc': '諾福克島',
  },
  {
    'en': 'NIGERIA',
    'tc': '尼日利亞',
  },
  {
    'en': 'NICARAGUA',
    'tc': '尼加拉瓜',
  },
  {
    'en': 'NETHERLANDS',
    'tc': '荷蘭',
  },
  {
    'en': 'NORWAY',
    'tc': '挪威',
  },
  {
    'en': 'NEPAL',
    'tc': '尼泊爾',
  },
  {
    'en': 'NAURU',
    'tc': '瑙魯',
  },
  {
    'en': 'NIUE',
    'tc': '紐埃',
  },
  {
    'en': 'NEW ZEALAND',
    'tc': '新西蘭',
  },
  {
    'en': 'SULTANATE OF OMAN   ',
    'tc': '阿曼',
  },
  {
    'en': 'PANAMA',
    'tc': '巴拿馬',
  },
  {
    'en': 'PERU',
    'tc': '秘魯',
  },
  {
    'en': 'TAHITI/FRENCH POLY\' ',
    'tc': '法屬波利尼西亞',
  },
  {
    'en': 'PAPUA NEW GUINEA    ',
    'tc': '巴布亞新畿內亞',
  },
  {
    'en': 'PHILIPPINES',
    'tc': '菲律賓',
  },
  {
    'en': 'PAKISTAN',
    'tc': '巴基斯坦',
  },
  {
    'en': 'POLAND',
    'tc': '波蘭',
  },
  {
    'en': 'ST. PIERRE & MIQ\'   ',
    'tc': '聖皮埃爾和密克隆',
  },
  {
    'en': 'PITCAIRN',
    'tc': '皮特凱恩群島',
  },
  {
    'en': 'PUERTO RICO',
    'tc': '波多黎各',
  },
  {
    'en': 'PALESTINE',
    'tc': '巴勒斯坦',
  },
  {
    'en': 'PORTUGAL',
    'tc': '葡萄牙',
  },
  {
    'en': 'PALAU',
    'tc': '帕勞',
  },
  {
    'en': 'PARAGUAY',
    'tc': '巴拉圭',
  },
  {
    'en': 'QATAR',
    'tc': '卡塔爾',
  },
  {
    'en': 'REUNION ISLAND      ',
    'tc': '留尼汪',
  },
  {
    'en': 'ROMANIA',
    'tc': '羅馬尼亞',
  },
  {
    'en': 'SERBIA',
    'tc': '塞爾維亞',
  },
  {
    'en': 'RUSSIA',
    'tc': '俄羅斯',
  },
  {
    'en': 'RWANDA',
    'tc': '盧旺達',
  },
  {
    'en': 'SAUDI ARABIA        ',
    'tc': '沙特阿拉伯',
  },
  {
    'en': 'SOLOMON ISLANDS     ',
    'tc': '所羅門群島',
  },
  {
    'en': 'SEYCHELLES',
    'tc': '塞舌爾',
  },
  {
    'en': 'SUDAN',
    'tc': '蘇丹',
  },
  {
    'en': 'SWEDEN',
    'tc': '瑞典',
  },
  {
    'en': 'SINGAPORE',
    'tc': '新加坡',
  },
  {
    'en': 'SAINT HELENA        ',
    'tc': '聖赫勒拿',
  },
  {
    'en': 'SLOVENIA',
    'tc': '斯洛文尼亞',
  },
  {
    'en': 'SVA\' A. J. MEY\' ISD ',
    'tc': '瓦爾巴群島和揚馬延島',
  },
  {
    'en': 'SLOVAK REPUBLIC     ',
    'tc': '斯洛伐克',
  },
  {
    'en': 'SIERRA LEONE        ',
    'tc': '塞拉利昂',
  },
  {
    'en': 'SAN MARINO',
    'tc': '聖馬力諾',
  },
  {
    'en': 'SENEGAL',
    'tc': '塞內加爾',
  },
  {
    'en': 'SOMALIA',
    'tc': '索馬里',
  },
  {
    'en': 'SURINAME',
    'tc': '蘇里南',
  },
  {
    'en': 'SOUTH SUDAN',
    'tc': '南蘇丹',
  },
  {
    'en': 'SAO TOME & PRINCIPE ',
    'tc': '聖多美和普林西比',
  },
  {
    'en': 'EL SALVADOR',
    'tc': '薩爾瓦多',
  },
  {
    'en': 'SYRIA',
    'tc': '敘利亞',
  },
  {
    'en': 'SWAZILAND',
    'tc': '斯威士蘭',
  },
  {
    'en': 'TURKS & CAICOS ISDS ',
    'tc': '特克斯與凱科斯群島',
  },
  {
    'en': 'CHAD',
    'tc': '乍得',
  },
  {
    'en': 'FRENCH S. TERR\'     ',
    'tc': '法屬南部領地',
  },
  {
    'en': 'TOGO',
    'tc': '多哥',
  },
  {
    'en': 'THAILAND',
    'tc': '泰國',
  },
  {
    'en': 'TAJIKISTAN',
    'tc': '塔吉克',
  },
  {
    'en': 'TOKELAU',
    'tc': '托克勞',
  },
  {
    'en': 'TIMOR-LESTE',
    'tc': '東帝汶',
  },
  {
    'en': 'TURKMENISTAN        ',
    'tc': '土庫曼',
  },
  {
    'en': 'TUNISIA',
    'tc': '突尼西亞',
  },
  {
    'en': 'TONGA',
    'tc': '湯加',
  },
  {
    'en': 'TURKEY',
    'tc': '土耳其',
  },
  {
    'en': 'TRINIDAD & TABAGO   ',
    'tc': '千里達及托巴哥',
  },
  {
    'en': 'TUVALU',
    'tc': '圖瓦盧',
  },
  {
    'en': 'TAIWAN',
    'tc': '臺灣',
  },
  {
    'en': 'TANZANIA',
    'tc': '坦桑尼亞',
  },
  {
    'en': 'UKRAINE',
    'tc': '烏克蘭',
  },
  {
    'en': 'UGANDA',
    'tc': '烏干達',
  },
  {
    'en': 'US - MIN\' OUT\' ISDS ',
    'tc': '美國本土外小島嶼',
  },
  {
    'en': 'UNITED STATES       ',
    'tc': '美國',
  },
  {
    'en': 'URUGUAY',
    'tc': '烏拉圭',
  },
  {
    'en': 'UZBEKISTAN',
    'tc': '烏茲別克',
  },
  {
    'en': 'VATICAN CITY ST-HS  ',
    'tc': '梵蒂岡',
  },
  {
    'en': 'ST VINCENT & GREN\'  ',
    'tc': '聖文森特和格林納丁斯',
  },
  {
    'en': 'VENEZUELA',
    'tc': '委內瑞拉',
  },
  {
    'en': 'BRI\' VIRGIN ISDS    ',
    'tc': '英屬維爾京群島',
  },
  {
    'en': 'U.S. VIRGIN IS.     ',
    'tc': '美屬維爾京群島',
  },
  {
    'en': 'VIETNAM',
    'tc': '越南',
  },
  {
    'en': 'VANUATU',
    'tc': '瓦努阿圖',
  },
  {
    'en': 'WALLIS & FUTUNA ISD ',
    'tc': '瓦利斯和富圖納',
  },
  {
    'en': 'WESTERN SAMOA       ',
    'tc': '薩摩亞',
  },
  {
    'en': 'SUPRANATIONAL',
    'tc': 'SUPRANATIONAL',
  },
  {
    'en': 'YEMEN',
    'tc': '也門',
  },
  {
    'en': 'MAYOTTE',
    'tc': '馬約特',
  },
  {
    'en': 'YUGOSLAVIA',
    'tc': '南斯拉夫',
  },
  {
    'en': 'SOUTH AFRICA        ',
    'tc': '南非',
  },
  {
    'en': 'ZAMBIA',
    'tc': '贊比亞',
  },
  {
    'en': 'ZIMBABWE',
    'tc': '津巴布韋',
  },
  {
    'en': 'CHINESE       ',
    'tc': 'CHINESE       ',
  },
  {
    'en': 'BRITISH',
    'tc': 'BRITISH',
  },
  {
    'en': 'UNIDENTIFIED (DM)       ',
    'tc': 'UNIDENTIFIED (DM)       ',
  },
];

var inputError = {
  required: {
    en: 'Please enter the [label].',
    tc: '請輸入[label]。',
  },
  checkboxRadioRequired: {
    en: 'Please select an option.',
    tc: '請選擇。',
  },
  tnc: {
    en: 'Please tick the checkbox to confirm you have read and agreed all the terms and conditions.',
    tc: '請剔選方格以表示你已閱讀並同意有關條款及細則。',
  },
  tncAbove: {
    en: 'Please tick the checkbox to confirm you have read and agreed the condition above.',
    tc: '請剔選方格以表示你已閱讀並同意以上條件。',
  },
  invalid: {
    en: 'Please enter a valid [label].',
    tc: '請輸入有效[label]。',
  },
  invalid2: {
    en: 'Please enter a valid [label].',
    tc: '請輸入正確[label]。',
  },
  invalid3: {
    en: 'Please enter the correct [label].',
    tc: '請輸入正確[label]。',
  },
  select: {
    en: 'Please select a [label].',
    tc: '請選擇[label]。',
  },
  selectInvalid: {
    en: 'Please select the [label].',
    tc: '請選擇正確[label]。',
  },
  selectInvalidBeforeToday: {
    en: 'Please enter a valid [label].',
    tc: '請選擇有效[label]。',
  },
  selectAtLeast: {
    en: 'Please select at least 1 [label].',
    tc: '請選擇至少一個[label]。',
  },
  english: {
    en: 'Please enter the [label] in English.',
    tc: '請用英文輸入[label]。',
  },
  engNum: {
    en: 'Please enter a valid [label] using alphabet and numbers.',
    tc: '請用有效英文字母及數字輸入[label]。',
  },
  engChar: {
    en: 'Please enter the [label] using alphabet and valid symbols.',
    tc: '請用有效英文字母及字符輸入[label]。',
  },
  engNumChar: {
    en: 'Please enter the [label] using alphabet, numbers and valid symbols.',
    tc: '請用有效英文字母、數字或字符輸入[label]。',
  },
  confirmPW: {
    en: 'Please enter the correct password.',
    tc: '請輸入正確密碼。',
  },
  range: {
    en: 'Your [label] must be between [min] and [max]. ',
    tc: '你的[label]應介於[min] 至 [max]之間。',
  },
  min: {
    en: 'The minimum [label] is [min]. ',
    tc: '[label]最少為[min]。',
  },
  max: {
    en: 'The maximum [label] is [max]. ',
    tc: '[label]最多為[max]。',
  },
  mod1000: {
    en: 'Please round to the nearest thousand.',
    tc: '請輸入最接近之千位數。',
  },
  sign: {
    en: 'Please provide your signature.',
    tc: '請簽名。',
  },
  captcha: {
    en: 'The characters that you typed did not match the word verification. Please try again.',
    tc: '你輸入的字元與字詞驗證不符，請再試一次。',
  },
  captcha2: {
    en: 'Please enter the correct characters.',
    tc: '請輸入正確認証碼。',
  },
  age18: {
    en: 'You must be age 18 or above to apply for an account.',
    tc: '',
  },
  otpExpired: {
    en: 'Your 6-digit verification code has expired. Please click "Resend" and try again.',
    tc: '你的6位數字驗證碼已失效，請按「重發」再試一次。',
  },
  otpNotMatch: {
    en: 'The verification code that you entered did not match. Please try again.',
    tc: '你輸入的驗證碼不正確，請再試一次。',
  },
  reEnterPW: {
    en: 'Please enter the password again.',
    tc: '請重新輸入密碼。',
  },
};

var featureSliderText = {
    pagination: {   // text before slide index
        'en': 'Slide to slide ',
        'tc': '幻燈片'
    }
};
var nature = [
  {
    'en': 'Farming - Crops & Plants',
    'tc': '農作物及植物種植業',
  },
  {
    'en': 'Farming - Animals',
    'tc': '飼養家畜，家禽，動物',
  },
  {
    'en': 'Fishing & Aquaculture',
    'tc': '捕魚及水產養殖業',
  },
  {
    'en': 'Farming - Mixed & Related Activities',
    'tc': '其他農業生產，飼料及其他輔助活動',
  },
  {
    'en': 'Forestry Activities',
    'tc': '林業活動',
  },
  {
    'en': 'Hunting, Trapping & Related Activities',
    'tc': '狩獵，捕捉及相關活動',
  },
  {
    'en': 'Mining & Quarrying Activities',
    'tc': '採礦及採石業',
  },
  {
    'en': 'Petroleum & Natural Gas Extraction',
    'tc': '石油及天然氣開採業',
  },
  {
    'en': 'Manufacturing - Food',
    'tc': '食品製造業',
  },
  {
    'en': 'Manufacturing - Beverage',
    'tc': '飲品製造業',
  },
  {
    'en': 'Manufacturing - Grain Mill & Starches Related Products',
    'tc': '穀類及磨粉製造業',
  },
  {
    'en': 'Food Processing & Preserving Activities',
    'tc': '食品加工及醃製活動',
  },
  {
    'en': 'Manufacturing - Plant & Animal Oil, Fats',
    'tc': '植物及動物油脂製造業',
  },
  {
    'en': 'Manufacturing - Prepared Animal Feeds',
    'tc': '動物及禽畜飼料製造業',
  },
  {
    'en': 'Manufacturing - Textile (Cotton)',
    'tc': '棉質纺織品製造業',
  },
  {
    'en': 'Manufacturing - Textile (Others)',
    'tc': '其他纺織品製造業',
  },
  {
    'en': 'Manufacturing - Garment Apparel',
    'tc': '服裝製造業',
  },
  {
    'en': 'Manufacturing - Leather',
    'tc': '皮革製品製造業',
  },
  {
    'en': 'Manufacturing - Footwear',
    'tc': '鞋類製造業',
  },
  {
    'en': 'Manufacturing - Wood, Cork & Straw Plaiting Products',
    'tc': '木材，水松及草織製品製造業',
  },
  {
    'en': 'Manufacturing - Paper & Paper Products',
    'tc': '紙張及紙品製造業',
  },
  {
    'en': 'Manufacturing - Petroleum & Coal Products',
    'tc': '石油及煤製造業',
  },
  {
    'en': 'Manufacturing - Chemistry & Chemical Products',
    'tc': '化學品及化工產品製造業',
  },
  {
    'en': 'Manufacturing - Pharmaceuticals, Medicinal Chemical & Botanical Products',
    'tc': '藥品，醫藥化學劑及植物藥材製造業',
  },
  {
    'en': 'Manufacturing - Rubber & Plastic Products',
    'tc': '橡膠及塑膠製品製造業',
  },
  {
    'en': 'Manufacturing - Metal & Metallic Products',
    'tc': '金屬及金屬製品製造業',
  },
  {
    'en': 'Manufacturing - Electrical Appliances, Electronic Products & Optical Equipment',
    'tc': '電器，及電子產品及光學產品製造業',
  },
  {
    'en': 'Manufacturing - Machinery, Equipment & Supplies',
    'tc': '機械，設備及配件製造業',
  },
  {
    'en': 'Cars, Motor Vehicle & Related Parts Assembly or Manufacturing',
    'tc': '汽車，機動車輛及有關配件的裝嵌或製造',
  },
  {
    'en': 'Manufacturing - Transportation Equipment',
    'tc': '運輸設備製造業',
  },
  {
    'en': 'Manufacturing - Household Products & Furniture',
    'tc': '家居用品及傢具製造業',
  },
  {
    'en': 'Manufacturing - Watch & Components',
    'tc': '鐘錶及有關零件製造業',
  },
  {
    'en': 'Manufacturing - Toys & Games',
    'tc': '玩具及遊戲製造業',
  },
  {
    'en': 'Manufacturing - Catering Utensils & Kitchenware',
    'tc': '餐具及廚具製造業',
  },
  {
    'en': 'Manufacturing - Jewellery',
    'tc': '珠寶首飾製造業',
  },
  {
    'en': 'Manufacturing - Arms & Military Products',
    'tc': '武器，彈藥，軍火及軍用設備製造業',
  },
  {
    'en': 'Manufacturing - Alcoholic Beverage & Tobacco',
    'tc': '酒精飲品及煙草製造業',
  },
  {
    'en': 'Manufacturing - Jewellery (Imitation)',
    'tc': '珠寶首飾製造業 (仿製品)',
  },
  {
    'en': 'Manufacturing - Munitions',
    'tc': '彈藥製造業',
  },
  {
    'en': 'Manufacturing - Others',
    'tc': '其他產品製造業',
  },
  {
    'en': 'Utilities & Related Business',
    'tc': '公用事業及相關業務',
  },
  {
    'en': 'Water Supplies Activities',
    'tc': '水務業',
  },
  {
    'en': 'Construction & Related Activities',
    'tc': '建造及相關活動',
  },
  {
    'en': 'Architecture & Related Activities',
    'tc': '建築及有關工程活動',
  },
  {
    'en': 'Engineering & Related Activities',
    'tc': '工程及有關裝設工程活動',
  },
  {
    'en': 'Wholesale - Agricultural & Animals',
    'tc': '農產品及動物批發業',
  },
  {
    'en': 'Wholesale - Food & Beverage ',
    'tc': '食品及飲品批發業',
  },
  {
    'en': 'Wholesale - Textile (Cotton)',
    'tc': '棉質纺織品批發業',
  },
  {
    'en': 'Wholesale - Textile (Others)',
    'tc': '其他纺織品批發業',
  },
  {
    'en': 'Wholesale - Garment Apparel',
    'tc': '服裝批發業',
  },
  {
    'en': 'Wholesale - Footwear & Bag',
    'tc': '鞋類及手袋批發業',
  },
  {
    'en': 'Wholesale - Leather',
    'tc': '皮革製品批發業',
  },
  {
    'en': 'Wholesale - Paper & Paper Products',
    'tc': '紙張及紙品批發業',
  },
  {
    'en': 'Wholesale - Petroleum & Petroleum Products',
    'tc': '石油及石油產品批發業',
  },
  {
    'en': 'Wholesale - Pharmaceutical & Medical',
    'tc': '藥品及藥房用品批發業',
  },
  {
    'en': 'Wholesale - Rubber & Plastic Products',
    'tc': '橡膠及塑膠製品批發業',
  },
  {
    'en': 'Wholesale - Electrical Appliances & Electronic Products',
    'tc': '電器及電子產品批發業',
  },
  {
    'en': 'Wholesale - Machinery, Equipment & Supplies',
    'tc': '機械，設備及配件批發業',
  },
  {
    'en': 'Wholesale - Motor Vehicles, Motor Vehicle Parts & Supplies',
    'tc': '機動車輛，機動車輛配件及零件批發業',
  },
  {
    'en': 'Wholesale - Household Products & Furniture',
    'tc': '家居用品及傢具批發業',
  },
  {
    'en': 'Wholesale - Watch & Components',
    'tc': '鐘錶及有關零件批發業',
  },
  {
    'en': 'Wholesale - Jewellery',
    'tc': '珠寶首飾批發業',
  },
  {
    'en': 'Wholesale - Spectacles & Optical Supplies',
    'tc': '眼鏡及光學用品批發業',
  },
  {
    'en': 'Wholesale Brokers & Agents (Auctioning)',
    'tc': '批發經紀及代理(包括拍賣行)',
  },
  {
    'en': 'Wholesale - Alcoholic Beverage & Tobacco',
    'tc': '酒精飲品及煙草批發業',
  },
  {
    'en': 'Wholesale - Health & Care Products',
    'tc': '保健產品批發業',
  },
  {
    'en': 'Wholesale - Jewellery (Imitation)',
    'tc': '珠寶首飾批發業 (仿製品)',
  },
  {
    'en': 'Wholesale - Others',
    'tc': '其他產品批發業',
  },
  {
    'en': 'Trading - Agricultural & Animals',
    'tc': '農產品及動物貿易',
  },
  {
    'en': 'Trading - Food & Beverage',
    'tc': '食品及飲品貿易',
  },
  {
    'en': 'Trading - Textile (Cotton)',
    'tc': '棉質纺織品貿易',
  },
  {
    'en': 'Trading - Textile (Others)',
    'tc': '其他纺織品貿易',
  },
  {
    'en': 'Trading - Garment Apparel',
    'tc': '服裝貿易',
  },
  {
    'en': 'Trading - Footwear & Bag',
    'tc': '鞋類及手袋貿易',
  },
  {
    'en': 'Trading - Leather',
    'tc': '皮革製品貿易',
  },
  {
    'en': 'Trading - Wood & Other Construction Materials',
    'tc': '木材及其他建築材料貿易',
  },
  {
    'en': 'Trading - Paper & Paper Products',
    'tc': '紙張及紙品貿易',
  },
  {
    'en': 'Trading - Petroleum & Petroleum Products',
    'tc': '石油及石油產品貿易',
  },
  {
    'en': 'Trading - Pharmaceutical & Medical',
    'tc': '藥品及藥房用品貿易',
  },
  {
    'en': 'Trading - Rubber & Plastic Products',
    'tc': '橡膠及塑膠製品貿易',
  },
  {
    'en': 'Trading - Metal & Metallic Products',
    'tc': '金屬及金屬製品貿易',
  },
  {
    'en': 'Trading - Hardware, Metalware, Paints & Other Building Renovation Materials',
    'tc': '五金器具及建築裝修材料貿易',
  },
  {
    'en': 'Trading - Electrical Appliances & Electronic Products',
    'tc': '電器及電子產品貿易',
  },
  {
    'en': 'Trading - Computer & Peripheral Products',
    'tc': '電腦及周邊設備貿易',
  },
  {
    'en': 'Trading - Machinery, Equipment & Supplies',
    'tc': '機械，設備及配件貿易',
  },
  {
    'en': 'Trading - Motor Vehicles, Motor Vehicle Parts & Supplies',
    'tc': '機動車輛，機動車輛配件及零件貿易',
  },
  {
    'en': 'Trading - Household Products & Furniture',
    'tc': '家居用品及傢具貿易',
  },
  {
    'en': 'Trading - Watch & Components',
    'tc': '鐘錶及有關零件貿易',
  },
  {
    'en': 'Trading - Jewellery',
    'tc': '珠寶首飾貿易',
  },
  {
    'en': 'Trading - Spectacles & Optical Supplies',
    'tc': '眼鏡及光學用品貿易',
  },
  {
    'en': 'Trading - Hotel Appliances',
    'tc': '洒店用品供應貿易',
  },
  {
    'en': 'Trading - Alcoholic Beverage & Tobacco',
    'tc': '酒精飲品及煙草貿易',
  },
  {
    'en': 'Trading - Chemistry & Chemical Products',
    'tc': '化學品及化工產品貿易',
  },
  {
    'en': 'Trading - Health & Care Products',
    'tc': '保健產品貿易',
  },
  {
    'en': 'Trading - Jewellery (Imitation)',
    'tc': '珠寶首飾貿易 (仿製品)',
  },
  {
    'en': 'Trading - Toys & Games',
    'tc': '玩具及遊戲貿易',
  },
  {
    'en': 'Trading - Others',
    'tc': '其他產品貿易',
  },
  {
    'en': 'Retail - General Merchandise',
    'tc': '綜合商品零售',
  },
  {
    'en': 'Retail - Food & Beverage',
    'tc': '食品及飲品零售',
  },
  {
    'en': 'Retail - Textile (Cotton)',
    'tc': '棉質纺織品零售',
  },
  {
    'en': 'Retail - Textile (Others)',
    'tc': '其他纺織品零售',
  },
  {
    'en': 'Retail - Garment Apparel',
    'tc': '服裝零售',
  },
  {
    'en': 'Retail - Footwear & Bag',
    'tc': '鞋類及手袋零售',
  },
  {
    'en': 'Retail - Leather',
    'tc': '皮革製品零售',
  },
  {
    'en': 'Retail - Carpets, Rugs, Wall & Floor Coverings',
    'tc': '地毯，圍氈，牆紙及地板零售',
  },
  {
    'en': 'Retail - Petroleum & Petroleum Products',
    'tc': '石油及石油產品零售',
  },
  {
    'en': 'Retail - Other Fuel',
    'tc': '其他燃料零售',
  },
  {
    'en': 'Retail - Pharmaceutical & Medical',
    'tc': '藥物及藥房用品零售',
  },
  {
    'en': 'Retail - Hardware, Metalware, Paints & Other Building Renovation Materials',
    'tc': '五金器具及其他裝修材料零售',
  },
  {
    'en': 'Retail - Electrical Appliances & Electronic Products',
    'tc': '電器及電子產品零售',
  },
  {
    'en': 'Retail - Computer & Peripheral Products',
    'tc': '電腦及周邊產品零售',
  },
  {
    'en': 'Retail - Information & Communication Equipment',
    'tc': '資訊及通訊設備零售',
  },
  {
    'en': 'Retail - Motor Vehicles, Motor Vehicle Parts & Supplies',
    'tc': '機動車輛，機動車輛配件及零件零售',
  },
  {
    'en': 'Retail - Household Products & Furniture',
    'tc': '家居用品及傢具零售',
  },
  {
    'en': 'Retail - Watches & Clocks',
    'tc': '鐘錶零售',
  },
  {
    'en': 'Retail - Jewellery',
    'tc': '珠寶首飾零售',
  },
  {
    'en': 'Retail - Spectacles & Optical Supplies',
    'tc': '眼鏡及光學用品零售',
  },
  {
    'en': 'Retail - Publish Articles & Stationery',
    'tc': '書報及文具零售',
  },
  {
    'en': 'Retail - Toys & Games',
    'tc': '玩具及遊戲零售',
  },
  {
    'en': 'Retail - Music & Video Recording',
    'tc': '音樂及錄像零售',
  },
  {
    'en': 'Retail - Sporting Equipment',
    'tc': '運動設備零售',
  },
  {
    'en': 'Retail - Agricultural & Animals',
    'tc': '農產品及動物零售',
  },
  {
    'en': 'Retail - Alcoholic Beverage & Tobacco',
    'tc': '酒精飲品及煙草零售',
  },
  {
    'en': 'Retail - Health & Care Products',
    'tc': '健康及護理用品零售',
  },
  {
    'en': 'Retail - Hotel Appliances',
    'tc': '洒店用品供應零售',
  },
  {
    'en': 'Retail - Jewellery (Imitation)',
    'tc': '珠寶首飾零售 (仿製品)',
  },
  {
    'en': 'Retail - Machinery, Equipment & Supplies',
    'tc': '機械，設備及配件零售',
  },
  {
    'en': 'Retail - Metal & Metallic Products',
    'tc': '金屬及金屬製品零售',
  },
  {
    'en': 'Retail - Paper & Paper Products',
    'tc': '紙張及紙品零售',
  },
  {
    'en': 'Retail - Rubber & Plastic Products',
    'tc': '橡膠及塑膠製品零售',
  },
  {
    'en': 'Retail - Wood & Other Construction Materials',
    'tc': '木材及其他建築材料零售',
  },
  {
    'en': 'Retail - Others',
    'tc': '其他商品零售',
  },
  {
    'en': 'Air Transport',
    'tc': '空運業',
  },
  {
    'en': 'Air Cargo Forwarding Services',
    'tc': '航空貨運代理服務',
  },
  {
    'en': 'Land Transport - Taxi',
    'tc': '陸路運輸業 - 的士',
  },
  {
    'en': 'Land Transport - Public Light Bus',
    'tc': '陸路運輸業 - 公共小巴',
  },
  {
    'en': 'Land Transport - Others',
    'tc': '陸路運輸業 - 其他',
  },
  {
    'en': 'Water Transport',
    'tc': '海上運輸業',
  },
  {
    'en': 'Warehousing & Storage Services',
    'tc': '倉庫及儲存業',
  },
  {
    'en': 'Logistics Services',
    'tc': '物流服務',
  },
  {
    'en': 'Hotel & Guest House',
    'tc': '酒店及旅舍業',
  },
  {
    'en': 'Catering Services',
    'tc': '餐飲服務業',
  },
  {
    'en': 'Information Technology Services',
    'tc': '資訊科技業',
  },
  {
    'en': 'Communication Services',
    'tc': '通訊業',
  },
  {
    'en': 'Banking',
    'tc': '銀行業',
  },
  {
    'en': 'Financial & Investment Services',
    'tc': '金融及投資業',
  },
  {
    'en': 'Insurance & Related Activities',
    'tc': '保險及相關活動',
  },
  {
    'en': 'Future Brokers',
    'tc': '期貨期貨經紀及交易商',
  },
  {
    'en': 'Gold & Silver Bullion Brokers',
    'tc': '金銀貿易經紀及交易商',
  },
  {
    'en': 'Stockbrokers - Margin Lending',
    'tc': '證券公司-孖展買賣',
  },
  {
    'en': 'Stockbrokers - Non-Margin Lending',
    'tc': '證券公司',
  },
  {
    'en': 'Finance Companies',
    'tc': '財務公司',
  },
  {
    'en': 'Money Lenders',
    'tc': '放債人公司',
  },
  {
    'en': 'Money Service',
    'tc': '貨幣兌換服務經營者',
  },
  {
    'en': 'Operator (Licenced)',
    'tc': '(持有香港海關牌照)',
  },
  {
    'en': 'Other Money Services',
    'tc': '其他貨幣兌換服務',
  },
  {
    'en': 'Other Financial Services',
    'tc': '其他金融服務',
  },
  {
    'en': 'Financial Institution Related Services  Companies',
    'tc': '金融服務機構',
  },
  {
    'en': 'Real Estate Related Activities',
    'tc': '房地產活動',
  },
  {
    'en': 'Property Investment & Holding',
    'tc': '物業投資及持有',
  },
  {
    'en': 'Public Administration',
    'tc': '公共行政',
  },
  {
    'en': 'Legal & Notaries',
    'tc': '法律及公證服務',
  },
  {
    'en': 'Auditing & Accounting',
    'tc': '審計及會計服務',
  },
  {
    'en': 'Other Professional & Technology Services',
    'tc': '其他專業及科技服務',
  },
  {
    'en': 'Advisory & Consultancy Services',
    'tc': '諮詢及顧問服務',
  },
  {
    'en': 'Advertising & Market Research Activities',
    'tc': '廣告及市場研究活動',
  },
  {
    'en': 'Design, Decoration & Related Services',
    'tc': '設計，裝飾及有關服務',
  },
  {
    'en': 'Medical Services',
    'tc': '醫療服務',
  },
  {
    'en': 'Veterinary Activities',
    'tc': '獸醫服務',
  },
  {
    'en': 'Nursing & Caring Related Services',
    'tc': '護養及照顧有關服務',
  },
  {
    'en': 'Education Services',
    'tc': '教育服務',
  },
  {
    'en': 'Libraries, Museums & Cultural Services',
    'tc': '圖書館，博物館及文化服務',
  },
  {
    'en': 'Publishing Activities',
    'tc': '出版活動',
  },
  {
    'en': 'Printing & Record Reproduction',
    'tc': '印刷及影印服務',
  },
  {
    'en': 'Extraterritorial Organizations & Bodies',
    'tc': '享有治外法權機構',
  },
  {
    'en': 'Membership Activities',
    'tc': '會員制組織活動',
  },
  {
    'en': 'Religious Organization Activities',
    'tc': '宗教組織活動',
  },
  {
    'en': 'Charities & Welfare Organization (No Exemption)',
    'tc': '慈善及福利機構(非豁免類)',
  },
  {
    'en': 'Charities & Welfare Organization (With Exemption)',
    'tc': '慈善及福利機構(豁免類)',
  },
  {
    'en': 'Non-profit making organization',
    'tc': '非牟利機構',
  },
  {
    'en': 'Social & Community Service Centre Activities',
    'tc': '社會及有關社區組織服務',
  },
  {
    'en': 'Other Social & Related Community Organization',
    'tc': '其他社會及有關社區組織',
  },
  {
    'en': 'Travel Related Services',
    'tc': '旅遊業有關活動',
  },
  {
    'en': 'Amusement Parks & Theme Parks',
    'tc': '遊樂園及主題樂園活動',
  },
  {
    'en': 'Office Administrative & Support Services',
    'tc': '辦公室行政及支援服務',
  },
  {
    'en': 'Performing Arts, Creation, Music, Stage Production, Venue Operations Activities',
    'tc': '從事表演藝術活動',
  },
  {
    'en': 'Programming & Broadcasting Activities',
    'tc': '節目製作及廣播活動',
  },
  {
    'en': 'Film Preparation, Filming, Production; Cinema, Film Studios, Film Distribution & Film-Related Services',
    'tc': '電影及相關服務活動',
  },
  {
    'en': 'Photography Services',
    'tc': '攝影服務',
  },
  {
    'en': 'Security Guards, Security Systems & Detective Services',
    'tc': '護衛，保安系统及偵查服務',
  },
  {
    'en': 'Repair & Maintenance Services',
    'tc': '維修及保養服務業',
  },
  {
    'en': 'Sports Activities & Facilities',
    'tc': '體育活動及設施',
  },
  {
    'en': 'Electronic Game Centres',
    'tc': '電子遊戲機中心',
  },
  {
    'en': 'Pawn Services',
    'tc': '典當業',
  },
  {
    'en': 'Art Dealing',
    'tc': '藝術品商',
  },
  {
    'en': 'Rental & Leasing Activities',
    'tc': '租賃活動',
  },
  {
    'en': 'Funeral Services',
    'tc': '殯儀業',
  },
  {
    'en': 'Metaphysical Services ',
    'tc': '玄學服務',
  },
  {
    'en': 'Cleaning & Related Services',
    'tc': '清潔及有關服務業',
  },
  {
    'en': 'Environmental Hygiene, Waste Treatment & Disposal & Material Recovery Business',
    'tc': '環保，廢物處理及資源回收業',
  },
  {
    'en': 'Domestic Household & Other Personal Services',
    'tc': '家居服務及其他個人服務業',
  },
  {
    'en': 'Laundry & Dry-Cleaning Services',
    'tc': '洗衣服務',
  },
  {
    'en': 'Hairdressing & Beauty Care Services',
    'tc': '理髮及美容護理服務',
  },
  {
    'en': 'Massage Services',
    'tc': '按摩服務',
  },
  {
    'en': 'Bathhouse Services',
    'tc': '浴室服務',
  },
  {
    'en': 'Casino & Gambling',
    'tc': '賭場及博彩事業',
  },
  {
    'en': 'Night Clubs, Disco, Bars, Karaoke',
    'tc': '夜總會，的士高，酒吧，卡垃OK',
  },
  {
    'en': 'Holding Company of Non-FI or Conglomerate (Non-Financial Institution)',
    'tc': '控股公司(非金融類)及綜合性控股公司(非金融類)',
  },
  {
    'en': 'Holding Company of Financial Institution',
    'tc': '控股公司(金融類)',
  },
];

var occStatus = [
  {
    'en': 'Full-time',
    'tc': '全職',
  },
  {
    'en': 'Self-employed',
    'tc': '自僱',
  },
  {
    'en': 'Retired',
    'tc': '退休',
  },
  {
    'en': 'Others',
    'tc': '其他',
  },
];

var occupation = [{
  'en': 'Accounting and Financial Personnel',
  'tc': '會計財務人員',
},
{
  'en': 'Art Dealer',
  'tc': '藝術品商人',
},
{
  'en': 'Assessment Personnel',
  'tc': '計核人員',
},
{
  'en': 'Blue-Collar Worker',
  'tc': '藍領人員',
},
{
  'en': 'Cheque Cashing',
  'tc': '支票兌現',
},
{
  'en': 'Civil Servant',
  'tc': '公務員',
},
{
  'en': 'Creation and Production Personnel',
  'tc': '創作及製作人員',
},
{
  'en': 'Designer',
  'tc': '設計師',
},
{
  'en': 'Diet Cooking',
  'tc': '飲食烹調人員',
},
{
  'en': 'Education Personnel',
  'tc': '教育工作者',
},
{
  'en': 'Employer',
  'tc': '僱主',
},
{
  'en': 'Engineer',
  'tc': '工程人員',
},
{
  'en': 'Gambling',
  'tc': '賭博業人員',
},
{
  'en': 'Housewife',
  'tc': '家庭主婦',
},
{
  'en': 'Infant',
  'tc': '幼兒',
},
{
  'en': 'Insurance Agent',
  'tc': '保險代理',
},
{
  'en': 'Investment Advisor/Manager, Fund Manager',
  'tc': '投資顧問/基金經理',
},
{
  'en': 'IT Personnel',
  'tc': '資訊科技人員',
},
{
  'en': 'Journalist',
  'tc': '新聞工作者',
},
{
  'en': 'Key Position of Finance Company',
  'tc': '財務公司要員',
},
{
  'en': 'Key Position of Massage Centre',
  'tc': '按摩中心要員',
},
{
  'en': 'Key Position of Night Club, Disco, Bar, Karaoke',
  'tc': '夜總會/的士高/酒吧/卡拉OK要員',
},
{
  'en': 'Key Position of Pawn Shop',
  'tc': '當押業要員',
},
{
  'en': 'Key Position of Sauna Bath',
  'tc': '桑拿浴室要員',
},
{
  'en': 'Language Personnel',
  'tc': '語言工作者',
},
{
  'en': 'Legal Personnel',
  'tc': '法律人員',
},
{
  'en': 'Management Personnel',
  'tc': '管理人員',
},
{
  'en': 'Marketing/Trading Agent',
  'tc': '營銷/交易代理',
},
{
  'en': 'Medical Personnel',
  'tc': '醫務人員',
},
{
  'en': 'Money Broker',
  'tc': '貨幣經紀',
},
{
  'en': 'Money Changer & Remittance Agent',
  'tc': '貨幣兌換及滙款代理人',
},
{
  'en': 'Money Lender',
  'tc': '放債人/從業員',
},
{
  'en': 'Non-Listed Jewellery Dealer',
  'tc': '珠寶商人(非上市公司)',
},
{
  'en': 'Non-Listed Precious Stone Trader',
  'tc': '寶石商人(非上市公司)',
},
{
  'en': 'Other Associate Professionals',
  'tc': '其他輔導專業人員',
},
{
  'en': 'Other Civilian Personnel',
  'tc': '其他文職人員',
},
{
  'en': 'Other Disciplined Services Personnel (e.g. Government Flying Service, Civil Aid Service, Auxiliary Medical Services) ',
  'tc': '其他紀律部隊',
},
{
  'en': 'Other Professionals',
  'tc': '其他專業人員',
},
{
  'en': 'Paramedical Personnel',
  'tc': '輔助醫務人員',
},
{
  'en': 'Peddler/Hawker',
  'tc': '小販',
},
{
  'en': 'Personnel with Specialized Skills or Expertise',
  'tc': '專門技術人員',
},
{
  'en': 'Police',
  'tc': '警務處人員',
}, {
  'en': 'Political Parties',
  'tc': '從政人士',
},
{
  'en': 'Religious Organization Personnel',
  'tc': '宗教組織人員',
},
{
  'en': 'Retired',
  'tc': '退休人士',
},
{
  'en': 'Service Worker',
  'tc': '服務工作人員',
},
{
  'en': 'Social and Counseling Personnel',
  'tc': '社會及輔導工作者',
},
{
  'en': 'Sports and Arts Personnel',
  'tc': '體藝工作者',
},
{
  'en': 'Staff of Correctional Services Department',
  'tc': '懲教署人員',
},
{
  'en': 'Staff of Customs & Excise Department',
  'tc': '海關人員',
},
{
  'en': 'Staff of Fire Services Department',
  'tc': '消防處人員',
},
{
  'en': 'Staff of Immigration Department',
  'tc': '入境事務處人員',
},
{
  'en': 'Staff of Other Bank',
  'tc': '其他銀行職員',
},
{
  'en': 'Staff of Own Bank',
  'tc': '本行職員',
},
{
  'en': 'Student',
  'tc': '學生',
},
{
  'en': 'Tertiary Education Personnel',
  'tc': '大專教育人員',
},
{
  'en': 'Unemployed',
  'tc': '待業人士',
},
];

var otherOptions = [{
  'en': 'Housewife',
  'tc': '家庭主婦',
},
{
  'en': 'Unemployed',
  'tc': '失業',
},
{
  'en': 'Student',
  'tc': '學生',
},

];

var positionList = [{
  'en': '    PROFESSIONAL',
  'tc': '    PROFESSIONAL',
},
{
  'en': 'OTHER PROFESSIONAL',
  'tc': 'OTHER PROFESSIONAL',
},
{
  'en': 'EDUCATOR',
  'tc': 'EDUCATOR',
},
{
  'en': 'GVT-NON-OFFR/CLERK',
  'tc': 'GVT-NON-OFFR/CLERK',
},
{
  'en': 'GVT-NON-OFFR/D-FORCE',
  'tc': 'GVT-NON-OFFR/D-FORCE',
},
{
  'en': 'GVT-OFFR',
  'tc': 'GVT-OFFR',
},
{
  'en': 'GVT-INSP ABV/D-FORCE',
  'tc': 'GVT-INSP ABV/D-FORCE',
},
{
  'en': 'GVT-WORKMAN',
  'tc': 'GVT-WORKMAN',
},
{
  'en': 'WHITE COLLAR SUPERV',
  'tc': 'WHITE COLLAR SUPERV',
},
{
  'en': 'MANAGER',
  'tc': 'MANAGER',
},
{
  'en': 'SENIOR MANAGER',
  'tc': 'SENIOR MANAGER',
},
{
  'en': 'DIRECTOR/GM',
  'tc': 'DIRECTOR/GM',
},
{
  'en': 'CLERK',
  'tc': 'CLERK',
},
{
  'en': 'SECRETARY',
  'tc': 'SECRETARY',
},
{
  'en': 'TELEPHONE OPERATOR',
  'tc': 'TELEPHONE OPERATOR',
},
{
  'en': 'WRITER/LIBRARIAN',
  'tc': 'WRITER/LIBRARIAN',
},
{
  'en': 'INSURANCE AGENT',
  'tc': 'INSURANCE AGENT',
},
{
  'en': 'REAL ESTATE AGENT',
  'tc': 'REAL ESTATE AGENT',
},
{
  'en': 'SUPERV-RETAIL STORE',
  'tc': 'SUPERV-RETAIL STORE',
},
{
  'en': 'SALES EXEC/MERCHAND',
  'tc': 'SALES EXEC/MERCHAND',
},
{
  'en': 'SR SALES EXECUTIVE',
  'tc': 'SR SALES EXECUTIVE',
},
{
  'en': 'BROKER',
  'tc': 'BROKER',
},
{
  'en': 'COOK',
  'tc': 'COOK',
},
{
  'en': 'REST/HTL SER ATTND\'T',
  'tc': 'REST/HTL SER ATTND\'T',
},
{
  'en': 'ENTERTAINMENT PR',
  'tc': 'ENTERTAINMENT PR',
},
{
  'en': 'DRIVER',
  'tc': 'DRIVER',
},
{
  'en': 'NON-DRIVER ASST',
  'tc': 'NON-DRIVER ASST',
},
{
  'en': 'DELIVERY WORKER',
  'tc': 'DELIVERY WORKER',
},
{
  'en': 'FLIGHT ATTENDANT',
  'tc': 'FLIGHT ATTENDANT',
},
{
  'en': 'MASS MEDIA',
  'tc': 'MASS MEDIA',
},
{
  'en': 'SAILOR',
  'tc': 'SAILOR',
},
{
  'en': 'TOURIST GUIDE',
  'tc': 'TOURIST GUIDE',
},
{
  'en': 'CLEANER',
  'tc': 'CLEANER',
},
{
  'en': 'FACTORY WORKER',
  'tc': 'FACTORY WORKER',
},
{
  'en': 'SECURITY GUARD',
  'tc': 'SECURITY GUARD',
},
{
  'en': 'WAREHOUSE ASST',
  'tc': 'WAREHOUSE ASST',
},
{
  'en': 'HAIR STYLIST',
  'tc': 'HAIR STYLIST',
},
{
  'en': 'PRIVATE TUTOR',
  'tc': 'PRIVATE TUTOR',
},
{
  'en': 'ARTIST/DESIGNER',
  'tc': 'ARTIST/DESIGNER',
},
{
  'en': 'SERVICE TECHNICIAN',
  'tc': 'SERVICE TECHNICIAN',
},
{
  'en': 'NURSERY',
  'tc': 'NURSERY',
},
{
  'en': 'SOCIAL/WELFARE WORK',
  'tc': 'SOCIAL/WELFARE WORK',
},
{
  'en': 'LABORATORY ASST',
  'tc': 'LABORATORY ASST',
},
{
  'en': 'FAMILY BUSINESS',
  'tc': 'FAMILY BUSINESS',
},
{
  'en': 'BEAUTICIAN',
  'tc': 'BEAUTICIAN',
},
{
  'en': 'SELF-EMPLOYED',
  'tc': 'SELF-EMPLOYED',
},
{
  'en': 'NON-SALARIED',
  'tc': 'NON-SALARIED',
},
{
  'en': 'OTHERS',
  'tc': 'OTHERS',
},
{
  'en': 'OFFICER',
  'tc': 'OFFICER',
},
{
  'en': 'SUPERVISOR',
  'tc': 'SUPERVISOR',
},
{
  'en': 'PURCHASER',
  'tc': 'PURCHASER',
},
{
  'en': 'OWNER/PARTNER',
  'tc': 'OWNER/PARTNER',
},
{
  'en': 'OPERATOR',
  'tc': 'OPERATOR',
},
{
  'en': 'NURSE',
  'tc': 'NURSE',
},
{
  'en': 'PILOT',
  'tc': 'PILOT',
},
{
  'en': 'SOLE-PROPRIETOR',
  'tc': 'SOLE-PROPRIETOR',
},
{
  'en': 'MISSING',
  'tc': 'MISSING',
},

];

var serviceHTML = '<div class="input input--checkbox">'+
              '<div class="input__item input--checkbox__item ">'+
              '<input id="serviceID" name="serviceID" type="checkbox" class="input__input input--checkbox__input service__input serviceID serviceID">'+
              '<label for="serviceID" class="input__label input--checkbox__label input--checkbox__label--vertical-middle">serviceContent</label>'+
              '</div>'+
              '<p class="input__error input--checkbox__error small"></p>'+
          '</div>';

var stepSlideText = {
    pagination: {
        'en': 'Step {{current}} of {{total}}',
        'tc': 'Step {{current}} of {{total}}'
    }
};

/* ==================================
=            userData            =
==================================*/

window.userData = {

};

/* =====  End of userData  ======*/
