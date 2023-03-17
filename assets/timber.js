!function(t){var e=-1,a=-1,o=function(t){return parseFloat(t)||0},i=function(e){var a=t(e),i=null,n=[];return a.each(function(){var e=t(this),a=e.offset().top-o(e.css("margin-top")),r=n.length>0?n[n.length-1]:null;null===r?n.push(e):Math.floor(Math.abs(i-a))<=1?n[n.length-1]=r.add(e):n.push(e),i=a}),n},n=function(e){var a={byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(a,e):("boolean"==typeof e?a.byRow=e:"remove"===e&&(a.remove=!0),a)},r=t.fn.matchHeight=function(e){var a=n(e);if(a.remove){var o=this;return this.css(a.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(o)}),this}return this.length<=1&&!a.target?this:(r._groups.push({elements:this,options:a}),r._apply(this,a),this)};r.version="master",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,r._afterUpdate=null,r._rows=i,r._parse=o,r._parseOptions=n,r._apply=function(e,a){var s=n(a),h=t(e),c=[h],l=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block"),e.data("style-cache",e.attr("style")),e.css({display:a,"padding-top":"0","padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),c=i(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(c,function(e,a){var i=t(a),n=0;if(s.target)n=s.target.outerHeight(!1);else{if(s.byRow&&i.length<=1)return void i.css(s.property,"");i.each(function(){var e=t(this),a=e.css("display");"inline-block"!==a&&"inline-flex"!==a&&(a="block");var o={display:a};o[s.property]="",e.css(o),e.outerHeight(!1)>n&&(n=e.outerHeight(!1)),e.css("display","")})}i.each(function(){var e=t(this),a=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(a+=o(e.css("border-top-width"))+o(e.css("border-bottom-width")),a+=o(e.css("padding-top"))+o(e.css("padding-bottom"))),e.css(s.property,n-a+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){var e={};t("[data-match-height], [data-mh]").each(function(){var a=t(this),o=a.attr("data-mh")||a.attr("data-match-height");e[o]=o in e?e[o].add(a):a}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(o,i){if(i&&"resize"===i.type){var n=t(window).width();if(n===e)return;e=n}o?-1===a&&(a=setTimeout(function(){s(i),a=-1},r._throttle)):s(i)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})}(jQuery);

if ((typeof Shopify) === 'undefined') { Shopify = {}; }
if (!Shopify.formatMoney) {
    Shopify.formatMoney = function(cents, format) {
        var value = '',
            placeholderRegex = /\{\{\s*(\w+)\s*\}\}/,
            formatString = (format || this.money_format);

        if (typeof cents == 'string') {
            cents = cents.replace('.','');
        }

        function defaultOption(opt, def) {
            return (typeof opt == 'undefined' ? def : opt);
        }

        function formatWithDelimiters(number, precision, thousands, decimal) {
            precision = defaultOption(precision, 2);
            thousands = defaultOption(thousands, ',');
            decimal   = defaultOption(decimal, '.');

            if (isNaN(number) || number == null) {
                return 0;
            }

            number = (number/100.0).toFixed(precision);

            var parts   = number.split('.'),
                dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
                cents   = parts[1] ? (decimal + parts[1]) : '';

            return dollars + cents;
        }
        if(formatString != undefined) {
            switch(formatString.match(placeholderRegex)[1]) {
                case 'amount':
                    value = formatWithDelimiters(cents, 2);
                    break;
                case 'amount_no_decimals':
                    value = formatWithDelimiters(cents, 0);
                    break;
                case 'amount_with_comma_separator':
                    value = formatWithDelimiters(cents, 2, '.', ',');
                    break;
                case 'amount_no_decimals_with_comma_separator':
                    value = formatWithDelimiters(cents, 0, '.', ',');
                    break;
            }

            return formatString.replace(placeholderRegex, value);
        } else {
            return cents;
        }
    };
}

if (!Shopify.resizeImage) {
    Shopify.resizeImage=function(e,t){
        try{
            if("original"==t)
                return e;
            var n = e.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
            return n[1]+"_"+t+"."+n[2]
        } catch(r) {
            return e;
        }
    }
}

// Timber functions
window.timber = window.timber || {};

timber.cacheSelectors = function () {
    timber.cache = {
        // General
        $html                    : $('html'),
        $body                    : $(document.body),

        // Navigation
        $navigation              : $('#AccessibleNav'),
        $mobileSubNavToggle      : $('.mobile-nav__toggle'),

        // Collection Pages
        $changeView              : $('.change-view'),

        // Product Page
        $productImage            : $('#ProductPhotoImg'),
        $thumbImages             : $('#ProductThumbs').find('a.product-single__thumbnail'),

        // Customer Pages
        $recoverPasswordLink     : $('#RecoverPassword'),
        $hideRecoverPasswordLink : $('#HideRecoverPasswordLink'),
        $recoverPasswordForm     : $('#RecoverPasswordForm'),
        $customerLoginForm       : $('#CustomerLoginForm'),
        $passwordResetSuccess    : $('#ResetSuccess')
    };
};

timber.init = function () {
    FastClick.attach(document.body);
    timber.cacheSelectors();
    timber.accessibleNav();
    timber.drawersInit();
    timber.mobileNavToggle();
    //timber.productImageSwitch();
    timber.responsiveVideos();
    timber.collectionViews();
    timber.loginForms();
};

timber.accessibleNav = function () {
    var $nav = timber.cache.$navigation,
        $allLinks = $nav.find('a'),
        $topLevel = $nav.children('li').find('a'),
        $parents = $nav.find('.site-nav--has-dropdown'),
        $subMenuLinks = $nav.find('.site-nav__dropdown').find('a'),
        activeClass = 'nav-hover',
        focusClass = 'nav-focus';

    // Mouseenter
    if ($(window).width() > 1024) {
        $parents.on('mouseenter touchstart', function(evt) {
            var $el = $(this);

            if (!$el.hasClass(activeClass)) {
                evt.preventDefault();
            }

            showDropdown($el);
        });

        // Mouseout
        $parents.on('mouseleave', function() {
            hideDropdown($(this));
        });

    }

    $subMenuLinks.on('touchstart', function(evt) {
        // Prevent touchstart on body from firing instead of link
        evt.stopImmediatePropagation();
    });

    $allLinks.focus(function() {
        handleFocus($(this));
    });

    $allLinks.blur(function() {
        removeFocus($topLevel);
    });

    // accessibleNav private methods
    function handleFocus ($el) {
        var $subMenu = $el.next('ul'),
            hasSubMenu = $subMenu.hasClass('sub-nav') ? true : false,
            isSubItem = $('.site-nav__dropdown').has($el).length,
            $newFocus = null;

        // Add focus class for top level items, or keep menu shown
        if (!isSubItem) {
            removeFocus($topLevel);
            addFocus($el);
        } else {
            $newFocus = $el.closest('.site-nav--has-dropdown').find('a');
            addFocus($newFocus);
        }
    }

    function showDropdown ($el) {
        $el.addClass(activeClass);

        setTimeout(function() {
            timber.cache.$body.on('touchstart', function() {
                hideDropdown($el);
            });
        }, 250);
    }

    function hideDropdown ($el) {
        $el.removeClass(activeClass);
        timber.cache.$body.off('touchstart');
    }

    function addFocus ($el) {
        $el.addClass(focusClass);
    }

    function removeFocus ($el) {
        $el.removeClass(focusClass);
    }
};

timber.drawersInit = function () {
    timber.LeftDrawer = new timber.Drawers('NavDrawer', 'left');

    timber.RightDrawer = new timber.Drawers('CartDrawer', 'right', {
        'onDrawerOpen': ajaxCart.load
    });

};

timber.mobileNavToggle = function () {
    timber.cache.$mobileSubNavToggle.on('click', function() {
        $(this).parent().toggleClass('mobile-nav--expanded');
    });
};

timber.getHash = function () {
    return window.location.hash;
};

timber.productPage = function (options) {
    var variant = options.variant,
        selector = options.selector,
        product_id = options.product_id;

    var moneyFormat = Currency.moneyFormats[Currency.shopCurrency][Currency.format || "money_with_currency_format"];

    var $productImage = $('#AddToCartForm--'+product_id+' #ProductPhotoImg'),
        $addToCart = $('#AddToCartForm--'+product_id+' #AddToCart'),
        $productPrice = $('#AddToCartForm--'+product_id+' #ProductPrice'),
        $variantNotifyMe = $('#variantNotifyMe'),
        $estimator = $('.estimater'),
        $addtocartbuttondiv = $('.addtocart--button'),
        $productPrice2 = $('#proprice'),
        $comparePrice = $('#AddToCartForm--'+product_id+' #ComparePrice'),
        $comparePrice2 = $('#propricecompare'),
        $comparePriceClass = $('#AddToCartForm--'+product_id+' .ComparePrice'),
        $youSave = $('#AddToCartForm--'+product_id+' #YouSave'),
        $quantityElements = $('#AddToCartForm--'+product_id+' .quantity-selector, #AddToCartForm--'+product_id+' .js-qty'),
        $addToCartText = $('#AddToCartForm--'+product_id+' #AddToCartText');
    $AddToCartTextfree = $('#AddToCartForm--'+product_id+' #AddToCartTextfree');
    $addToCartTextPopup = $('#quick-view #AddToCartForm--'+product_id+' #AddToCartText');
    $addToCartTextProduct = $('.template-product #AddToCartForm--'+product_id+' #AddToCartText');

    if (variant) {
        if (variant.featured_image) {
            var newImg = variant.featured_image,
                el = $productImage[0];
            Shopify.Image.switchImage(newImg, el, timber.switchImage);
            variant_id = variant.id;
            var variant_img = $('#productSelect--'+product_id).find('option[value="'+variant_id+'"]').data('image');
            $("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").trigger('click');

            setTimeout(function(){
                var li = $("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").parent('li');
                var clickindex = $("#bx-pager-"+product_id+" li").index(li);
                if($("#bx-pager-"+product_id).find('img[data-ver="'+variant_img+'"]').parent("a").hasClass('active') && !$(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').hasClass('active')){
                    if($(li).is(':last-child') && !$(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').hasClass('active')){
                        $(li).parent('ul').parent('div').parent('div').children('.bx-controls').children('.bx-pager').children().last().children('a').trigger('click');
                    } else {
                        $(li).parent('ul').parent('div').parent('div').children('.bx-controls').find('a[data-slide-index="'+clickindex+'"]').trigger('click');
                    }
                }
            }, 100);
        }

        $productPrice.html("<span class='money'>" + Shopify.formatMoney(variant.price, moneyFormat) + "</span>");
        $productPrice2.html("<span class='money'>" + Shopify.formatMoney(variant.price, moneyFormat) + "</span>");

        if (variant.available) {
            $variantNotifyMe.hide();
            $estimator.show();
            $addtocartbuttondiv.show();
            $addToCart.removeClass('disabled').prop('disabled', false);
            $('.mobile-fix-add-card .sold-out-tooltip').removeClass('sold-out-tooltip--show');
            $('.mobiletacbutton').removeClass('disabled').prop('disabled', false);
            
            $addToCartText.html('Add to Cart');
            
            
            $AddToCartTextfree.html('BUY NOW & SHIPS FREE');
            
            
            if (variant.compare_at_price > variant.price) {
                $comparePrice.html("<span class='money'>" + Shopify.formatMoney(variant.compare_at_price, moneyFormat) + "</span>").show();
                $comparePrice2.html("<span class='money'>" + Shopify.formatMoney(variant.compare_at_price, moneyFormat) + "</span>").show();
                $comparePriceClass.show();
                
                var per = ((variant.compare_at_price - variant.price) * 100) / variant.compare_at_price;
                $youSave.html('You Save: <b id="save_value-'+product_id+'"><span class="money">'+Shopify.formatMoney((variant.compare_at_price - variant.price), moneyFormat)+'</span> ('+ per.toFixed(0) +'%)</b>').show();
                
            } else {
                $comparePrice.hide();
                $comparePrice2.hide();
                $comparePriceClass.hide();
                
                $youSave.hide();
                
            }
        } else {
            $addToCart.addClass('disabled').prop('disabled', true);
            $variantNotifyMe.show();
            $('.mobile-fix-add-card .sold-out-tooltip').addClass('sold-out-tooltip--show');
            $('.mobiletacbutton').addClass('disabled').prop('disabled', true);
            $estimator.hide();
            $addtocartbuttondiv.hide();
            $addToCartText.html("Sold Out");
            $productPrice.html("Sold Out");
            $productPrice2.html("Sold Out");
            $comparePrice.hide();
            $comparePrice2.hide();
            $comparePriceClass.hide();
            
            $youSave.hide();
            
        }
    } else {
        $comparePrice.hide();
        $comparePrice2.hide();
        $comparePriceClass.hide();
        
        $youSave.hide();
        
        $addToCart.addClass('disabled').prop('disabled', true);
        $variantNotifyMe.show();
        $('.mobile-fix-add-card .sold-out-tooltip').addClass('sold-out-tooltip--show');
        $('.mobiletacbutton').addClass('disabled').prop('disabled', true);
        $estimator.hide();
        $addtocartbuttondiv.hide();
        $addToCartText.html("Sold Out");
        $productPrice.html("Sold Out");
        $productPrice2.html("Sold Out");
    }
    
};

timber.productImageSwitch = function () {
    if (timber.cache.$thumbImages.length) {
        timber.cache.$thumbImages.on('click', function(evt) {
            evt.preventDefault();
            var newImage = $(this).attr('href');
            timber.switchImage(newImage, null, timber.cache.$productImage);
        });
    }
};

timber.switchImage = function (src, imgObject, el) {
    // Make sure element is a jquery object
    var $el = $(el);
    $el.attr('src', src);
};

timber.responsiveVideos = function () {
    var $iframeVideo = $('iframe[src*="youtube.com/embed"], iframe[src*="player.vimeo"]');
    var $iframeReset = $iframeVideo.add('iframe#admin_bar_iframe');

    $iframeVideo.each(function () {
        // Add wrapper to make video responsive
        $(this).wrap('<div class="video-wrapper"></div>');
    });

    $iframeReset.each(function () {
        // Re-set the src attribute on each iframe after page load
        // for Chrome's "incorrect iFrame content on 'back'" bug.
        // https://code.google.com/p/chromium/issues/detail?id=395791
        // Need to specifically target video and admin bar
        this.src = this.src;
    });
};

timber.collectionViews = function () {
    if (timber.cache.$changeView.length) {
        timber.cache.$changeView.on('click', function() {
            var view = $(this).data('view'),
                url = document.URL,
                hasParams = url.indexOf('?') > -1;

            if (hasParams) {
                window.location = replaceUrlParam(url, 'view', view);
            } else {
                window.location = url + '?view=' + view;
            }
        });
    }
};

timber.loginForms = function() {
    function showRecoverPasswordForm() {
        timber.cache.$recoverPasswordForm.show();
        timber.cache.$customerLoginForm.hide();
    }

    function hideRecoverPasswordForm() {
        timber.cache.$recoverPasswordForm.hide();
        timber.cache.$customerLoginForm.show();
    }

    timber.cache.$recoverPasswordLink.on('click', function(evt) {
        evt.preventDefault();
        showRecoverPasswordForm();
    });

    timber.cache.$hideRecoverPasswordLink.on('click', function(evt) {
        evt.preventDefault();
        hideRecoverPasswordForm();
    });

    // Allow deep linking to recover password form
    if (timber.getHash() == '#recover') {
        showRecoverPasswordForm();
    }
};

timber.bodySaveBar = function() {
    if(!$('body').hasClass('saveBarDisplay')) {
        $('body').addClass('saveBarDisplay');

    }
};

timber.resetPasswordSuccess = function() {
    timber.cache.$passwordResetSuccess.show();
};



/*============================================================================
  Drawer modules
  - Docs http://shopify.github.io/Timber/#drawers
==============================================================================*/
timber.Drawers = (function () {
    var Drawer = function (id, position, options) {
        var defaults = {
            close: '.js-drawer-close',
            open: '.js-drawer-open-' + position,
            openClass: 'js-drawer-open',
            dirOpenClass: 'js-drawer-open-' + position
        };

        this.$nodes = {
            parent: $('body, html'),
            page: $('#PageContainer'),
            moved: $('.is-moved-by-drawer')
        };

        this.config = $.extend(defaults, options);
        this.position = position;

        this.$drawer = $('#' + id);

        if (!this.$drawer.length) {
            return false;
        }

        this.drawerIsOpen = false;
        this.init();
    };

    Drawer.prototype.init = function () {
        $(this.config.open).on('click', $.proxy(this.open, this));
        this.$drawer.find(this.config.close).on('click', $.proxy(this.close, this));
    };

    Drawer.prototype.open = function (evt) {
        // Keep track if drawer was opened from a click, or called by another function
        var externalCall = false;

        // Prevent following href if link is clicked
        if (evt) {
            evt.preventDefault();
        } else {
            externalCall = true;
        }

        // Without this, the drawer opens, the click event bubbles up to $nodes.page
        // which closes the drawer.
        if (evt && evt.stopPropagation) {
            evt.stopPropagation();
            // save the source of the click, we'll focus to this on close
            this.$activeSource = $(evt.currentTarget);
        }

        if (this.drawerIsOpen && !externalCall) {
            return this.close();
        }

        // Notify the drawer is going to open
        timber.cache.$body.trigger('beforeDrawerOpen.timber', this);

        // Add is-transitioning class to moved elements on open so drawer can have
        // transition for close animation
        this.$nodes.moved.addClass('is-transitioning');
        this.$drawer.prepareTransition();

        this.$nodes.parent.addClass(this.config.openClass + ' ' + this.config.dirOpenClass);
        this.drawerIsOpen = true;

        // Set focus on drawer
        this.trapFocus(this.$drawer, 'drawer_focus');

        // Run function when draw opens if set
        if (this.config.onDrawerOpen && typeof(this.config.onDrawerOpen) == 'function') {
            if (!externalCall) {
                this.config.onDrawerOpen();
            }
        }

        if (this.$activeSource && this.$activeSource.attr('aria-expanded')) {
            this.$activeSource.attr('aria-expanded', 'true');
        }

        // Lock scrolling on mobile
        this.$nodes.page.on('touchmove.drawer', function () {
            return false;
        });

        this.$nodes.page.on('click.drawer touchend.drawer', $.proxy(function () {
            this.close();
            return false;
        }, this));

        // Notify the drawer has opened
        timber.cache.$body.trigger('afterDrawerOpen.timber', this);
    };

    Drawer.prototype.close = function () {
        if (!this.drawerIsOpen) { // don't close a closed drawer
            return;
        }

        // Notify the drawer is going to close
        timber.cache.$body.trigger('beforeDrawerClose.timber', this);

        // deselect any focused form elements
        $(document.activeElement).trigger('blur');

        // Ensure closing transition is applied to moved elements, like the nav
        this.$nodes.moved.prepareTransition({ disableExisting: true });
        this.$drawer.prepareTransition({ disableExisting: true });

        this.$nodes.parent.removeClass(this.config.dirOpenClass + ' ' + this.config.openClass);

        this.drawerIsOpen = false;

        // Remove focus on drawer
        this.removeTrapFocus(this.$drawer, 'drawer_focus');

        this.$nodes.page.off('.drawer');

        // Notify the drawer is closed now
        timber.cache.$body.trigger('afterDrawerClose.timber', this);
    };

    Drawer.prototype.trapFocus = function ($container, eventNamespace) {
        var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

        $container.attr('tabindex', '-1');

        $container.focus();

        $(document).on(eventName, function (evt) {
            if ($container[0] !== evt.target && !$container.has(evt.target).length) {
                $container.focus();
            }
        });
    };

    Drawer.prototype.removeTrapFocus = function ($container, eventNamespace) {
        var eventName = eventNamespace ? 'focusin.' + eventNamespace : 'focusin';

        $container.removeAttr('tabindex');
        $(document).off(eventName);
    };

    return Drawer;
})();

function addEvent(obj, evt, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(evt, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, fn);
    }
}

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

function timezone() {
    var offset = new Date().getTimezoneOffset();
    var minutes = Math.abs(offset);
    var hours = Math.floor(minutes / 60);
    var prefix = offset < 0 ? "" : "-";
    return prefix+hours;
}

$('#goToReview').click(function(e){
    e.preventDefault();
    if($(window).width() > 767){
        $('a[href="#tabs-6"]').trigger('click');
        var topScroll = $("#tabs-6").offset().top - 300;
        $('html, body').animate({
            scrollTop: (topScroll)
        }, 1500);
    } else {
        if(!$('a[href="#collapse6"]').hasClass('panelactive')){
            $('a[href="#collapse6"]').trigger('click');
        }
        var topScroll = $("#collapse6").offset().top - 200;
        $('html, body').animate({
            scrollTop: (topScroll)
        }, 1500);
    }
});

$('.mobile-nav__toggle-open-slide').click(function(e){
    e.preventDefault();
    var id = $(this).data('id');
    $(id).css('display', 'block');
    $(this).parent('div').parent('div').parent('li').parent('ul').css('left', '-100%').css('display', 'none');
    $(id).animate({
        left: "0"
    }, 4, function() {
        $(id).css('position', 'relative').css('display', 'block');
    });
});

$('.mobile-nav__toggle-open-slide_a').click(function(e){
    e.preventDefault();
    var id = $(this).data('id');
    $(id).css('display', 'block');
    $(this).parent('div').parent('li').parent('ul').css('left', '-100%').css('display', 'none');
    $(id).animate({
        left: "0"
    }, 4, function() {
        $(id).css('position', 'relative').css('display', 'block');
    });
});

$('.mobile-nav__toggle-slide.open-parent, .mobile-nav__link.open-parent').click(function(e){
    e.preventDefault();
    var id = $(this).parent('div').find('.mobile-nav__toggle-open-parent').data('id');
    $(id).css('display', 'block');
    $(this).parent('div').parent('li').parent('ul').css('left', '100%').css('display', 'none');
    $(id).animate({
        left: "0"
    }, 4, function() {
        $(id).css('position', 'relative').css('display', 'block');
    });
});

timber.bxSliderApply = function (options) {
    $(".product--images").css('visibility', 'visible');
    $(".product-single").css('visibility', 'visible');

    if(options.total_images > 1) {
        $('.product-single__photos').imagesLoaded( function() {
            
            $('#bxslider-id-'+options.product_id).bxSlider({
                pagerCustom: '#bx-pager-'+options.product_id,
                infiniteLoop: false,
                touchEnabled: false,
                adaptiveHeight: true,
                onSlideAfter : function () {
                    /*
                    let images = jQuery('.product--images'), info = jQuery('.main-prod-desc'), bk = jQuery('div.rela ');

                    if (images.height() < info.height() && jQuery(window).width() > 992 && $('.scroll-spacer').length === 0) {
                        images.scrollToFixed({
                            marginTop: parseInt($('main.main-content').css('margin-top')),
                            limit: jQuery('.description--tabs').offset().top - images.height() - 50,
                            spacerClass: 'scroll-spacer'
                        });
                        bk.scrollToFixed({
                            marginTop: parseInt($('main.main-content').css('margin-top')) - 20,
                            limit: jQuery('.description--tabs').offset().top - images.height() - 60,

                        });

                    }*/
                }
            });
        });


        //alert(options.offset);
        if(options.total_images > 0) {
            
            
            if($(window).width() > 767) {
                $('#bx-pager-'+options.product_id).bxSlider({

                    mode: 'vertical',
                    infiniteLoop: false,
                    slideWidth: 118,
                    slideMargin: 5,
                    minSlides: 4,
                    maxSlides: 4,
                    moveSlides: 1
                });
            }
            else{
                $('#bx-pager-'+options.product_id).bxSlider({

                    mode: 'vertical',
                    infiniteLoop: false,
                    slideWidth: 118,
                    slideMargin: 5,
                    minSlides: 3,
                    maxSlides: 3,
                    moveSlides: 1
                });
            }
            
            $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-prev').on('click', function(e){
                e.preventDefault();
                var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
                if($(currentLi).prev("li").length > 0) {
                    $(currentLi).prev("li").children('a').children('img').trigger('click');
                }
                return false;
            });
            $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-next').on('click', function(e){
                e.preventDefault();
                var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
                if($(currentLi).next("li").length > 0) {
                    $(currentLi).next("li").children('a').children('img').trigger('click');
                }
                return false;
            });

            
        }
    }
};
var slider, slider1;
timber.bxSliderApplyQuickView = function (options) {
    $(".product--images").css('visibility', 'visible');
    $(".product-single").css('visibility', 'visible');

    if(options.total_images > 1) {
        slider = $('#bxslider-id-'+options.product_id).bxSlider({
            pagerCustom: '#bx-pager-'+options.product_id,
            infiniteLoop: false,
            touchEnabled: false,
            adaptiveHeight: true
        });

        if(options.total_images > options.offset) {
            
            slider1 = $('#bx-pager-'+options.product_id).bxSlider({
                infiniteLoop: false,
                slideWidth: 80,
                slideMargin: 10,
                minSlides: 2,
                maxSlides: 2,
                moveSlides: 1
            });
            $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-prev').on('click', function(e){
                e.preventDefault();
                var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
                if($(currentLi).prev("li").length > 0) {
                    $(currentLi).prev("li").children('a').children('img').trigger('click');
                }
                return false;
            });
            $('#bx-pager-'+options.product_id).parent('div').parent('div').find('.bx-controls-direction .bx-next').on('click', function(e){
                e.preventDefault();
                var currentLi = $(this).parent('div').parent('div').parent('div').children('.bx-viewport').find('a.active').parent('li');
                if($(currentLi).next("li").length > 0) {
                    $(currentLi).next("li").children('a').children('img').trigger('click');
                }
                return false;
            });
            
        }
    }
};

timber.sliderClickCallback = function () {
    $('.product-single__thumbnail img').click(function(e){
        e.preventDefault();
        var variant_img = $(this).data('ver');
        var product_id = $(this).parent('a').parent('li').parent('ul').data('product');
        if($("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").val() !== undefined && $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").attr("disabled") === undefined){
            var option1 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option1');
            var option2 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option2');
            var option3 = $("#productSelect--"+product_id+" option[data-image='"+variant_img+"']").data('option3');
            
            setTimeout(function(){
                var op1 = op2 = op3 = false;
                if(option1 !== ""){
                    var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option1']").val();
                    if(currentValue !== option1){
                        op1 = true;
                        $("#AddToCartForm--"+product_id).find("select[data-option='option1']").val(option1);
                    }
                }
                if(option2 !== ""){
                    var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option2']").val();
                    if(currentValue !== option2){
                        op2 = true;
                        $("#AddToCartForm--"+product_id).find("select[data-option='option2']").val(option2);
                    }
                }
                if(option3 !== ""){
                    var currentValue = $("#AddToCartForm--"+product_id).find("select[data-option='option3']").val();
                    if(currentValue !== option3){
                        op3 = true;
                        $("#AddToCartForm--"+product_id).find("select[data-option='option3']").val(option3);
                    }
                }
                if(op3) {
                    $("#AddToCartForm--"+product_id).find("select[data-option='option3']").change();
                    if ($('.stickyform').length) {
                        $(".stickyform").find("select[data-option='option3']").val(option3).change();
                    }
                }
                if(op2) {
                    $("#AddToCartForm--"+product_id).find("select[data-option='option2']").change();
                    if ($('.stickyform').length) {
                        $(".stickyform").find("select[data-option='option2']").val(option2).change();
                    }
                }
                if(op1) {
                    $("#AddToCartForm--"+product_id).find("select[data-option='option1']").change();
                    if ($('.stickyform').length) {
                        $(".stickyform").find("select[data-option='option1']").val(option1).change();
                    }
                }
            }, 200);
            
        }
    });
};

timber.qtySelectors = function() {
    var numInputs = $('input[type="number"]');

    if (numInputs.length) {
        numInputs.each(function() {
            var $el = $(this),
                currentQty = $el.val(),
                inputName = $el.attr('name'),
                inputId = $el.attr('id');

            var itemAdd = currentQty + 1,
                itemMinus = currentQty - 1,
                itemQty = currentQty;

            var source   = $("#JsQty").html(),
                template = Handlebars.compile(source),
                data = {
                    key: $el.data('id'),
                    itemQty: itemQty,
                    itemAdd: itemAdd,
                    itemMinus: itemMinus,
                    inputName: inputName,
                    inputId: inputId
                };
            $el.after(template(data)).remove();
        });

        $('.js-qty__adjust').on('click', function() {
            var $el = $(this),
                id = $el.data('id'),
                $qtySelector = $el.siblings('.js-qty__num'),
                qty = parseInt($qtySelector.val().replace(/\D/g, ''));

            if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {

            } else {
                qty = 1;
            }

            if ($el.hasClass('js-qty__adjust--plus')) {
                qty += 1;
            } else {
                qty -= 1;
                if (qty <= 1) qty = 1;
            }

            $qtySelector.val(qty);
        });
    }
};

timber.swatchChange = function () {
    $('.swatch :radio').change(function() {
        var optionIndex = $(this).closest('.swatch').attr('data-option-index');
        var optionValue = $(this).val();

        $(this).closest('form').find('.single-option-selector').eq(optionIndex).val(optionValue).trigger('change');

        if ($('.stickyform').length) {
            var indexI = 1;

            $(this).closest('form').find('.single-option-selector').each(function() {
                var indexV = $(this).val();
                var index = indexI - 1;

                if (!indexV) {
                    var checkedSwatch = $(`.product--option[data-option-index="${index}"] input[id^="swatch-${index}"]:checked`);
                    var checkedElement = checkedSwatch.closest(".swatch-element");
                    var checkedElementValue = checkedElement.data("value");
                    
                    if (checkedElementValue) {
                        indexV = checkedElementValue;
                    } else {
                        var firstSoldoutElement = $(`.product--option[data-option-index="${index}"] .swatch-element.soldout`).first();
                        var firstSoldoutElementValue = firstSoldoutElement.data("value");

                        indexV = firstSoldoutElementValue;
                    }
                }

                $(".stickyform").find("select[data-option='option"+(parseInt(indexI))+"']").val(indexV).trigger('change');

                indexI++;
            });
        }
    });
};



timber.progressStriped = function () {
    
    $('.progress.progress-striped').each(function () {

        var $this = $(this),
            pct = $this.data('per');

        bgwidth = function () {


            pct = parseInt(pct);


            if (pct >= 100) {
                pct = 100;
            }
            if (pct < 0) {
                pct = 0;
            }
            if (pct <= 25) {
                $this.find('.progress-bar').addClass('progress-bar-danger');
            }


            if (pct > 1) {
                pct = pct - 1;

                $this.find('.progress-bar').css('width', pct + '%');

                $this.attr('data-per', pct);
                setTimeout(function () {
                    bgwidth();
                }, 1800000);
            }

        }

        bgwidth();

    });
    
};

timber.fancybox = function () {
    if ($('.fancybox').length) {
        if($(window).width() > 767) {
            $('.fancybox').fancybox();
            $('body').on('click', '.glass', function(){
                var data_index = $('.product-single__thumbnails').find('.active').data('slide-index');
                $(".product-single__photos a[data-index-slide='" + data_index + "']").trigger('click');
            });
        } else {
            $('.fancybox').click(function(e) {
                e.preventDefault();
            });
            $(document).ready(function(){
                $('.fancyboxmobile').fancybox();
            });
        }
    }
};

timber.stopSelling = function (options) {
    if (options.action == "text") {
        $('#countdown-timer-'+options.product_id+' .header').html("");
        $('#countdown-timer-'+options.product_id+' .countdown').remove();
    }
};

timber.countDownTimerExtend = function (options) {
    if (options.pub - options.now > 0) {
        $('#countdown-timer-'+options.product_id+' .countdown').downCount({
            date: options.pub,
            offset: timezone()
        }, function () {
            timber.stopSelling({
                action: 'text',
                product_id: options.product_id
            });
        });
    } else {
        options.pub.addHours(options.exp);
        timber.countDownTimerExtend({
            now: options.now,
            exp: options.exp,
            pub: options.pub,
            product_id: options.product_id
        });
    }
};

timber.countDownTimer = function (options) {
    if ($('#countdown-timer-'+options.product_id).length) {
        var now = new Date();
        var exp = $('#countdown-timer-'+options.product_id).data('expire');
        var pub = new Date($('#countdown-timer-'+options.product_id).data('published'));
        if (pub - now > 0) {
            $('#countdown-timer-'+options.product_id+' .countdown').downCount({
                date: pub,
                offset: timezone()
            }, function () {
                timber.stopSelling({
                    action: 'text',
                    product_id: options.product_id
                });
            });
        } else {
            pub.addHours(exp);
            timber.countDownTimerExtend({
                now: now,
                exp: exp,
                pub: pub,
                product_id: options.product_id
            });
        }
    }
};

timber.countDownTimerStickyExtend = function (options) {
    var cutoff = $('.sticky_bar_timer').data('cutoff');
    var reset = $('.sticky_bar_timer').data('reset');
    $(window).bind("load", function() {
        if (options.exp - options.now > 0) {
            $('.sticky_bar_timer').downCount({
                date: options.exp,
                offset: timezone()
            }, function () {
                $('.sticky_bar_timer').html("");
            });
            setTimeout(function(){
                $('.sticky_bar').css("visibility", "visible");
            }, 1000);
        } else {
            options.exp.addHours(reset);
            timber.countDownTimerStickyExtend({
                now: options.now,
                exp: options.exp
            });
        }
    });
};

timber.countDownTimerSticky = function (options) {
    if ($('.sticky_bar_timer').length) {
        var now = new Date();
        var exp = now;
        var cutoff = $('.sticky_bar_timer').data('cutoff');
        var reset = $('.sticky_bar_timer').data('reset');
        if(cutoff == 0){
            exp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
        } else {
            exp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours()+cutoff, 0, 0);
        }
        $(window).bind("load", function() {
            if (exp - now > 0) {
                $('.sticky_bar_timer').downCount({
                    date: exp,
                    offset: timezone()
                }, function () {
                    $('.sticky_bar_timer').html("");
                });
                setTimeout(function(){
                    $('.sticky_bar').css("visibility", "visible");
                }, 1000);
            } else {
                if(cutoff == 0){
                    exp.addHours(reset);
                    timber.countDownTimerStickyExtend({
                        now: now,
                        exp: exp
                    });
                } else {
                    $('.sticky_bar_timer').html("");
                }
            }
        });
    }
};

