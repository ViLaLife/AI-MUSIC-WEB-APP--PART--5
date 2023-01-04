console.log("JS Loaded");
// 
song = "";
left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_x = 0;
right_wrist_y = 0;
score_right_wrist = 0;
score_left_wrist = 0;
//
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(570, 500);
    canvas.position(700, 400);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', gotposes);
}

function modelloaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 550, 470);
    fill("#ff7619");
    stroke("#000000");

    if (score_right_wrist > 0.2) {
        circle(right_wrist_x, right_wrist_y, 10);

        if (right_wrist_y > 0 && right_wrist_y <= 100) {
            document.getElementById("speed_holder").innerHTML = "Speed= 0.5x";
            song.rate(0.5);
        } else if (right_wrist_y > 100 && right_wrist_y <= 200) {
            document.getElementById("speed_holder").innerHTML = "Speed= 1x";
            song.rate(1);
        } else if (right_wrist_y > 200 && right_wrist_y <= 300) {
            document.getElementById("speed_holder").innerHTML = "Speed= 1.5x";
            song.rate(1.5);
        } else if (right_wrist_y > 300 && right_wrist_y <= 400) {
            document.getElementById("speed_holder").innerHTML = "Speed= 2x";
            song.rate(2);
        } else if (right_wrist_y > 400) {
            document.getElementById("speed_holder").innerHTML = "Speed= 2.5x";
            song.rate(2.5);
        }

    }


    if (score_left_wrist > 0.2) {
        circle(left_wrist_x, left_wrist_y, 10);

        In_number_left_wrist_y = Number(left_wrist_y);
        remove_decimels = floor(In_number_left_wrist_y);
        volume = remove_decimels / 500;
        document.getElementById("volume_holder").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}
//

function gotposes(result) {
    if (result.length > 0) {
        console.log(result);
        left_wrist_x = result[0].pose.leftWrist.x;
        left_wrist_y = result[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + left_wrist_x + "Left Wrist Y = " + left_wrist_y);
        right_wrist_x = result[0].pose.rightWrist.x;
        right_wrist_y = result[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + right_wrist_x + "Right Wrist Y = " + right_wrist_y);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}