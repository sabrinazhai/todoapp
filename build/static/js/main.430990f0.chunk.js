(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},22:function(e,t,a){e.exports=a(35)},27:function(e,t,a){},33:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),s=a(9),c=a.n(s),i=(a(27),a(19)),r=a(16),u=a(17),o=a(21),m=a(18),d=a(2),h=a(20),p=(a(15),a(4)),k=a(8),f=a(11),y=a(36),g=a(37);var v=function(e){var t=e.items.map(function(t){return l.a.createElement(y.a,{className:"list",key:t.key},l.a.createElement(g.a,{className:"taskItem"},l.a.createElement("input",{type:"checkbox",onChange:function(a){e.setUpdate(a.target.value,t.key)}}),l.a.createElement("input",{type:"text",autoComplete:"new-password",id:t.key,value:t.task,onChange:function(a){e.setUpdate(a.target.value,t.key)}}),l.a.createElement("span",null,l.a.createElement(p.a,{className:"faicons",onClick:function(){e.deleteItem(t.key)},icon:k.b}))))});return l.a.createElement("div",null,l.a.createElement(f.a,{duration:300,easing:"ease-in-out"},t))};var E=function(e){var t=e.schedule.map(function(t){return l.a.createElement(y.a,{className:"list",key:t.key},l.a.createElement(g.a,{className:"taskItem"},l.a.createElement("input",{type:"checkbox",onChange:function(a){e.setScheduleUpdate(a.target.value,t.key)}}),l.a.createElement("label",{htmlFor:"checkbox"}," ",t.time+":00"," "),l.a.createElement("input",{type:"text",autoComplete:"new-password",id:t.key,value:t.task,onChange:function(a){e.setScheduleUpdate(a.target.value,t.key)}}),l.a.createElement("span",null,l.a.createElement(p.a,{className:"faicons",onClick:function(){e.deleteScheduleItem(t.key)},icon:k.b}))))});return l.a.createElement("div",null,l.a.createElement(f.a,{duration:300,easing:"ease-in-out"},t))},I=a(38),S=(a(33),0),b=0,O=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(o.a)(this,Object(m.a)(t).call(this,e))).state={date:"",items:[],schedule:[],currentItem:{task:"",key:"",time:0,completed:!1}},a.addItem=a.addItem.bind(Object(d.a)(a)),a.handleInput=a.handleInput.bind(Object(d.a)(a)),a.deleteItem=a.deleteItem.bind(Object(d.a)(a)),a.deleteScheduleItem=a.deleteScheduleItem.bind(Object(d.a)(a)),a.toggleComplete=a.toggleComplete.bind(Object(d.a)(a)),a.setUpdate=a.setUpdate.bind(Object(d.a)(a)),a.setScheduleUpdate=a.setScheduleUpdate.bind(Object(d.a)(a)),a.setStart=a.setStart.bind(Object(d.a)(a)),a.setEnd=a.setEnd.bind(Object(d.a)(a)),a.addSchedule=a.addSchedule.bind(Object(d.a)(a)),a.displayItems=a.displayItems.bind(Object(d.a)(a)),a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"displayItems",value:function(e){null!==localStorage.getItem("taskList")&&this.setState({items:JSON.parse(localStorage.getItem("taskList"))}),null!==localStorage.getItem("scheduleItems")&&this.setState({schedule:JSON.parse(localStorage.getItem("scheduleItems"))})}},{key:"logTaskList",value:function(e){this.setState({items:e}),localStorage.setItem("taskList",JSON.stringify(e))}},{key:"logScheduleItems",value:function(e){this.setState({schedule:e}),localStorage.setItem("scheduleItems",JSON.stringify(e))}},{key:"addItem",value:function(e){e.preventDefault();var t=this.state.currentItem;if(""!==t.task){var a=[].concat(Object(i.a)(this.state.items),[t]);this.setState({currentItem:{task:"",key:"",time:0,completed:!1}}),this.logTaskList(a)}}},{key:"addSchedule",value:function(e){e.preventDefault();var t=this.state.schedule,a=Array.from({length:b-S+1},function(e,t){return t+parseInt(S)});console.log("current array:  "+JSON.stringify(t));var n="",l=a.map(function(e){var a=t.find(function(t){return t.key===e});return console.log("match: "+JSON.stringify(a,null,4)),a&&(n=a.task),{task:n,key:e,time:e,completed:!1}});this.logScheduleItems(l)}},{key:"handleInput",value:function(e){this.setState({currentItem:{task:e.target.value,key:Date.now(),time:S,completed:!1}})}},{key:"deleteItem",value:function(e){var t=this.state.items.filter(function(t){return t.key!==e});this.logTaskList(t)}},{key:"deleteScheduleItem",value:function(e){console.log("in the deleteScheduleItem method");var t=this.state.schedule.filter(function(t){return t.key!==e});console.log("schedule from js:  "+JSON.stringify(t,null,4)),this.logScheduleItems(t)}},{key:"setUpdate",value:function(e,t){var a=this.state.items;a.map(function(n){return n.key===t&&(n.task=e),a}),this.logTaskList(a)}},{key:"setScheduleUpdate",value:function(e,t){var a=this.state.schedule;a.map(function(n){if(n.key===t)return n.task=e,a}),this.logScheduleItems(a)}},{key:"toggleComplete",value:function(e,t){var a=this.state.items;a.map(function(e){e.key===t&&(e.completed=!e.completed)}),this.setState({items:a})}},{key:"setStart",value:function(e){e.preventDefault(),S=e.target.value}},{key:"setEnd",value:function(e){e.preventDefault(),b=e.target.value}},{key:"componentDidMount",value:function(){var e=(new Date).toLocaleTimeString("en-us",{weekday:"long",year:"numeric",month:"long",day:"numeric"}),t=e.indexOf(",",e.indexOf(",")+1);this.setState({date:e.substring(0,t)}),this.displayItems(),console.log("finish function")}},{key:"render",value:function(){return l.a.createElement(y.a,null,l.a.createElement(g.a,{className:"top"},l.a.createElement(I.a,{className:"todayDate"},l.a.createElement(p.a,{className:"calendar",icon:k.a}),this.state.date),l.a.createElement(I.a,null,l.a.createElement("h2",null," tasks "),l.a.createElement("div",{className:"App"},l.a.createElement("form",{id:"to-do-form",onSubmit:this.addItem},l.a.createElement("input",{type:"text",id:"taskName",placeholder:"Enter task",value:this.state.currentItem.task,onChange:this.handleInput}),l.a.createElement("button",{type:"submit"},"Add Task")),l.a.createElement("p",null,this.state.items.task),l.a.createElement(v,{items:this.state.items,deleteItem:this.deleteItem,setUpdate:this.setUpdate})))),l.a.createElement(g.a,null,l.a.createElement(I.a,null,l.a.createElement("h2",null," today "),l.a.createElement("div",{className:"App"},l.a.createElement("form",{id:"to-do-form",onSubmit:this.addSchedule},l.a.createElement("input",{type:"number",min:"0",max:"23",placeholder:"Start",value:this.state.currentItem.start,onChange:this.setStart}),l.a.createElement("input",{type:"number",min:"0",max:"23",placeholder:"End",value:this.state.currentItem.end,onChange:this.setEnd}),l.a.createElement("button",{type:"submit"},"Create Schedule")),l.a.createElement(E,{schedule:this.state.schedule,deleteScheduleItem:this.deleteScheduleItem,setScheduleUpdate:this.setScheduleUpdate}))),l.a.createElement(I.a,null,l.a.createElement("h2",null," tomorrow "),l.a.createElement("div",{className:"App"},l.a.createElement("form",{id:"to-do-form",onSubmit:this.addItem},l.a.createElement("input",{type:"text",id:"taskName",placeholder:"Enter task",value:this.state.currentItem.task,onChange:this.handleInput}),l.a.createElement("button",{type:"submit"},"Add Task")),l.a.createElement(v,{items:this.state.items,deleteItem:this.deleteItem,setUpdate:this.setUpdate})))))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(34);c.a.render(l.a.createElement(O,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[22,1,2]]]);
//# sourceMappingURL=main.430990f0.chunk.js.map