import { getBlueprintStats, listBlueprints, validateAllBlueprints } from "../src/core/blueprint-catalog";

const blueprints = listBlueprints();
const validation = validateAllBlueprints();
const stats = getBlueprintStats();
const duplicateKeys = blueprints
  .map((blueprint) => blueprint.key)
  .filter((key, index, keys) => keys.indexOf(key) !== index);

console.log("Blueprint catalog validation");
console.log(JSON.stringify(stats, null, 2));

if (blueprints.length !== 100) {
  console.error(`Expected exactly 100 blueprints, received ${blueprints.length}`);
  process.exitCode = 1;
}

if (duplicateKeys.length > 0) {
  console.error(`Duplicate keys: ${duplicateKeys.join(", ")}`);
  process.exitCode = 1;
}

if (!validation.valid) {
  console.error(`Validation failed with ${validation.issues.length} issue(s):`);
  validation.issues.slice(0, 80).forEach((issue) => {
    console.error(`[${issue.severity}] ${issue.blueprintKey ?? "catalog"} ${issue.path}: ${issue.message}`);
  });
  if (validation.issues.length > 80) console.error(`...and ${validation.issues.length - 80} more`);
  process.exitCode = 1;
}

if (!process.exitCode) {
  console.log("All 100 blueprints passed validation.");
}