timber.countDownFlipTimer = function (options) {
    if ($('#countdown-timer-'+options.product_id).length) {
        var now = new Date();
        var exp = $('#countdown-timer-'+options.product_id).data('expire');
        var pub = new Date($('#countdown-timer-'+options.product_id).data('published'));
        if (pub - now > 0) {
            var clock = $('#countdown-timer-'+options.product_id).FlipClock(((pub - now) / 1000), {
                countdown: true
            });
        } else {
            pub.addHours(exp);
            timber.countDownFlipTimerExtend({
                now: now,
                exp: exp,
                pub: pub,
                product_id: options.product_id
            });
        }
    }
};

timber.countDownFlipTimerExtend = function (options) {
    if (options.pub - options.now > 0) {
        var clock = $('#countdown-timer-'+options.product_id).FlipClock(((options.pub - options.now) / 1000), {
            countdown: true,
            clockFace: 'DailyCounter'
        });
    } else {
        options.pub.addHours(options.exp);
        timber.countDownFlipTimerExtend({
            now: options.now,
            exp: options.exp,
            pub: options.pub,
            product_id: options.product_id
        });
    }
};

timber.flashSoldBar = function () {
    // Set sold count
    if ($('#TotalSold').length) {
        var minQty = 10;
        var maxQty = 15;
        var minTime = 24;
        var maxTime = 24;
        minQty = Math.ceil(minQty);
        maxQty = Math.floor(maxQty);
        minTime = Math.ceil(minTime);
        maxTime = Math.floor(maxTime);

        var parts = document.location.href.split('/');
        var current_product = parts.pop() || parts.pop();
        // var qty = timber.getCookie('qty'+current_product);
        var qty = null;

        if (qty == null) {
            var qty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
            qty = parseInt(qty);
            if(qty <= minQty){
                qty = minQty;
            }
            if(qty > maxQty){
                qty = maxQty;
            }
        }

        jQuery("#TotalSold").html(qty);
        timber.setCookie('qty'+current_product, qty, 1);

        // Set time
        var time = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
        time = parseInt(time);
        if(time <= minTime){
            time = minTime;
        }
        if(time > maxTime){
            time = maxTime;
        }
        jQuery("#InHours").html(time);
        setInterval(function(){
            $('.flash-fire').fadeIn(function() {
                $(this).css("visibility", "visible");
            }).delay(400).fadeIn(function() {
                $(this).css("visibility", "hidden");
            }).delay(600);
        }, 1000);
    }


    if ($('.TotalSoldd').length) {
        var minQty = 10;
        var maxQty = 15;
        var minTime = 24;
        var maxTime = 24;
        minQty = Math.ceil(minQty);
        maxQty = Math.floor(maxQty);
        minTime = Math.ceil(minTime);
        maxTime = Math.floor(maxTime);


        var parts = document.location.href.split('/');
        var current_product = parts.pop() || parts.pop();


        var qty = timber.getCookie('qty'+current_product);
        if (qty == null) {
            var qty = Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty;
            qty = parseInt(qty);
            if(qty <= minQty){
                qty = minQty;
            }
            if(qty > maxQty){
                qty = maxQty;
            }
        }

        jQuery(".TotalSoldd").html(qty);
        timber.setCookie('qty'+current_product, qty, 1);
        var time = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
        time = parseInt(time);
        if(time <= minTime){
            time = minTime;
        }
        if(time > maxTime){
            time = maxTime;
        }
        jQuery(".InHourss").html(time);
        setInterval(function(){
            $('.flash-fire').fadeIn(function() {
                $(this).css("visibility", "visible");
            }).delay(400).fadeIn(function() {
                $(this).css("visibility", "hidden");
            }).delay(600);
        }, 1000);
    }
    if ($('.flash-fire').length) {
        setInterval(function(){
            $('.flash-fire').fadeIn(function() {
                $(this).css("visibility", "visible");
            }).delay(400).fadeIn(function() {
                $(this).css("visibility", "hidden");
            }).delay(600);
        }, 1000);
    }
};


timber.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
timber.getCookie = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
timber.eraseCookie = function (name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}


timber.soldInverse = function () {
    $('.danger').show();
    if ($('.remaining--text').length) {
        var current = $('.remaining--text').find('.danger').html();
        current = parseInt(current);
        if(current > 1){
            var productleft = $('div.grid div.grid__item.progress--bar div.progress.progress-striped').data('proid');

            // setting cookie of left product
            if (!$.cookie(productleft)){
                console.log('in');
                setTimeout(function(){
                    current = current - 1;
                    $('span.danger').text(current);
                    $.cookie(productleft, current, { expires : 7 });
                }, 8000);
            }else{
                console.log('out');
                var cook = $.cookie(productleft);
                current = cook;
            }
            // end cookie

            $('.remaining--text').find('.danger').html(current);
            setTimeout(function(){
                timber.soldInverse();
            }, 1800000);
        }
        $('div.grid div.grid__item.progress--bar div.progress.progress-striped').attr("data-per",current);
        $('div.grid div.grid__item.progress--bar div.progress.progress-striped div.progress-bar').css("width", current + "%");

    }

}






timber.buildTabs = function (options) {
    $(".tabs").tabs({ active: options.default });
    var ariacontrols = $('.ui-state-active').attr('aria-controls');
    $('#onChangeTrigger').val('#'+ariacontrols);

    $('.ui-tabs-anchor').on('click', function() {
        var ariacontrols = $(this).attr('href');
        var ariacontrolsdrop = $('#onChangeTrigger').val();
        if(ariacontrols !== '#'+ariacontrolsdrop){
            $('#onChangeTrigger').val(ariacontrols);
        }
    });

    $('#onChangeTrigger').on('change', function() {
        var ariacontrols = $(this).val();
        $('a[href="'+ariacontrols+'"]').trigger('click');
    });
};

$(document).ready(function() {
    var slider, canSlide = true;
    slider = $('#homepage_slider').flexslider({
        touch: true,
        smoothHeight: true,
        
        controlNav: false,
        
        directionNav: true,
        
        animation: "fade",
        
        slideshowSpeed: 10*1000,
        before: function(){
            if(!canSlide) {
                slider.flexslider("stop");
            }
        }
    });

    
    $(document)
        .on('shopify:block:select', function(e){

            if ($('.promotion-slider').length) {
                $(".promotion-slider").owlCarousel({
                    items: 1,
                    autoplay: true,
                    autoPlaySpeed: 5000,
                    autoPlayTimeout: 5000,
                    autoplayHoverPause: true,
                    nav:true,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }
        });
    $(document)
        .on('shopify:block:deselect', function(e){

            if ($('.promotion-slider').length) {
                $(".promotion-slider").owlCarousel({
                    items: 1,
                    autoplay: true,
                    autoPlaySpeed: 5000,
                    autoPlayTimeout: 5000,
                    autoplayHoverPause: true,
                    nav:true,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }
        });
    $(document)
        .on('shopify:section:reorder', function(e){
            timber.buildTabs = function (options) {
                $(".tabs").tabs({ active: options.default });
                var ariacontrols = $('.ui-state-active').attr('aria-controls');
                $('#onChangeTrigger').val('#'+ariacontrols);

                $('.ui-tabs-anchor').on('click', function() {
                    var ariacontrols = $(this).attr('href');
                    var ariacontrolsdrop = $('#onChangeTrigger').val();
                    if(ariacontrols !== '#'+ariacontrolsdrop){
                        $('#onChangeTrigger').val(ariacontrols);
                    }
                });

                $('#onChangeTrigger').on('change', function() {
                    var ariacontrols = $(this).val();
                    $('a[href="'+ariacontrols+'"]').trigger('click');
                });
            };
            if ($('.promotion-slider').length) {
                $(".promotion-slider").owlCarousel({
                    items: 1,
                    autoplay: true,
                    autoPlaySpeed: 5000,
                    autoPlayTimeout: 5000,
                    autoplayHoverPause: true,
                    nav:true,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }
        });
    $(document)
        .on('shopify:section:load', function(e){
            timber.buildTabs = function (options) {
                $(".tabs").tabs({ active: options.default });
                var ariacontrols = $('.ui-state-active').attr('aria-controls');
                $('#onChangeTrigger').val('#'+ariacontrols);

                $('.ui-tabs-anchor').on('click', function() {
                    var ariacontrols = $(this).attr('href');
                    var ariacontrolsdrop = $('#onChangeTrigger').val();
                    if(ariacontrols !== '#'+ariacontrolsdrop){
                        $('#onChangeTrigger').val(ariacontrols);
                    }
                });

                $('#onChangeTrigger').on('change', function() {
                    var ariacontrols = $(this).val();
                    $('a[href="'+ariacontrols+'"]').trigger('click');
                });
            };
            if ($('.promotion-slider').length) {
                $(".promotion-slider").owlCarousel({
                    items: 1,
                    autoplay: true,
                    autoPlaySpeed: 5000,
                    autoPlayTimeout: 5000,
                    autoplayHoverPause: true,
                    nav:true,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive: {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        }
                    }
                });
            }
        });

    /***********************Deal of the Day ***************************/
    if ($('.dealproduct').length) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        var today = yyyy+'-'+mm+'-'+dd;
        $('.deal-'+today).addClass('deal-show');
        if($('.deal-show').length == 0){
            $('.deal-of-the-day h2').hide();
        }
        if($('.deal-show').length > 1){
            $(".dealproduct.owl-carousel").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                autoPlaySpeed: 5000,
                autoPlayTimeout: 5000,
                autoplayHoverPause: true,
                nav:true,
                responsive: {
                    0: {
                        items: 1
                    },
                    650: {
                        items: 1
                    },
                    980: {
                        items: 2
                    },
                    1220: {
                        items: 1
                    }
                }
            });
        }else if($('.deal-show').length == 1){
            $('.dealproduct.owl-carousel').css('display','block');
        }

    }
    /***********************END Deal of the Day ***************************/


    if ($('.carousel-product').length) {
        $(".carousel-product").owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            autoPlaySpeed: 5000,
            autoPlayTimeout: 5000,
            autoplayHoverPause: true,
            nav:true,

            navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
            responsive: {
                0: {
                    items: 2,
                    slideBy: 2,
                    stagePadding: 30 
                },
                300:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 35
                },
                350:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 40
                },
                400:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 45
                },
                450:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 50
                },
                500:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 55
                },
                550:{
                    items:2,
                    slideBy: 2,
                    autoplay: false,
                    stagePadding: 60
                },
                600:{
                    items:3,
                    slideBy: 3,
                    autoplay: false,
                    stagePadding: 65
                },
                650:{
                    items:3,
                    slideBy: 3,
                    autoplay: false,
                    stagePadding: 70
                },
                700:{
                    items:3,
                    slideBy: 3,
                    autoplay: false,
                    stagePadding: 75
                },
                750:{
                    items:3,
                    slideBy: 3,
                    autoplay: false,
                    stagePadding: 80
                },
                800:{
                    items:4,
                    slideBy: 4,
                    autoplay: false,
                    stagePadding: 85
                },
                850:{
                    items:4,
                    slideBy: 4,
                    autoplay: false,
                    stagePadding: 90
                },
                900:{
                    items:4,
                    slideBy: 4,
                    autoplay: false,
                    stagePadding: 95
                },
                1220: {
                    items: 5,
                    slideBy: 5
                }
            }
        });
    }

    $('#cartAddPopup').click(function(e){
        e.preventDefault();
        window.location.href = "/cart";
    });

    $('.cart__hover').on('mouseenter', function(e) {
        if ($(window).width() > 767) {
            timber.addtocartPopupClose();
        }
    });

    $('.addCart-popup-close').on('click', function(e) {
        timber.addtocartPopupClose();
    });
});

timber.addtocartPopupClose = function () {
    $("#cartAddPopup").animate({
        top: "-200px"
    }, 500, function() {
        $("#cartAddPopup").css('visibility', 'hidden');
    });
};

timber.modalBox = function () {
    var modal;
    var modalHTML;
    var btn = $("[data-toggle='modal']");
    var close = $("[data-toggle='close-modal']");

    $(btn).click(function(e){
        e.preventDefault();
        modal = $($(this).data('target'));
        if($(window).width() > 767){
            var width = "600px";
        } else {
            var width = "90%";
        }
        $(modal).find('.modal-content').css('width', width);
        $(modal).addClass("in");
        modalHTML = $(this).data('target').replace("#", "");
    });

    $(close).click(function(e){
        e.preventDefault();
        $(modal).removeClass("in");
    });


    window.onclick = function(event) {
        if (event.target.id == modalHTML) {
            $(modal).removeClass("in");
        }
    }
};

timber.modalBoxSize = function () {
    var modal;
    var modalHTML;
    var btn = $("[data-toggle='modal_size']");
    var close = $("[data-toggle='close-modal']");

    $(btn).click(function(e){
        e.preventDefault();
        modal = $($(this).data('target'));
        if($(window).width() > 767){
            var width = "600px";
        } else {
            var width = "90%";
        }
        $(modal).find('.modal-content').css('width', width);
        $(modal).addClass("in");
        modalHTML = $(this).data('target').replace("#", "");
    });

    $(close).click(function(e){
        e.preventDefault();
        $(modal).removeClass("in");
    });

    window.onclick = function(event) {
        if (event.target.id == modalHTML) {
            $(modal).removeClass("in");
        }
    }
};


