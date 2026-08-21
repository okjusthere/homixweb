import assert from "node:assert/strict";
import test from "node:test";
import {
  matchRosterMemberByLicense,
  normalizeLicense,
} from "../src/lib/agents/mls-license.ts";

const roster = [
  {
    memberKey: "member-1",
    memberMlsId: "KEY100001",
    fullName: "Verified Agent",
    stateLicense: "10401373728",
  },
  {
    memberKey: "member-2",
    memberMlsId: "KEY100002",
    fullName: "Second Agent",
    stateLicense: "10401370000",
  },
];

test("normalizes formatted state license numbers", () => {
  assert.equal(normalizeLicense("Lic. #104-0137-3728"), "10401373728");
});

test("matches only one exact state license", () => {
  const result = matchRosterMemberByLicense("10401373728", roster);
  assert.equal(result.status, "matched");
  if (result.status === "matched") assert.equal(result.member.memberMlsId, "KEY100001");
});

test("does not guess from a partial or incorrect license", () => {
  assert.equal(matchRosterMemberByLicense("1040137372", roster).status, "unmatched");
  assert.equal(matchRosterMemberByLicense("", roster).status, "empty");
});

test("refuses an ambiguous duplicate license", () => {
  const result = matchRosterMemberByLicense("10401373728", [
    ...roster,
    { ...roster[0], memberKey: "member-3", memberMlsId: "KEY100003" },
  ]);
  assert.equal(result.status, "ambiguous");
});
