(function () {
    var timberjspath = '<script src="' + window.path.timberjspath,
        exceptions = 'shoptimizeddemo.myshopify.com|shoptimized5-0.myshopify.com|outdoorsadventurer.myshopify.com',
        action;
    if(window.location.href.indexOf('/collections/') === -1 && window.location.href.indexOf('/products/') === -1) {
        action = 'abort';
    }
    function block() {
        window['$']('form[action="/cart/add"]').off();
        window['$']('body').on('submit', 'form[action="/cart/add"]', function (e) {
            window.alert('Please enter your verification purchase code for full theme functionality');
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
    };
    timberjspath += '"></scr';
    window['$'](function () {
        var product_key = window.product_key && window.product_key !== '' ? window.product_key : 'blank',
            permanent_domain = window.shop && window.shop.permanent_domain ? window.shop.permanent_domain : '';
        if(permanent_domain !== '' && product_key === 'blank' && exceptions.indexOf(permanent_domain) != -1) {
            if(action != 'abort') {
                window.console.debug('Verification start is broken');
            }
            return;
        } else if($.cookie('_shopify_pr') === '1874c3aee48d34bee661e82058125242') {
            return;
        }
        window.setTimeout(function () {
            var obj = {};
            obj.type = 'GET';
            obj.url = 'https://members.shoptimized.net/api/validate/' + product_key + '.json';
            obj.data = {};
            obj.data.domain = permanent_domain;
            obj.data.ver = '5.1.0';
            obj.dataType = 'json';
            obj.success = function (t) {
                var cookie_obj = {},
                    date;
                if(t.hasOwnProperty('success') && t.hasOwnProperty('valid')) {
                    if(t.valid) {
                        date = new window['Date']();
                        date.setTime(date.getTime() + 86400000);
                        cookie_obj.expires = date;
                        cookie_obj.path = '/';
                        $.cookie('_shopify_pr', '1874c3aee48d34bee661e82058125242', cookie_obj);
                    } else {
                        window['$']('body').append('<div style="display:block !important;position:fixed !important;z-index:99999 !important;bottom:0 !important;left:0 !important;width:100% !important;height:100px !important;line-height:100px !important;text-align:center !important;background:#ff0000 !important;color:#fff !important;opacity:1 !important;pointer-events:none;">' + t.message + '</div>');
                        block();
                    }
                }
            };
            if(action !== 'abort' || (window.location.href.indexOf('/collections/') !== -1 || window.location.href.indexOf('/products/') !== -1)) {
                window['$'].ajax(obj);
            }
        }, 3000);
    });
    window.document.write(timberjspath + 'ipt>');
})();
