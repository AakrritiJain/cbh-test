const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;
const getHash = data => crypto.createHash("sha3-512").update(data).digest("hex");

module.exports = {
    MAX_PARTITION_KEY_LENGTH,
    TRIVIAL_PARTITION_KEY,
    deterministicPartitionKey: (event) => {
        const partitionKey = event?.partitionKey;
        if (partitionKey) {
            const data = typeof partitionKey === 'string' ? partitionKey : JSON.stringify(partitionKey);
            return data.length > MAX_PARTITION_KEY_LENGTH ? getHash(data) : data;
        }

        return event ? getHash(JSON.stringify(event)) : TRIVIAL_PARTITION_KEY;
    }
}
