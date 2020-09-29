(function () {
    if (!("browser" in window)) {
        window.browser = chrome;
    }

    let button_currentTab = document.querySelector("#button_currentTab");
    button_currentTab.addEventListener('click', (e) => {
        console.log('Current Tab');

        browser.tabs.getSelected(null, function (tab) {
            let url = tab.url;

            //https://docs.microsoft.com/に絞る
            if (!isMicrosoftDocs(url)) {
                return;
            }

            //ロケールを日本語に変更
            let newUrl = changeLanguage(url);

            //urlを現在のタブで開く
            browser.tabs.update({ url: newUrl });
        });
    });

    let button_newTab = document.querySelector("#button_newTab");
    button_newTab.addEventListener('click', (e) => {
        console.log('New Tab');

        browser.tabs.getSelected(null, function (tab) {
            let url = tab.url;
            let index = tab.index;

            //https://docs.microsoft.com/に絞る
            if (!isMicrosoftDocs(url)) {
                return;
            }

            //ロケールを日本語に変更
            let newUrl = changeLanguage(url);

            //urlを別タブで開く(現在のタブのとなり)
            browser.tabs.create({ url: newUrl, index: index + 1 });
        });
    });

    let button_newWindow = document.querySelector("#button_newWindow");
    button_newWindow.addEventListener('click', (e) => {
        console.log('New Window');

        browser.tabs.getSelected(null, function (tab) {
            let url = tab.url;

            //https://docs.microsoft.com/に絞る
            if (!isMicrosoftDocs(url)) {
                return;
            }

            //ロケールを日本語に変更
            let newUrl = changeLanguage(url);

            //urlを別ウィンドウで開く
            browser.windows.create({ url: newUrl });
        });
    });

    //MS Docsか否かをチェック
    function isMicrosoftDocs(url) {
        let re = /^https:\/\/docs.microsoft.com\/.*$/gi;
        return re.test(url);
    }

    //英日切り替え
    function changeLanguage(url) {
        let reLang = /(?<=https:\/\/docs.microsoft.com\/).*?(?=\/)/gi;
        let result = url.match(reLang);

        if (result === null) {
            return "";
        }
        let lang = result[0];

        let replacement = "";
        if (lang === "ja-jp") {
            replacement = "en-us";
        }
        else {
            replacement = "ja-jp";
        }

        return url.replace(reLang, replacement);
    }
})();