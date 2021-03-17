class Singleton{
    private static instance: Singleton; // make a static instance of the singleton
    // the fact that the instance is static means that no more than one instance can exist. and as such qualifies for the first requirement for a singleton
    public static getInstance(): Singleton{ //check if the instance has indeed been correctly made.
        if (!Singleton.instance){
            Singleton.instance = new Singleton();//if it hasn't then create one.
        }
        return Singleton.instance; //and then return the instance.
    }
    //with the fact that the instance is a static means that it doesnt have to be instantiated elsewhere, and making theactualcode public means that
    //it will be available from everywhere. at least from my understanding
    public TheActualCode(){ 
        //the code that this singleton provides
    }
}