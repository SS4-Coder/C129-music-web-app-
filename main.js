Peter_pan_song="";
Harry_potter_theme_song="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
rightWrist_x=0;
score_leftWrist=0;
score_rightWrist=0;
song_name="";
function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,model_loaded);
    poseNet.on("pose",got_poses);
}
function preload()
{
    Peter_pan_song=loadSound("music2.mp3");
    Harry_potter_theme_song=loadSound("music.mp3");
}
function model_loaded()
{
    console.log("PoseNet is initialized");
}
function got_poses(results)
{
    if(results.length > 0){
        console.log(results);
    score_leftWrist=results[0].pose.keypoints[9].score;
    console.log("Score left wrist="+score_leftWrist);

    leftWrist_x = results[0].pose.leftWrist.x;
    leftWrist_y = results[0].pose.leftWrist.y;
    console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

    rightWrist_x = results[0].pose.rightWrist.x;
    rightWrist_y = results[0].pose.rightWrist.y;
    console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
}
}
function draw()
{
    image(video,0,0,600,530);
    fill("red");
    stroke ("black");

    song_name=Peter_pan_song.isPlaying();
    console.log(song_name);
    if(score_leftWrist>0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song.stop();
    if(song_name == false)
    { 
        Peter_pan_song.play();
    }
    else{
        console.log("Song Name: Peter Pan Song");
        document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
    }
}
}
