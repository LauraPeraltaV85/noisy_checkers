let email = "972@holbertonschool.com";
let password = 'xxxxxxxxxx';
let api_key = 'xxxxxx';
let projectnum = "331";
let recognizing;
let recognition = new webkitSpeechRecognition();
recognition.continuous = true;
reset();
recognition.onend = reset();

recognition.onresult = function (event) {
  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
        let sptodata =event.results[i][0].transcript;
        console.log(sptodata);
      if (sptodata.indexOf("check") == 1) {
        console.log("es un check");

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
                    /*
                    const test = async () => {
                    const settings = {
                      method: "GET",
                      headers:{
                        contentType: "application/json"               
                      } };
                    try{
                      const request = await fetch("https://intranet.hbtn.io/correction_requests/"+idtest+".json?auth_token="+auttok, settings);
                      const data = await request.json();
                      console.log(data);
                      return(data);
                    }catch(e){console.log(e);}
                  }
                  
                  data2 = test();
                  function calltest() {
                    await data2 = test();
                    if (data2.status == "Done"){
                      console.log("bien");
                    } else {
                      console.log("nosoy");
                      calltest();
                    }
                  }
                  calltest();*/
                  let a = 1;
                    while (a < 2) {
                      
                        // Do something after the sleep!
                                    
                      console.log("testing...");
                      let sleep = 0;
                      while ( sleep < 6000000000) {
                        sleep = sleep + 1;
                      }
                        let request = $.ajax({
                            url: "https://intranet.hbtn.io/correction_requests/"+idtest+".json?auth_token="+auttok,
                            method: "GET",
                            data: JSON.stringify({"api_key": "45dee31d9347eccc250872be24f17136",
                            "email": "940@holbertonschool.com",
                            "password": '#rt"d7UX2twC', "scope": "checker"}),
                            contentType: "application/json",
                            dataType: "json",
                            async: false
                        })
                          .done(function (data) {
                            console.log(data["status"]);
                            if (data["status"] === "Done") {
                              setTimeout(() => {console.log("waitign data");}, 5000);
                                let valcomp = 0;          
                                for (let con = 0; con < data.result_display.checks.length; con++){
                                    eachec = data.result_display.checks[con];
                                    if (eachec.passed === true) {
                                        console.log("bien");
                                      valcomp = valcomp + 1;
                                    }
                                }
                                if (data.result_display.checks.length == valcomp) {
                                  let audio = new Audio('applause2.mp3');
                                  $('#myAudio').get((x)=> {x.play();});
                                  audio.play();
                                  console.log("you passed all")
                                } else {
                                  let audio = new Audio('boo.mp3');
                                  $('#myAudio2').get((x)=> {x.play();});
                                  audio.play();
                                }
                                a = 2;
                            }
                          });
                          

                      

                          }
                    });
                }  
            });
        });
    });
    






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
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

// Usage!

