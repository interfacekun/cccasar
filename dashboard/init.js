"use strict";
const {
    dirname: e,
    join: t
} = require("fire-path"), {
    Tray: i,
    Menu: r,
    app: o
} = require("electron"), {
    dashboardOpen: a,
    dashboardClose: n
} = require("./lib/metrics"), {
    startup: d,
    closeAll: l,
    isEmpty: s
} = require("./lib/editor"), {
    create: p,
    add: c,
    remove: E,
    check: h,
    getInfo: g
} = require("../share/project"), u = require("../share/engine-utils"), f = require("../share/default-settings");
require("./lib/ipc"), require("../share/protocol/protocol-core"), Editor.User = require("../share/user"), Editor.versions.dashboard = "0.4.0", Editor.builtinCocosRoot = u.getEnginePath(), Editor.Metrics = require("../share/metrics");
let m, b = {};
module.exports = function (e, i) {
    o.on("activate", () => {
        Editor.Window.main && (Editor.App._profile.reload(), Editor.Ipc.sendToMainWin("dashboard:refresh-recent-project"), Editor.Ipc.sendToMainWin("dashboard:refresh-last-create"), Editor.Window.main.show())
    }), Editor.requireLogin = !e.nologin, Editor.testing = !!e.testing, Editor.testing && Editor.log("Running in testing environment"), Editor.showInternalMount = Editor.dev && !!e.internal, Editor.Profile.register("global", Editor.App.home), Editor.log("Load ~/.CocosCreator/settings.json"), Editor.App._profile = Editor.Profile.load("profile://global/settings.json", f), Editor.Profile.setDefault("profile://global/updates.json", {
        "received-ids": [],
        "installed-hotupdates": []
    });
    let r = Editor.App._profile.data;
    if (Editor.lastLogin = r["last-login"], Editor.log("checking language setting..."), "en" === r.language || "zh" === r.language) Editor.lang = r.language;
    else {
        let e = o.getLocale();
        e && e.includes("zh") ? Editor.lang = r.language = "zh" : Editor.lang = r.language = "en", Editor.App._profile.save()
    }
    Editor.log(`Language: ${Editor.lang}`), Editor.log("Initializing Cocos Creator Dashboard"), Editor.init({
        i18n: require(`../share/i18n/${Editor.lang}/localization`),
        "main-menu": require("./main-menu")
    }), Editor.Package.removePath(t(Editor.App.path, Editor.dev ? "" : "..", "builtin"));
    let a = t(Editor.App.path, Editor.dev ? "" : "..", "builtin", "ui-kit");
    Editor.Package.load(a, e => {
        e && Editor.failed(`Failed to load package at ${a}: ${e.message}`)
    }), i && i()
}, Editor.App.extend({
    _profile: {},
    createProject: function (t, i) {
        t = t || {};
        try {
            if ("string" != typeof t.path) throw new Error("opts.path must be string")
        } catch (e) {
            return i && i(e), void 0
        }
        Editor.App._profile.data["last-create"] = t.path, Editor.App._profile.save(), this.updateLastCreatePath(e(t.path)), p(t.path, t.template, i)
    },
    updateLastCreatePath(e) {
        Editor.App._profile.data["last-create-path"] = e, Editor.App._profile.save()
    },
    addProject(e) {
        c(e)
    },
    removeProject(e) {
        E(e)
    },
    getProjectInfo(e, t) {
        g(e, t)
    },
    checkProject(e, t) {
        h(e, t)
    },
    runEditor(e, t, i, r) {
        if (b[e]) return;
        let o = d(e, t, i);
        b[e] = o, o.on("close", () => {
            delete b[e]
        }), r()
    },
    run() {
        new Promise((e, t) => {
            require("../share/network").canConnectPassport(function (t) {
                Editor.isOffline = !t, Editor.isOffline && (Editor.requireLogin = !1), e()
            })
        }).then(() => {
            let e = {
                title: "Cocos Creator",
                width: 1024,
                height: 680,
                minWidth: 1024,
                minHeight: 680,
                show: !1,
                resizable: !0,
                frame: !1
            };
            "darwin" === process.platform && (delete e.frame, e.titleBarStyle = "hiddenInset"), Editor.run("app://dashboard/index.html", e), Editor.Window.main.nativeWin.on("close", e => {
                s() || (e.preventDefault(), Editor.Window.main.nativeWin.closeDevTools(), Editor.Window.main.nativeWin.hide())
            })
        }).then(() => {
            (m = new i(Editor.url("app://dashboard/static/tray.png"))).setToolTip("Cocos Creator"), m.on("click", () => {
                Editor.Window.main && (Editor.App._profile.reload(), Editor.Ipc.sendToMainWin("dashboard:refresh-recent-project"), Editor.Ipc.sendToMainWin("dashboard:refresh-last-create"), Editor.Window.main.show())
            });
            let e = r.buildFromTemplate([{
                label: Editor.T("SHARED.exit"),
                click() {
                    process.exit()
                }
            }]);
            m.setContextMenu(e), a()
        })
    },
    quit(e) {
        l(), n(e)
    }
});