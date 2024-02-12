class Vehicle {
    constructor(vehicleSize, vehicleEntryPoints, vehicleName) {
        this.vehicleName = vehicleName;
        this.vehicleSize = vehicleSize;
        this.vehicleEntryPoints = vehicleEntryPoints || [];
        this.entryTime = new Date();
        this.exitTime = null;
        this.parkingSlot = null;
    }

    setExitTime = () => {
        this.exitTime = new Date();
    }

    getDuration = () => {
        if (!this.exitTime) {
            this.setExitTime();
        }
        
        const msDiff = this.exitTime - this.entryTime;

        const hours = Math.ceil(msDiff / (1000 * 60 * 60));
        return hours;
    }
}

export default Vehicle;
