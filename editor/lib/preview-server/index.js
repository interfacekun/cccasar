"use strict";
const {
    ipcMain: e
} = require("electron");
var t, i, r, n, s, o = !1;

function a() {
    var e = Editor.require("app://asset-db/lib/meta").get(Editor.assetdb, Editor.currentSceneUuid),
        t = Editor.stashedScene.sceneJson;
    if (e) {
        var i = JSON.parse(t),
            r = Editor.serialize.findRootObject(i, "cc.SceneAsset");
        r ? r.asyncLoadAssets = e.asyncLoadAssets : Editor.warn("Can not find cc.SceneAsset in stashed scene");
        var n = Editor.serialize.findRootObject(i, "cc.Scene");
        return n ? n.autoReleaseAssets = e.autoReleaseAssets : Editor.warn("Can not find cc.Scene in stashed scene"), JSON.stringify(i)
    }
    return t
}
module.exports = {
    userMiddlewares: [],
    previewPort: 7456,
    start: function (e, o) {
        var c = require("fire-fs"),
            d = require("fire-path"),
            u = require("os"),
            p = require("del"),
            l = require("express"),
            f = require("http"),
            v = require("mobile-detect"),
            g = require("async"),
            h = this;
        this._validateStashedScene = e;
        var E = d.join(u.tmpdir(), "fireball-game-builds");
        p.sync(d.join(E, "**/*"), {
                force: !0
            }), (i = l()).set("views", Editor.url("unpack://static/preview-templates")), i.set("view engine", "jade"), i.locals.basedir = i.get("views"), i.use(function (e, t, i) {
                var r = h.userMiddlewares;
                Array.isArray(r) && r.length > 0 ? g.eachSeries(r, (i, r) => {
                    i(e, t, r)
                }, i) : i()
            }), i.use("/build", function (e, t, i) {
                n ? n(e, t, i) : t.send("Please build your game project first!")
            }), i.use("/preview-android-instant", function (e, t, i) {
                s ? s(e, t, i) : t.send("Please build your android instant project first!")
            }), i.get("/", function (e, t) {
                var i = e.headers["user-agent"],
                    r = new v(i),
                    n = c.existsSync(d.join(Editor.Project.path, "library", "bundle.project.js")),
                    s = -1 !== i.indexOf("MicroMessenger"),
                    o = Editor._projectProfile.data["cocos-analytics"];
                let a = Editor.require("app://editor/share/quick-compile/check-auto-build-engine")() ? ".cache/dev/__quick_compile__.js" : "cocos2d-js-for-preview.js";
                t.render("index", {
                    title: "CocosCreator | " + Editor.Project.name,
                    cocos2d: a,
                    hasProjectScript: n,
                    tip_sceneIsEmpty: Editor.T("PREVIEW.scene_is_empty"),
                    enableDebugger: !!r.mobile() || s,
                    CA: o && o.enable && {
                        appID: JSON.stringify(o.appID) || '""',
                        appSecret: JSON.stringify(o.appSecret) || '""',
                        channel: JSON.stringify(o.channel) || '""',
                        version: JSON.stringify(o.version) || '""'
                    }
                })
            }), i.get("/compile", function (e, t) {
                Editor.Compiler.compileScripts(!1, (e, i) => {
                    i || (e ? (t.send("Compiling script successful!"), Editor.Compiler.reload()) : t.send("Compile failed!"))
                })
            }), i.get("/update-db", function (e, t) {
                Editor.assetdb.submitChanges(), t.send("Changes submitted")
            }), i.get(["/app/engine/*", "/engine/*"], function (e, t) {
                var i = d.join(Editor.url("unpack://engine"), e.params[0]);
                t.sendFile(i)
            }), i.get("/engine-dev/*", function (e, t) {
                var i = d.join(Editor.url("unpack://engine-dev"), e.params[0]);
                t.sendFile(i)
            }), i.get("/app/editor/static/*", function (e, t) {
                var i = Editor.url("unpack://static/" + e.params[0]);
                t.sendFile(i)
            }), i.get("/app/*", function (e, t) {
                var i = Editor.url("app://" + e.params[0]);
                t.sendFile(i)
            }), i.get("/project/*", function (e, t) {
                var i = d.join(Editor.Project.path, e.params[0]);
                t.sendFile(i)
            }), i.get("/preview-scripts/*", function (e, t) {
                let i = Editor.QuickCompiler.getTempPath();
                var r = d.join(i, e.params[0]);
                t.sendFile(r)
            }), i.get("/res/raw-*", function (e, t) {
                var i = e.params[0];
                i = Editor.assetdb._fspath("db://" + i), t.sendFile(i)
            }), i.get("/res/import/*", function (e, t) {
                var i = e.params[0];
                if (Editor.stashedScene && Editor.currentSceneUuid && d.basenameNoExt(i) === Editor.currentSceneUuid) return t.send(a()), void 0;
                i = d.join(Editor.importPath, i), t.sendFile(i)
            }), i.get("/settings.js", function (e, t) {
                h.query("settings.js", function (e, i) {
                    if (e) return o(e);
                    t.send(i)
                })
            }), i.get("/preview-scene.json", function (e, t) {
                h.getPreviewScene(function (e) {
                    return o(e)
                }, function (e) {
                    t.send(e)
                }, function (e) {
                    t.sendFile(e)
                })
            }), i.use(function (e, t, i, r) {
                console.error(e.stack), r(e)
            }), i.use(function (e, t, i, r) {
                t.xhr ? i.status(e.status || 500).send({
                    error: e.message
                }) : r(e)
            }), i.use(function (e, t) {
                t.status(404).send({
                    error: "404 Error."
                })
            }),
            function e(t, i, r) {
                function n() {
                    t.removeListener("error", s), r(null, i)
                }

                function s(s) {
                    if (t.removeListener("listening", n), "EADDRINUSE" !== s.code && "EACCES" !== s.code) return r(s);
                    e(t, ++i, r)
                }
                t.once("error", s), t.once("listening", n), t.listen(i)
            }(r = f.createServer(i), this.previewPort, (e, t) => {
                if (e) return o && o(e), void 0;
                this.previewPort = t, Editor.success(`preview server running at http://localhost:${this.previewPort}`), o && o()
            }),
            function (e) {
                var i = 0;
                (t = require("socket.io")(e)).on("connection", function (e) {
                    e.emit("connected"), i += 1, Editor.Ipc.sendToMainWin("preview-server:connects-changed", i), e.on("disconnect", function () {
                        i -= 1, Editor.Ipc.sendToMainWin("preview-server:connects-changed", i)
                    })
                })
            }(r)
    },
    query: function (e, t, i) {
        if (this._validateStashedScene) switch (void 0 === i && (i = t, t = "web-desktop"), e) {
            case "settings.js":
                this._validateStashedScene(() => {
                    var e = Editor.Profile.load("profile://project/project.json"),
                        r = {
                            designWidth: Editor.stashedScene.designWidth,
                            designHeight: Editor.stashedScene.designHeight,
                            groupList: e.data["group-list"],
                            collisionMatrix: e.data["collision-matrix"],
                            platform: t,
                            scripts: Editor.QuickCompiler.scripts
                        };
                    require("../../core/gulp-build").buildSettings({
                        customSettings: r,
                        sceneList: Editor.sceneList,
                        debug: !0,
                        preview: !0
                    }, i)
                });
                break;
            case "stashed-scene.json":
                this._validateStashedScene(() => {
                    i && i(null, a())
                })
        }
    },
    getPreviewScene(e, t, i) {
        let r = Editor._projectProfile.data["start-scene"];
        if ("current" !== r && r !== Editor.currentSceneUuid && Editor.assetdb.existsByUuid(r)) {
            i(Editor.assetdb._uuidToImportPathNoExt(r) + ".json")
        } else this.query("stashed-scene.json", (i, r) => {
            if (i) return e(i);
            t(r)
        })
    },
    stop: function () {
        r && r.close(function () {
            Editor.info("shutdown preview server"), r = null
        })
    },
    browserReload: function () {
        o || (o = setTimeout(function () {
            t.emit("browser:reload"), clearTimeout(o), o = !1
        }, 50))
    },
    setPreviewBuildPath: function (e) {
        var t = require("express");
        n = t.static(e)
    },
    setPreviewAndroidInstantPath: function (e) {
        var t = require("express");
        Editor.log("express path is ", e), s = t.static(e)
    },
    _validateStashedScene: null
}, Editor._buildCommand || Editor._compileCommand || module.exports.start(t => {
    Editor.stashedScene ? t() : (e.once("app:preview-server-scene-stashed", t), Editor.Ipc.sendToWins("scene:preview-server-scene-stashed"))
});