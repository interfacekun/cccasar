"use strict";const e=require("../package.json");module.exports=(()=>[{label:Editor.T("ASSETS.path"),click(){Editor.Ipc.sendToPanel(e.name,"change-filter","")}},{label:Editor.T("ASSETS.type"),click(){Editor.Ipc.sendToPanel(e.name,"change-filter","t:")}},{label:Editor.T("ASSETS.uuid"),click(){Editor.Ipc.sendToPanel(e.name,"change-filter","u:")}},{label:Editor.T("ASSETS.uuid_used_by"),click(){Editor.Ipc.sendToPanel(e.name,"change-filter","used:")}}]);