timber.estimateTimer = function () {
    if ($('#estimateTimer').length) {
        var startTime = new Date();
        var endTime = new Date(startTime.getFullYear()+"/"+(startTime.getMonth()+1)+"/"+startTime.getDate()+' 16:00:00');
        var timer_time = Math.round((endTime - startTime) / 60000);

        var tomorrow = new Date();
        var date_one_days = $('#estimateTimer').parent("b").find(".dateEstimate").data("date");
        //tomorrow.setDate(tomorrow.getDate() + $('#estimateTimer').parent("b").find(".dateEstimate").data("date"));

        if(timer_time <= 0){
            endTime.setDate(endTime.getDate() + 1);
            timer_time = Math.round((endTime - startTime) / 60000);
            tomorrow.setDate(tomorrow.getDate() + 1);
        }

        var excludeDays = "SUN";
        excludeDays = excludeDays.split(" ");
        $.each(excludeDays, function(key, daySingle){
            if(daySingle === "SUN"){
                excludeDays[key] = 0;
            }
            if(daySingle === "MON"){
                excludeDays[key] = 1;
            }
            if(daySingle === "TUE"){
                excludeDays[key] = 2;
            }
            if(daySingle === "WED"){
                excludeDays[key] = 3;
            }
            if(daySingle === "THU"){
                excludeDays[key] = 4;
            }
            if(daySingle === "FRI"){
                excludeDays[key] = 5;
            }
            if(daySingle === "SAT"){
                excludeDays[key] = 6;
            }
        });
        if(excludeDays.length >= 7){
            excludeDays = [];
        }
        var count_one = 0;
        do {
            tomorrow.setDate(tomorrow.getDate() + 1);
            if($.inArray(tomorrow.getDay(), excludeDays) <= -1){
                count_one++;
            }
        } while($.inArray(tomorrow.getDay(), excludeDays) > -1 || count_one < date_one_days);
        var fmt = new DateFmt();
        $(".dateEstimate").html(fmt.format(tomorrow,"%w %n %d"));

        var hours = Math.floor(timer_time / 60);
        var minutes = Math.floor(timer_time % 60);
        var day_wek = fmt.format(tomorrow,"%y") +' '+hours+':'+minutes;
        var countDownDate = new Date(day_wek).getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;

            // Output the result in an element with id="demo"
            document.getElementById("estimateTimer").innerHTML =hours + " hours " + minutes + " minutes";

            // If the count down is over, write some text
            if (distance < 0) {
                clearInterval(x);
                //document.getElementById("estimateTimer").innerHTML = "EXPIRED";
            }
        }, 100);


    }
};
if(window.template != "cart"){
    
    $( window ).scroll(function() {
        var scroll = $(window).scrollTop();
        if($(window).width() > 767){
            
        } else {
            
            if(scroll > 100){
                if(!$('.site-header .nav-bar').hasClass('sticky')){
                    $('.site-header').removeClass('sticky');
                    $('.site-header .nav-bar').addClass('sticky');

                }
            } else {
                $('.site-header').removeClass('sticky');
                $('.site-header .nav-bar').removeClass('sticky');

            }
            if(scroll > 5){
                if(!$('.site-header .nav-bar').hasClass('sticky')){

                    $('.top--line').hide();
                }
            } else {

                $('.top--line').show();
            }
            
        }
    });
    
}

$( window ).resize(function() {
    $('.site-header').removeClass('sticky');
    $('.site-header .nav-bar').removeClass('sticky');
    $('.cart__footer-icon').removeClass('in');
    
});

$( window ).scroll(function() {
    var scroll = $(window).scrollTop();
    if($(window).width() > 767){
        if(scroll >= 215){
            if(!$('.cart__footer-icon').hasClass('in')){
                $('.cart__footer-icon').addClass('in');
            }
        } else {
            $('.cart__footer-icon').removeClass('in');
        }
    } else {
        if(scroll >= 90){
            if(!$('.cart__footer-icon').hasClass('in')){
                $('.cart__footer-icon').addClass('in');
            }
        } else {
            $('.cart__footer-icon').removeClass('in');
        }
    }
});

timber.collectionImageSlide = function () {

    $( ".grid__image" ).mouseenter(function() {

        if ($(window).width() > 1024) {

            
            $(this).children('.first--image').css('opacity', '0');
            $(this).children('.second--image').css('opacity', '1');
            
        }
    }).mouseleave(function() {
        if ($(window).width() > 1024) {
            
            $(this).children('.first--image').css('opacity', '1');
            $(this).children('.second--image').css('opacity', '0');
            
        }
    });
};



if($(window).width() > 767){

    $(document).on('click', '.quick-shop', function(e){
        e.preventDefault();
        if($(window).width() > 767){
            var id = $(this).data('href');
            var $prod = $(this).closest(".grid_collection_box");
            var template = $prod.find("[id^=product-template-"+id+"]").html();
            $('#quick-view').find('.modal-body').html(template);
            timber.modalBox();
            timber.modalBoxSize();
            $('#quick-view').find('.modal-content').css('width', "750px");
            $('#quick-view').addClass("in");
            $('html').addClass("fixx");
            var $total_images = $('#bx-pager-'+id).data('images');
            timber.bxSliderApplyQuickView({
                product_id: id,
                total_images: $total_images,
                offset: 3
            });
            $('#quick-view').find('.grid__item > .bx-wrapper').css('max-width', "170px");
            var selectCallbackQuick = function(variant, selector) {
                
                timber.productPage({
                    money_format: window.money_format,
                    variant: variant,
                    selector: selector,
                    product_id: id
                });
            };
            var product_json = $prod.find("[id^=product-json-"+id+"]").html();
            product_json = JSON.parse(product_json);
            new Shopify.OptionSelectors('productSelect--'+id, {
                product: product_json,
                onVariantSelected: selectCallbackQuick,
                enableHistoryState: false
            });
            
            if(product_json.variants.length == 1 && product_json.variants[0].title == "Default Title") {
                $('.selector-wrapper').hide();
            }
            
            $('.close-quickview').click(function(){
                if(typeof slider === 'object'){
                    slider.destroySlider();
                }
                if(typeof slider1 === 'object'){
                    slider1.destroySlider();
                }
                $('#quick-view').find('.modal-body').html("");
                $('#quick-view').removeClass("in");
                $('html').removeClass('fixx');
            });
            $('#quick-view').click(function(){
                if(typeof slider === 'object'){
                    slider.destroySlider();
                }
                if(typeof slider1 === 'object'){
                    slider1.destroySlider();
                }
                $('#quick-view').find('.modal-body').html("");
                $('#quick-view').removeClass("in");
                $('html').removeClass('fixx');


            });
            $('.modal-content').click(function(e){
                e.stopPropagation();
            });
            timber.sliderClickCallback();
            timber.swatchChange();
            timber.qtySelectors();
            timber.progressStriped();
            
            jQuery(function($) {
                ajaxCart.init({
                    formSelector: 'form[action^="/cart/add"]',
                    cartContainer: '#CartContainer',
                    addToCartSelector: '.AddToCart',
                    cartCountSelector: '.CartCount',
                    cartCostSelector: '#CartCost',
                    isProduct: false,
                    moneyFormat: window.money_format
                });
            });
        }
    });
}


timber.cartUpdatePopup = function (cart) {
    var cart_summary = $('#cart-popup');
    $('.CartCount').html(cart.item_count);
    if (cart_summary.length) {
        cart_summary.empty();
        jQuery.each(cart, function(key, value) {
            if (key === 'items') {
                var $html = '';
                if (value.length) {
                    $html += '<form action="/cart" method="post" novalidate class="cartt ajaxcart">';
                    $html += '<div class="container">';
                    $html += '<div class="cartForm">';

                    $html += '<ul class="cart-popup-ul-middle">';
                    jQuery.each(value, function(i, item) {
                        $html += '<li>';
                        $html += '<a href="'+ item.url +'">';
                        $html += '<div class="cart-img-div">';
                        $html += '<img src="'+ Shopify.resizeImage(item.image, 'small') +'" alt="Image of '+ item.title +'" class="cart-item-image" />';
                        $html += '<span class="pop-qty-crat">'+ item.quantity +'</span>';
                        $html += '</div>';
                        $html += '<div class="cart-item-info">';
                        $html += '<span class="cart-item-title">'+ item.title +'</span>';
                        $html += '<p class="cart-item-price"><span class="money">'+ Shopify.formatMoney(item.price, window.money_format) +'</span></p>';
                        $html += '</div>';
                        $html += '</a><a href="/cart/change?line='+(i+1)+'&quantity=0" data-line="'+(i+1)+'" data-variant="'+ item.variant_id +'" class="removeLineCartPop" rel="'+ item.variant_id +'"><i class="fa fa-times"></i></a>';
                        $html += '</li>';
                    });
                    $html += '</ul>';
                    $html += '<ul class="cart-popup-ul-top">';
                    $html += '<li class="total-items"><b>Total: <span class="money">'+ Shopify.formatMoney(cart.total_price, window.money_format) +'</span></b></li>';

                    $html += '</ul>';
                    $html += '<ul class="cart-popup-ul-bottom">';
                    $html += '<li><a href="/cart" class="btn--secondary btn--full cart__cartview">View My Cart</a></li><li>';
                    $html += '<a href="/checkout" class="btn btn--full cart__checkout Checkout">';
                    $html += '<img src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/checkout-button-icon.png?v=122347149650938643911566832985" alt="" class="addIcon" />';
                    $html += '<span id="CheckoutText">Checkout</span>';
                    $html += '</a>';

                    $html +='<li class="additional-checkout-buttons">';
                    $html +='<button name="goto_pp" type="submit" id="paypal-express-button" class="additional-checkout-button additional-checkout-button--paypal-express" value="paypal_express" data-strategy="cart">Check out with <img alt="Checkout with: PayPal" src="//cdn.shopify.com/s/assets/checkout/easy-checkout-btn-paypal-9835af2c2b0e2a543b2905789a7f08b678d62de2c77c1b0d16fd7689aff463f3.png"></button>';
                    $html +=  '</li><img alt="Checkout Secure" src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/checkout_icon.png?v=172537687083778273411566832985" class="no-border checkout-img ratina-img">';

                    

                    $html += '</li></ul></div></div>';
                    $html += '</form>';


                    cart_summary.removeClass('empty-popup');
                } else {
                    $html = '<div class="container"><ul class="cart-popup-ul-bottom"><li class="empty-cart-popup-msg">Your Cart is Empty.</li></ul></div>';
                    cart_summary.addClass('empty-popup');
                }
                cart_summary.append($html);
                
            }
        });
    }
};
timber.cartUpdatePopupModel = function (cart) {
    var needToShow = true;
    var cartAddItemNotification = $('#cartAddItemNotification');
    var cart_popup = $('#popup-cart-body');
    if (cart_popup.length) {
        cart_popup.empty();
        jQuery.each(cart, function(key, value) {
            if (key === 'items') {
                var $html = '';
                if (value.length) {
                    jQuery.each(value, function(i, item) {
                        $html += '<tr>';
                        $html += '<td class="addCart-product-item-img"><img src="'+ Shopify.resizeImage(item.image, 'small') +'" alt="Image of '+ item.title +'" class="cart-item-image" /></td>';
                        $html += '<td class="addCart-product-item-info">';
                        $html += '<div class="addCart-product-title">'+ item.title +'</div>';
                        $html += '<div class="addCart-product-qty">';
                        $html += '<div class="ajaxcart__qty">';
                        $html += '<button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--minus icon-fallback-text" data-line="'+(i+1)+'">';
                        $html += '<span class="shoptimized-893" aria-hidden="true"></span>';
                        $html += '<span class="fallback-text" aria-hidden="true">&minus;</span>';
                        $html += '<span class="visually-hidden">Reduce item quantity by one</span>';
                        $html += '</button>';
                        $html += '<input type="text" name="updates[]" class="ajaxcart__qty-num" value="'+ item.quantity +'" min="0" data-line="'+(i+1)+'" aria-label="quantity" pattern="[0-9]*">';
                        $html += '<button type="button" class="ajaxcart__qty-adjust ajaxcart__qty--plus icon-fallback-text" data-line="'+(i+1)+'">';
                        $html += '<span class="shoptimized-883" aria-hidden="true"></span>';
                        $html += '<span class="fallback-text" aria-hidden="true">+</span>';
                        $html += '<span class="visually-hidden">Increase item quantity by one</span>';
                        $html += '</button>';
                        $html += '</div></div>';
                        $html += '</td>';
                        $html += '<td class="addCart-product-item-price">';
                        $html += '<p><span class="money">'+ Shopify.formatMoney(item.price, window.money_format) +'</span></p>';
                        $html += '</td>';
                        $html += '<td class="addCart-product-item-remove">';
                        $html += '<a href="/cart/change?line='+(i+1)+'&quantity=0" data-line="'+(i+1)+'" data-variant="'+ item.variant_id +'" class="removeLineCartPopModel" rel="'+ item.variant_id +'"><i class="fa fa-times"></i></a>';
                        $html += '</td>';
                        $html += '</tr>';
                    });
                    cartAddItemNotification.find('.addCart-subtotal').html('<span class="money">' + Shopify.formatMoney(cart.total_price, window.money_format) +'</span>');
                } else {
                    cart_popup.empty();
                    needToShow = false;
                    $('#cartAddItemNotification').removeClass("in");
                    $('html').removeClass('fixx');
                }
                cart_popup.append($html);
                
            }
        });
    }

    if($(window).width() > 540){
        var width = "500px";
    } else {
        var width = "90%";
    }
    cartAddItemNotification.find('.modal-content').css('width', width);
    if(needToShow) {
        cartAddItemNotification.addClass("in");
        $('html').addClass('fixx');
    }
    $('#cartAddItemNotification .addCart-popup-close').click(function(e){
        e.preventDefault();
        $('#cartAddItemNotification').removeClass("in");
        $('html').removeClass('fixx');
    });
    $('#cartAddItemNotification .close').click(function(e){
        e.preventDefault();
        $('#cartAddItemNotification').removeClass("in");
        $('html').removeClass('fixx');
    });
    $('#cartAddItemNotification').click(function(e){
        e.preventDefault();
        $('#cartAddItemNotification').removeClass("in");
        $('html').removeClass('fixx');
    });
    $('.removeLineCartPopModel').click(function(e){
        e.preventDefault();
        var line = $(this).data('line');
        var qty = 0;
        setTimeout(function() {
            var $body = $(document.body),
                params = {
                    type: 'POST',
                    url: '/cart/change.js',
                    data: 'quantity=' + qty + '&line=' + line,
                    dataType: 'json',
                    success: function(cart) {
                        $.ajax({
                            type: 'GET',
                            url: '/cart.js',
                            cache: false,
                            dataType: 'json',
                            success: function(cart) {
                                timber.cartUpdatePopupModel(cart);
                            }
                        });
                    }
                };
            jQuery.ajax(params);
        }, 250);
    });
    $('.modal-content').click(function(e){
        e.stopPropagation();
    });
    $(document).find('.addCart-product-qty').find('.ajaxcart__qty').on('click', '.ajaxcart__qty-adjust', function() {
        var $el = $(this),
            $qtySelector = $el.siblings('.ajaxcart__qty-num'),
            qty = parseInt($qtySelector.val().replace(/\D/g, ''));
        var qty = timber.validateQty(qty);
        if ($el.hasClass('ajaxcart__qty--plus')) {
            qty += 1;
        } else {
            qty -= 1;
            if (qty <= 1) qty = 1;
        }
        $qtySelector.val(qty).trigger('change');
    });
};
timber.validateQty = function (qty) {
    if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
        // We have a valid number!
    } else {
        // Not a number. Default to 1.
        qty = 1;
    }
    return qty;
};
$(document).on('change', '.addCart-product-qty .ajaxcart__qty-num', function() {
    var line = $(this).data('line');
    var qty = $(this).val();
    setTimeout(function() {
        var $body = $(document.body),
            params = {
                type: 'POST',
                url: '/cart/change.js',
                data: 'quantity=' + qty + '&line=' + line,
                dataType: 'json',
                success: function(cart) {
                    $.ajax({
                        type: 'GET',
                        url: '/cart.js',
                        cache: false,
                        dataType: 'json',
                        success: function(cart) {
                            timber.cartUpdatePopupModel(cart);
                        }
                    });
                }
            };
        jQuery.ajax(params);
    }, 250);
});
timber.geoIP = function () {
    $(function(){
        var countriesWithCurrency = {"AD": "EUR", "AE": "AED", "AF": "AFN", "AG": "XCD", "AI": "XCD", "AL": "ALL", "AM": "AMD", "AO": "AOA", "AR": "ARS", "AS": "USD", "AT": "EUR", "AU": "AUD", "AW": "AWG", "AX": "EUR", "AZ": "AZN", "BA": "BAM", "BB": "BBD", "BD": "BDT", "BE": "EUR", "BF": "XOF", "BG": "BGN", "BH": "BHD", "BI": "BIF", "BJ": "XOF", "BL": "EUR", "BM": "BMD", "BN": "BND", "BO": "BOB", "BQ": "USD", "BR": "BRL", "BS": "BSD", "BT": "INR", "BV": "NOK", "BW": "BWP", "BY": "BYR", "BZ": "BZD", "CC": "AUD", "CD": "CDF", "CF": "XAF", "CG": "XAF", "CH": "CHE", "CI": "XOF", "CK": "NZD", "CL": "CLF", "CM": "XAF", "CN": "CNY", "CO": "COP", "CR": "CRC", "CU": "CUC", "CV": "CVE", "CW": "ANG", "CX": "AUD", "CY": "EUR", "CZ": "CZK", "DE": "EUR", "DJ": "DJF", "DK": "DKK", "DM": "XCD", "DO": "DOP", "DZ": "DZD", "EC": "USD", "EE": "EUR", "EG": "EGP", "EH": "MAD", "ER": "ERN", "ES": "EUR", "ET": "ETB", "FI": "EUR", "FJ": "FJD", "FK": "FKP", "FM": "USD", "FO": "DKK", "FR": "EUR", "GA": "XAF", "GB": "GBP", "GD": "XCD", "GE": "GEL", "GF": "EUR", "GG": "GBP", "GH": "GHS", "GI": "GIP", "GL": "DKK", "GM": "GMD", "GN": "GNF", "GP": "EUR", "GQ": "XAF", "GR": "EUR", "GS": "GBP", "GT": "GTQ", "GU": "USD", "GW": "XOF", "GY": "GYD", "HK": "HKD", "HM": "AUD", "HN": "HNL", "HR": "HRK", "HT": "HTG", "HU": "HUF", "ID": "IDR", "IE": "EUR", "IL": "ILS", "IM": "GBP", "IN": "INR", "IO": "USD", "IQ": "IQD", "IR": "IRR", "IS": "ISK", "IT": "EUR", "JE": "GBP", "JM": "JMD", "JO": "JOD", "JP": "JPY", "KE": "KES", "KG": "KGS", "KH": "KHR", "KI": "AUD", "KM": "KMF", "KN": "XCD", "KP": "KPW", "KR": "KRW", "KW": "KWD", "KY": "KYD", "KZ": "KZT", "LA": "LAK", "LB": "LBP", "LC": "XCD", "LI": "CHF", "LK": "LKR", "LR": "LRD", "LS": "LSL", "LT": "LTL", "LU": "EUR", "LV": "EUR", "LY": "LYD", "MA": "MAD", "MC": "EUR", "MD": "MDL", "ME": "EUR", "MF": "EUR", "MG": "MGA", "MH": "USD", "MK": "MKD", "ML": "XOF", "MM": "MMK", "MN": "MNT", "MO": "MOP", "MP": "USD", "MQ": "EUR", "MR": "MRO", "MS": "XCD", "MT": "EUR", "MU": "MUR", "MV": "MVR", "MW": "MWK", "MX": "MXN", "MY": "MYR", "MZ": "MZN", "NA": "NAD", "NC": "XPF", "NE": "XOF", "NF": "AUD", "NG": "NGN", "NI": "NIO", "NL": "EUR", "NO": "NOK", "NP": "NPR", "NR": "AUD", "NU": "NZD", "NZ": "NZD", "OM": "OMR", "PA": "USD", "PE": "PEN", "PF": "XPF", "PG": "PGK", "PH": "PHP", "PK": "PKR", "PL": "PLN", "PM": "EUR", "PN": "NZD", "PR": "USD", "PS": "ILS", "PT": "EUR", "PW": "USD", "PY": "PYG", "QA": "QAR", "RE": "EUR", "RO": "RON", "RS": "RSD", "RU": "RUB", "RW": "RWF", "SA": "SAR", "SB": "SBD", "SC": "SCR", "SD": "SDG", "SE": "SEK", "SG": "SGD", "SH": "SHP", "SI": "EUR", "SJ": "NOK", "SK": "EUR", "SL": "SLL", "SM": "EUR", "SN": "XOF", "SO": "SOS", "SR": "SRD", "SS": "SSP", "ST": "STD", "SV": "USD", "SX": "ANG", "SY": "SYP", "SZ": "SZL", "TC": "USD", "TD": "XAF", "TF": "EUR", "TG": "XOF", "TH": "THB", "TJ": "TJS", "TK": "NZD", "TL": "USD", "TM": "TMT", "TN": "TND", "TO": "TOP", "TR": "TRY", "TT": "TTD", "TV": "AUD", "TW": "TWD", "TZ": "TZS", "UA": "UAH", "UG": "UGX", "UM": "USD", "US": "USD", "UY": "UYU", "UZ": "UZS", "VA": "EUR", "VC": "XCD", "VE": "VEF", "VG": "USD", "VI": "USD", "VN": "VND", "VU": "VUV", "WF": "XPF", "WS": "WST", "XK": "EUR", "YE": "YER", "YT": "EUR", "ZA": "ZAR", "ZM": "ZMK", "ZW": "ZWL"};
        
        $.getJSON("https://members.shoptimized.net/api/geo-ip/info.json", function(data){
            var resp = data.result.data.country.iso_code;
            var resp1 = data.result.data.country.names.en;
            var countryCode = resp.toLowerCase();

            var countryName = resp1;
            if (countryName == 'United States')
                countryName = 'The United States';

            var d = new Date();
            var weekday = new Array(7);
            weekday[0] =  "Sunday";
            weekday[1] = "Monday";
            weekday[2] = "Tuesday";
            weekday[3] = "Wednesday";
            weekday[4] = "Thursday";
            weekday[5] = "Friday";
            weekday[6] = "Saturday";
            var n = weekday[d.getDay()];
            $('#DCTime').html(n);

            $('.flagImg').html('<i class="flag-icon flag-icon-'+countryCode+'"></i>');

            $('.countryName').text(countryName);

            var text = $('.free_shipping_top_strip').html();



            var countryCurrency = countriesWithCurrency[countryCode.toUpperCase()];
            var supported_currencies = 'USD';
            supported_currencies = supported_currencies.split(' ');

            if(countryCurrency != "" && countryCurrency != null && countryCurrency != undefined){

                if (jQuery.inArray(countryCurrency, supported_currencies) !== -1) {

                    if ($.cookie('currencynewcookie')) {

                        jQuery('[name=currencies]').val($.cookie("currencynewcookie")).change();
                        jQuery('.selectedvalue').text($.cookie("currencynewcookie"));

                    } else {

                        jQuery('[name=currencies]').val(countryCurrency).change();
                        jQuery('.selectedvalue').text(countryCurrency);

                    }
                }
                jQuery('.selectedvalue').text($.cookie("currencynewcookie"));
            } else {

                jQuery('.selectedvalue').text(countryCurrency);
            }

        }, 'jsonp');
        

        
    });
};
timber.recordLastCollection = function (options) {
    jQuery.cookie('shopify_collection', options.collection, { path: '/' });
};
function openpopup(url,name) {
    window.open(url,name,'width=500,height=300');
}
function DateFmt() {
    this.dateMarkers = {
        d:['getDate',function(v) { return ("0"+v).substr(-2,2)}],
        m:['getMonth',function(v) { return ("0"+v).substr(-2,2)}],
        n:['getMonth',function(v) {
            var mthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            return mthNames[v];
        }],
        w:['getDay',function(v) {
            var dayNames = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
            return dayNames[v];
        }],
        y:['getFullYear'],
        H:['getHours',function(v) { return ("0"+v).substr(-2,2)}],
        M:['getMinutes',function(v) { return ("0"+v).substr(-2,2)}],
        S:['getSeconds',function(v) { return ("0"+v).substr(-2,2)}],
        i:['toISOString',null]
    };

    this.format = function(date, fmt) {
        var dateMarkers = this.dateMarkers
        var dateTxt = fmt.replace(/%(.)/g, function(m, p){
            var rv = date[(dateMarkers[p])[0]]()

            if ( dateMarkers[p][1] != null ) rv = dateMarkers[p][1](rv)

            return rv
        });

        return dateTxt
    }
}
$(timber.init);

/*============================================================================
  Ajax the add to cart experience by revealing it in a side drawer
  Plugin Documentation - http://shopify.github.io/Timber/#ajax-cart
  (c) Copyright 2015 Shopify Inc. Author: Carson Shold (@cshold). All Rights Reserved.

  This file includes:
    - Basic Shopify Ajax API calls
    - Ajax cart plugin

  This requires:
    - jQuery 1.8+
    - handlebars.min.js (for cart template)
    - modernizr.min.js
    - snippet/ajax-cart-template.liquid

  Customized version of Shopify's jQuery API
  (c) Copyright 2009-2015 Shopify Inc. Author: Caroline Schnapp. All Rights Reserved.
==============================================================================*/
if ((typeof ShopifyAPI) === 'undefined') { ShopifyAPI = {}; }

