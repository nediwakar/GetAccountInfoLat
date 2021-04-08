const axios = require('axios');
// This is your new function. To start, set the name and path on the left.
const API_ENDPOINT = 'https://pecodeviis:Test123!@pecodev.convergentusa.com/Convergent_Main_IVR/Home';

exports.check_name_task =async function(context, event, callback,RB) {
  console.log("check_name_task:");
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);
    
    
    Remember.CurrentTask = "check_name_task";
    let name_check = Memory.userData.FullName;
    let sQues = "";
    let Accountnumber = Memory.userData.LatAccountNumber;

    if(Memory.check_name_task_cnt === undefined)
      Remember.check_name_task_cnt = 0;
    else 
      Remember.check_name_task_cnt = parseInt(Memory.check_name_task_cnt) + 1;

    if(Memory.AccountFrom == "Phone")
       sQues = `if your name is, ${name_check}  and  your account number is <say-as interpret-as='digits'>${Accountnumber}</say-as>,,Please Say Yes to confirm your name or Say No if that is not your name. You can also press 1 for yes and 2 for no.  `;
    else{
      console.log("check_name_task_cnt :"+Remember.check_name_task_cnt);
      // if(Remember.check_name_task_cnt >= 1)
      //     sQues = ` If your name is, ${name_check} ,,Please Press  1 or Say Yes to confirm your name, , press 2 or Say No,, if that is not your name `;
      // else
          sQues = `if your name is, ${name_check} ,,Please Say Yes to confirm your name or Say No if that is not your name. You can also press 1 for yes and 2 for no. `;
       
    }
      
    Remember.AccountFrom = "";
    Say = `${sQues}`;
    Listen =  {
      "voice_digits": {
        "num_digits": 1,
        "finish_on_key": "#",
        "redirects": {
          1: "task://ZipOrSSN_Taks",
          2: "task://check_name_Yes_No"
        }
      },
      "tasks": [
        "yes_no",
        "agent_transfer"
      ]
    }
    
    
    Remember.question = "check_name_task";
    //Tasks = ['yes_no', 'agent_transfer'];
  
    
            
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  };

   
    
 