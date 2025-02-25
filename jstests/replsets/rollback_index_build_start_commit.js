/**
 * Tests different permutations of rolling-back index build start and commit oplog entries.
 *
 * TODO: SERVER-39451 Add recover to a stable timestamp logic for startIndexBuild, abortIndexBuild,
 * and commitIndexBuild.
 * @tags: [
 *   two_phase_index_builds_unsupported
 * ]
 */
(function() {
"use strict";

// for RollbackIndexBuildTest
load('jstests/replsets/libs/rollback_index_builds_test.js');

const rollbackIndexTest = new RollbackIndexBuildsTest();

// Build a schedule of operations interleaving rollback and an index build.
const rollbackOps = ["holdStableTimestamp", "transitionToRollback"];
const indexBuildOps = ["start", "commit"];

// This generates 4 choose 2, or 6 schedules.
const schedules = RollbackIndexBuildsTest.makeSchedules(rollbackOps, indexBuildOps);
rollbackIndexTest.runSchedules(schedules);
rollbackIndexTest.stop();
})();
