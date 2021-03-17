//i couldn't think of a smart way to implement this, and the easiest way to envision it is through the idea of phone chargers, so here we are.
interface USBPhone{ //create an interface for the USBphone
    Recharge();
    UseUSB();
}
interface MicroUSBPhone{ //create an interface for the MicroUSBPhone
    Recharge();
    UseMicroUSB();
}
class Iphone implements MicroUSBPhone{ //Make the iphone, with 2 functions, to connect the MicroUSBcable, and to recharge
    Connector: boolean;

    UseMicroUSB() { //connecting the MicroUSBcable will automatically start recharging.
        this.Connector = true;
        console.log("MicroUSB connected");
        this.Recharge();
    }
    Recharge(){
        if(this.Connector){
            console.log("recharge started");
            console.log("recharge finished");
        }
    }
}
class Android implements USBPhone{ //the same is done for the Android, but this time with an USB cable.
    Connector: boolean;
    UseUSB(){
        this.Connector = true;
        console.log("USB connected");
        this.Recharge();
    }
    Recharge(){
        if (this.Connector){
            console.log("Recharge started");
            console.log("Recharge finished");
        }
    }
}
class USBToMicroUSBAdaptor implements MicroUSBPhone{
   
    Recharge() { // just had to put this here because i need to use both functions
       //no need to put anything in here.
    }
    Phone: USBPhone;

    USBToMicroUSBAdapter(Phone: USBPhone){  //pass the phone to the function, so it can properly use it.
        this.Phone = Phone;
    }

    UseMicroUSB(){
        console.log("MicroUSB connnected"); //this is where the code would be that would actually "adapt" these functions.
        this.Phone.UseUSB();
    }
}
class Demo{
    Android: Android = new Android;
    Iphone: Iphone = new Iphone;
    Adapter: USBToMicroUSBAdaptor = new USBToMicroUSBAdaptor;
    RechargeMicroUSBPhone(Phone: MicroUSBPhone){ //just as an example, functions to charge both phones normally
        Phone.UseMicroUSB();
    }
    RechargeUSBPhone(Phone: USBPhone){
        Phone.UseUSB();
    }
    main(){ 
        console.log("Recharging android");
        this.RechargeUSBPhone(this.Android); //recharge both phones normally
        console.log("recharging Iphone");
        this.RechargeMicroUSBPhone(this.Iphone);
        console.log("Recharging andoid with MicroUSB"); //then use the adaptor to make it run through the adapter code as well before running the normal code for the function
        this.Adapter.USBToMicroUSBAdapter(this.Android);
    }
}