import assert from "node:assert/strict";
import test from "node:test";
import {
  isCalendarDate,
  monthlyCents,
  nextPaymentDate,
  parseAmount,
} from "../utils/helpers.ts";

test("monthly schedules preserve the original day after shorter months", () => {
  const payment = { startDate: "2024-01-31T12:00:00.000Z", freq: "Monthly" };
  assert.equal(nextPaymentDate(payment, "2024-02-01"), "2024-02-29");
  assert.equal(nextPaymentDate(payment, "2024-02-29"), "2024-02-29");
  assert.equal(nextPaymentDate(payment, "2024-03-01"), "2024-03-31");
});

test("yearly schedules preserve the start month and handle leap days", () => {
  const payment = { startDate: "2020-02-29", freq: "Yearly" };
  assert.equal(nextPaymentDate(payment, "2023-01-01"), "2023-02-28");
  assert.equal(nextPaymentDate(payment, "2023-03-01"), "2024-02-29");
  assert.equal(nextPaymentDate(payment, "2019-01-01"), "2020-02-29");
});

test("biweekly schedules count calendar days across daylight saving changes", () => {
  const payment = { startDate: "2026-03-01", freq: "BiWeekly" };
  assert.equal(nextPaymentDate(payment, "2026-03-15"), "2026-03-15");
  assert.equal(nextPaymentDate(payment, "2026-03-16"), "2026-03-29");
});

test("monthly averages use cents and the number of annual payments", () => {
  assert.equal(monthlyCents(100, "BiWeekly"), 21667);
  assert.equal(monthlyCents(100, "Yearly"), 833);
  assert.equal(monthlyCents(16.29, "Monthly"), 1629);
});

test("validation rejects calendar rollover and out-of-range amounts", () => {
  assert.equal(isCalendarDate("2024-02-29"), true);
  assert.equal(isCalendarDate("2025-02-29"), false);
  assert.equal(isCalendarDate("2025-02-31"), false);
  assert.equal(parseAmount("12.34"), 12.34);
  assert.equal(parseAmount(".50"), 0.5);
  assert.equal(parseAmount("0"), 0);
  assert.equal(parseAmount("99,999,999.99"), null);
  assert.equal(parseAmount("99999999.99"), 99999999.99);
  for (const invalid of ["", "-1.00", "1e3", "0.001", "100000000"]) {
    assert.equal(parseAmount(invalid), null);
  }
});
