// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

// CommonJS
const Swal = require('sweetalert2')



let email = "972@holbertonschool.com";
let password = 'Coding4Fun!';
let api_key = '53432465e809dd169f26692147cbdc49';
let projectnum = "210";
let recognizing;
let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset();
​
recognition.onresult = function (event) {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
        let sptodata =event.results[i][0].transcript;
        console.log(sptodata);
      if (sptodata.indexOf("check") == 1) {
        console.log("es un check");
​
        let request = $.ajax({
            url: "https://intranet.hbtn.io/users/auth_token.json",
            method: "POST",
            data: JSON.stringify({"api_key": api_key,
            "email": email,
            "password": password, "scope": "checker"}),
            contentType: "application/json",
            dataType: "json"
        })
          .done(function (data) {
            console.log(data["auth_token"]);
            auttok = data["auth_token"];
        
            let request = $.ajax({
                url: "https://intranet.hbtn.io/projects/"+projectnum+".json?auth_token="+auttok,
                method: "GET",
                data: JSON.stringify({"api_key": "45dee31d9347eccc250872be24f17136", "email": "940@holbertonschool.com",
                    "password": '#rt"d7UX2twC', "scope": "checker"}),
                contentType: "application/json",
                dataType: "json"
            })
    
                .done(function (data) {
                console.log(data["tasks"]);
                idtas = data["tasks"][0].id;
                let request = $.ajax({
                url: "https://intranet.hbtn.io/tasks/"+idtas+".json?auth_token="+auttok,
                method: "GET",
                data: JSON.stringify({"api_key": "45dee31d9347eccc250872be24f17136", "email": "940@holbertonschool.com",
                    "password": '#rt"d7UX2twC', "scope": "checker"}),
                contentType: "application/json",
                dataType: "json"
            })
                .done(function (data) {
                console.log(data["checker_available"]);
                if (data["checker_available"] === true) {
                    let request = $.ajax({
                    url: "https://intranet.hbtn.io/tasks/"+idtas+"/start_correction.json?auth_token="+auttok,
                    method: "POST",
                    data: JSON.stringify({"api_key": "45dee31d9347eccc250872be24f17136", "email": "940@holbertonschool.com",
                        "password": '#rt"d7UX2twC', "scope": "checker"}),
                    contentType: "application/json",
                    dataType: "json"
                })
    
                    .done(function (data) {
                    console.log(data.id);
                    idtest = data.id;
                    let a = 1;
                    while (a === 1) {
                      console.log("entre loop");
                        let request = $.ajax({
                            url: "https://intranet.hbtn.io/correction_requests/"+idtest+".json?auth_token="+auttok,
                            method: "GET",
                            data: JSON.stringify({"api_key": "45dee31d9347eccc250872be24f17136",
                            "email": "940@holbertonschool.com",
                            "password": '#rt"d7UX2twC', "scope": "checker"}),
                            contentType: "application/json",
                            dataType: "json"
                        })
                          .done(function (data) {
                            console.log(data["status"]);
                            if (data["status"] === "Done") {
                                for (let con = 0; con < data.result_display.checks.length; con++){
                                    eachec = data.result_display.checks[con];
                                    if (eachec.passed === true) {
                                        console.log("bien");
                                    }
                                }
                                a = 2;
                            }
                          });
                          setTimeout(() => {console.log("waiting for checker")}, 5000);
                    }
                    });
                }   
            });
        });
    });
    
​
​
​
​
​
​
      }
    }
  }
}
console.log("si esta entrando");
function reset() {
  recognizing = false;
  //h2.innerHTML = "Click to Speak";
}
recognition.start();
setTimeout(reset(), 300);
