const kits = require("./KITS_SHIPPING_DATA.json");

function findKitByLabel(label_id) {
  return kits.find((kit) => kit.label_id == label_id);
}

function findKitsStartingWith(partialId) {
  const options = kits
    .filter((kit) => kit.label_id.startsWith(partialId))
    .slice(0, 5)
    .sort((a, b) => {
      if (a.label_id > b.label_id) {
        return 1;
      }
      if (a.label_id < b.label_id) {
        return -1;
      }
      return 0;
    });

  return options;
}

module.exports = {
  findKitByLabel,
  findKitsStartingWith,
};
