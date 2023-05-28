const {TRIVIAL_PARTITION_KEY} = require("./dpk");
const {MAX_PARTITION_KEY_LENGTH} = require("./dpk");
const {deterministicPartitionKey} = require("./dpk");

describe("deterministicPartitionKey", () => {
    describe('when no input given', function () {
        it("should return the literal '0'", () => {
            const partitionKey = deterministicPartitionKey();
            expect(partitionKey).toBe(TRIVIAL_PARTITION_KEY);
        });
    });
    describe('when event with partitionKey given', function () {
        it("should return the partition key for string partition key", () => {
            const mockEvent = {
                partitionKey: "mock_partition_key"
            }
            const partitionKey = deterministicPartitionKey(mockEvent);
            expect(partitionKey).toBe(mockEvent.partitionKey);
        });
        it("should return the stringy-fied partition key for numbered partition key", () => {
            const mockEvent = {
                partitionKey: 12345
            }
            const partitionKey = deterministicPartitionKey(mockEvent);
            expect(partitionKey).toBe("12345");
        });
        it("should return the hash for partitionKey more than 256 length", () => {
            const mockEvent = {
                partitionKey: new Array(MAX_PARTITION_KEY_LENGTH + 2).join("a")
            }
            const partitionKey = deterministicPartitionKey(mockEvent);
            expect(partitionKey).toBe("5008048b64c14975181175f157be4a780c3d443d2177edf323d57884bc7e3979b9b53bca1325e880df3da0d97c435693441cb5527fbe950f5585678dfbb37785");
        });
    });
    describe('when event without partitionKey given', function () {
        it("should return the hash", () => {
            const mockEvent = {someOtherKey: "mock_partition_key"}
            const partitionKey = deterministicPartitionKey(mockEvent);
            expect(partitionKey).toBe("453821c1f1dab99592b880db9383e7ae1c884c7d950f19adebca212b7fe605fb79929959844c4fb7d2d9dea6fc05955905b63d9964ef82741e71606edbbb8a16");
        });
    });
});
