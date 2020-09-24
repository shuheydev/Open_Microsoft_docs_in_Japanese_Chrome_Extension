//chromeとbrowserの名前空間対策
if (!("browser" in window)) {
    window.browser = chrome;
}

browser.browserAction.onClicked.addListener(function () {
    browser.tabs.getSelected(null, function (tab) {
        let url = tab.url;

        //urlを別ウィンドウで開く
        browser.windows.create({ url: url });
    });
});