/*============================================================================
  API Helper Functions
==============================================================================*/
function attributeToString(attribute) {
    if ((typeof attribute) !== 'string') {
        attribute += '';
        if (attribute === 'undefined') {
            attribute = '';
        }
    }
    return jQuery.trim(attribute);
};

/*============================================================================
  API Functions
==============================================================================*/
ShopifyAPI.onCartUpdate = function(cart) {
    // alert('There are now ' + cart.item_count + ' items in the cart.');
};

ShopifyAPI.updateCartNote = function(note, callback) {
    var $body = $(document.body),
        params = {
            type: 'POST',
            url: '/cart/update.js',
            data: 'note=' + attributeToString(note),
            dataType: 'json',
            beforeSend: function() {
                $body.trigger('beforeUpdateCartNote.ajaxCart', note);
            },
            success: function(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                }
                else {
                    ShopifyAPI.onCartUpdate(cart);
                }
                $body.trigger('afterUpdateCartNote.ajaxCart', [note, cart]);
            },
            error: function(XMLHttpRequest, textStatus) {
                $body.trigger('errorUpdateCartNote.ajaxCart', [XMLHttpRequest, textStatus]);
                ShopifyAPI.onError(XMLHttpRequest, textStatus);
            },
            complete: function(jqxhr, text) {
                $body.trigger('completeUpdateCartNote.ajaxCart', [this, jqxhr, text]);
            }
        };
    jQuery.ajax(params);
};

ShopifyAPI.onError = function(XMLHttpRequest, textStatus) {
    var data = eval('(' + XMLHttpRequest.responseText + ')');
    if (!!data.message) {
        //alert(data.message + '(' + data.status  + '): ' + data.description);
    }
};

/*============================================================================
  POST to cart/add.js returns the JSON of the cart
    - Allow use of form element instead of just id
    - Allow custom error callback
==============================================================================*/
ShopifyAPI.addItemFromForm = function(form, callback, errorCallback, isProduct) {
    var flag_addcart = true;
    $('.product_properties').each(function(){
        var val = $(this).find('input').val();
        var val_charlimit = $(this).find('input').data('charlimit');
        if(val == "") {
            flag_addcart = false;
            $(this).find('input').addClass("ui-state-error");
            var topScroll = $(this).find('input').offset().top - 300;

            /*$(form).find(".sold-out-tooltip").addClass("sold-out-tooltip--show");
            
            setTimeout(function () {
                $(form).find(".sold-out-tooltip").removeClass("sold-out-tooltip--show");
            }, 1000);*/

            $('html, body').animate({
                scrollTop: (topScroll)
            }, 1000);
        } else {
            $(this).find('input').removeClass("ui-state-error");
            $(this).find('.error-limit').hide();
            if(val_charlimit != undefined) {
                if(val.length > val_charlimit){
                    flag_addcart = false;
                    $(this).find('input').addClass("ui-state-error");
                    $(this).find('.error-limit').html("Oops, we won't have space to print all that, try something shorter.").show();
                }
            }
        }
    });
    if(flag_addcart) {
        var $body = $(document.body),
            params = {
                type: 'POST',
                url: '/cart/add.js',
                data: jQuery(form).serialize(),
                dataType: 'json',
                beforeSend: function(jqxhr, settings) {
                    $body.trigger('beforeAddItem.ajaxCart', form);
                },
                success: function(line_item) {
                    


                    

                    

                    

                    
                    if ($(window).width() < 767) {
                        timber.RightDrawer.open();
                    }

                    
                    

                    if ((typeof callback) === 'function') {
                        callback(line_item, form);
                    } else {
                        ShopifyAPI.onItemAdded(line_item, form);
                    }
                    $body.trigger('afterAddItem.ajaxCart', [line_item, form]);
                },
                error: function(XMLHttpRequest, textStatus) {
                    $(form).find(".sold-out-tooltip").removeClass("sold-out-tooltip--show");

                    setTimeout(function () {
                        $(form).find(".sold-out-tooltip").addClass("sold-out-tooltip--show");
                    }, 50);

                    if ((typeof errorCallback) === 'function') {
                        errorCallback(XMLHttpRequest, textStatus);
                    }
                    else {
                        ShopifyAPI.onError(XMLHttpRequest, textStatus);
                    }
                    $body.trigger('errorAddItem.ajaxCart', [XMLHttpRequest, textStatus]);
                },
                complete: function(jqxhr, text) {
                    $body.trigger('completeAddItem.ajaxCart', [this, jqxhr, text]);
                }
            };
        jQuery.ajax(params);
    }
};

// Get from cart.js returns the cart in JSON
ShopifyAPI.getCart = function(callback) {
    $(document.body).trigger('beforeGetCart.ajaxCart');
    $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function(cart) {
            if ((typeof callback) === 'function') {
                callback(cart);
            } else {
                ShopifyAPI.onCartUpdate(cart);
            }
            $(document.body).trigger('afterGetCart.ajaxCart', cart);
        }
    });
};

// POST to cart/change.js returns the cart in JSON
ShopifyAPI.changeItem = function(line, quantity, callback) {
    var $body = $(document.body),
        params = {
            type: 'POST',
            url: '/cart/change.js',
            data: 'quantity=' + quantity + '&line=' + line,
            dataType: 'json',
            beforeSend: function() {
                $body.trigger('beforeChangeItem.ajaxCart', [line, quantity]);
            },
            success: function(cart) {
                if ((typeof callback) === 'function') {
                    callback(cart);
                } else {
                    ShopifyAPI.onCartUpdate(cart);
                }
                $body.trigger('afterChangeItem.ajaxCart', [line, quantity, cart]);
            },
            error: function(XMLHttpRequest, textStatus) {
                $body.trigger('errorChangeItem.ajaxCart', [XMLHttpRequest, textStatus]);
                ShopifyAPI.onError(XMLHttpRequest, textStatus);
            },
            complete: function(jqxhr, text) {
                $body.trigger('completeChangeItem.ajaxCart', [this, jqxhr, text]);
            }
        };
    jQuery.ajax(params);
};

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
var ajaxCart = (function(module, $) {

    'use strict';

    // Public functions
    var init, loadCart;

    // Private general variables
    var settings, isUpdating, $body;

    // Private plugin variables
    var $formContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer;

    // Private functions
    var updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, createQtySelectors, qtySelectors, validateQty;

    /*============================================================================
    Initialise the plugin and define global options
  ==============================================================================*/
    init = function (options) {

        // Default settings
        settings = {
            formSelector       : 'form[action^="/cart/add"]',
            cartContainer      : '#CartContainer',
            addToCartSelector  : 'input[type="submit"]',
            cartCountSelector  : null,
            cartCostSelector   : null,
            moneyFormat        : '$',
            disableAjaxCart    : false,
            enableQtySelectors : true,
            isProduct : true,
            lastItemRemoved : -1
        };
        // Override defaults with arguments
        $.extend(settings, options);

        // Select DOM elements
        $formContainer     = $(settings.formSelector);
        $cartContainer     = $(settings.cartContainer);
        $addToCart         = $formContainer.find(settings.addToCartSelector);
        $cartCountSelector = $(settings.cartCountSelector);
        $cartCostSelector  = $(settings.cartCostSelector);

        // General Selectors
        $body = $(document.body);

        // Track cart activity status
        isUpdating = false;

        // Setup ajax quantity selectors on the any template if enableQtySelectors is true
        if (settings.enableQtySelectors) {
            qtySelectors();
        }

        // Take over the add to cart form submit action if ajax enabled
        if (!settings.disableAjaxCart && $addToCart.length) {
            formOverride();
        }

        // Run this function in case we're using the quantity selector outside of the cart
        adjustCart();
    };

    loadCart = function () {
        $body.addClass('drawer--is-loading');
        ShopifyAPI.getCart(cartUpdateCallback);
    };

    updateCountPrice = function (cart) {
        if ($cartCountSelector) {
            $cartCountSelector.html(cart.item_count).removeClass('hidden-count');

            if (cart.item_count === 0) {
                $cartCountSelector.addClass('hidden-count');
            }
        }
        if ($cartCostSelector) {
            $cartCostSelector.html(Shopify.formatMoney(cart.total_price, settings.moneyFormat));
        }
    };

    formOverride = function () {
        $formContainer.on('submit', function(evt) {
            evt.preventDefault();

            $addToCart = $(this).find('.AddToCart');

            // Modifying text and classes of ATC button
            $addToCart.removeClass('is-added').addClass('is-adding');
            
            $addToCart.find('span#AddToCartText').html('Adding to cart ...');
            

            // Remove any previous quantity errors
            $('.qty-error').remove();
            ShopifyAPI.addItemFromForm(evt.target, itemAddedCallback, itemErrorCallback, settings.isProduct);
        });
    };

    itemAddedCallback = function (product) {
        // $addToCart.find(".sold-out-tooltip").removeClass('sold-out-tooltip--show');

        // Modifying text and classes of ATC button
        setTimeout(function () {
            $addToCart.removeClass('is-adding').addClass('is-added');
            
            $addToCart.find('span#AddToCartText').html('Item Added to Cart');
            
        }, 1000);

        setTimeout(function () {
            $addToCart.removeClass('is-adding is-added');
            
            $addToCart.find('span#AddToCartText').html('Add to Cart');
            
        }, 2000);

        $('#quick-view').find('.modal-body').html("");
        $('#quick-view').removeClass("in");
        ShopifyAPI.getCart(cartUpdateCallback);
        $('html').removeClass('fixx');
           $('.product-slideup').removeClass('active');
        $('body').removeClass('search-overlay-show');
    };

    itemErrorCallback = function (XMLHttpRequest, textStatus) {
        var data = eval('(' + XMLHttpRequest.responseText + ')');

        $addToCart.removeClass('is-adding is-added');
        // $addToCart.find(".sold-out-tooltip").removeClass('sold-out-tooltip--show');

        if (!!data.message) {
            if (data.status == 422) {
                $formContainer.after('<div class="errors qty-error">'+ data.description +'</div>')
            }
        }
    };

    cartUpdateCallback = function (cart) {
        // Update quantity and price
        updateCountPrice(cart);
        buildCart(cart);
    };

    buildCart = function (cart) {
        // Start with a fresh cart div
        $cartContainer.empty();

        // Show empty cart
        if (cart.item_count === 0) {
            $cartContainer.append('<p>' + "Your Cart is Empty." + '</p>');
            cartCallback(cart);
            jQuery('.AddToCart_hide_button').show();
            jQuery('.AddToCart_show_button').hide();
            return;
        }

        // Handlebars.js cart layout
        var items = [],
            item = {},
            data = {},
            source = $("#CartTemplate").html(),
            template = Handlebars.compile(source);

        // Add each item to our handlebars.js data
        $.each(cart.items, function(index, cartItem) {
            if (cartItem.image != null){
                var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_small$1").replace('http:', '');
            } else {
                var prodImg = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
            }

            item = {
                key: cartItem.key,
                line: index + 1, // Shopify uses a 1+ index in the API
                url: cartItem.url,
                img: prodImg,
                name: cartItem.product_title,
                variation: cartItem.variant_title,
                properties: cartItem.properties,
                itemAdd: cartItem.quantity + 1,
                itemMinus: cartItem.quantity - 1,
                itemQty: cartItem.quantity,
                price: Shopify.formatMoney(cartItem.price, settings.moneyFormat),
                vendor: cartItem.vendor,
                linePrice: Shopify.formatMoney(cartItem.line_price, settings.moneyFormat),
                originalLinePrice: Shopify.formatMoney(cartItem.original_line_price, settings.moneyFormat),
                discounts: cartItem.discounts,
                discountsApplied: cartItem.line_price === cartItem.original_line_price ? false : true
            };

            items.push(item);
        });

        // Gather all cart data and add to DOM
        data = {
            items: items,
            note: cart.note,
            totalPrice: Shopify.formatMoney(cart.total_price, settings.moneyFormat),
            totalCartDiscount: cart.total_discount === 0 ? 0 : "You're saving [savings]".replace('[savings]', Shopify.formatMoney(cart.total_discount, settings.moneyFormat)),
            totalCartDiscountApplied: cart.total_discount === 0 ? false : true
        }

        $cartContainer.append(template(data));
        cartCallback(cart);
        
    };

    cartCallback = function(cart) {
        $body.removeClass('drawer--is-loading');
        $body.trigger('afterCartLoad.ajaxCart', cart);

        if (window.Shopify && Shopify.StorefrontExpressButtons) {
            Shopify.StorefrontExpressButtons.initialize();
        }
    };

    adjustCart = function () {
        // Delegate all events because elements reload with the cart
        // Add or remove from the quantity
        $body.on('click', '.ajaxcart__qty-adjust', function() {
            if (isUpdating) {
                return;
            }

            var $el = $(this),
                line = $el.data('line'),
                $qtySelector = $el.siblings('.ajaxcart__qty-num'),
                qty = parseInt($qtySelector.val().replace(/\D/g, ''));

            var qty = validateQty(qty);

            // Add or subtract from the current quantity
            if ($el.hasClass('ajaxcart__qty--plus')) {
                qty += 1;
            } else {
                qty -= 1;
                if (qty <= 0) qty = 0;
            }

            // If it has a data-line, update the cart.
            // Otherwise, just update the input's number
            if (line) {
                updateQuantity(line, qty);
            } else {
                $qtySelector.val(qty);
            }
        });

        // Update quantity based on input on change
        $body.on('change', '.ajaxcart__qty-num', function() {
            if (isUpdating) {
                return;
            }

            var $el = $(this),
                line = $el.data('line'),
                qty = parseInt($el.val().replace(/\D/g, ''));

            var qty = validateQty(qty);

            // If it has a data-line, update the cart
            if (line) {
                updateQuantity(line, qty);
            }
        });

        // Prevent cart from being submitted while quantities are changing
        $body.on('submit', 'form.ajaxcart', function(evt) {
            if (isUpdating) {
                evt.preventDefault();
            }
        });

        // Highlight the text when focused
        $body.on('focus', '.ajaxcart__qty-adjust', function() {
            var $el = $(this);
            setTimeout(function() {
                $el.select();
            }, 50);
        });

        $body.on('click', '.removeLineCartPop', function(e){
            e.preventDefault();
            var line = $(this).data('line');
            var variant = $(this).data('variant');
            if(variant != settings.lastItemRemoved){
                settings.lastItemRemoved = variant;
                ShopifyAPI.changeItem(line, 0, itemAddedCallback);
            }
        });

        $body.on('click', '.ajaxcart_remove', function(e){
            e.preventDefault();
            var line = $(this).data('line');
            updateQuantity(line, 0);
        });

        function updateQuantity(line, qty) {
            isUpdating = true;

            // Add activity classes when changing cart quantities
            var $row = $('.ajaxcart__row[data-line="' + line + '"]').addClass('is-loading');

            if (qty === 0) {
                $row.parent().addClass('is-removed');
            }

            // Slight delay to make sure removed animation is done
            setTimeout(function() {
                ShopifyAPI.changeItem(line, qty, adjustCartCallback);
            }, 250);
        }

        // Save note anytime it's changed
        $body.on('change', 'textarea[name="note"]', function() {
            var newNote = $(this).val();

            // Update the cart note in case they don't click update/checkout
            ShopifyAPI.updateCartNote(newNote, function(cart) {});
        });
    };

    adjustCartCallback = function (cart) {
        // Update quantity and price
        updateCountPrice(cart);

        // Reprint cart on short timeout so you don't see the content being removed
        setTimeout(function() {
            isUpdating = false;
            ShopifyAPI.getCart(buildCart);
        }, 150)
    };

    createQtySelectors = function() {
        // If there is a normal quantity number field in the ajax cart, replace it with our version
        if ($('input[type="number"]', $cartContainer).length) {
            $('input[type="number"]', $cartContainer).each(function() {
                var $el = $(this),
                    currentQty = $el.val();

                var itemAdd = currentQty + 1,
                    itemMinus = currentQty - 1,
                    itemQty = currentQty;

                var source   = $("#AjaxQty").html(),
                    template = Handlebars.compile(source),
                    data = {
                        key: $el.data('id'),
                        itemQty: itemQty,
                        itemAdd: itemAdd,
                        itemMinus: itemMinus
                    };

                // Append new quantity selector then remove original
                $el.after(template(data)).remove();
            });
        }
    };

    qtySelectors = function() {
        // Change number inputs to JS ones, similar to ajax cart but without API integration.
        // Make sure to add the existing name and id to the new input element
        var numInputs = $('input[type="number"]');

        if (numInputs.length) {
            numInputs.each(function() {
                var $el = $(this),
                    currentQty = $el.val(),
                    inputName = $el.attr('name'),
                    inputId = $el.attr('id');

                var itemAdd = currentQty + 1,
                    itemMinus = currentQty - 1,
                    itemQty = currentQty;

                var source   = $("#JsQty").html(),
                    template = Handlebars.compile(source),
                    data = {
                        key: $el.data('id'),
                        itemQty: itemQty,
                        itemAdd: itemAdd,
                        itemMinus: itemMinus,
                        inputName: inputName,
                        inputId: inputId
                    };

                // Append new quantity selector then remove original
                $el.after(template(data)).remove();
            });

            // Setup listeners to add/subtract from the input
            $('.js-qty__adjust').on('click', function() {
                var $el = $(this),
                    id = $el.data('id'),
                    $qtySelector = $el.siblings('.js-qty__num'),
                    qty = parseInt($qtySelector.val().replace(/\D/g, ''));

                var qty = validateQty(qty);

                // Add or subtract from the current quantity
                if ($el.hasClass('js-qty__adjust--plus')) {
                    qty += 1;
                } else {
                    qty -= 1;
                    if (qty <= 1) qty = 1;
                }

                // Update the input's number
                $qtySelector.val(qty);
            });
        }
    };

    validateQty = function (qty) {
        if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
            // We have a valid number!
        } else {
            // Not a number. Default to 1.
            qty = 1;
        }
        return qty;
    };

    module = {
        init: init,
        load: loadCart
    };

    return module;

}(ajaxCart || {}, jQuery));


// Dropdown menu
jQuery(document).on('click', ".icon-arrow-down", function(){
    if (!$(this).parent().hasClass('nav-hover'))
    {  $('.site-nav--has-dropdown').removeClass('nav-hover');  $(this).parent().addClass('nav-hover'); }
    else{ $(this).parent().removeClass('nav-hover');}
});




$(window).on('load', function() { // makes sure the whole site is loaded
    $('#preloader').delay(250).fadeOut('slow'); // will fade out the white DIV that covers the website.
//         $('body').delay(250).css({'overflow':'visible'});
})

