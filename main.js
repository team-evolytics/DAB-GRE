function DABManager(){this.activityCount=0,this.currentLocation=window.location,this.activeObservers=[],this.activeIntervals=[],this.activityContexts={},this.pageActivityList=[]}DABManager.prototype.startActivity=function(t){try{this.activityContexts[t].initFunc()}catch(i){console.log("Activity failed to start: "+t+"\nError: ",i)}},DABManager.prototype.registerActivity=function({name:t,initFunc:i,intervalList:e=null,observer:n=null}){try{this.pageActivityList.push(t),this.activityContexts[t]={initFunc:i},this.activityCount+=1,console.log("ACTIVITY REGISTERED: "+t),null!==e?this.createInterval(t,e):this.startActivity(t),null!=n&&this.createObserver(t,n.target,n.config,n.callback)}catch(a){console.log(a)}},DABManager.prototype.createObserver=function(t,i,e,n){let a=new MutationObserver(n);a.observe(i,e),this.activeObservers.push({activity:t,observer:a,target:i,config:e,callback:n}),this.activityContexts[t].observer=a},DABManager.prototype.stopObserver=function(t){this.activityContexts[t].observer.disconnect();let i=this.activeObservers.findIndex(i=>i.activity==t);this.activeObservers.splice(i,1)},DABManager.prototype.createInterval=function(t,i){let e=this;i=Array.isArray(i)?i.join(","):i;var n=setInterval(function(){if(console.log("Interval running. Checking for: ",i),$(i).length){e.startActivity(t);let a=e.activeIntervals.findIndex(i=>i.activity==t);e.activeIntervals.splice(a,1),clearInterval(n)}},250);this.activeIntervals.push({activity:t,callback:arguments.callee,contextList:i}),this.activityContexts[t].interval=this.activeIntervals[this.activeIntervals.length-1]},window.DabManager||(window.ActivityManager=new DABManager);var myActivity={name:"DAB123",initFunc:function(){runTest("DAB123")},intervalList:["body","head"]};function runTest(t){console.log("Activity Running: ",t)}window.ActivityManager.registerActivity(myActivity),window.ActivityManager.registerActivity({name:"DAB456",initFunc:function(){runTest("DAB456")},intervalList:[".row, #body-content"],observer:{target:document.getElementById("body-content"),config:{attributes:!0,childList:!0,subtree:!0},callback(t,i){console.log("Observer Running")}}});

let dabGRE = {
    name: "DAB GRE",
    initFunc: function(){
        let lobMap = {
            "SRS": "Lessons",
            "Rentals": "Rentals"
        }
        let lobsPurchased = gatherLOBs();
        let greComponentLOB_1 = lobMap[$("#c506_Featured_Content_1").data("anpl-sitecore-item-name").split(" ")[0]]
        let greComponentLOB_2 = lobMap[$("#c506_Featured_Content_2").data("anpl-sitecore-item-name").split(" ")[0]]

        !!window.digitalData.user.profile.profileInfo.ampId ? showEMR(true) : showEMR(false);

        toggleComponent("#c506_Featured_Content_1", greComponentLOB_1);
        toggleComponent("#c506_Featured_Content_2", greComponentLOB_2);

        function showEMR(show){
            show ? $("#c158_Epic_Mountain_Rewards_Banner_1 .emrBanner__container ").show() : $("#c158_Epic_Mountain_Rewards_Banner_1 .emrBanner__container ").hide();
        }
  
        function gatherLOBs(){
            let lobs = []
            $("[id*='c539_Product_Cart_Item_Purchase_Confirmation_']").each( (i,e) => {
                lobs.push($(e).data("component-line-of-business"))
            });
            return lobs;
        }

        function toggleComponent(elem, lob){
            if(lobsPurchased.includes(lob)){
                $(elem).hide();
            }
            else{
                $(elem).show();
            }
        }
    },
    intervalList: [".container-fluid"]
}

ActivityManager.registerActivity(dabGRE);