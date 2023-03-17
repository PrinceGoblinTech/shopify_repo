window.onload = function () {
    let href = document.getElementsByTagName('a');
    let content = {};
    let preloader = function (url) {
        if (content[url] === undefined || content[url] === '') {
            let ajax = new XMLHttpRequest();
            try {
                ajax.open('GET', url, true);
                ajax.send();
                ajax.onload = function () {
                    content[url] = ajax.responseText;
                }
            } catch (e) {
                content[url] = false;
            }
        }

    };


//ndefined is not a function (evaluating 'Number.parseInt(total_price.replace(money_symbol_total, ''))')

    for (let i = 0; i < href.length; i++) {
        let self = href[i];


        self.addEventListener('mouseover', function (event) {
            event.preventDefault();
            preloader(this.getAttribute('href'));
        }, false);


        self.addEventListener('click', function (e) {
            e.preventDefault();
            let url = this.getAttribute('href');
            if (content[url] !== undefined) {
                window.history.pushState({"html":content[url],"pageTitle": ''},"", url);
                document.open();
                document.write(content[url]);
                document.close();
            } else {
                let int = setInterval(function () {
                    if (content[url] !== undefined) {
                        window.history.pushState({"html":content[url],"pageTitle": ''},"", url);
                        document.open();
                        document.write(content[url]);
                        document.close();
                        clearInterval(int);

                    }
                }, 300)
            }

        })
    }
};