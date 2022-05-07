sound = "";
status = "";
objects = [];

function preload(){

    sound = loadSound("mixkit-retro-game-emergency-alarm-1000.wav");

}

function setup(){

    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS = DETECTED BABY";

}

function draw(){
    
    image(video, 0, 0, 380, 380);

    if(status != ""){

        objectDetector.detect(video, y);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0; i < objects.length; i++){

            fill(r, g, b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("status").innerHTML = "STATUS : DETECTED BABY";
            document.getElementById("object_count").innerHTML = "NUMBER OF PEOPLE DETECTED IS : " + objects.length;

            if(objects[0].label = "person"){

                document.getElementById("status").innerHTML = "BABY DETECTED";
                sound.stop();

            }

            else{

                document.getElementById("status").innerHTML = "BABY NOT DETECTED";
                sound.play();

            }

            if(objects[0].lenth < 0){

                document.getElementById("status").innerHTML = "BABY NOT DETECTED";
                sound.play();

            }

        }

    }

}

function modelLoaded(){

    console.log("MODEL HAS BEEN LOADED SO DONT TURN IT OFF OR ELSE YOU SHALL HAVE A HARD TIME FOR THE REST OF YOUR MISERABLE, GOOD FOR NOTHING LIFE. :)");
    status = true;

}

function y(error, results){

    if(error){

        console.log(error);

    }

    else{

        console.log(results);
        objects = results;

    }

}