$(document).ready(function () {





    $('.collapse ul').find('.color-filters').each(function(){
        var $this = $(this);
        var Color = $this.find('a').text();
        $this.find('a').css('background-color', Color);
    });

    $('ul.accordion').accordion();
    document.addEventListener("DOMContentLoaded", function(){
        $('.menu-dropdown-icon').hover(function(){
            $(this).addClass('slide');
        });

        $('.menu-dropdown-icon').mouseleave(function(){
            $(this).removeClass('slide');
        });

    });
    $('.banner-slider').each(function(){
        var isMulti = ($(this).find('.item').length > 1) ? true : false;
        var myspeed = $(this).data('speed');
        $(this).owlCarousel({
            nav:isMulti,
            dots:true,
            autoplay:true,
            autoplayTimeout:myspeed,
            loop:isMulti,
            navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
            responsive:{
                0:{
                    items:1,
                },
                640:{
                    items:1,
                },
                1000:{
                    items:1
                }
            }
        });
    });

    $('.mobile-banner-slider').each(function(){
        var isMultim = ($(this).find('.item').length > 1) ? true : false;
        var myspeed = 4000;
        $(this).owlCarousel({
            nav:isMultim,
            dots:true,
            autoplay:true,
            autoplayTimeout:myspeed,
            loop:isMultim,
            navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
            responsive:{
                0:{
                    items:1,
                },
                640:{
                    items:1,
                },
                1000:{
                    items:1
                }
            }
        });
    });



    $(document)
        .on('shopify:block:select', function(e){

            $('.banner-slider').each(function(){
                var isMulti = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = $(this).data('speed');
                $(this).owlCarousel({
                    nav:isMulti,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMulti,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

            $('.mobile-banner-slider').each(function(){
                var isMultim = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = 4000;
                $(this).owlCarousel({
                    nav:isMultim,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMultim,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

        });
    $(document)
        .on('shopify:block:deselect', function(e){

            $('.banner-slider').each(function(){
                var isMulti = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = $(this).data('speed');
                $(this).owlCarousel({
                    nav:isMulti,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMulti,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

            $('.mobile-banner-slider').each(function(){
                var isMultim = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = 4000;
                $(this).owlCarousel({
                    nav:isMultim,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMultim,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

        });



    $(document)
        .on('shopify:section:reorder', function(e){

            $('.banner-slider').each(function(){
                var isMulti = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = $(this).data('speed');
                $(this).owlCarousel({
                    nav:isMulti,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMulti,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

            $('.mobile-banner-slider').each(function(){
                var isMultim = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = 4000;
                $(this).owlCarousel({
                    nav:isMultim,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMultim,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

        });


    $(document)
        .on('shopify:section:load', function(e){

            $('.banner-slider').each(function(){
                var isMulti = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = $(this).data('speed');
                $(this).owlCarousel({
                    nav:isMulti,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMulti,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

            $('.mobile-banner-slider').each(function(){
                var isMultim = ($(this).find('.item').length > 1) ? true : false;
                var myspeed = 4000;
                $(this).owlCarousel({
                    nav:isMultim,
                    dots:true,
                    autoplay:true,
                    autoplayTimeout:myspeed,
                    loop:isMultim,
                    navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                    responsive:{
                        0:{
                            items:1,
                        },
                        640:{
                            items:1,
                        },
                        1000:{
                            items:1
                        }
                    }
                });
            });

        });


    var owl = $('.category_wrap.homaa');
    owl.on('initialized.owl.carousel', function (e) {
        owl.trigger('next.owl.carousel');
    });

    owl.owlCarousel({
        nav:true,
        dots:false,
        loop:true,
        merge: false,
        navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
        center: false,
        freeDrag: false,
        navigation : true,
        scrollPerPage: false,
        responsive:{
            0:{
                items:2,
                slideBy: 2,
                stagePadding: 30 
            },
            300:{
                items:2,
                slideBy: 2,
                stagePadding: 35
            },
            350:{
                items:2,
                slideBy: 2,
                stagePadding: 40
            },
            400:{
                items:2,
                slideBy: 2,
                stagePadding: 45
            },
            450:{
                items:2,
                slideBy: 2,
                stagePadding: 50
            },
            500:{
                items:2,
                slideBy: 2,
                stagePadding: 55
            },
            550:{
                items:2,
                slideBy: 2,
                stagePadding: 60
            },
            600:{
                items:2,
                slideBy: 2,
                stagePadding: 65
            },
            650:{
                items:2,
                slideBy: 2,
                stagePadding: 70
            },
            700:{
                items:2,
                slideBy: 2,
                stagePadding: 75
            },
            750:{
                items:2,
                slideBy: 2,
                stagePadding: 80
            },
            800:{
                items:2,
                slideBy: 2,
                stagePadding: 85
            },
            850:{
                items:2,
                slideBy: 2,
                stagePadding: 90
            },
            900:{
                items:2,
                slideBy: 2,
                stagePadding: 95
            },
            1000:{
                items:5,
                slideBy: 5
            }
        }
    });
    $('.category_wrap.blogsa').owlCarousel({
        nav:true,
        dots:false,
        loop:true,
        navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
        center: false,
        responsive:{
            0:{
                items:2,
                slideBy: 2,
                stagePadding: 30 
            },
            300:{
                items:2,
                slideBy: 2,
                stagePadding: 35
            },
            350:{
                items:2,
                slideBy: 2,
                stagePadding: 40
            },
            400:{
                items:2,
                slideBy: 2,
                stagePadding: 45
            },
            450:{
                items:2,
                slideBy: 2,
                stagePadding: 50
            },
            500:{
                items:2,
                slideBy: 2,
                stagePadding: 55
            },
            550:{
                items:2,
                slideBy: 2,
                stagePadding: 60
            },
            600:{
                items:2,
                slideBy: 2,
                stagePadding: 65
            },
            650:{
                items:2,
                slideBy: 2,
                stagePadding: 70
            },
            700:{
                items:2,
                slideBy: 2,
                stagePadding: 75
            },
            750:{
                items:2,
                slideBy: 2,
                stagePadding: 80
            },
            800:{
                items:2,
                slideBy: 2,
                stagePadding: 85
            },
            850:{
                items:2,
                slideBy: 2,
                stagePadding: 90
            },
            900:{
                items:2,
                slideBy: 2,
                stagePadding: 95
            },
            1000:{
                items:4,
                slideBy: 4
            }
        }
    });

    $('.category_wrap.homaa').each(function(){
        var viewport = $(window).width();
        var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
        if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
            $(this).find('.owl-controls').show();
        } else {

            $(this).find('.owl-controls').hide();
        }
        var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
        if (totalItems_wrap < 5) {
            var isLoopedcat_second_h = false;
            var isNavCat_second_h = false;
            $(this).find('.owl-controls').hide();
        }
        else {
            var isLoopedcat_second_h = true;
            var isNavCat_second_h = true;
            $(this).find('.owl-controls').show();
        }

    });
    $( window ).resize(function() {

        $('.category_wrap.homaa').each(function(){
            var viewport = $(window).width();
            var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

            if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                $(this).find('.owl-controls').hide();

                $('.category_wrap.homaa').owlCarousel({
                    nav:true,
                    loop:true
                });
            }
            else {
                $('.category_wrap.homaa').owlCarousel({
                    nav:false,
                    loop:false
                });

            }

        });
    });


    $(document)
        .on('shopify:block:select', function(e){

            $('.category_wrap').css('opacity', '1');

            $('.category_wrap.homaa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:5,
                        slideBy: 5
                    }
                }
            });
            $('.category_wrap.blogsa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:4,
                        slideBy: 4
                    }
                }
            });
            $('.category_wrap.homaa').each(function(){
                var viewport = $(window).width();
                var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
                if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                    $(this).find('.owl-controls').show();
                } else {

                    $(this).find('.owl-controls').hide();
                }
                var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
                if (totalItems_wrap < 5) {
                    var isLoopedcat_second_h = false;
                    var isNavCat_second_h = false;
                    $(this).find('.owl-controls').hide();
                }
                else {
                    var isLoopedcat_second_h = true;
                    var isNavCat_second_h = true;
                    $(this).find('.owl-controls').show();
                }

            });
            $( window ).resize(function() {

                $('.category_wrap.homaa').each(function(){
                    var viewport = $(window).width();
                    var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

                    if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                        $(this).find('.owl-controls').hide();

                        $('.category_wrap.homaa').owlCarousel({
                            nav:true,
                            loop:true
                        });
                    }
                    else {
                        $('.category_wrap.homaa').owlCarousel({
                            nav:false,
                            loop:false
                        });

                    }

                });
            });
        });



    $(document)
        .on('shopify:block:deselect', function(e){

            $('.category_wrap').css('opacity', '1');

            $('.category_wrap.homaa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
//          autoHeight:true,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:5,
                        slideBy: 5
                    }
                }
            });
            $('.category_wrap.blogsa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:4,
                        slideBy: 4
                    }
                }
            });
            $('.category_wrap.homaa').each(function(){
                var viewport = $(window).width();
                var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
                if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                    $(this).find('.owl-controls').show();
                } else {

                    $(this).find('.owl-controls').hide();
                }
                var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
                if (totalItems_wrap < 5) {
                    var isLoopedcat_second_h = false;
                    var isNavCat_second_h = false;
                    $(this).find('.owl-controls').hide();
                }
                else {
                    var isLoopedcat_second_h = true;
                    var isNavCat_second_h = true;
                    $(this).find('.owl-controls').show();
                }

            });
            $( window ).resize(function() {

                $('.category_wrap.homaa').each(function(){
                    var viewport = $(window).width();
                    var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

                    if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                        $(this).find('.owl-controls').hide();

                        $('.category_wrap.homaa').owlCarousel({
                            nav:true,
                            loop:true
                        });
                    }
                    else {
                        $('.category_wrap.homaa').owlCarousel({
                            nav:false,
                            loop:false
                        });

                    }

                });
            });
        });



    $(document)
        .on('shopify:section:load', function(e){

            $('.category_wrap').css('opacity', '1');

            $('.category_wrap.homaa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:5,
                        slideBy: 5
                    }
                }
            });
            $('.category_wrap.blogsa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:4,
                        slideBy: 4
                    }
                }
            });
            $('.category_wrap.homaa').each(function(){
                var viewport = $(window).width();
                var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
                if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                    $(this).find('.owl-controls').show();
                } else {

                    $(this).find('.owl-controls').hide();
                }
                var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
                if (totalItems_wrap < 5) {
                    var isLoopedcat_second_h = false;
                    var isNavCat_second_h = false;
                    $(this).find('.owl-controls').hide();
                }
                else {
                    var isLoopedcat_second_h = true;
                    var isNavCat_second_h = true;
                    $(this).find('.owl-controls').show();
                }

            });
            $( window ).resize(function() {

                $('.category_wrap.homaa').each(function(){
                    var viewport = $(window).width();
                    var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

                    if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                        $(this).find('.owl-controls').hide();

                        $('.category_wrap.homaa').owlCarousel({
                            nav:true,
                            loop:true
                        });
                    }
                    else {
                        $('.category_wrap.homaa').owlCarousel({
                            nav:false,
                            loop:false
                        });

                    }

                });
            });
        });






    $(document)
        .on('shopify:section:reorder', function(e){

            $('.category_wrap').css('opacity', '1');

            $('.category_wrap.homaa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,

                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:5,
                        slideBy: 5
                    }
                }
            });
            $('.category_wrap.blogsa').owlCarousel({
                nav:true,
                dots:false,
                loop:true,
                margin:10,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                center: false,
                responsive:{
                    0:{
                        items:2,
                        slideBy: 2
                    },
                    1000:{
                        items:4,
                        slideBy: 4
                    }
                }
            });
            $('.category_wrap.homaa').each(function(){
                var viewport = $(window).width();
                var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
                if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                    $(this).find('.owl-controls').show();
                } else {

                    $(this).find('.owl-controls').hide();
                }
                var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
                if (totalItems_wrap < 5) {
                    var isLoopedcat_second_h = false;
                    var isNavCat_second_h = false;
                    $(this).find('.owl-controls').hide();
                }
                else {
                    var isLoopedcat_second_h = true;
                    var isNavCat_second_h = true;
                    $(this).find('.owl-controls').show();
                }

            });
            $( window ).resize(function() {

                $('.category_wrap.homaa').each(function(){
                    var viewport = $(window).width();
                    var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

                    if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                        $(this).find('.owl-controls').hide();

                        $('.category_wrap.homaa').owlCarousel({
                            nav:true,
                            loop:true
                        });
                    }
                    else {
                        $('.category_wrap.homaa').owlCarousel({
                            nav:false,
                            loop:false
                        });

                    }

                });
            });
        });


    $(document)
        .on('shopify:section:load', function(e){

            $('.testimonial_wrap').owlCarousel({
                nav:true,
                dots:false,
                margin:29,
                loop:true,
                slideBy:3,
                autoHeight: true,
                onInitialized: setOwlStageHeight,
                onResized: setOwlStageHeight,
                onTranslated: setOwlStageHeight,
                mouseDrag:false,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                responsive:{
                    0:{
                        items: 2,
                        margin: 10,
                        mouseDrag: true,
                        slideBy: 1
                    },
                    640:{
                        items: 2,
                        margin: 15,
                        mouseDrag: true,
                        slideBy: 2
                    },
                    1000:{
                        items: 3
                    }
                }
            });
            function setOwlStageHeight(event) {
                var maxHeight = 0;
                $('.testimonial_wrap .owl-item.active').each(function () { // LOOP THROUGH ACTIVE ITEMS
                    var thisHeight = parseInt( $(this).height() );
                    maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
                });
                $('.testimonial_wrap').css('height', maxHeight );
                $('.testimonial_wrap .owl-stage-outer').css('height', maxHeight ); // CORRECT DRAG-AREA SO BUTTONS ARE CLICKABLE
            }
        });
    $(document)
        .on('shopify:section:reorder', function(e){

            $('.testimonial_wrap').owlCarousel({
                nav:true,
                dots:false,
                margin:29,
                loop:true,
                slideBy:3,
                autoHeight: true,
                onInitialized: setOwlStageHeight,
                onResized: setOwlStageHeight,
                onTranslated: setOwlStageHeight,
                mouseDrag:false,
                navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
                responsive:{
                    0:{
                        items: 1,
                        margin: 10,
                        mouseDrag: true,
                        slideBy: 1
                    },
                    640:{
                        items: 2,
                        margin: 15,
                        mouseDrag: true,
                        slideBy: 2
                    },
                    1000:{
                        items: 3
                    }
                }
            });
            function setOwlStageHeight(event) {
                var maxHeight = 0;
                $('  .owl-item.active').each(function () { // LOOP THROUGH ACTIVE ITEMS
                    var thisHeight = parseInt( $(this).height() );
                    maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
                });
                $('.testimonial_wrap').css('height', maxHeight );
                $('.testimonial_wrap .owl-stage-outer').css('height', maxHeight ); // CORRECT DRAG-AREA SO BUTTONS ARE CLICKABLE
            }
        });

    $('.testimonial_wrap').owlCarousel({
        nav:true,
        dots:false,
        margin:29,
        loop:true,
        slideBy:3,
        autoHeight: true,
        onInitialized: setOwlStageHeight,
        onResized: setOwlStageHeight,
        onTranslated: setOwlStageHeight,
        mouseDrag:false,
        navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
        responsive:{
            0:{
                items: 2,
                margin: 10,
                mouseDrag: true,
                slideBy: 1
            },
            640:{
                items: 2,
                margin: 15,
                mouseDrag: true,
                slideBy: 2
            },
            1000:{
                items: 3
            }
        }
    });


    function setOwlStageHeight(event) {
        var maxHeight = 0;
        $('.testimonial_wrap .owl-item.active').each(function () { // LOOP THROUGH ACTIVE ITEMS
            var thisHeight = parseInt( $(this).height() );
            maxHeight=(maxHeight>=thisHeight?maxHeight:thisHeight);
        });
        $('.testimonial_wrap').css('height', maxHeight );
        $('.testimonial_wrap .owl-stage-outer').css('height', maxHeight ); // CORRECT DRAG-AREA SO BUTTONS ARE CLICKABLE
    }


    $(document).ready(function () {
        var expire_in_days = 2 || 3;
        if (timber.getCookie('form_submited') == 'yes') {
            $('.top_bar_save').show();
            $(".main-content").css("padding-top","40px");

            $(".cart.nm").addClass("morespaceincarticon");

        }

        if ($('.product-single__thumbnails li a').length < 5) {
            $('.product-single__thumbnails li a').css('min-height', '118px')
        }


        $(document).on('click', '.footer-newsletter .btn-success', function (e) {
            timber.setCookie('form_submited', 'yes', expire_in_days);
        });


        $(document).on('change', '.related-popup-variant', function (e) {
            var selected = $(this).val();
            var img = $('option:selected', this).data('img');
            var myprice = $('option:selected', this).data('myprice');
            if(img != ""){
                $(this).parent().find('.variant_img').attr('src', img);
            }
            $(this).parent().find('.related-popup-add-to-cart').attr('data-variant', selected);

            $(this).parent().find('.corsssellprice').html("<span class='money'>" +myprice+ "</span>");
            
        });

        
        $('.filter-mobile a').click(function(){
            $('.mobile-sort').removeClass('visible');
            $('.sidebar_wrap').toggleClass('visible');
            $('.filters-container').css('z-index', '999')
        });

        $('.mobile-sort-btn a').click(function(){
            $('.sidebar_wrap').removeClass('visible');
            $('.mobile-sort').toggleClass('visible');
            $('.filters-container').css('z-index', '0')
        });
    });


    //Zoom fix end

    $('.equal').matchHeight();
    $('.price-section').matchHeight();

    $('.collection_imga').each(function(){

        $(this).find('img').hide();
        var _Bg = 'url('+ $(this).find('img').attr('src') + ')';
        $(this).css("background-image", _Bg);
        $(this).find('img').hide();
    });
    $('.collection_imgs').each(function(){
        $(this).find('img').hide();
        var _Bg = 'url('+ $(this).find('img').attr('src') + ')';
        $(this).css("background-image", _Bg);
        $(this).find('img').hide();
    });

    $('.collection_slidee .item a').each(function(){
        $(this).find('img').hide();
        var _Bg = 'url('+ $(this).find('img').attr('src') + ')';
        $(this).css("background-image", _Bg);
        $(this).find('img').hide();
    });

    
    if($(document).scrollTop() > 0){
        $("header.header").addClass("shrink");

    } else {
        if($(document).scrollTop() == 0){
            $("header.header").removeClass("shrink");

        }
    }
    $(document).on("scroll", function(){
        if($(document).scrollTop() > 0){
            $("header.header").addClass("shrink");
            

        } else {
            if($(document).scrollTop() == 0){
                $("header.header").removeClass("shrink");
                
            }
        }
    });
    
    $('.mega_Wrap').perfectScrollbar({
        suppressScrollX:true,
    });

    var md = new MobileDetect(window.navigator.userAgent);
    if ((md.mobile() != null) || (md.tablet() != null)) {
        jQuery('.menu-open').attr("href", "javascript:;");
        $('.menu-dropdown-icon').on('click touchstart', function(){
            $('.menu-dropdown-icon').removeClass('slide');
            $(this).toggleClass('slide');
        });
//         $(document).ready(function(){"use strict";$(".menu > ul > li:has( > ul)").addClass("menu-dropdown-icon"),$(".menu > ul > li > ul:not(:has(ul))").addClass("normal-sub"),$(".menu > ul").before('<a href="#" class="menu-mobile">Navigation</a>'),$(".menu > ul > li").click(function(l){$(window).width()>320&&($(this).children("ul").stop(!0,!1).slideToggle(350),l.preventDefault())}),$(".menu > ul > li").click(function(){$(window).width()<=320&&$(this).children("ul").slideToggle(350)}),$(".menu-mobile").click(function(l){$(".menu > ul").toggleClass("show-on-mobile"),l.preventDefault()})});
    }
});




$(document).ready(function(){
    //$(".category_wrap").find(".active:last-child").css({"border": "none !important"});



    function calHeight(i){
        //var j=j;

        var divProductHeight = [];
        var divProductHeightMax;

        jQuery('.releted--products .carousel-product .grid__item').attr('style', "");


        setTimeout(function(){

            $('.releted--products .carousel-product .grid__item').each(function(){
                //debugger
                divProductHeight[i++] = $(this).height();
                //alert(divHeight);

            });

            var divProductHeightMax = Math.max.apply(Math,divProductHeight);

            if(divProductHeightMax != ''){
                $('.releted--products .carousel-product .grid__item').each(function(){
                    jQuery(this).attr('style', "height: "+divProductHeightMax+"px;");

                });

            }


        }, 3000);
    }
    function calHeightcart(m){
        //var j=j;

        var divProductHeightcart = [];
        var divProductHeightMaxcart;


        jQuery('.cart__row__related .grid__item').attr('style', "");

        setTimeout(function(){

            $('.cart__row__related .grid__item').each(function(){
                //debugger
                divProductHeightcart[m++] = $(this).height();
                //alert(divHeight);

            });
            var divProductHeightMaxcart = Math.max.apply(Math,divProductHeightcart);

            if(divProductHeightMaxcart != ''){

                $('.cart__row__related .grid__item').each(function(){
                    //  jQuery(this).attr('style', "height: "+divProductHeightMaxcart+"px;");

                });
            }

        }, 2000);
    }
    var i =0;
    var j =0;
    var k =0, l=0;
    var m=0;

    calHeight(i);
    calHeightcart(m);
    $(window).resize(function() {

        var i=0;
        var j=0, k=0, l=0;
        var m=0;
        calHeight(i);
        calHeightcart(m);
        //calculateheight(i, k, l);
    });
});

$(document).on("scroll", function(){
    if($(document).scrollTop() > 50 ){
        $(".titlecol").addClass("fix-cart-header");
    }
    else
    {
        $(".titlecol").removeClass("fix-cart-header");

    }
});


(function() {

    $(".panel").on("show.bs.collapse hide.bs.collapse", function(e) {
        if (e.type=='show'){
            $(this).addClass('active');
        }else{
            $(this).removeClass('active');
        }
    });

}).call(this);

$(document).ready(function () {
    var ReleaseSlider = $('.category_wrap_collectionn');
    ReleaseSlider.find('.slide-new').removeClass('col-sm-4');
    ReleaseSlider.find('.slide-new').each(function(){
        $(this).wrap('<div class="item"></div>');
    });
    $('.category_wrap_collectionn').owlCarousel({
        nav: true,
        dots: false,

        navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
        loop: true,
        responsive:{
            0:{
                items:2,
                slideBy: 2,
                stagePadding: 30 
            },
            300:{
                items:2,
                slideBy: 2,
                stagePadding: 35
            },
            350:{
                items:2,
                slideBy: 2,
                stagePadding: 40
            },
            400:{
                items:2,
                slideBy: 2,
                stagePadding: 45
            },
            450:{
                items:2,
                slideBy: 2,
                stagePadding: 50
            },
            500:{
                items:2,
                slideBy: 2,
                stagePadding: 55
            },
            550:{
                items:2,
                slideBy: 2,
                stagePadding: 60
            },
            600:{
                items:2,
                slideBy: 2,
                stagePadding: 65
            },
            650:{
                items:2,
                slideBy: 2,
                stagePadding: 70
            },
            700:{
                items:2,
                slideBy: 2,
                stagePadding: 75
            },
            750:{
                items:2,
                slideBy: 2,
                stagePadding: 80
            },
            800:{
                items:2,
                slideBy: 2,
                stagePadding: 85
            },
            850:{
                items:2,
                slideBy: 2,
                stagePadding: 90
            },
            900:{
                items:2,
                slideBy: 2,
                stagePadding: 95
            },
            1000:{
                items:5,
                slideBy: 5
            }
        }
    });

    var viewport = $(window).width();
    var itemCount = $('.category_wrap_collectionn .owl-stage-outer .owl-stage > div').length;
    if((viewport >= 768 && itemCount > 5) || (viewport <= 767 && itemCount > 2)) {
        $('.category_wrap_collectionn .owl-controls').show();
    } else {
        $('.category_wrap_collectionn .owl-controls').hide();
    }
    $( window ).resize(function() {
        var viewport = $(window).width();
        var itemCount = $('.category_wrap_collectionn .owl-stage-outer .owl-stage > div').length;
        if((viewport >= 768 && itemCount > 5) || (viewport <= 767 && itemCount > 2)) {
            $('.category_wrap_collectionn .owl-controls').show();
        } else {
            $('.category_wrap_collectionn .owl-controls').hide();
        }
        $('.category_wrap.homaa').each(function(){
            var viewport = $(window).width();
            var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
            if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                $(this).find('.owl-controls').show();
            } else {
                $(this).find('.owl-controls').hide();
            }
        });
    });
});
var valueofstrange = 1;
let didScrollmobile = false;
let scrollAmt = 0;
let targetScroll = $(document).height() / 2;
let minScroll = $(document).height() / 10;
let acheivedTarget = false;
function exitPopupForMobile(){
    // debugger;
    
}

function initializeMobileEvent(){
    if($(window).width() < 768){

        $(window).on('scroll',function(){
            didScrollmobile = true;
            if(scrollAmt >= targetScroll){
                acheivedTarget = true;
            }
            scrollAmt = $(window).scrollTop();
        });

        setInterval(exitPopupForMobile,250);
    }
}
$(document).ready(function() {
    targetScroll = $(document).height() / 2;
    
    $("#code_div").append('WOW0821240209BLCLJLLLML');
    if($(window).width() > 768){
        if (!$.cookie('popupcookie')){
            
        } else {
            timber.bodySaveBar();
        }
    } else {
        initializeMobileEvent();
    }
    showEntryPopup();
});



if (valueofstrange == 1)
{
    function showEntryPopup() {

        if (!$.cookie('popuppurcookie') && !$.cookie('popupcookie')){
            
        } else {
            timber.bodySaveBar();
        }
    }
}




$(function() {
    //$('nav#menu').mmenu();
    $("nav#menu").mmenu({}, {
        classNames: {
            fixedElements: {
                fixed: "fix"
            }
        }
    });
    var API = $("nav#menu").data( "mmenu" );
    $("#mmmenu-close-button").click(function() {
        API.close();
    });
});
$('.cart').click(function () {
    $('.cart-item').slideDown("300");
});
$('.cart').mouseleave(function(){
    $('.cart-item').hide();
});

//       $(function() {
//         $('#searchlink').click(function(){
//           $('.search_panel').slideDown();
//         })
//         $('.search-close').click(function(){
//           $(this).parent().slideUp();
//         })
//       });

$(function() {

    $('#searchlink').on('click', function(e){

        if($('.search_panel').hasClass('searchdown')) {
            $('.search_panel').removeClass('searchdown');
        } else {
            $('.search_panel').addClass('searchdown');
            $('#search_query').focus();
        }
        if($('.search_panel').hasClass('open')) {
            $('.search_panel').removeClass('open');
        } else {
            $('.search_panel').addClass('open');
        }
        // $('.search_panel').toggleClass('open').stop().slideToggle(250);

    });
});



$(function () {
    timber.progressStriped();
});



//Slider Control
jQuery(document).ready(function(){

//smooth scrolling

    $('.go-top').on('click',function (e) {
        e.preventDefault();
        var target =  $('#top'),
            $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 700, 'swing', function () {

        });
    });

// Back to Top
    // Show or hide the sticky footer button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            if ($('.fix-cart').length && $('.fix-cart').hasClass('cart-bar')) {
                $('.go-top').css('bottom', '8em')
            } else {
                $('.go-top').css('bottom', '4em')
            }
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
    });

    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 700);
    });

});

function hide_goods_in_cart (){
    $.getJSON('/cart.js', function (cart, textStatus) {
        //Setup free shipping header
        var product_ids_in_cart = [];
        $.each(cart.items, function(k, v) {
            product_ids_in_cart[k] = v.id;
        });

        $.each($('.r_addtocartbutton button'), function(k, v) {
            var btn = $(this);
            $.each(product_ids_in_cart, function (x, y) {
                if ($(v).attr('onclick').indexOf(y) != -1) {
                    btn.attr('disabled', 'disabled' ).find('.r_AddToCartText').text('In cart').css('color', '#2b73df');
                }
            });
        });



    });
}


(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


if($(window).width() < 767){
    $(".main-content").on('click',':not(.header-search)', function (e) {

        $('.search_panel').removeClass('searchdown');

    });
}


function DropDown(el) {
    this.dd = el;
    this.placeholder = this.dd.children('span');
    this.opts = this.dd.find('ul.list > li');
    this.val = '';
    this.index = -1;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('open');
            return false;
        });

        obj.opts.on('click',function(){
            var opt = $(this);
            obj.val = opt.html();
            obj.index = opt.index();
            obj.placeholder.html(obj.val);
        });
    },
    getValue : function() {
        return this.val;
    },
    getIndex : function() {
        return this.index;
    }
}

$(function() {
    var dd = new DropDown( $('.dd-form') );

    $(document).click(function() {
        $('.slim').removeClass('open');
    });

});




setTimeout(function(){
    //$('.category_wrap .owl-item').matchHeight();
}, 1000);

setInterval(function(){
    // $.fn.matchHeight._update()
},500);





$(window).bind("load", function() {
    free_shipping_update();

    
    $('.sticky_bar').css("visibility", "visible");
    
});

