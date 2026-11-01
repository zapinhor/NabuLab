import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { isDailyPopupPath, saoPauloDay } from "../src/components/premium/daily-premium-popup";

assert.equal(isDailyPopupPath("/dashboard"), true);
assert.equal(isDailyPopupPath("/historico/abc"), true);
assert.equal(isDailyPopupPath("/simulado/prova"), false, "não interrompe a prova");
assert.equal(isDailyPopupPath("/premium"), false);
assert.equal(isDailyPopupPath("/professor"), false);
assert.equal(isDailyPopupPath("/"), false);
assert.equal(saoPauloDay(new Date("2026-11-01T02:30:00Z")), "2026-10-31", "dia no fuso de São Paulo");
const popup = readFileSync("src/components/premium/daily-premium-popup.tsx", "utf8");
assert.match(popup, /hasActivePremium/, "assinantes não veem o convite");
assert.match(popup, /showModal/, "bloqueia o resto do site até fechar");
assert.doesNotMatch(popup, /grátis por \d+ dias|teste grátis|trial/i, "sem promessa de teste grátis");
const migration = readFileSync("supabase/migrations/20261101030000_realtime_classes.sql", "utf8");
for (const table of ["teacher_class_members", "teacher_class_invites", "teacher_class_activities", "teacher_activity_attempts"]) assert.match(migration, new RegExp(table));
console.log("Premium popup and realtime classes validated.");
