"use strict";
const t = require("path"),
    i = require("../../../asset-db");
Editor.metaBackupPath = "temp/RemovedMetas", Editor.assetBackupPath = "temp/BackupAssets", Editor.log("Initializing Asset Database");
const a = new i({
    cwd: t.join(Editor.Project.path),
    library: "library",
    dev: Editor.dev,
    metaBackupPath: t.join(Editor.Project.path, Editor.metaBackupPath),
    assetBackupPath: t.join(Editor.Project.path, Editor.assetBackupPath)
});
Editor.libraryPath = a.library, Editor.importPath = a._importPath, Editor.externalMounts = function (i) {
    if (!i || !Array.isArray(i)) return null;
    for (var a = [], n = ["assets", "internal"], e = 0, o = i.length; e < o; e++) {
        let o = i[e];
        if (o = t.isAbsolute(o) ? t.normalize(o) : t.normalize(t.join(Editor.Project.path, o)), !_checkMountValid(o)) {
            Editor.warn(`${o} is not a valid mount path.`);
            continue
        }
        let r = _getUniqueName(t.basename(o), n);
        n.push(r), a.push({
            path: o,
            name: r
        })
    }
    return a
}(Editor.argv.mount), Editor.mountsWritable = Editor.argv.writable;
const n = ["asset-db:watch-state-changed", "asset-db:state-changed"];
a.setEventCallback((t, i) => {
    n.indexOf(t) >= 0 ? Editor.Window.main && Editor.Ipc.sendToMainWin(t, i) : Editor.Ipc.sendToAll(t, i)
});
module.exports = new class {
    get loading() {
        return !!this.loadingWin
    }
    set loading(t) {
        (t = !!t) && !this.loadingWin ? (this.loadingWin = new Editor.Window("importing", {
            title: "Importing",
            width: 350,
            height: 120,
            alwaysOnTop: !0,
            show: !1,
            resizable: !1,
            save: !1,
            frame: !1
        }), this.loadingWin.load("app://editor/page/import-waiting.html"), this.loadingWin.nativeWin.once("ready-to-show", () => {
            this.loadingWin && this.loadingWin.show()
        })) : (this.loadingWin && this.loadingWin.close(), this.loadingWin = null)
    }
    constructor(t) {
        this.assetdb = t
    }
    async mountInternal() {
        return new Promise((t, i) => {
            Editor.assetdb.mount(Editor.url("unpack://static/default-assets/"), "internal", {
                hidden: !Editor.showInternalMount
            }, a => {
                a ? i(a) : t()
            })
        })
    }
    async mountExternal() {
        if (Editor.externalMounts && 0 !== Editor.externalMounts.length) return Promise.all(Editor.externalMounts.map(t => new Promise((i, a) => {
            Editor.assetdb.mount(t.path, t.name, {
                readonly: !Editor.mountsWritable
            }, t => {
                t ? a(t) : i()
            })
        })))
    }
    async mountMain() {
        return new Promise((i, a) => {
            Editor.assetdb.mount(t.join(Editor.Project.path, "assets"), "assets", t => {
                t ? a(t) : i()
            })
        })
    }
    async init() {
        return new Promise((t, i) => {
            Editor.assetdb.init((i, a) => {
                Editor.assetdbInited = !0, t()
            })
        })
    }
}(a);