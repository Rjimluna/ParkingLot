class ParkingLot {
    constructor() {
        this.slots = [];
        this.entryPoints = 3;
        this.parkedVehicles = new Map();
    }

    addParkingSlot = (slot) => {
        this.slots.push(slot);
    }

    parkVehicle = (vehicle) => {
        let closestSlot = null;
        let minimumDistance = Infinity;

        if (!vehicle.vehicleEntryPoints || !vehicle.vehicleEntryPoints.length) {
            console.log("No entry points defined for this vehicle.");
            return;
        }
    
        vehicle.vehicleEntryPoints.forEach(entryPoint => {
            if (entryPoint >= 1 && entryPoint <= this.entryPoints) {
                const slot = this.findClosestAvailableSlot(vehicle.vehicleSize, entryPoint);
                if (slot && slot.distances[entryPoint - 1] < minimumDistance) {
                    closestSlot = slot;
                    slot.name = vehicle.vehicleName;
                    minimumDistance = slot.distances[entryPoint - 1];
                }
            }
        });
    
        if (closestSlot) {
            closestSlot.markAsOccupied();
            vehicle.parkingSlot = closestSlot;
            this.parkedVehicles.set(vehicle, closestSlot);
            console.log(`Vehicle parked in slot ID: ${closestSlot.slotId}`);
        } else {
            console.log("No available slot found for this vehicle.");
        }
    };
    

    unparkVehicle = (vehicle) => {
        const slot = this.parkedVehicles.get(vehicle);
        if (slot) {
            this.parkedVehicles.delete(vehicle);
            slot.markAsAvailable();
            vehicle.setExitTime();
            const fee = this.calculateFee(vehicle);
            console.log(`Vehicle has been unparked. Fee: ${fee}, Name: ${slot.name}`);
            return fee;
        } else {
            console.log("Vehicle not found.");
        }
    }

    calculateFee = (vehicle) => {
        const hoursParked = vehicle.getDuration();
        const baseRate = 40;
        let fee = baseRate;
        let extraHours = hoursParked - 3;
    
        if (extraHours > 0) {
            fee += this.getExtraFee(vehicle.parkingSlot.size, extraHours);
        }
    
        if (hoursParked > 24) {
            const days = Math.floor(hoursParked / 24);
            fee = days * 5000;
            const remainingHours = hoursParked % 24 - 3;
            if (remainingHours > 0) {
                fee += this.getExtraFee(vehicle.parkingSlot.size, remainingHours);
            }
        }
    
        return fee;
    }

    getExtraFee = (slotSize, hours) => {
        const rate = [20, 60, 100][slotSize] ?? 20;
        return rate * hours;
    }

    findClosestAvailableSlot = (vehicleSize, entryPoint) => {
        let closestSlot = null;
        let minimumDistance = Infinity;
    
        this.slots.forEach(slot => {
            if (!slot.isOccupied && slot.size >= vehicleSize) {
                const distance = slot.distances[entryPoint - 1];
                if (distance !== undefined && distance < minimumDistance) {
                    closestSlot = slot;
                    minimumDistance = distance;
                }
            }
        });
    
        return closestSlot;
    }
    

    isSlotSuitableForVehicle = (slot, vehicleSize) => {
        return slot.size >= vehicleSize;
    }
}

export default ParkingLot;