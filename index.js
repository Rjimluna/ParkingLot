import ParkingLot from './components/ParkingLot.js';
import ParkingSlot from './components/ParkingSlot.js';
import Vehicle from './components/Vehicle.js';

const parkingLot = new ParkingLot();

parkingLot.addParkingSlot(new ParkingSlot('S1', 1, [1, 2, 3]));
parkingLot.addParkingSlot(new ParkingSlot('S2', 2, [2, 3, 4]));
parkingLot.addParkingSlot(new ParkingSlot('S3', 3, [3, 4, 5]));
parkingLot.addParkingSlot(new ParkingSlot('S4', 1, [4, 5, 6]));
parkingLot.addParkingSlot(new ParkingSlot('S5', 2, [5, 6, 7]));
parkingLot.addParkingSlot(new ParkingSlot('S6', 3, [6, 7, 8]));

const vehicle1 = new Vehicle(1, [1, 2], 'small vehicle 1');
const vehicle2 = new Vehicle(2, [2, 3], 'medium vehicle 1');
const vehicle3 = new Vehicle(3, [1], 'large vehicle 1');
const vehicle4 = new Vehicle(2, [3], 'medium vehicle 2');

parkingLot.parkVehicle(vehicle1);
parkingLot.parkVehicle(vehicle2);
parkingLot.parkVehicle(vehicle3);
parkingLot.parkVehicle(vehicle4);

console.log('Parking lot status:');
parkingLot.slots.forEach(slot => {
    console.log(`Slot ID: ${slot.slotId}, Occupied: ${slot.isOccupied}, Size: ${slot.size}, Name: ${slot.name}`);
});
console.log('Unpark vehicle status:');
parkingLot.unparkVehicle(vehicle1);
parkingLot.unparkVehicle(vehicle2);
parkingLot.unparkVehicle(vehicle3);
parkingLot.unparkVehicle(vehicle4);