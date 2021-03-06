window.onload=function(){
    

var vm=new Vue({
    el:'.all',
    data:{
        tips:'例 20161015',
            options: [
             { text: '时间', value: 'time'},
             { text: '使用人',value: 'user'},
            ],
        list:[],//所有账单

        username:'',
        mes:'',
        user:'',
        isActive: false,
            selected: -1,
         allShow:true,
        sTime:'',
        sPlace:'',
        sType:'',
        sUser:'',
        sMoney:'',
        sPurpose:'',
        sRemark:'',
        sState:'',
        sStateNum:'', 
        types:[
           '所有账单',
           '未清账单',
        ],
        value:'time',
        
    },//data结束
    created:function(){
       axios.get('../json/bill.json').then(

            function(response){
                
                mes=response.data.bills;
                 user=response.data.ID;
                 vm.username=user;
                for(var i=0;i<mes.length;i++){
                    if(mes[i].state=="未清账"){
                      vm.list.push({
                        time:mes[i].time,
                        place:mes[i].place,
                        type:mes[i].type,
                        user:mes[i].user,
                        money:mes[i].money,
                        purpose:mes[i].purpose,
                        remark:mes[i].remark,
                        state:mes[i].state, 
                        stateNum:0, 
                        search:true,                      
                      })
                    }
                    if(mes[i].state=="清账"){
                      vm.list.push({
                        time:mes[i].time,
                        place:mes[i].place,
                        type:mes[i].type,
                        user:mes[i].user,
                        money:mes[i].money,
                        purpose:mes[i].purpose,
                        remark:mes[i].remark,
                        state:mes[i].state, 
                        stateNum:1, 
                        search:true,                      
                      })
                    }
                }
            
            },
            function(response){
                alert("连接json文件失败");
            });

        
    },//created结束
    methods:{
       show:function(even){//选中下拉框不同的选项，文本框中会出现不同的提示
                if(even.target.value=='time'){
                    this.tips='例 20161015';
                    this.value=even.target.value
                }
                if(even.target.value=='user'){
                    this.tips='例 李明';
                    this.value=even.target.value
                }
            },
            disappearCue:function(){//点击文本框后，文本框里面的提示消失
                this.tips='';
            },
            showUnfinished(){//显示未清账单
                this.allShow=false;
                alert(this.allShow);
            },
            showAll(){//显示所有账单
                this.allShow=true;
            },
            showOverlay:function(index) {
                this.selected=index;
                 this.sTime=this.list[this.selected].time;
               this.sPlace=this.list[this.selected].place;
                this.sType=this.list[this.selected].type;
                this.sUser=this.list[this.selected].user;
                this.sMoney=this.list[this.selected].money;
               this.sPurpose=this.list[this.selected].purpose;
               this.sRemark=this.list[this.selected].remark;
               this.sState=this.list[this.selected].state;   
                this.sStateNum=this.list[this.selected].stateNum;

                this.isActive=true;
            },
            
            del(index) {//删除表格中的某行元素
                this.list.splice(index, 1);
                
            },
            changeActive() {
                
                
                
                    this.isActive=false;
                
            },
            saveMessage(){
                this.list[this.selected].time=this.sTime;
                this.list[this.selected].place=this.sPlace;
                this.list[this.selected].type=this.sType;
                this.list[this.selected].user=this.sUser;
                this.list[this.selected].money=this.sMoney;
                this.list[this.selected].purpose=this.sPurpose;
                this.list[this.selected].remark=this.sRemark;
                this.list[this.selected].state=this.sState;
                if(this.sState=="未清账"){
                    this.sStateNum=0
                }
                if(this.sState=="清账"){
                    this.sStateNum=1
                }
                this.list[this.selected].stateNum=this.sStateNum;
                this.isActive=false;
                
        },//saveMessage()结束
        showType(event){

            if(event.target.value==='所有账单'){
                this.allShow=true;
            }
            if(event.target.value==='未清账单'){
                this.allShow=false;
            }
            
        },
        search(){
            if(this.value==='time'){
                for(var i=0,len=this.list.length;i<len;i++){
                    if(this.tips===this.list[i].time){
                          this.list[i].search=true;
                    }
                    else{
                        this.list[i].search=false;
                    }
                }
            }
            if(this.value==='user'){

                for(var i=0,len=this.list.length;i<len;i++){
                    if(this.tips===this.list[i].user){
                          this.list[i].search=true;
                    }
                    else{
                        this.list[i].search=false;
                    }
                }
            }
        }
    }//methods结束
    
})//var vm=new Vue结束


}