function free_shipping_update() {
    setTimeout(function () {
        
        var header_related_msg = $('#related_shipping_msg').html();
        var strip_bar_msg = $('#top_strip_shipping_msg').html();
        var product_page_msg = $('#product_page_msg').html();
        var sticky_bar_msg = $('#sticky_bar_shipping_msg').html();
        var common_bar_msg = $('#common_shipping_msg').html();
        var popup_model_bar_msg = $('#popup_model_shipping_msg').html();
        var stats_bar_msg = $('#stats_shipping_msg').html();
        var badage_bar_msg = $('#badage_shipping_msg').html();
        var mobile_bar_bar_msg = $('#mobile_bar_shipping_msg').html();
        var formated = "";

        if (header_related_msg != "" && header_related_msg != undefined) {
            $(".related_free_shipping_text").html(header_related_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }

        if (strip_bar_msg != "" && strip_bar_msg != undefined) {
            $(".free_shipping_top_strip").html(strip_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
            $(".shipping_bar").find('.countryName').css('opacity', '1');
            $(".shipping_bar").find('.flagImg').css('opacity', '1');
        }

        if (product_page_msg != "" && product_page_msg != undefined) {
            $("#free_shipping_product_page").html(product_page_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
            $(".motivator--text").find('.countryName').css('opacity', '1');
            $(".motivator--text").find('.flagImg').css('opacity', '1');
        }

        if (sticky_bar_msg != "" && sticky_bar_msg != undefined) {
            $(".sticky_bar_text").html(sticky_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
            $(".sticky_bar_timer").show();
        }

        if (common_bar_msg != "" && common_bar_msg != undefined) {
            $(".common_shipping_text").html(common_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }


        if (popup_model_bar_msg != "" && popup_model_bar_msg != undefined) {
            $(".popup_model_shipping_text").html(common_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }
        if (stats_bar_msg != "" && stats_bar_msg != undefined) {
            $(".stats_shipping_text").html(common_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }

        if (badage_bar_msg != "" && badage_bar_msg != undefined) {
            $(".badage_shipping_text").html(badage_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }

        if (mobile_bar_bar_msg != "" && mobile_bar_bar_msg != undefined) {
            $(".mobile_bar_shipping_text").html(mobile_bar_bar_msg.replace('XX', formated).replace('$$', formated).replace('$x', formated).replace('$X', formated).replace('SYMBOL', ''));
        }
        
    }, 300);
}

// $('.equal-line').matchHeight();

document.addEventListener("DOMContentLoaded",
    function() {
        var div, n,
            v = document.getElementsByClassName("youtube-player");
        for (n = 0; n < v.length; n++) {
            div = document.createElement("div");
            div.setAttribute("data-id", v[n].dataset.id);
            div.innerHTML = labnolThumb(v[n].dataset.id);
            div.onclick = labnolIframe;
            v[n].appendChild(div);
        }
    });

function labnolThumb(id) {
    var thumb = '<img src="https://i.ytimg.com/vi/ID/hqdefault.jpg">',
        play = '<div class="play"></div>';
    return thumb.replace("ID", id) + play;
}

function labnolIframe() {
    var iframe = document.createElement("iframe");
    var embed = "https://www.youtube.com/embed/ID?autoplay=1";
    iframe.setAttribute("src", embed.replace("ID", this.dataset.id));
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "1");
    this.parentNode.replaceChild(iframe, this);
}

$(document).ready(function () {
    $('#currencies').selectpicker();

    if ($.cookie('currencynewcookie')) {
        //jQuery('[name=currencies]').val($.cookie("currencynewcookie")).change();
        //jQuery('.selectedvalue').text($.cookie("currencynewcookie"));
    }
});
$('li > a.menu-open').each(function(){
    var $this = $(this);
    $this.hover(function(){

        $this.next('ul').find('.equal-line').matchHeight();
    });
});


$(".nav-tabs a").click(function(){
    $(this).tab('show');
});




$('.close-btn').click(function(){
    $(this).parents('.top_bar_save').slideUp(200);
});

//     $('.category_wrap .grid__item').matchHeight();
$( document ).ready(function() {
    var selectedvalue = $('.currencies').val();
    $('.selectedvalue').html(selectedvalue);
    $('.list li').click(function(){
        var datavalue = $(this).attr('data-value');
        $('.currencies').val(datavalue);
        $('.currencies').trigger('change');
        $('.selectedvalue').html(datavalue);

        $.cookie("currencynewcookie", datavalue, {
            path: '/',          // The value of the path attribute of the cookie
                                // (Default: path of page that created the cookie).
        });

        free_shipping_update();
    });

    var APII = $("nav#menu").data( "mmenu" );
    $('.andree li').click(function(){
        var datavalue = $(this).attr('data-value');
        $('.currencies').val(datavalue);
        $('.currencies').trigger('change');
        $('.selectedvalue').html(datavalue);

        $.cookie("currencynewcookie", datavalue, {

            path    : '/',          // The value of the path attribute of the cookie
                                    // (Default: path of page that created the cookie).



        });

        $( "a.mm-btn.mm-prev" ).last().trigger( "click" );
        free_shipping_update();
    });
});




/// Live search
var preLoadLoadGif = $('<img src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/ajax-load.gif?v=147398866055238942101566832976" />');
var searchTimeoutThrottle = 500;
var searchTimeoutID = -1;
var currReqObj = null;
$(document).on('keyup change', '.search_panel input[type="text"]', function(){
    var $resultsBox = $('.search_panel .results-box');
    if($resultsBox.length == 0) {
        $resultsBox = $('<div class="results-box" />').appendTo('.search-box');
    }

    //Only search if search string longer than 2, and it has changed
    if($(this).val().length > 2 && $(this).val() != $(this).data('oldval')) {
        //Reset previous value
        $(this).data('oldval', $(this).val());

        // Kill outstanding ajax request
        if(currReqObj != null) currReqObj.abort();

        // Kill previous search
        clearTimeout(searchTimeoutID);

        var $form = $(this).closest('form');

        //Search term
        var term = '*' + $form.find('input[name="q"]').val() + '*';

        //Types
        var types = $form.find('input[name="type"]').val();

        //URL for full search page
        var linkURL = $form.attr('action') + '?type=' + types + '&q=' + term;

        //Show loading
        $resultsBox.html('<div class="load"><img src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/ajax-load.gif?v=147398866055238942101566832976"></div>');

        // Do next search (in X milliseconds)
        searchTimeoutID = setTimeout(function(){
            //Ajax hit on search page
            currReqObj = $.ajax({
                url: $form.attr('action'),
                data: {
                    type: types,
                    view: 'json',
                    q: term,
                },
                dataType: "json",
                success: function(data){
                    currReqObj = null;
                    if(data.results_total == 0) {
                        //No results
                        $resultsBox.html('<div class="note">'+ "No results found" +'</div>');
                    } else {
                        //Numerous results
                        $resultsBox.empty();
                        var current = 0;
                        $.each(data.results, function(index, item){

                            var $row = $('<a></a>').attr('href', item.url);
                            $row.append('<div class="img"><img src="' + item.thumbnail + '" /></div>');
                            $row.append('<div class="search-title">'+item.title + '</div>');
                            if(isNaN(item.price)) {
                                if(item.object_type == 'product')
                                {
                                    $row.append(('<div class="serach-price"><span class="money">'+item.price+'</span></div>'));
                                }
                            }

                            $resultsBox.append($row);
                            current++;
                            if (current >= 5 )
                            {
                                return false;
                            }
                        });
                        $resultsBox.append([
                            '<a href="', linkURL, '" class="note">',
                            "See all results ",
                            '(', data.results_count, ')</a>'].join(''));
                    }

                    var cookieCurrency = Currency.cookie.read();
                    if (window.money_default !== cookieCurrency && cookieCurrency != "" && cookieCurrency != null) {

                        Currency.convertAll(window.money_default, cookieCurrency);
                    }
                }
            });
        }, searchTimeoutThrottle);
    } else if ($(this).val().length <= 2) {
        //Deleted text? Clear results
        $resultsBox.empty();
    }
});
$(document).on('focusin', '.search_panel input[type="text"]', function(){
    // show existing results
    $('#pageheader .search-box .results-box').show();
});
$(document).on('click', '.search_panel input[type="text"]', function(e){
    $('.search_panel .results-box').show();
    return false; // prevent body from receiving click event
});
$('body').bind('click', function(){
    //Click anywhere on page, hide results
    $('.search_panel .results-box').hide();
});

//Search box should mimic live search string: products only, partial match
$(document).on('submit', '.search-form, #search-form', function(e){
    e.preventDefault();
    var term = '*' + $(this).find('input[name="q"]').val() + '*';
    var linkURL = $(this).attr('action') + '?type=product&q=' + term;
    window.location = linkURL;
});


/// Live search
var preLoadLoadGif = $('<img src="//cdn.shopify.com/s/files/1/0251/0179/t/17/assets/ajax-load.gif?12730148446180618072" />');
var searchTimeoutThrottle = 500;
var searchTimeoutID = -1;
var currReqObj = null;
$(document).on('keyup change', '.ftr input[type="search"]', function(){
    var $resultsBox = $('.ftr .results-box-footer');
    if($resultsBox.length == 0) {
        $resultsBox = $('<div class="results-box-footer" />').appendTo('.search-box');
    }

    //Only search if search string longer than 2, and it has changed
    if($(this).val().length > 2 && $(this).val() != $(this).data('oldval')) {
        //Reset previous value
        $(this).data('oldval', $(this).val());

        // Kill outstanding ajax request
        if(currReqObj != null) currReqObj.abort();

        // Kill previous search
        clearTimeout(searchTimeoutID);

        var $form = $(this).closest('form');

        //Search term
        var term = '*' + $form.find('input[name="q"]').val() + '*';

        //Types
        var types = $form.find('input[name="type"]').val();

        //URL for full search page
        var linkURL = $form.attr('action') + '?type=' + types + '&q=' + term;

        //Show loading
        $resultsBox.html('<div class="load"><img src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/ajax-load.gif?v=147398866055238942101566832976"></div>');

        // Do next search (in X milliseconds)
        searchTimeoutID = setTimeout(function(){
            //Ajax hit on search page
            currReqObj = $.ajax({
                url: $form.attr('action'),
                data: {
                    type: types,
                    view: 'json',
                    q: term,
                },
                dataType: "json",
                success: function(data){
                    currReqObj = null;
                    if(data.results_total == 0) {
                        //No results
                        $resultsBox.html('<div class="note">'+ "No results found" +'</div>');
                    } else {
                        //Numerous results
                        $resultsBox.empty();
                        var current = 0;
                        $.each(data.results, function(index, item){
                            var $row = $('<a></a>').attr('href', item.url);
                            $row.append('<div class="img"><img src="' + item.thumbnail + '" /></div>');
                            $row.append('<div class="search-title">'+item.title + '</div>');
                            if(isNaN(item.price)) {
                                if(item.object_type == 'product')
                                {
                                    $row.append(('<div class="serach-price"><span class="money">'+item.price+'</span></div>'));
                                }
                            }

                            $resultsBox.append($row);
                            current++;
                            if (current >= 1)
                            {
                                return false;
                            }
                        });
                        $resultsBox.append([
                            '<a href="', linkURL, '" class="note">',
                            "See all results ",
                            '(', data.results_count, ')</a>'].join(''));
                    }
                }
            });
        }, searchTimeoutThrottle);
    } else if ($(this).val().length <= 2) {
        //Deleted text? Clear results
        $resultsBox.empty();
    }
});
$(document).on('focusin', '.ftr input[type="search"]', function(){
    // show existing results
    $('#pageheader .ftr .results-box-footer').show();
});
$(document).on('click', '.ftr input[type="search"]', function(e){
    $('.ftr .results-box-footer').show();
    return false; // prevent body from receiving click event
});
$('body').bind('click', function(){
    //Click anywhere on page, hide results
    $('.ftr .results-box-footer').hide();
});

//Search box should mimic live search string: products only, partial match
$(document).on('submit', '.search-form, #search-form', function(e){
    e.preventDefault();
    var term = '*' + $(this).find('input[name="q"]').val() + '*';
    var linkURL = $(this).attr('action') + '?type=product&q=' + term;
    window.location = linkURL;
});










/// Live search
var preLoadLoadGif = $('<img src="//cdn.shopify.com/s/files/1/0251/0179/t/17/assets/ajax-load.gif?12730148446180618072" />');
var searchTimeoutThrottle = 500;
var searchTimeoutID = -1;
var currReqObj = null;
$(document).on('keyup change', '.fourofour input[type="search"]', function(){
    var $resultsBox = $('.fourofour .results-box-fourofour');
    if($resultsBox.length == 0) {
        $resultsBox = $('<div class="results-box-fourofour" />').appendTo('.search-box');
    }

    //Only search if search string longer than 2, and it has changed
    if($(this).val().length > 2 && $(this).val() != $(this).data('oldval')) {
        //Reset previous value
        $(this).data('oldval', $(this).val());

        // Kill outstanding ajax request
        if(currReqObj != null) currReqObj.abort();

        // Kill previous search
        clearTimeout(searchTimeoutID);

        var $form = $(this).closest('form');

        //Search term
        var term = '*' + $form.find('input[name="q"]').val() + '*';

        //Types
        var types = $form.find('input[name="type"]').val();

        //URL for full search page
        var linkURL = $form.attr('action') + '?type=' + types + '&q=' + term;

        //Show loading
        $resultsBox.html('<div class="load"><img src="//cdn.shopify.com/s/files/1/2110/6029/t/5/assets/ajax-load.gif?v=147398866055238942101566832976"></div>');

        // Do next search (in X milliseconds)
        searchTimeoutID = setTimeout(function(){
            //Ajax hit on search page
            currReqObj = $.ajax({
                url: $form.attr('action'),
                data: {
                    type: types,
                    view: 'json',
                    q: term,
                },
                dataType: "json",
                success: function(data){
                    currReqObj = null;
                    if(data.results_total == 0) {
                        //No results
                        $resultsBox.html('<div class="note">'+ "No results found" +'</div>');
                    } else {
                        //Numerous results
                        $resultsBox.empty();
                        var current = 0;
                        $.each(data.results, function(index, item){
                            var $row = $('<a></a>').attr('href', item.url);
                            $row.append('<div class="img"><img src="' + item.thumbnail + '" /></div>');
                            $row.append('<div class="search-title">'+item.title + '</div>');
                            if(isNaN(item.price)) {
                                if(item.object_type == 'product')
                                {
                                    $row.append(('<div class="serach-price"><span class="money">'+item.price+'</span></div>'));
                                }
                            }

                            $resultsBox.append($row);
                            current++;
                            if (current >= 1)
                            {
                                return false;
                            }
                        });
                        $resultsBox.append([
                            '<a href="', linkURL, '" class="note">',
                            "See all results ",
                            '(', data.results_count, ')</a>'].join(''));
                    }
                }
            });
        }, searchTimeoutThrottle);
    } else if ($(this).val().length <= 2) {
        //Deleted text? Clear results
        $resultsBox.empty();
    }
});
$(document).on('focusin', '.fourofour input[type="search"]', function(){
    // show existing results
    $('#pageheader .fourofour .results-box-fourofour').show();
});
$(document).on('click', '.fourofour input[type="search"]', function(e){
    $('.fourofour .results-box-fourofour').show();
    return false; // prevent body from receiving click event
});
$('body').bind('click', function(){
    //Click anywhere on page, hide results
    $('.fourofour .results-box-fourofour').hide();
});

//Search box should mimic live search string: products only, partial match
$(document).on('submit', '.search-form, #search-form', function(e){
    e.preventDefault();
    var term = '*' + $(this).find('input[name="q"]').val() + '*';
    var linkURL = $(this).attr('action') + '?type=product&q=' + term;
    window.location = linkURL;
});



$( document ).ready(function() {
    if ($("header .sticky_bar.large--hide").length > 0) {
        $(".main-content").addClass("main-content-space");
    }
});



$('.search_form input').click(function(){
    $('body').addClass('search-overlay-show')
});

$('.search-overlay').click(function(){
    $('body').removeClass('search-overlay-show')
});

(function() {
    //shopify rewrite
    if(Shopify && typeof Shopify === 'object') {
        Shopify.handleize = function (str) {
            return str.toLowerCase().replace(/[-!"#$%&'()* ,./:;<=>?@[\\\]_`{|}~]+/g, "-").replace(/^-+|-+$/g, "");
        };
    }

    //global
    window.theme = window.theme || {};

    var $body = $('body'),
        mobDetect;

    //functions
    theme.generateCounter = function (selector, settings) {
        var $elems = $(selector).not('.init-counter');

        if(!$elems.length) {
            return;
        }

        var stroke = 3,
            cookie_name = 'counter',
            cookie_settings = {},
            cookie_date,
            current_value;

        if(settings.cookie && settings.cookie_namespace) {
            cookie_name += '.' + settings.cookie_namespace;
        }

        if(settings.cookie && typeof window.product_values !== 'undefined') {
            cookie_name += '.' + window.product_values.handle;
        }

        var randomInteger = function(min, max) {
            return Math.round(min - 0.5 + Math.random() * (max - min + 1));
        };

        var setValue = function(is_interval) {
            var new_value,
                cookie_value = $.cookie(cookie_name);

            if(settings.cookie && $.isNumeric(+cookie_value) && !is_interval) {
                new_value = cookie_value;
            } else {
                new_value = randomInteger(settings.min, settings.max);

                if(settings.set_int && current_value && Math.abs(current_value - new_value) > stroke) {
                    new_value = new_value > current_value ? current_value + stroke : current_value - stroke;
                    new_value = randomInteger(current_value, new_value);
                }

                if(settings.cookie) {
                    cookie_date = new Date();
                    cookie_date.setTime(cookie_date.getTime() + (30 * 60 * 1000));

                    cookie_settings.expires = cookie_date;

                    $.cookie(cookie_name, new_value, cookie_settings);
                }
            }

            $elems.html(new_value);

            current_value = new_value;
        };

        setValue();

        if(settings.set_int) {
            (function randomInterval() {
                setTimeout(function() {
                    setValue(true);
                    randomInterval();
                }, randomInteger(Math.max(0, settings.set_int - 2000), settings.set_int + 2000));
            })();
        }

        $elems.addClass('init-counter');
    };

    //modules
    theme.ProductOptions = function() {

        function ProductOptions() {
            this.selectors = {
                elems: '.js-product-options',
                wrapper: '[data-product-options-wrapper]',
                control: '[data-product-control]',
                property: '[data-property]',
                value: '[data-value]',
                variants: '[data-product-options-variants]',
                price: '[data-product-options-price]',
                save_two: '[data-product-options-price-save-two]',
                add_to_cart: '[data-product-options-add-to-cart]'
            };

            this.attr = {
                property: 'data-property',
                value: 'data-value',
                variants: 'data-variants',
                default_variant_id: 'data-default-variant-id'
            };

            this.load();
        };

        ProductOptions.prototype = $.extend({}, ProductOptions.prototype, {
            load: function() {
                var _ = this;

                $body.on('click', this.selectors.elems + ' ' + this.selectors.value, function() {
                    var $this = $(this);

                    if($this.hasClass('active') || $this.hasClass('disabled')) {
                        return;
                    }

                    var $options = $this.parents(_.selectors.elems),
                        $property = $this.parents(_.selectors.property).first(),
                        $property_values = $property.find(_.selectors.value),
                        $control = $this.parents(_.selectors.control),
                        $wrapper = $this.parents(_.selectors.wrapper),
                        id = $control.attr('data-id'),
                        json_products = JSON.parse($wrapper.find('[id^="product-json-' + id + '"]').html()),
                        json_variants = json_products.variants,
                        current_values = [],
                        is_variant_present = true,
                        $values,
                        current_variant,
                        data_default_variant_id;

                    $property_values.removeClass('active');
                    $this.addClass('active');

                    $values = $this.parents(_.selectors.elems).find(_.selectors.value).filter('.active');

                    $values.each(function() {
                        current_values.push($(this).attr(_.attr.value));
                    });

                    $.each(json_variants, function() {
                        var is_this_variant = true;

                        $.each(this.options, function(i, v) {
                            if(Shopify.handleize(v) !== current_values[i]) {
                                is_this_variant = false;
                                return false;
                            }
                        });

                        if(is_this_variant) {
                            current_variant = this;
                            return false;
                        }
                    });

                    if(!current_variant) {
                        is_variant_present = false;
                        data_default_variant_id = JSON.parse($options.attr(_.attr.default_variant_id));

                        $.each(json_variants, function() {
                            if(+this.id === +data_default_variant_id) {
                                current_variant = this;
                                return false;
                            }
                        });
                    }

                    _._updateContent($wrapper, {
                        current_variant: current_variant,
                        is_variant_present: is_variant_present
                    });

                    _._updateVariants($wrapper, {
                        current_variant: current_variant
                    });
                });

                $body.on('change', this.selectors.variants, function() {
                    var $this = $(this),
                        $control = $this.parents(_.selectors.control),
                        $wrapper = $this.parents(_.selectors.wrapper),
                        val = $this.val(),
                        id = $control.attr('data-id'),
                        json_products = JSON.parse($wrapper.find('[id^="product-json-' + id + '"]').html()),
                        json_variants = json_products.variants;

                    $.each(json_variants, function() {
                        if(+this.id === +val) {
                            current_variant = this;
                            return false;
                        }
                    });

                    _._updateContent($wrapper, {
                        current_variant: current_variant,
                        is_variant_present: true
                    });
                });
            },
            _updateContent: function($wrapper, data) {
                this._updatePrice($wrapper, data);
                this._updateAddToCart($wrapper, data);
            },
            _updateVariants: function($wrapper, data) {
                var $variants = $wrapper.find(this.selectors.variants);

                if(!$variants.length) {
                    return;
                }

                $variants.val(data.current_variant.id);
            },
            _updatePrice: function($wrapper, data) {
                var $price = $wrapper.find(this.selectors.price),
                    $save_two = $wrapper.find(this.selectors.save_two),
                    price_html = '',
                    save_price;

                if(!$price.length) {
                    return;
                }

                price_html += '<span class="price no-compare-price"><span class="money">';
                price_html += Shopify.formatMoney(data.current_variant.price, window.money_format);
                price_html += '</span> </span>';

                if(data.current_variant.compare_at_price) {
                    price_html += '<strike><span class="money compare-price">';
                    price_html += Shopify.formatMoney(data.current_variant.compare_at_price, window.money_format);
                    price_html += '</span></strike>';
                }

                $price.html(price_html);

                if(data.current_variant.compare_at_price) {
                    save_price = Math.round((data.current_variant.compare_at_price - data.current_variant.price) * 100 / data.current_variant.compare_at_price);
                    $save_two.html(window.strings.product.price_save_two.replace('{value}', save_price)).show();
                } else {
                    $save_two.html('').hide();
                }

                Currency.convertAll(window.money_default, $('[name=currencies]').val());
            },
            _updateAddToCart: function($wrapper, data) {
                var $add_to_cart = $wrapper.find(this.selectors.add_to_cart),
                    is_available = data.is_variant_present && data.current_variant.available;

                if(!$add_to_cart.length) {
                    return;
                }

                $add_to_cart[is_available ? 'removeAttr' : 'attr']('data-status', 'sold-out')[is_available ? 'removeAttr' : 'attr']('disabled', 'disabled');
            }
        });

        theme.ProductOptions = new ProductOptions;
    };

    theme.StatsAppPusher = function() {

        function StatsAppPusher() {
            this.settings = {

            };
        };

        StatsAppPusher.prototype = $.extend({}, StatsAppPusher.prototype, {
            load: function () {
                if(!window.Pusher) {
                    return;
                }

                $.each(this.listeners, function (event, callback_arr) {
                    var pusher = new Pusher(StatsApp.pusher, {
                        cluster: 'eu',
                        forceTLS: true
                    });

                    var channel = pusher.subscribe('stats.' + StatsApp.data.iid);

                    channel.bind(event, function(data) {
                        $.each(callback_arr, function() {
                            this(data);
                        });
                    });
                });
            },
            listeners: {},
            addEvent: function (event, callback) {
                if(!this.listeners[event]) {
                    this.listeners[event] = [];
                }

                this.listeners[event].push(callback);
            }
        });

        theme.StatsAppPusher = new StatsAppPusher;
    };

    theme.StatsAppVisitors = function() {

        function StatsAppVisitors() {
            this.settings = {
                url_set: '/api/visitor/set',
                url_get: '/api/visitor/get',
                cookie_namespace: 'visitors'
            };

            this.dom = {};

            this.load();
        };

        StatsAppVisitors.prototype = $.extend({}, StatsAppVisitors.prototype, {
            load: function() {
                var _ = this,
                    cookie_name = this.settings.cookie_namespace,
                    cookie_settings = {},
                    date;

                this.dom.$visitors = $('.js-statsapp-visitors-counter');

                if(StatsApp.visitors.settings.statistics_type === 'product' && window.product_values) {
                    cookie_name += '.' + window.product_values.handle;
                }

                if($.cookie(cookie_name) !== 'true') {
                    date = new Date();
                    date.setTime(date.getTime() + (StatsApp.visitors.settings.session_duration * 60 * 1000));

                    cookie_settings.expires = date;

                    if(StatsApp.visitors.settings.statistics_type === 'all') {
                        cookie_settings.path = '/';
                    }

                    $.cookie(cookie_name, 'true', cookie_settings);

                    this._set(function(data) {
                        if(window.product_values && _.dom.$visitors.length) {
                            _.updateCounter(data.visitors);
                        }
                    });
                } else if(window.product_values && this.dom.$visitors.length) {
                    this._get(function(data) {
                        _.updateCounter(data.visitors);
                    });
                }

                if(window.product_values && this.dom.$visitors.length) {
                    theme.StatsAppPusher.addEvent('App\\Events\\updateVisitors', function(data) {
                        if(StatsApp.visitors.settings.statistics_type === 'all' || (StatsApp.visitors.settings.statistics_type === 'product' && data.url === StatsApp.visitors.data.page_handle)) {
                            _.updateCounter(data.visitors);
                        }
                    });
                }
            },
            _set: function(callback) {
                $.ajax({
                    type: 'POST',
                    url: StatsApp.url + this.settings.url_set,
                    data: $.extend({}, StatsApp.data, StatsApp.visitors.data),
                    success: callback
                });
            },
            _get: function(callback) {
                $.ajax({
                    type: 'POST',
                    url: StatsApp.url + this.settings.url_get,
                    data: $.extend({}, StatsApp.data, StatsApp.visitors.data),
                    success: callback
                });
            },
            updateCounter: function(count) {
                this.dom.$visitors.text(count);
            }
        });

        theme.StatsAppVisitors = new StatsAppVisitors;
    };

    theme.StatsAppOrders = function() {

        function StatsAppOrders() {
            this.settings = {
                url_get: '/api/order/get'
            };

            this.dom = {};

            this.load();
        };

        StatsAppOrders.prototype = $.extend({}, StatsAppOrders.prototype, {
            load: function() {
                var _ = this;

                this.dom.$orders = $('.js-statsapp-orders-counter');

                if(window.product_values && this.dom.$orders.length) {
                    this._get(function(data) {
                        _.updateCounter(data.items);
                    });

                    theme.StatsAppPusher.addEvent('App\\Events\\newOrder', function(data) {
                        if(StatsApp.orders.settings.statistics_type === 'all' || (StatsApp.orders.settings.statistics_type === 'product' && window.product_values && data.orderInfo.product_id === window.product_values.id)) {
                            _._get(function(data) {
                                _.updateCounter(data.items);
                            });
                        }
                    });
                }
            },
            _get: function(callback) {
                $.ajax({
                    type: 'POST',
                    url: StatsApp.url + this.settings.url_get,
                    data: $.extend({}, StatsApp.data, StatsApp.orders.data),
                    success: callback
                });
            },
            updateCounter: function(count) {
                // let minQty = Math.ceil(10);
                // let maxQty = Math.floor(15);
                // let randomQuantity = parseInt(Math.floor(Math.random() * (maxQty - minQty + 1)) + minQty);
                // let qty = count > 2 ? count : randomQuantity;
                if (count < 1) {
//                      $('.flash--total-sold').hide();
                    //$('.js-statsapp-orders-counter').hide();
                    $(this.dom.$orders).closest('.owl-item').remove();
                    var $slider = $('[data-js-slider]');
                    //$slider.trigger('refresh.owl.carousel');
                    $slider.trigger('destroy.owl.carousel');
                    $slider.html($slider.find('.owl-stage-outer').html()).removeClass('owl-loaded');
                    $slider.owlCarousel({
                        loop: true,
                        items: 1,
                        autoplay: true,
                        autoPlaySpeed: +$slider.attr('data-dur') || 5000,
                        autoplayHoverPause: false,
                        nav: false,
                        touchDrag:false
                    });
                } else {
                    $('.flash--total-sold').removeAttr('style');
                }

                this.dom.$orders.text(count);
            }
        });

        theme.StatsAppOrders = new StatsAppOrders;
    };

    theme.StatsAppAddedtocart = function() {

        function StatsAppAddedtocart() {
            this.settings = {
                url_get: '/api/cart/get'
            };

            this.dom = {};

            this.load();
        };

        StatsAppAddedtocart.prototype = $.extend({}, StatsAppAddedtocart.prototype, {
            load: function() {
                var _ = this;

                this.dom.$addedtocart = $('.js-statsapp-addedtocart-counter');

                if(window.product_values && this.dom.$addedtocart.length) {
                    this._get(function(data) {
                        _.updateCounter(data.items);
                    });
                }
            },
            _get: function(callback) {
                $.ajax({
                    type: 'POST',
                    url: StatsApp.url + this.settings.url_get,
                    data: $.extend({}, StatsApp.data, StatsApp.addedtocart.data),
                    success: callback
                });
            },
            updateCounter: function(count) {
                this.dom.$addedtocart.text(count);
            }
        });

        theme.StatsAppAddedtocart = new StatsAppAddedtocart;
    };

    theme.StatsAppPercent = function() {

        function StatsAppPercent() {
            this.settings = {
                url_get: '/api/order/getPercent'
            };

            this.dom = {};

            this.load();
        };

        StatsAppPercent.prototype = $.extend({}, StatsAppPercent.prototype, {
            load: function() {
                var _ = this;

                this.dom.$percent = $('.js-statsapp-multibuy-counter');

                if(window.product_values && this.dom.$percent.length) {
                    this._get(function(data) {
                        _.updateCounter(data.percent);
                    });
                }
            },
            _get: function(callback) {
                $.ajax({
                    type: 'POST',
                    url: StatsApp.url + this.settings.url_get,
                    data: $.extend({}, StatsApp.data, StatsApp.percent.data),
                    success: callback
                });
            },
            updateCounter: function(count) {
                this.dom.$percent.text(count);
            }
        });

        theme.StatsAppPercent = new StatsAppPercent;
    };

    theme.Footbar = function() {

        function Footbar() {

        };

        Footbar.prototype = $.extend({}, Footbar.prototype, {
            show: function($section, callback, beforeShow) {
                $section.unbind('transitionend');

                if(callback) {
                    $section.one('transitionend', function () {
                        callback();
                    });
                }

                $section.addClass('show animate');

                function onVisible() {
                    setTimeout(function () {
                        $section.addClass('visible');
                    }, 0);

                    if($section.css('transition-duration') === '0s') {
                        $section.trigger('transitionend');
                    }
                };

                if(beforeShow) {
                    beforeShow(onVisible);
                } else {
                    onVisible();
                }
            },
            hide: function($section, callback) {
                $section.unbind('transitionend');

                $section.one('transitionend', function () {
                    $section.removeClass('show animate').removeAttr('style');

                    if(callback) {
                        callback();
                    }
                });

                $section.removeClass('visible');

                if($section.css('transition-duration') === '0s') {
                    $section.trigger('transitionend');
                }
            }
        });

        theme.Footbar = new Footbar;
    };

    //sections
    theme.Notifications = (function() {

        function Notifications(container) {
            this.$container = $(container);

            //var sectionId = this.$container.attr('data-section-id');

            this.settings = {

            };

            this.namespace = '.notification-cookie';

            this.onLoad();
        };

        Notifications.prototype = $.extend({}, Notifications.prototype, {
            onLoad: function() {
                var $this = this.$container.find('.js-notification-cookie');

                if(!$this.length) {
                    return;
                }

                var _ = this,
                    $btn_close = $this.find('[data-js-action="close"]'),
                    cookie = $.cookie('notification-cookie'),
                    // show_once = $this.attr('data-js-show-once'),
                    delay = +$this.attr('data-js-delay'),
                    lifetime = +$this.attr('data-js-lifetime'),
                    date,
                    timer;

                //      if(show_once === 'false' || cookie !== 'off') {
                if(cookie !== 'off') {
                    setTimeout(function () {
                        theme.Footbar.show($this, function () {
                            $btn_close.one('click', function() {
                                theme.Footbar.hide($this, function () {
                                    $this.remove();
                                });

                                //    if(show_once === 'true') {
                                date = new Date();
                                timer = 1000 * 60 * 60 * 24 * lifetime;

                                date.setTime(date.getTime() + timer);

                                $.cookie('notification-cookie', 'off', {
                                    expires: date,
                                    path: '/'
                                });
                                //    }
                            });
                        });
                    }, delay * 1000);
                }
            },
            onUnload: function() {
                this.$container.off(this.namespace);

                $.cookie('notification-cookie', null);
            }
        });

        return Notifications;
    })();

    theme.PurchasesProof = (function() {
        function PurchasesProof(container) {
            this.$container = $(container);

            //var sectionId = this.$container.attr('data-section-id');

            this.settings = {
                url_get: '/api/order/getRecent'
            };

            this.namespace = '.purchases-proof';

            this.onLoad();
        };

        PurchasesProof.prototype = $.extend({}, PurchasesProof.prototype, {

            onLoad: function() {
                var $this = this.$container.find('.js-purchases-proof');
                if(!$this.length) {
                    return;
                }
                var cookie = $.cookie('purchases-proof'),
                    disable_closing = $this.attr('data-js-disable-closing'),
                    lifetime = +$this.attr('data-js-lifetime'),
                    delay = +$this.attr('data-js-delay'),
                    interval_min = +$this.attr('data-js-interval-min'),
                    interval_max = +$this.attr('data-js-interval-max'),
                    max_time_life = +$this.attr('data-js-max-lifetime'),
                    $current_item,
                    $image,
                    interval_random,
                    max_time_life_interval,
                    date,
                    timer,
                    is_working = true,
                    is_autoplay = true;

                if(disable_closing === 'true' && cookie === 'off') {
                    return;
                }
                // else if((typeof $.cookie('notification-cookie') == 'undefined') && mobDetect.mobile() !== null) {
                //     return;
                // }

                function randomInteger(min, max) {
                    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
                };

                function hide() {
                    var $activeItem = $this.find('[data-js-purchases-proof-item].show');

                    theme.Footbar.hide($this, function () {
                        $activeItem.remove();

                        if(!is_working) {
                            return;
                        }

                        autoplay();
                    });
                };

                function autoplay($items) {
                    is_autoplay = true;

                    var $priority;

                    if(!$items) {
                        $items = $this.find('[data-js-purchases-proof-item]').not('.disabled');
                        $priority = $items.filter('.priority');

                        if($priority.length) {
                            $items = $priority;
                        }
                    }

                    clearInterval(max_time_life_interval);

                    if($this.hasClass('show')) {
                        if($this.is(':hover')) {
                            $this.one('mouseleave', function() {
                                hide();
                            });
                        } else {
                            hide();
                        }
                    } else if($items.length) {
                        $current_item = $items.eq(randomInteger(0, $items.length - 1));
                        $image = $current_item.find('[data-js-purchases-proof-item-image]');
                        interval_random = randomInteger(interval_min, interval_max);

                        $items.removeClass('show');
                        $current_item.addClass('show');

                        theme.Footbar.show($this, function () {
                            setTimeout(function () {
                                if(!is_working) {
                                    return;
                                }

                                autoplay();
                            }, interval_random * 1000);

                            if(max_time_life !== 0) {
                                max_time_life_interval = setTimeout(function () {
                                    var $activeItem = $this.find('[data-js-purchases-proof-item].show');

                                    theme.Footbar.hide($this, function () {
                                        $activeItem.remove();
                                    });
                                }, max_time_life * 1000);
                            }
                        }, function(onVisible) {
                            if(!$image[0].hasAttribute('srcset')) {
                                $image.one('load', function () {
                                    onVisible();
                                });

                                $image.attr('srcset', $image.attr('data-srcset'));
                            } else {
                                onVisible();
                            }
                        });
                    } else {
                        is_autoplay = false;
                    }
                };

                function start() {
                    setTimeout(function () {
                        autoplay();
                    }, delay * 1000);
                };

                if(window.StatsApp && window.StatsApp.purchases_proof) {
                    function appendProductsAjaxByHandle(constraint, callback, data, settings) {
                        settings = settings || {};

                        $.ajax({
                            type: 'GET',
                            dataType: "html",
                            url: '/collections/all',
                            data: {
                                constraint: constraint.join('+'),
                                view: 'purchases_proof_by_handle'
                            },
                            success: function(data_html) {
                                var i = 0,
                                    $data_html_products = $(data_html).find('#purchases_proof_by_handle'),
                                    time_suffix = StatsApp.purchases_proof.strings.time_suffix;

                                $.each(data.orders, function () {
                                    var place_string = this.country_billing ? StatsApp.purchases_proof.strings.place_default.replace('{place}', this.country_billing) : StatsApp.purchases_proof.strings.place_unknown;

                                    $.each(this.products, function () {
                                        var $product = $data_html_products.find('[data-js-purchases-proof-item][data-product-tag-handle="' + constraint[i] + '"]');

                                        if(!$product.length) {
                                            return;
                                        }

                                        var $text_line_1 = $product.find('[data-js-purchases-proof-text-line-1]'),
                                            $text_line_2 = $product.find('[data-js-purchases-proof-text-line-2]'),
                                            time_obj = {},
                                            time_string;

                                        if(settings.is_now || this.created_minutes_ago < 1) {
                                            time_string = StatsApp.purchases_proof.strings.time_now;
                                        } else {
                                            time_obj.minutes = Math.floor(this.created_minutes_ago % 60);
                                            time_obj.hours = Math.floor(this.created_minutes_ago / 60 % 24);
                                            time_obj.days = Math.floor(this.created_minutes_ago / 60 / 24);

                                            time_string = [];

                                            if(time_obj.days > 0) {
                                                time_string.push(time_obj.days + ' ' + (time_obj.days > 1 ? time_suffix.days.split('|')[1] : time_suffix.days.split('|')[0]));
                                            }

                                            if(time_obj.hours > 0) {
                                                time_string.push(time_obj.hours + ' ' + (time_obj.hours > 1 ? time_suffix.hours.split('|')[1] : time_suffix.hours.split('|')[0]));
                                            }

                                            if(time_obj.minutes > 0) {
                                                time_string.push(time_obj.minutes + ' ' + (time_obj.minutes > 1 ? time_suffix.minutes.split('|')[1] : time_suffix.minutes.split('|')[0]));
                                            }

                                            time_string = StatsApp.purchases_proof.strings.time_default.replace('{time}', time_string.join(' '));
                                        }

                                        $text_line_1.html(StatsApp.purchases_proof.strings.line_01.replace('{time-text}', time_string).replace('{place-text}', place_string));
                                        $text_line_2.html(StatsApp.purchases_proof.strings.line_02.replace('{time-text}', time_string).replace('{place-text}', place_string));

                                        if(settings.priority) {
                                            $product.addClass('priority');
                                        }

                                        i++;
                                    });
                                });

                                $data_html_products.find('[data-js-purchases-proof-item]').appendTo($this.find('[data-js-purchases-proof]'));

                                if(callback) {
                                    callback();
                                }
                            }
                        });
                    };

                    $.ajax({
                        type: 'POST',
                        url: StatsApp.url + this.settings.url_get,
                        data: $.extend({}, StatsApp.data, StatsApp.purchases_proof.data),
                        success: function(data) {
                            var handles = {},
                                constraint = [];

                            var recursionDoubleNameCheck = function(name) {
                                if(handles[name] === '') {
                                    name += '_clnhdl';

                                    recursionDoubleNameCheck(name);
                                } else {
                                    handles[name] = '';
                                }
                            };

                            $.each(data.orders, function () {
                                $.each(this.products, function () {
                                    recursionDoubleNameCheck(this.product_handle);
                                });
                            });

                            $.each(handles, function (k) {
                                if(constraint.length >= 20) {
                                    return false;
                                }

                                constraint.push(k);
                            });

                            appendProductsAjaxByHandle(constraint, function () {
                                start();
                            }, data);
                        }
                    });

                    theme.StatsAppPusher.addEvent('App\\Events\\newOrder', function(data) {
                        if(!is_working) {
                            return;
                        }

                        appendProductsAjaxByHandle([data.orderInfo.product_handle], function () {
                            if(!is_autoplay) {
                                autoplay();
                            }
                        }, {
                            orders: [
                                {
                                    country_billing: data.orderInfo.country,
                                    products: [
                                        {
                                            product_handle: data.orderInfo.product_handle
                                        }
                                    ]
                                }
                            ]
                        }, {
                            priority: true,
                            is_now: true
                        });
                    });
                } else {
                    start();
                }

                $this.on('click', '[data-js-action="close"]', function() {
                    var $activeItem = $this.find('[data-js-purchases-proof-item].show');

                    theme.Footbar.hide($this, function () {
                        $activeItem.remove();
                    });

                    if(disable_closing === 'true') {
                        is_working = false;

                        date = new Date();
                        timer = 1000 * 60 * 60 * 24 * lifetime;

                        date.setTime(date.getTime() + timer);

                        $.cookie('purchases-proof', 'off', {
                            expires: date,
                            path: '/'
                        });
                    }
                });
            },
            onUnload: function() {
                this.$container.off(this.namespace);
            }
        });

        return PurchasesProof;
    })();

    theme.StatisticsSlider = (function() {

        function StatisticsSlider(container) {
            this.$container = $(container);

            this.settings = {};

            this.namespace = '.statistics-slider';

            // this.onLoad();

            var $this = this.$container.find('.js-statistics-slider');

            if(!$this.length) {
                return;
            }

            var $slider = $this.find('[data-js-slider]');

            if($slider.find('> *').length) {
                $slider.on('initialized.owl.carousel', function () {
                    $(this).parents('[data-js-footbar-section]').addClass('visible');
                });

                $slider.owlCarousel({
                    loop: true,
                    items: 1,
                    autoplay: true,
                    autoPlaySpeed: +$slider.attr('data-dur') || 5000,
                    autoplayHoverPause: false,
                    nav: false,
                    touchDrag: false
                });
            }
        }

        StatisticsSlider.prototype = $.extend({}, StatisticsSlider.prototype, {
            onLoad: function() {
                var $this = this.$container.find('.js-statistics-slider');

                if(!$this.length) {
                    return;
                }

                var $slider = $this.find('[data-js-slider]');

                if($slider.find('> *').length) {
                    if(window.initGenerateCounters) {
                        window.initGenerateCounters();
                    }

                    if(theme.StatsAppVisitors.load) {
                        theme.StatsAppVisitors.load();
                    }

                    if(theme.StatsAppOrders.load) {
                        theme.StatsAppOrders.load();
                    }

                    if(theme.StatsAppAddedtocart.load) {
                        theme.StatsAppAddedtocart.load();
                    }

                    if(theme.StatsAppPercent.load) {
                        theme.StatsAppPercent.load();
                    }

                    $slider.on('initialized.owl.carousel', function () {
                        $(this).parents('[data-js-footbar-section]').addClass('visible');
                    });

                    $slider.owlCarousel({
                        loop: true,
                        items: 1,
                        autoplay: true,
                        autoPlaySpeed: +$slider.attr('data-dur') || 5000,
                        autoplayHoverPause: false,
                        nav: false,
                        touchDrag: false
                    });
                }
            },
            onUnload: function() {
                this.$container.off(this.namespace);
            }
        });

        window.addEventListener("DOMContentLoaded", function() {
            StatisticsSlider('.footbar');
        });

        return StatisticsSlider;
    })();

    mobDetect = new MobileDetect(window.navigator.userAgent);

    window.initGenerateCounters = function() {
        var $demo_quantity = $('.product-single .remaining--text .danger'),
            $generate_quantity = $('[data-js-product-informations-alert-quantity-denerate]');

        if($demo_quantity.length) {
            $generate_quantity.text($demo_quantity.text());
        } else {
            theme.generateCounter('[data-js-product-informations-alert-quantity-denerate]', {
                min: 1,
                max: Math.max(1, $generate_quantity.first().attr('data-max-value')),
                cookie: true
            });
        }

        theme.generateCounter('.js-generate-visitors-counter', {
            min: '2',
            max: '11',
            set_int: 6000,
            cookie: true,
            cookie_namespace: 'generate-visitors-counter'
        });

        theme.generateCounter('.js-generate-orders-counter', {
            min: '5',
            max: '20',
            cookie: true,
            cookie_namespace: 'generate-orders-counter'
        });

        theme.generateCounter('.js-generate-addedtocart-counter', {
            min: '20',
            max: '40',
            cookie: true,
            cookie_namespace: 'generate-addedtocart-counter'
        });

        theme.generateCounter('.js-generate-multibuy-counter', {
            min: '0',
            max: '100',
            cookie: true,
            cookie_namespace: 'generate-multibuy-counter'
        });
    };

    window.addEventListener("DOMContentLoaded", function() {
        window.initGenerateCounters();

        if(window.StatsApp) {
            theme.StatsAppPusher();

            theme.StatsAppVisitors();

            theme.StatsAppOrders();

            theme.StatsAppAddedtocart();

            theme.StatsAppPercent();
        }

        theme.ProductOptions();

        theme.Footbar();
    });

    var sections = new window.slate.Sections();

    $(document).ready(function() {
        sections.register('notifications', theme.Notifications);
        var isNotificationEnable = $('.js-notification-cookie').length;
        if(isNotificationEnable){
            var acceptNotiInterval = setInterval(function(){
                var cookie = $.cookie('notification-cookie');
                if(cookie !== undefined && cookie === 'off'){
                    clearInterval(acceptNotiInterval);
                    sections.register('purchases-proof', theme.PurchasesProof);
                }
            },500);
        } else {
            sections.register('purchases-proof', theme.PurchasesProof);
        }
    });
    sections.register('statistics-slider', theme.StatisticsSlider);

    if(theme.StatsAppPusher && theme.StatsAppPusher.listeners && Object.keys(theme.StatsAppPusher.listeners).length) {
        theme.StatsAppPusher.load();
    }
})();

document.addEventListener("DOMContentLoaded", function(){


    var md = new MobileDetect(window.navigator.userAgent);
    if ((md.mobile() != null) || (md.tablet() != null)) {
        $('.swatch-element.color label div').on('click', function () {
            $(this).parent().trigger('click');
        });
    }
    var check_margin = function () {
        var h = $('.top_bar').height();
        var w = $(window).width();
        if (w > 992) {
            if (h > 40) {
                $('.top-nav-link .site-header__cart-toggle').css('margin-top', '7px');
            } else {
                $('.top-nav-link .site-header__cart-toggle').css('margin-top', '0');
            }
        }
    }
    $(window).resize(function () {
        check_margin();
    });

    check_margin();

    $('.cart-click').click(function(){
        $('#overlay').addClass('is-active');
        $('.inline-cart').addClass('is-active');
        $('#CartCountt').hide();
        $('#CartCountt').css('opacity', '0');
        $('.mobile-header').addClass('is-active');
    });
    $('.arrow-close').click(function(){
        $('#overlay').removeClass('is-active');
        $('.inline-cart').removeClass('is-active');

        $('#CartCountt').show();
        $('#CartCountt').css('opacity', '1');
        $('.mobile-header').removeClass('is-active');
    });



    $('.close-cart-img').click(function(){
        $('#overlay').removeClass('is-active');
        $('.inline-cart').removeClass('is-active');
    });

    $('#overlay').click(function(){
        $(this).removeClass('is-active');
        $('.inline-cart').removeClass('is-active');
    });

    $(document).on('click','#cls',function(event){
        $('#overlay').removeClass('is-active');
        $('.inline-cart').removeClass('is-active');
    });


    $(document).on('click','#checkoutAccount',function(event){

        $('.social-logins-hull').show();
        $('.button--returning').show();

        $('.gebutton').hide();
    });


    $(document).on('click','#checkoutGuest',function(event){
        $('.social-logins-hull').hide();
        $('.inline-cart-checkout-options .gebutton').show();
        $('.register-form').hide();
        $('.account-login-form').hide();
        $('.gebutton').show();
        $('.account-password-form').hide();
        $('.social-logins-hull .button--new').show();
        $('.social-logins-hull .button--new').show();

    });


    $(document).on('click','#button__returning',function(event){
        $('.account-password-form').hide();
        $('.account-login-form').show();
        $('.register-form').hide();
        $('.social-logins-hull .button--returning').hide();
        $('.social-logins-hull .button--new').show();

    });

    $(document).on('click','#forgetpassword',function(event){
        $('.account-login-form').hide();
        $('.account-password-form').show();
        $('.register-form').hide();
        $('.social-logins-hull .button--returning').hide();
        $('.social-logins-hull .button--new').show();


    });

    $(document).on('click','#swapforgetpassword',function(event){
        $('.account-login-form').show();
        $('.account-password-form').hide();
        $('.register-form').hide();
        $('.social-logins-hull .button--returning').hide();
        $('.social-logins-hull .button--new').show();


    });

    $(document).on('click','#button__black',function(event){
        $('.account-password-form').hide();
        $('.register-form').show();
        $('.account-login-form').hide();
        $('.social-logins-hull .button--returning').show();
        $('.social-logins-hull .button--new').hide();

    });






});
$(document).ready(function(){
    if ($(window).width() > 992) {
        $('.fixed_wrap .m-div').scrollToFixed({
            marginTop: $('.header').outerHeight() + 10,
            limit: $('footer').offset().top - ($('.header').outerHeight()+$('.m-div').outerHeight() + 70),
            zIndex: 999,
            removeOffsets:true
        });
    }
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})




$(document).ready(function(){

    $(document).on('click', '.button_text', function(){

        var $temp = $("<input id='aa'>");
        $(".popup_newsletter").append($temp);
        $temp.val($("#coupan_code").val()).select();
        document.execCommand("copy");
        $temp.remove();
        $(this).html('Copied');
    });

    $(document).on('click', '.button_copy_code', function(){
        var $temp = $("<input id='aa'>");
        $("body").append($temp);
        $temp.val($("#coupan_code_copy").text()).select();
        document.execCommand("copy");
        $temp.remove();
        $(this).html('Copied');
    });

});

(function($) {
    $(document).on('page:load page:change', function () {
        if (localStorage.getItem('storedDiscount')){
            var discountStored = localStorage.getItem('storedDiscount');
            $('input[name="discount"]').val(localStorage.getItem('storedDiscount'));
        }
        $('form[action="/cart"]').on('submit', function(){
            var $discountCode = $('input[name="discount"]').val();
            localStorage.setItem('storedDiscount', $discountCode);
        });

        $(document).on('click', '.cart__cartview', function(){
            var $discountCode = $('input[name="discount"]').val();
            localStorage.setItem('storedDiscount', $discountCode);
        });
    });
})(jQuery);






$(document).ready(function(){

    function addItem(form_id) {
        $.ajax({
            type: 'POST',
            url: '/cart/add.js',
            dataType: 'json',
            data: $('#'+form_id).serialize(),
            success: Shopify.onSuccess,
            error: Shopify.onError
        });
    }
  
    $('.directbuybutton').click(function(e) {
      var $this = $(this);
      var id=$this.parents('form').attr('id');	
      if($('#movee').find('.product_properties').length>0) {
        var isValid=true;
			$('#movee').find('.product_properties').find("input").each(function() {
			   var element = $(this);
			   if (element.val() == "") {
			       isValid = false;
			   }
			});
		
      if(isValid) {
        $this.prop('disabled', true);
        addItem(id);      
        }
      else {
        alert('Please fill in all custom fields!');
        return false;
      }
      }
      e.preventDefault();
    });
  
    Shopify.onSuccess = function() {
        var elem = $('.directbuybutton');
        elem.removeAttr("disabled");
        var quantity = parseInt(jQuery('[name="quantity"]').val(), 10) || 1;
        $.ajax({
            type: 'GET',
            url: '/cart',
            dataType: 'html',
            success: function(data){
                window.location.href = "/checkout";
            }})};
    Shopify.onError = function(XMLHttpRequest, textStatus) {
        console.log("errorerror");
        // Shopify returns a description of the error in XMLHttpRequest.responseText.
        // It is JSON.
        // Example: {"description":"The product 'Amelia - Small' is already sold out.","status":500,"message":"Cart Error"}
        var data = eval('(' + XMLHttpRequest.responseText + ')');
        if (!!data.message) {
            alert(data.message + '(' + data.status  + '): ' + data.description);
        } else {
            alert('Error : ' + Shopify.fullMessagesFromErrors(data).join('; ') + '.');
        }

        $('.directbuybutton').removeAttr("disabled");
    };

    Shopify.fullMessagesFromErrors = function(errors) {
        var fullMessages = [];
        jQuery.each(errors, function(attribute, messages) {
            jQuery.each(messages, function(index, message) {
                fullMessages.push(attribute + ' ' + message);
            });
        });
        return fullMessages;
    };

})



/*============================================================================
  Recently Viewed
==============================================================================*/

var recentlyViewed = {
    init: function(){

        var productHandle,
            rvCookie,
            rvProducts,
            displayProducts,
            rvProductArray;

        if ($('.js-product_section[data-rv-handle]').length){
            productHandle = $('.js-product_section').data('rv-handle').toString();
            rvCookie = Cookies.get('recentlyViewed');
            rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);
        } else if ($('.recently-viewed__section').length){
            rvCookie = Cookies.get('recentlyViewed');
            rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);

        } else if ($('.collection-template-section .js-sidebar-recently-viewed').length){
            rvCookie = Cookies.get('recentlyViewed');
            rvProducts = recentlyViewed.getCookieProducts(rvCookie, productHandle);
        }

        if (rvProducts){

            rvProductArray = unescape(rvProducts).split(',');
        }

        if (productHandle){

            if(!$.inArray(productHandle, rvProductArray) !== -1){
                displayProducts = [];
                rvProductArray.unshift(productHandle);
                $.each(rvProductArray, function(i, el){
                    if($.inArray(el, displayProducts) === -1) displayProducts.push(el);
                });
            }

            recentlyViewed.setCookieProducts(displayProducts);
        } else {
            displayProducts = rvProductArray;
        }

        if ($('.recently-viewed__section').length){
            var parent = '.recently-viewed__section';
            recentlyViewed.getProductInformation(parent, displayProducts);
        } else if ($('.js-recently-viewed .rv-main').length){
            var parent = '.js-recently-viewed';
            recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
        }

        if ($('.sidebar .js-sidebar-recently-viewed').length){
            var parent = '.sidebar .js-sidebar-recently-viewed';
            if (productHandle){
                recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
            } else {
                recentlyViewed.getProductInformation(parent, displayProducts);
            }
            $('.js-sidebar-recently-viewed.hidden').parents('.sidebar-block').hidgenerateOrderse();
        }
        if ($('.sidebar .js-sidebar-recently-viewed').length){
            var parent = '.sidebar .js-sidebar-recently-viewed';
            if (productHandle){
                recentlyViewed.getProductInformation(parent, displayProducts, productHandle);
            } else {
                recentlyViewed.getProductInformation(parent, displayProducts);
            }
            $('.js-sidebar-recently-viewed.hidden').parents('.sidebar-block').hide();
        }

    },
    getCookieProducts: function(rvCookie, productHandle){

        if (!rvCookie && productHandle) {
            Cookies.set('recentlyViewed', productHandle, { expires: 30, path: '/' });
            rvCookie = Cookies.get('recentlyViewed');
        } else {
            rvCookie = Cookies.get('recentlyViewed');
        }

        return rvCookie;

    },
    setCookieProducts: function(rvProductArray){
        Cookies.set('recentlyViewed', escape(rvProductArray.join(',')), { expires: 30, path: '/' });
    },
    getProductInformation: function(parent, displayProducts, productHandle){

        if (productHandle){
            displayProducts.splice( $.inArray(productHandle, displayProducts), 1 );
        }

        var productLimit = $(parent).data('visible-products');

        if (productLimit && displayProducts){
            displayProducts = displayProducts.slice(0, productLimit);
        }

        $.each(displayProducts, function (index, value) {

            if (value){

                $(parent).removeClass('hidden');

                $(parent).parents('.sidebar-block').show();

                $.ajax({
                    type: 'GET',
                    url: '/products/' + value  + '?view=rv',
                    success: function(data) {

                        var rvProduct = $(data).find('.js-recently-viewed-product');

                        $(parent).find(' .rv-box-' + index ).append(rvProduct);

                        $(' .rv-box-' + index ).attr('data-block', 'yes');


                        //Convert pricing
                        
                        timber.collectionImageSlide = function () {

                            $( ".grid__image" ).mouseenter(function() {
                                if ($(window).width() > 1024) {

                                    
                                    $(this).children('.first--image').css('opacity', '0');
                                    $(this).children('.second--image').css('opacity', '1');
                                    
                                }
                            }).mouseleave(function() {
                                if ($(window).width() > 1024) {
                                    
                                    $(this).children('.first--image').css('opacity', '1');
                                    $(this).children('.second--image').css('opacity', '0');
                                    
                                }
                            });
                        };
                    },
                    error: function(x, t, m) {
                        console.log(x);
                        console.log(t);
                        console.log(m);
                    },
                    dataType: "html"
                });
            }




        });
    },

    createSlider: function(el, productsAvailable){
        $(".js-rv-slider").owlCarousel({
            items: 1,
            loop: true,
            nav:true,
            navText:["<i class='shoptimized-064 margin_right-2'></i>", "<i class='shoptimized-074 margin_left-3'></i>"],
            responsive:{
                0:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 30 
                },
                300:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 35
                },
                350:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 40
                },
                400:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 45
                },
                450:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 50
                },
                500:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 55
                },
                550:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 60
                },
                600:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 65
                },
                650:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 70
                },
                700:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 75
                },
                750:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 80
                },
                800:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 85
                },
                850:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 90
                },
                900:{
                    items:2,
                    slideBy: 2,
                    stagePadding: 95
                },
                1000:{
                    items:5,
                    slideBy: 5
                }
            }
        });



        $('.js-rv-slider').each(function(){
            var viewport = $(window).width();
            var itemCount = $(this).children('.owl-stage-outer').children('.owl-stage').find('div').length;
            if((viewport >= 1000 && itemCount > 5) || (viewport <= 999 && itemCount > 2)) {
                $(this).find('.owl-controls').show();
            } else {

                $(this).find('.owl-controls').hide();
            }
            var totalItems_wrap = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;
            if (totalItems_wrap < 5) {
                var isLoopedcat_second_h = false;
                var isNavCat_second_h = false;
                $(this).find('.owl-controls').hide();
            }
            else {
                var isLoopedcat_second_h = true;
                var isNavCat_second_h = true;
                $(this).find('.owl-controls').show();
            }

        });
        $( window ).resize(function() {

            $('.js-rv-slider').each(function(){
                var viewport = $(window).width();
                var totalItems_wrap1 = $(this).children('.owl-stage-outer').children('.owl-stage').find('.grid__item').length;

                if ((viewport >= 1000 && totalItems_wrap1 > 5) || (viewport <= 999 && totalItems_wrap1 > 2)) {
                    $(this).find('.owl-controls').hide();

                    $('.js-rv-slider').owlCarousel({
                        nav:true,
                        loop:true
                    });
                }
                else {
                    $('.js-rv-slider').owlCarousel({
                        nav:false,
                        loop:false
                    });

                }

            });
        });






    }
}
$(document).ready(function(){

    recentlyViewed.init();
});
$(window).bind("load", function() {
    $('.gallery-cell[data-block="no"]').remove();
    recentlyViewed.createSlider();
});




