// Our button wired to D0
int thermoPin = A0;
int coolPin = D7;

double analogvalue = 0;
double tempC = 0;

double maxDesiredTemp = 3;
double minDesiredTemp = 1; // min threshold for temp

// because the sensor is a few degrees off
double correction = -25;

bool cooling = false;

double lastMeasurement = 0;

void setup() {
  pinMode( thermoPin , INPUT); // sets pin as input
  pinMode( coolPin , OUTPUT );
  
  Particle.variable("analogvalue", analogvalue);
  Particle.variable("temp", tempC);
  Particle.variable("cooling", cooling);
  lastMeasurement = analogRead(thermoPin);
}

void loop() {
    analogvalue = analogRead(thermoPin);
    
    tempC = ( ( analogvalue - 500 ) / 10 ) + correction;
    
    // if we're in a cooling cycle then we want to reduce the temp
    if ( cooling ) {
        cooling = tempC > minDesiredTemp;
    } else {
        cooling = tempC > maxDesiredTemp;
    }

    if( cooling ) {
        // turn the frige on
        digitalWrite( coolPin, HIGH);
        // Particle.publish("cooling");
        delay(1000);
    } else {
        digitalWrite( coolPin, LOW);
    }
}
