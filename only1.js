$(document).ready(function(){
    return searchtasks();
})




function newmission(){
    // window.open("newtext.html")
    window.location.href="newtext.html";
}


function distribution(id){
	var _p = prompt('认领人');
	if (_p) {
		
		updatemission(id, _p);
	}
}







function searchtasks() {
	$.ajax({
		url: 'http://172.16.24.17:8018/tps/task/queryAll',
		// dataType: 'json',
		type: 'get',
		success: function(res) {
			res = JSON.parse(res);
			console.log(res)
			var data = res.resultMsg;
			var thtml = '';
			var temp;
			for (var i =0; i< data.length; i++) {
				temp = data[i]; 
                temp.executor = temp.executor==null? "":temp.executor;
				thtml += '<tr>'
					   + '<td>' + temp.id + '</td>'
					   + '<td>' + temp.taskName + '</td>'
					   + '<td>' + temp.grade + '</td>'
					   + '<td>' + temp.type + '</td>'
					   + '<td>' + temp.startTime + '</td>'
					   + '<td>' + temp.endtime + '</td>'
					   + '<td>' + temp.executor + '</td>'
					   + '<td>' + '<button class="btn-success" type="button" onclick="distribution('+temp.id+')" >认领</botton>'+ '</td>'
					   + '<tr>';
			}
			$('#tab1 tbody').html(thtml);
		},
		// error: function(err) {
		// 	console.log(err)
		// }
	});

}

//已连接形式传输认领时的表单信息
// function updatemission(id, p) {
// 	var form = {};
// 	$.ajax({
// 		type: 'get',
// 		url:'http://172.16.24.20:8018/task/updatetask/'+ id + '/' + p,
// 		async: false,
//                 success: function(data) {
//                     alert("success");
//                     window.location.reload();
//                 }

// 	});
// }


function updatemission(id, p) {

    var newDistributionJSON = new Object();
    newDistributionJSON.id = id;
    newDistributionJSON.executor = p;

    var request = {
        url : "http://172.16.24.17:8018/tps/task/updatetask/",
        type : "POST",
        contentType : "application/json",
        dataType : 'json',
        data : JSON.stringify(newDistributionJSON),
        success : function(result){
            if(result.successed==true){
                alert(result.resultMsg);
                window.location.href="text.html";
            }
        },
        error:function(data){

        }
    };
    $.ajax(request);
}


//已链接形式传输新建时的表单信息
// function savemission(){
//     var nm1 = document.getElementById("taskName");
//     var nm2 = document.getElementById("descript");
//     var nm3 = document.getElementById("type");
//     var nm4 = document.getElementById("grade");
//     var nm5 = document.getElementById("announcer");

//     var form = {
//         "type": $('#type').val(),
//         "taskName": $('#taskName').val(),
//         "descript": $('#descript').val(),
//         "grade": $('#grade').val(),
//         "announcer": $('#announcer').val()
//     }

//     if(nm1.value.length<=0||nm2.value.length<=0||nm3.value.length<=0||nm4.value.length<=0||nm5.value.length<=0)
//     {
//         alert("请输入内容");        
//     }
//     else{
// 	    $.ajax({
// 	        type:'get',
// 	        url:'http://172.16.24.27:8018/task/savetask/' + JSON.stringify(form),
// 	        success: function(res) {
// 		    alert(res)
// 	       }
//         })
//         }
//     }


//将checkbox取值
// function getcheckbox(){
// 	var m_grade ='';
// 	var grade;
    
//     $('#s1 input[name="grade"]').each(function(i){
//     	if(this.checked){
//     		grade = $(this).val()
//     		alert(grade);
//     		m_grade += grade + ', ';
//     	}
    	
//     });

//         alert(m_grade);

// }



//已json形式进行传输
function savemission() {

    var m_grade ='';
	var grade;
    
    $('#s1 input[name="grade"]').each(function(i){
    	if(this.checked){
    		grade = $(this).val()
    		alert(grade);
    		m_grade += grade + ', ';
    	}
    	
    });

        alert(m_grade);


	var m_type = $('#type').val();
    var m_taskName = $('#taskName').val();
    var m_descript = $('#descript').val();
    // var m_grade = str;
    var m_announcer = $('#announcer').val();
    var m_startTime = $('startTime').val();
    var m_endtime = $('endtime').val();

  if(m_type<=0||m_taskName<=0||m_descript<=0||m_startTime<=0||m_endtime<=0||m_grade<=0)
    {
        alert("请输入必填内容");        
    }
    else{

    var newMissionJSON = new Object();
    newMissionJSON.type = m_type;
    newMissionJSON.taskName = m_taskName;
    newMissionJSON.descript = m_descript;
    newMissionJSON.grade = m_grade;
    newMissionJSON.announcer = m_announcer;
    newMissionJSON.startTime = m_startTime;
    newMissionJSON.endtime = m_endtime;

    var request = {
        url : "http://172.16.24.17:8018/tps/task/savetask/",
        type : "POST",
        contentType : "application/json",
        dataType : 'json',
        data : JSON.stringify(newMissionJSON),
        success : function(result){
            if(result.successed==true){
                alert(result.resultMsg);
                window.location.href="text.html";
            }
        },
        error:function(data){

        }
    };
    $.ajax(request);
}
}