$(document).ready(function(){
    Array.prototype.unique =
        function() {
            var a = [];
            var l = this.length;
            for(var i=0; i<l; i++) {
                for(var j=i+1; j<l; j++) {
                    if (this[i] === this[j])
                        j = ++i;
                }
                a.push(this[i]);
            }
            return a;
        };
    var dealInterval = setInterval(function() {
        var totalDealProducts = [];
        $(".timer").each(function() {
            var dynamicDate = $(this).attr("data-date");
            totalDealProducts.push(dynamicDate);
        });
        totalDealProducts = totalDealProducts.unique();
        var totalDeals = totalDealProducts.length;
        if(totalDeals > 0) {
            var date = new Date();
            var startdate = new Date('2019-07-17');
            var diff = date - startdate;
            var days = Math.round(diff/1000/60/60/24) + 1;
            var activeDeal = Math.round(days % totalDeals);
            $( ".timer[data-date!='"+activeDeal+"']" ).parents('.itm').hide();
            $(".timer[data-date='"+activeDeal+"']").each(function() {
                var hour = 23-date.getHours();
                if(hour >= 0 && hour <= 9){
                    hour = '0'+hour;
                }
                var minutes = 59-date.getMinutes();
                if(minutes >= 0 && minutes <= 9){
                    minutes = '0'+minutes;
                }
                var seconds = 59-date.getSeconds();
                if(seconds >= 0 && seconds <= 9){
                    seconds = '0'+seconds;
                }
                var dateString =  hour + ':' + minutes + ':' + seconds;
                $(this).html('ENDS IN <span class="tsty">'+dateString+ '</span>');
                var wid= hour/24;
                wid = wid.toString().replace('0.', '');
                wid= wid.substring(0, 2);
                wid = parseInt(wid);
                if(minutes >= 1 && minutes <= 15){
                    wid = wid + 1;
                } else if(minutes >= 16 && minutes <= 30) {
                    wid = wid + 2;
                } else if(minutes >= 31 && minutes <= 45) {
                    wid = wid + 3;
                } else if(minutes >= 46 && minutes <= 60) {
                    wid = wid + 4;
                }
                $('.bar-left-timee').css("width", wid + "%");
                $('div.header-promotion-image').hide();
                $(this).parents('.itm').show();
                $(this).parents('.itm').addClass('activeClass');
            });
        } else {
            clearInterval(dealInterval);
        }
        /*$(".timer").each(function() {
          var date = new Date();
          var dynamicDate = $(this).attr("data-date");
          var splitDate = dynamicDate.split("-");
          var currentYear = date.getFullYear();
          var currentMonth = date.getMonth() + 1;
          var currentday = date.getDate();

          if (currentYear == splitDate[0] && currentMonth == splitDate[1] && currentday == splitDate[2]){
            var hour = 23-date.getHours();
            if(hour >= 0 && hour <= 9){
              hour = '0'+hour;
            }
            var minutes = 59-date.getMinutes();
            if(minutes >= 0 && minutes <= 9){
              minutes = '0'+minutes;
            }
            var seconds = 59-date.getSeconds();
            if(seconds >= 0 && seconds <= 9){
              seconds = '0'+seconds;
            }
            var dateString =  hour + ':' + minutes + ':' + seconds;
            $(this).html('ENDS IN <span class="tsty">'+dateString+ '</span>');

                         var wid= hour/24; // here 24 hours = 100% then 1 hour equals to 4%
                         wid = wid.toString().replace('0.', '');
            wid= wid.substring(0, 2);
            wid = parseInt(wid);
            // dividing hour into 4 percent
            if(minutes >= 1 && minutes <= 15){
              wid = wid + 1;
            } else if(minutes >= 16 && minutes <= 30) {
              wid = wid + 2;
            } else if(minutes >= 31 && minutes <= 45) {
              wid = wid + 3;
            } else if(minutes >= 46 && minutes <= 60) {
              wid = wid + 4;
            }
            $('.bar-left-timee').css("width", wid + "%");
            $('div.header-promotion-image').hide();
            $(this).parents('.itm').show();
            $(this).parents('.itm').addClass('activeClass');
          } else {
            $(this).parents('.itm').hide();

            $('div.header-promotion-image').show();
          }
          $(".itm").each(function() {

            var showhide = $(this).attr("style");
            if (!showhide) {
              $('div.header-promotion-image').hide();
            }
          });
        });*/
    }, 1000);
});


