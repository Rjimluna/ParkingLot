class ParkingSlot {
    constructor(slotId, size, distances) {
        this.slotId = slotId;
        this.size = size;
        this.distances = distances;
        this.isOccupied = false;
    }

    markAsOccupied = () => {
        this.isOccupied = true;
    }

    markAsAvailable = () => {
        this.isOccupied = false;
    }
}

export default ParkingSlot;
