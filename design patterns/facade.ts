interface CPU{ //create an interface CPU, with some functions for show 
    Jump(position: number);
    Execute();
}
interface HardDrive{ //create an harddrive and memory interface with functions for show.
    Read(lba: number, size: number): string
} //in reality these empty functions would hold code needed to do whatever is needed, in this case to start up a PC.
interface Memory{
    Load(position: number, data: string)
}

class ComputerFacade{ //here's the facade, make instances of the CPU, memory and harddrive, as well as a bootadress and size
    cpu: CPU;
    memory: Memory;
    HDD: HardDrive;
    BootAdress: number;
    BootSize: number;
    Boot(){ //boot executes all the functions needed to get the "Computer" up and working.
        this.memory.Load(this.BootAdress, this.HDD.Read(this.BootAdress, this.BootSize))
        this.cpu.Jump(this.BootAdress);
        this.cpu.Execute();
    }

}
    function main(){ //create an instance of the facade, and run it.
        Computer: ComputerFacade;
        this.Computer.Boot();
    }