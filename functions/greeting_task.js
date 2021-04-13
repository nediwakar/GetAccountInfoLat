const axios = require('axios');
// This is your new function. To start, set the name and path on the left.
const API_ENDPOINT = 'http://Latdeviis:Test!123456@ivalatdev.accountcontrol.com/AccountInfoLat/Home';


exports.greeting_task =async function(context, event, callback,RB) {
    let Say;
    let Prompt;
    let Listen = false;
    let Collect = false;
    let Remember = {};
    let Tasks = false;
    let Redirect = false;
    let Handoff = false;

    const Memory = JSON.parse(event.Memory);
    Remember.clientName = "";
    Remember.mailingAddress = "";
    Remember.OnlinePaymentURL = "";
    Remember.transferAgentNumber = "";
    Remember.namespace = "";
    Remember.channel = "";
    Remember.host = "";
    Remember.TFN = "";
    Remember.F_Letter_Namespace = "";
    Remember.AccountFrom = "";

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

    let userPhoneNumber;
    let TFN;
    let channel//='SendGrid Email';
    
    try{
      userPhoneNumber = Memory.twilio.voice.From;
      channel=Memory.channel;
      //userPhoneNumber = "+13304072281";
    }
    catch{
        userPhoneNumber = "+13059871723";

    }

    try{
       TFN = Memory.twilio.voice.To;
     //TFN = "8662078464";
    }
    catch{
       TFN = "8662078464";
    }

    Remember.Agent = false;
    console.log("userPhoneNumber :" +userPhoneNumber);
    console.log("TFN :" +TFN);
    Remember.CurrentTask = "greeting";
    //let userPhoneNumber = event.UserIdentifier;
    Remember.AccountFrom = "-1";
    
    
    let bTFn_success = false;
    let NameSpace;
    if (Memory.NameSpace === undefined) NameSpace = 'V11';
    else NameSpace = Memory.NameSpace;

    console.log("Memory.NameSpace"+ Memory.NameSpace);
    Remember.channel=channel;
      TFN = "8662078464"; // when go production comment this line
      Remember.TFN = TFN;
      Remember.user_phone_number = userPhoneNumber;
      userPhoneNumber = userPhoneNumber.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
         Remember.AccountFrom = "Phone";
          Redirect = true;
        //Redirect = "task://getAccount";
        if( userPhoneNumber != null){
        const reqData = {
          accountNumber: userPhoneNumber,
          AccountType: 'P',
          LatVersion: NameSpace ,
          PhoneNumber: userPhoneNumber
        };
        console.log("Remember.user_phone_number : "+Remember.user_phone_number);
        console.log("RequestData:"+ JSON.stringify(reqData));
        const { success, userRespData } = await GetInboundAccountInfoWithPhone(reqData);
        console.log("Accountsuccess:"+ success);
        if ( success ) {
          const userData = {
            RehabIneligible:userRespData.RehabIneligible,
            NameSpace: userRespData.NameSpace,
            AccountType: userRespData.AccountType,
            ClientName: userRespData.ClientName,
            ClientID: userRespData.ClientID,
            Status: userRespData.Status,// === '1' ? true : false,
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
            if(userData.RehabIneligible==="0")
            {
              console.log("Rehab Eligible Account:");
              Collect = false;
              Redirect = true;
              Say = `We need to transfer you to an agent for account number, <say-as interpret-as='digits'>${AccountNo}</say-as> is not active.`;
              Redirect = "task://agent_transfer";
            }
          else if( userData.Returns==="1" ){
            console.log("accountStatus true:");
            Redirect = "task://check_name_task";
          }
          else{
            console.log("accountStatus false:");
            Redirect = "task://getAccount";
          }
        }
        else{
          //console.log("phone number :"+Remember.user_phone_number + " Status : "+ userRespData.Status.toString());
          //Remember.Status_PhoneNotFound =  userRespData.Status.toString();	
          Redirect = "task://getAccount";
        }
      }
      else{
        console.log("phone number not found record :");
        Redirect = "task://getAccount";
      }
        

  
    RB(Say, Listen, Remember, Collect, Tasks, Redirect, Handoff, callback);
  };  
  const GetInboundAccountInfoWithPhone = async ( reqData ) => {
    let userRespData;
    let success;
    
    try {
      const requestObj = {
        'AccountNo': reqData.accountNumber,  // A/C number the caller entered. Or the caller’s phone number
        'PhoneNumber':reqData.PhoneNumber, // caller’s phone number
        'AccountType': reqData.AccountType,
        'LatVersion':reqData.LatVersion  // coming from the result of TFN_LookUp
         // hard coded  for phone number as accpunaccount number
        
      };
      console.log("requestObj: "+JSON.stringify(requestObj));
  
      const responseObj = await axios.post(`${API_ENDPOINT}/GetAccountInfoLat`, requestObj);
      userRespData = responseObj.data;
  console.log("userRespData :"+JSON.stringify(userRespData));
      success = userRespData.Returns === '1' ? true : false;
      
    } catch ( error ) {
      console.error( error.response );
      success = false;
    }
  
    return { success, userRespData };

  };
   
    
 