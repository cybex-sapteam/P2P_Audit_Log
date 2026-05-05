sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/m/Token"
], function (DateFormat,Token) {
    "use strict";
   return {
       
      
    convertMinDate:function(date){
        var date=new Date(date);
        return date;
    },
        convertLDateTimeFormat:function(dateString){
                       
            if(dateString){
                var dateObj = new Date(dateString);
                 var year = dateObj.getFullYear();
                var month = parseInt(dateObj.getMonth()) + 1;
                    month=month<10?"0"+month:month;
                var day = dateObj.getDate();
                day=day<10?"0"+day:day;
                var hours = dateObj.getHours();

                var minutes = dateObj.getMinutes();
                minutes =minutes <10?"0"+minutes :minutes ;
                var seconds = dateObj.getSeconds();
                seconds=seconds<10?"0"+seconds:seconds;
           
           
            var dateStr =  year + "-"  + month + "-" + day;
            var period = hours < 12 ? 'AM' : 'PM';
                hours = hours % 12 || 12;
                hours=hours<10?"0"+hours:hours;
            var timeStr = hours + ":" + minutes + ":" + seconds+" "+period;
                return dateStr + ' ' + timeStr;
            }else{
                return "";
            }
           
           
         
        },
        convertDateTimeFormat:function(dateString){
                       
            if(dateString){
                var dateObj = new Date(dateString);
                 var year = dateObj.getFullYear();
                var month = parseInt(dateObj.getMonth()) + 1;
                    month=month<10?"0"+month:month;
                var day = dateObj.getDate();
                day=day<10?"0"+day:day;
                var hours = dateObj.getHours();

                var minutes = dateObj.getMinutes();
                minutes =minutes <10?"0"+minutes :minutes ;
                var seconds = dateObj.getSeconds();
                seconds=seconds<10?"0"+seconds:seconds;
           
           
            var dateStr =  year + "-"  + month + "-" + day;
                return dateStr;
            }else{
                return "";
            }
           
           
         
        },
        convertsDate:function(Dstring){
            if(Dstring)
            {
                return Dstring.split("T")[0];
            }
        }


   }
});



