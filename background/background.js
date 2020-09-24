//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}

browser.browserAction.onClicked.addListener(function () {
    browser.tabs.getSelected(null, function (tab) {
        let url = tab.url;

        //https://docs.microsoft.com/に絞る
        let re = /^https:\/\/docs.microsoft.com\/.*$/gi;
        if (!re.exec(url))
            return;

        //ロケールを日本語に変更
        let reLocal = /^https:\/\/docs.microsoft.com\/.*?\//gi;
        const replacement = 'https://docs.microsoft.com/ja-jp/';
        url = url.replace(reLocal, replacement);

        //urlを別ウィンドウで開く
        browser.windows.create({ url: url });
    });
});

