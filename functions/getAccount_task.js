const axios = require('axios');
// This is your new function. To start, set the name and path on the left.
const API_ENDPOINT = 'http://Latdeviis:Test!123456@ivalatdev.accountcontrol.com/AccountInfoLat/Home';

exports.getAccount_task =async function(context, event, callback,RB) {
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;
  
    const Memory = JSON.parse(event.Memory);
    Remember.RehabIneligible = "";
    Remember.AccountType = "";
    Remember.ClientName = "";
    Remember.ClientID = "";
    Remember.Status =  "";
    Remember.Returns =  "";
    Remember.LatAccountNumber =  "";
    Remember.TotalLinkAccounts =  "";
    Remember.LinkAccount =  "";	
    Remember.CustomerAccountNumber =  "";
    Remember.SSN =  "";
    Remember.FullName =  "";	
    Remember.Homephone =  "";
    Remember.workphone =  "";
    Remember.Address1 =  "";		
    Remember.Address2 =  "";	
    Remember.City =  "";	
    Remember.State =  "";	
    Remember.Zipcode =  "";	
    Remember.DebtorID =  "";	
    Remember.Principal_Balance_Ind =  "";	
    Remember.Interest_Balance_Ind =  "";	
    Remember.Collection_Cost_Balance_Ind =  "";	
    Remember.Misc_Cost_Balance_Ind =  "";	
    Remember.Total_Balance_Ind =  "";
    Remember.lastpaidamt =  "";	
    Remember.lastpaid =  "";	
    Remember.CurrentBalance =  "";	
    Remember.CurrentInterest =  "";
    Remember.CurrentTotal =  "";	
    Remember.Pct_Interest_Rate =  "";

    Remember.clientData = Memory.clientData;
    Remember.CurrentTask = "getAccount_task";

    if(Memory.AccountFailed_Counter === undefined){
      Remember.AccountFailed_Counter = 0;
    }
    else{
      Remember.AccountFailed_Counter = parseInt(Memory.AccountFailed_Counter) + 1;
    }

    let userPhoneNumber = Memory.user_phone_number;
    let AccountNo = null;
    Remember.user_phone_number = Memory.user_phone_number;
    let NameSpace;
    
    if (Memory.NameSpace === undefined) NameSpace = 'V11';
    else NameSpace = Memory.NameSpace;
    console.log("Memory.NameSpace"+ Memory.NameSpace);
    let sMsg = "";
    if(Memory.channel == 'SMS')
        sMsg = "in the body of the SMS you received";
    else if(Memory.channel == 'SendGrid Email')
        sMsg = "in the Email you received";
    else    
        sMsg = "in the letter you received";     

   let squestion = `Please Say or enter your A C T account number , located ${sMsg}..`; 

   let bPhone = false;
    if(Memory.AccountFrom == "Phone"){
        squestion = `We could not find your account number from the phone you are calling. Please Say or enter your A C T account number , located ${sMsg}.`; 
        Remember.AccountFrom = "";
        bPhone = true;
      }
    else{
        if(Memory.Fallback_getAccount_task == true){
          AccountNo = null;
          Remember.Fallback_getAccount_task = false;
          console.log("Fallback_getAccount_task : "+  Memory.Fallback_getAccount_task);
        }
        else{
            try{
              console.log("collected_dataACCT : "+ Memory.twilio.collected_data.collect_Accountnumber.answers.NumberOfacct.answer);
              AccountNo = Memory.twilio.collected_data.collect_Accountnumber.answers.NumberOfacct.answer;
            }
            catch{
                console.log("Catch collected_dataACCT : ");
                AccountNo = null;
            }   
          } 
      }
  
    let Collect_Json =  {
      "name": "collect_Accountnumber",
      "questions": [
              {
              "question": `${squestion}`,
              // "prefill": "NumberOfacct",
              "name": "NumberOfacct",
              "type": "Twilio.NUMBER_SEQUENCE",
              "voice_digits": {
                "num_digits": 50,
                "finish_on_key": "#"
                },
              }
          ],
        "on_complete": {
        "redirect": 	 "task://getAccount"
              }
      }

   
    let YesNo= null;
    if(Memory.check_name_task_yesno  != undefined){
       YesNo = Memory.check_name_task_yesno;
      }
    
    if(YesNo == 'No'){
      console.log("YesNo: "+ YesNo);
      Remember.check_name_task_yesno = "";
      Memory.twilio = {};
      event.Memory.twilio = {};
      AccountNo = null;
    }

    
    
    console.log("AccountNo:" +AccountNo);
   
    if ( AccountNo ) {
      console.log("ifAccountNo:"+ AccountNo);
        const reqData = {
          accountNumber: AccountNo,
          AccountType: 'A',
          LatVersion: NameSpace ,
          PhoneNumber: userPhoneNumber
          
        };
        console.log("reqData: "+JSON.stringify(reqData));
        const { success, userRespData } = await GetInboundAccountInfo(reqData);
  
        if ( success ) {
          console.log("userRespData:"+ JSON.stringify(userRespData));
          const userData = {
            RehabIneligible:userRespData.RehabIneligible,
            NameSpace: userRespData.NameSpace,
            AccountType: userRespData.AccountType,
            ClientName: userRespData.ClientName,
            ClientID: userRespData.ClientID,
            Status: userRespData.Status, //=== '1' ? true : false,
            Returns: userRespData.Returns,
            LatAccountNumber: userRespData.LatAccountNumber,	
            TotalLinkAccounts: userRespData.TotalLinkAccounts,	
            LinkAccount: userRespData.LinkAccount,	
            CustomerAccountNumber: userRespData.CustomerAccountNumber,	
            SSN: userRespData.SSN,	
            FullName: userRespData.FullName,	
            Homephone: userRespData.Homephone,	
            workphone: userRespData.workphone,		
            Address1: userRespData.Address1,	
            Address2: userRespData.Address2,	
            City: userRespData.City,	
            State: userRespData.State,	
            Zipcode: userRespData.Zipcode,	
            DebtorID: userRespData.DebtorID,	
            Principal_Balance_Ind: userRespData.Principal_Balance_Ind,	
            Interest_Balance_Ind: userRespData.Interest_Balance_Ind,	
            Collection_Cost_Balance_Ind: userRespData.Collection_Cost_Balance_Ind,
            Misc_Cost_Balance_Ind: userRespData.Misc_Cost_Balance_Ind,
            Total_Balance_Ind: userRespData.Total_Balance_Ind,	
            lastpaidamt: userRespData.lastpaidamt,	
            lastpaid: userRespData.lastpaid,
            CurrentBalance: userRespData.CurrentBalance,
            CurrentInterest: userRespData.CurrentInterest,	
            CurrentTotal: userRespData.CurrentTotal,	
            Pct_Interest_Rate: userRespData.Pct_Interest_Rate

          };
          console.log("userData:"+ JSON.stringify(userData));
          Remember.userData = userData;
          Remember.RehabIneligible=userRespData.RehabIneligible,
          Remember.NameSpace= userRespData.NameSpace,
          Remember.AccountType= userRespData.AccountType,
          Remember.ClientName= userRespData.ClientName,
          Remember.ClientID= userRespData.ClientID,
          Remember.Status= userRespData.Status,// === '1' ? true : false,
          Remember.Returns= userRespData.Returns,
          Remember.LatAccountNumber= userRespData.LatAccountNumber,	
          Remember.TotalLinkAccounts= userRespData.TotalLinkAccounts,	
          Remember.LinkAccount= userRespData.LinkAccount,	
          Remember.CustomerAccountNumber= userRespData.CustomerAccountNumber,	
          Remember.SSN= userRespData.SSN,	
          Remember.FullName= userRespData.FullName,	
          Remember.Homephone= userRespData.Homephone,	
          Remember.workphone= userRespData.workphone,		
          Remember.Address1= userRespData.Address1,	
          Remember.Address2= userRespData.Address2,	
          Remember.City= userRespData.City,	
          Remember.State= userRespData.State,	
          Remember.Zipcode= userRespData.Zipcode,	
          Remember.DebtorID= userRespData.DebtorID,	
          Remember.Principal_Balance_Ind= userRespData.Principal_Balance_Ind,	
          Remember.Interest_Balance_Ind= userRespData.Interest_Balance_Ind,	
          Remember.Collection_Cost_Balance_Ind= userRespData.Collection_Cost_Balance_Ind,
          Remember.Misc_Cost_Balance_Ind= userRespData.Misc_Cost_Balance_Ind,
          Remember.Total_Balance_Ind= userRespData.Total_Balance_Ind,	
          Remember.lastpaidamt= userRespData.lastpaidamt,	
          Remember.lastpaid= userRespData.lastpaid,
          Remember.CurrentBalance= userRespData.CurrentBalance,
          Remember.CurrentInterest= userRespData.CurrentInterest,	
          Remember.CurrentTotal= userRespData.CurrentTotal,	
          Remember.Pct_Interest_Rate= userRespData.Pct_Interest_Rate
          
          Say = false;
          Listen = false;
          Redirect = true;
          Remember.AccountFailed_Counter = 0;
          if(userData.RehabIneligible==="0")
          {
            console.log("Rehab Eligible Account:");
            Collect = false;
            Redirect = true;
            Say = `We need to transfer you to an agent for account number, <say-as interpret-as='digits'>${AccountNo}</say-as> is not active.`;
            Redirect = "task://agent_transfer";
          }
          if( userData.Returns==="1" )
          {
            console.log("accountStatus true:");
              Redirect = "task://check_name_task";
          }
          else
          {
            console.log("accountStatus false:");
            Collect = false;
            Redirect = true;
            Say = `We need to transfer you to an agent for account number, <say-as interpret-as='digits'>${AccountNo}</say-as> is not active.`;
            Redirect = "task://agent_transfer";
          }
        }
        else
        {
          console.log("is account is wrong : "+Memory.AccountFailed_Counter);
          if(Memory.AccountFailed_Counter >=2)
          {
            console.log("AccountFailed_Counter wrong input");
            Say = false;
            Listen = false;
            Collect = false;
            Redirect = true;
            Redirect = "task://agent_transfer";
            RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
            return;
          }

          
          Remember.AccountFrom = "Manual";
          if( !bPhone )
              Say = `The account number, <say-as interpret-as='digits'>${AccountNo}</say-as> you entered is not correct.`;

          Collect  = true;
          Remember.question ="getAccount_task";
          Collect = Collect_Json;

        }
          
     }
    else{
        console.log("is account is null : "+Memory.AccountFailed_Counter);
        // if(Memory.AccountFailed_Counter >=2)
        // {
        //   console.log("AccountFailed_Counter where account is null");
        //     Say = false;
        //     Listen = false;
        //     Collect = false;
        //     Redirect = true;
        //     Redirect = "task://agent_transfer";
        //     RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
        //     return;
        // }
        // else
        // {
        
          Collect  = true;
          Remember.question ="getAccount_task";
          Collect = Collect_Json;
        //}

        
      }

      console.log("Say: "+Say +"Listen: "+ Listen +"Remember: "+ Remember+ "Collect: "+Collect+"Tasks: " +Tasks+ "Redirect: "+Redirect+ "Handoff: "+ Handoff);
    
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  };
   
  const GetInboundAccountInfo = async ( reqData ) => {
    let userRespData;
    let success;
    
    try {
      const requestObj = {
        'AccountNo': reqData.accountNumber,  // A/C number the caller entered. Or the caller’s phone number
        'PhoneNumber':reqData.PhoneNumber, // caller’s phone number
        'AccountType': reqData.AccountType,
        'LatVersion':reqData.LatVersion  // coming from the result of TFN_LookUp
        
      };
  
      const responseObj = await axios.post(`${API_ENDPOINT}/GetAccountInfoLat`, requestObj);
      userRespData = responseObj.data;
  
      success = userRespData.Returns === '1' ? true : false;
      
    } catch ( error ) {
      console.error( error.response );
      success = false;
    }
  
    return { success, userRespData };

  };