/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */

!function(e){var n=!1;if("function"==typeof define&&define.amd&&(define(e),n=!0),"object"==typeof exports&&(module.exports=e(),n=!0),!n){var o=window.Cookies,t=window.Cookies=e();t.noConflict=function(){return window.Cookies=o,t}}}(function(){function e(){for(var e=0,n={};e<arguments.length;e++){var o=arguments[e];for(var t in o)n[t]=o[t]}return n}function n(o){function t(n,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},t.defaults,i)).expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}r=o.write?o.write(r,n):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),n=(n=(n=encodeURIComponent(String(n))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var f="";for(var s in i)i[s]&&(f+="; "+s,!0!==i[s]&&(f+="="+i[s]));return document.cookie=n+"="+r+f}n||(c={});for(var p=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,u=0;u<p.length;u++){var l=p[u].split("="),C=l.slice(1).join("=");'"'===C.charAt(0)&&(C=C.slice(1,-1));try{var g=l[0].replace(d,decodeURIComponent);if(C=o.read?o.read(C,g):o(C,g)||C.replace(d,decodeURIComponent),this.json)try{C=JSON.parse(C)}catch(e){}if(n===g){c=C;break}n||(c[g]=C)}catch(e){}}return c}}return t.set=t,t.get=function(e){return t.call(t,e)},t.getJSON=function(){return t.apply({json:!0},[].slice.call(arguments))},t.defaults={},t.remove=function(n,o){t(n,"",e(o,{expires:-1}))},t.withConverter=n,t}return n(function(){})});


var bgi;
for (bgi = 0; bgi < 100; bgi++) {
    $('.site-nav--has-dropdown, .site-nav--has-dropdown ul, #li-main-for-' + [bgi]).hover(
        function(){
            $('.menu-bg').addClass('is_active');
        },
        function(){
            $('.menu-bg').removeClass('is_active');
        }
    );
}

$('.menu').on('click', '.site-nav--has-dropdown', function() {
    $('.menu .site-nav--has-dropdown.slide').removeClass('slide');
    $(this).addClass('slide');
});

$('.site-nav--has-dropdown, #li-main-for-0').click(function () {
    $('.menu-dropdown-icon').removeClass('slide');

    $(this).toggleClass('slide');
});

$(document).ready(function(){

    $('.button-blue a').click(function(){

        $('.product-slideup').addClass('active');
        $('body').addClass('search-overlay-show');

        $('.directbuybutton').hide();
    });
    $('.button-green a').click(function(){

        $('.product-slideup').addClass('active');
        $('body').addClass('search-overlay-show');
        $('.stickyonebutton').hide();

    });


    $('.product-slideup .close2').click(function(e){
        $('.directbuybutton').show();
        $('.stickyonebutton').show();
        $('.product-slideup').removeClass('active');
        $('body').removeClass('search-overlay-show');
        e.preventDefault();
    });
    $('.stickyonebutton').click(function(e){

       

    });
});

$(window).load(function(){
    $('.category_wrap').css('opacity', '1');
});

window.addEventListener("DOMContentLoaded", function () {
    let target = document.querySelector("#quick-view .modal-body");

    let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            let addedNodes = mutation.addedNodes;

            addedNodes.forEach(function(node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains("popup-product")) {
                    generateOrders();
                }
            });
        });
    });

    let config = { attributes: false, childList: true, characterData: false };

    observer.observe(target, config);

    generateOrders();
});

function generateOrders() {
    var $demo_quantity = $('.product-single .remaining--text .danger'),
        $generate_quantity = $('[data-js-product-informations-alert-quantity-denerate]');

    if ($demo_quantity.length) {
        $generate_quantity.text($demo_quantity.text());
    } else {
        theme.generateCounter('[data-js-product-informations-alert-quantity-denerate]', {
            min: 1,
            max: Math.max(1, $generate_quantity.first().attr('data-max-value')),
            cookie: true
        });
    }

    theme.generateCounter('.js-generate-visitors-counter', {
        min: '2',
        max: '11',
        set_int: 6000,
        cookie_namespace: 'generate-visitors-counter'
    });

    theme.generateCounter('.js-generate-orders-counter', {
        min: '5',
        max: '20',
        cookie: true,
        cookie_namespace: 'generate-orders-counter'
    });

    theme.generateCounter('.js-generate-addedtocart-counter', {
        min: '20',
        max: '40',
        cookie: true,
        cookie_namespace: 'generate-addedtocart-counter'
    });

    theme.generateCounter('.js-generate-multibuy-counter', {
        min: '0',
        max: '100',
        cookie: true,
        cookie_namespace: 'generate-multibuy-counter'
    });
}

document.addEventListener("DOMContentLoaded", function(){
    $('.menu-dropdown-icon').hover(function(){
        $(this).addClass('slide');


    });

    $('.menu-dropdown-icon').mouseleave(function(){
        $(this).removeClass('slide');

    });
});

$(document)
    .on('shopify:block:select', function(e){
        $(document).on('mouseenter', '.menu-dropdown-icon', function (event) {

            $(this).addClass('slide');


        });
        $(document).on('mouseleave', '.menu-dropdown-icon', function (event) {


            $(this).removeClass('slide');

        });
    });
$(document)
    .on('shopify:block:deselect', function(e){
        $(document).on('mouseenter', '.menu-dropdown-icon', function (event) {

            $(this).addClass('slide');


        });
        $(document).on('mouseleave', '.menu-dropdown-icon', function (event) {


            $(this).removeClass('slide');

        });
    });
$(document)
    .on('shopify:section:load', function(e){

        $(document).on('mouseenter', '.menu-dropdown-icon', function (event) {

            $(this).addClass('slide');


        });
        $(document).on('mouseleave', '.menu-dropdown-icon', function (event) {


            $(this).removeClass('slide');

        });
    });


$(document)
    .on('shopify:section:reorder', function(e){
        $(document).on('mouseenter', '.menu-dropdown-icon', function (event) {

            $(this).addClass('slide');


        });
        $(document).on('mouseleave', '.menu-dropdown-icon', function (event) {


            $(this).removeClass('slide');

        });
    });

// Full fix for content indent
(function() {
    const header = document.querySelector('header.header');
    const mainContent = document.querySelector("main.main-content");
    const isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    const isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;

    if (!isIOS && !isMac) {
        const headerResizeObserver = new ResizeObserver(entries => {
            entries.forEach(entry => mainContent.style.marginTop = `${entry.contentRect.height}px`);
        });

        headerResizeObserver.observe(header);
    } else if (isIOS) {
        const headerMutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mainContent.style.marginTop = `${mutation.target.offsetHeight}px`
            });
        });

        const config = { attributes: true, childList: true, characterData: true };
        headerMutationObserver.observe(header, config);
    }
})();
// end fix

window.addEventListener("DOMContentLoaded", setMarginMainContent);
window.addEventListener("resize", setMarginMainContent);

function setMarginMainContent() {
    let main = document.querySelector("main.main-content");
    let header = document.querySelector(".header");
    let search_panel = document.querySelector(".search_panel");
    // if($(window).width() > 767){
    main.style.marginTop = `${header.offsetHeight + 5}px`;
    // }
}




// Lazy loading
function hidePromotionBarTextInMobile(){
    const isMobile = window.innerWidth < 768 ? true:false;
    const slideElem = document.querySelector('.statistics-slider__slider');
    if(isMobile && slideElem !== null && slideElem !== undefined){
        const isShippingTextEnable = JSON.parse(slideElem.getAttribute('data-shipping'));
        const promotionBarElem = document.querySelector('.motivator--text');
        if(isShippingTextEnable)
            promotionBarElem.style.display = 'none';
        else
            promotionBarElem.style.display = 'block';
    }
}
window.addEventListener("resize", function() {
    hidePromotionBarTextInMobile();
});
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    // lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to a more compatible method here
    }
    hidePromotionBarTextInMobile();
});

window.addEventListener("DOMContentLoaded", function () {
    let stickySelectors = document.querySelectorAll("#productSelect-option-0, #productSelect-option-1");

    stickySelectors.forEach(function (stickySelector) {
        stickySelector.addEventListener("change", stickySelectorChange);
    });

    function stickySelectorChange(e) {
        let selectorValue = e.target.value;

        if (selectorValue) {
            let secondSelector = document.querySelector("#productSelect-option-1");
            let secondSelectorValue = null;
            let currentInput = document.querySelector(`.swatch-element input[value="${CSS.escape(selectorValue)}"]`);
            let inputEvent = new Event('change');

            if (secondSelector) {
                secondSelectorValue = secondSelector.value;
            }

            currentInput.dispatchEvent(inputEvent);

            if (secondSelector) {
                secondSelector.value = secondSelectorValue;
            }

            if (!e.target.value) {
                e.target.value = selectorValue;
            }
        }
    }
});