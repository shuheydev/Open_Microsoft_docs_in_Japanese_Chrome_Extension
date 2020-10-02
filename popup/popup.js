(function () {
    if (!("browser" in window)) {
        window.browser = chrome;
    }

    let button_currentTab = document.querySelector("#button_currentTab");
    button_currentTab.addEventListener('click', (e) => {
        console.log('Current Tab');

        browser.tabs.query({ active: true, currentWindow: true }, tabs => {
            let url = tabs[0].url;

            //対象サイトに絞る
            if (!isTargetSites(url)) {
                window.close();
                return;
            }

            //言語を日本語に変更
            let newUrl = changeLanguage(url);

            //urlを現在のタブで開く
            browser.tabs.update({ url: newUrl });

            window.close();
        });
    });

    let button_newTab = document.querySelector("#button_newTab");
    button_newTab.addEventListener('click', (e) => {
        console.log('New Tab');

        browser.tabs.query({ active: true, currentWindow: true }, tabs => {
            let url = tabs[0].url;
            let index = tabs[0].index;

            //対象サイトに絞る
            if (!isTargetSites(url)) {
                window.close();
                return;
            }

            //言語を日本語に変更
            let newUrl = changeLanguage(url);

            //urlを別タブで開く(現在のタブのとなり)
            browser.tabs.create({ url: newUrl, index: index + 1 });

            window.close();
        });
    });

    let button_newWindow = document.querySelector("#button_newWindow");
    button_newWindow.addEventListener('click', (e) => {
        console.log('New Window');

        browser.tabs.query({ active: true, currentWindow: true }, tabs => {
            let url = tabs[0].url;
            console.log(tabs);

            //対象サイトに絞る
            if (!isTargetSites(url)) {
                window.close();
                return;
            }

            //言語を日本語に変更
            let newUrl = changeLanguage(url);

            //urlを別ウィンドウで開く
            browser.windows.create({ url: newUrl });

            window.close();
        });
    });

    //対象サイトか否かをチェック
    //docs.microsoft.com or azure.microsoft.com
    function isTargetSites(url) {
        let re = /^https:\/\/(docs|azure).microsoft.com\/.*$/gi;
        return re.test(url);
    }

    //日英切り替え
    //日本語は英語に
    //日本語以外は日本語に
    function changeLanguage(url) {
        let reLang = /(?<=https:\/\/(docs|azure).microsoft.com\/).*?(?=\/)/gi;
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