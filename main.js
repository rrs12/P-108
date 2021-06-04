Webcam.set({
    height: 300,
    width: 350,
    image_format: "png",
    png_quality: 90
})
Webcam.attach("#camera")

function capture() {
    document.getElementById("result").style.visibility = "visible";
    document.getElementById("btn1").style.visibility = "visible";
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_image' src='" + data_uri + "'>"
    })
}

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/JOkT47xnB/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model Loaded!")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is" + prediction_1
    speak_data_2 = "The second prediction is" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis)
}

function predict() {
    img = document.getElementById("captured_image")
    classifier.classify(img, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        prediction_1 = results[0].label
        prediction_2 = results[1].label
        document.getElementById("emotion_name").innerHTML = prediction_1;
        document.getElementById("emotion_name2").innerHTML = prediction_2;
        speak()

        if (results[0].label == "Best") {
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if (results[0].label == "Amazing") {
            document.getElementById("update_emoji").innerHTML = "👌"
        }
        if (results[0].label == "Victory") {
            document.getElementById("update_emoji").innerHTML = "✌️";
        }

        if (results[1].label == "Best") {
            document.getElementById("update_emoji2").innerHTML = "👍"
        }

        if (results[1].label == "Amazing") {
            document.getElementById("update_emoji2").innerHTML = "👌"
        }
        if (results[1].label == "Victory") {
            document.getElementById("update_emoji2").innerHTML = "✌️"
        }

    }
}