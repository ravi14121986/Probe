var legacycostVal;

var caseVal;
var year1;
var year2;
var year3;
var year4;
var year5;
var yearL1;
var yearL2;
var yearL3;
var yearL4;
var yearL5;
var year1line;
var year2line;
var year3line;
var year4line;
var year5line;
var labelNameDL;
var obj;
var objUser;
var smallObj;
var mediumObj;
var largeObj;
 var elogin
 var cce_slider1;
var cce_output1;
var type="type",type1,type2,type3,type4;
$(document).ready(function() {
	
	$('.dbCheck:radio[type="radio"]').change(function(){
		var dbCheck = $(this).attr("name");
    if($(this).val() == 'Yes'){      	
	   $('.'+dbCheck).show();
    }
	else{
		$('.'+dbCheck).hide();
		
	}
});
	
	
	$.get("https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/users", function(data, status){
    obj = JSON.stringify(data);
	obj = JSON.parse(obj);
	$("#preloader").hide();
});







$.get("https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/PriceSmall", function(data, status){
    smallObj = JSON.stringify(data);
	smallObj = JSON.parse(smallObj);
	
 cceType();
 cce_range("1");cce_range("2");cce_range("3");cce_range("4");
  cce_size('1');cce_size('2');cce_size('3');cce_size('4');
 $("#cldCostValue1").val(type1);
 $("#cldCostValue2").val(type2);
 $("#cldCostValue3").val(type3);
 $("#cldCostValue4").val(type4);
});
$.get("https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/PriceMedium", function(data, status){
    mediumObj = JSON.stringify(data);
	mediumObj = JSON.parse(mediumObj);
});
$.get("https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/PriceHigh", function(data, status){
    largeObj = JSON.stringify(data);
	largeObj = JSON.parse(largeObj);
});

var assessmentTable = $('#example').DataTable({
      'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center'
      }]
   });

	
	$(document).on("click","#submitMemLogin",function() {
		
		elogin = $("#emailLogin").val();
		$.get('https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/users/'+elogin, function(data, status){
     objUser = JSON.stringify(data);
	 objUser= JSON.parse(objUser);
	 if((elogin === "vasu@cg.com")||(elogin === "admin@cg.com")){
	for (var i = 0; i < obj.length; i++){
   assessmentTable.row.add( [
           '<a href="#" class="clkBtn" data-next="dashboardScreen" >'+ obj[i].Assessment_Name + '</a>',
            obj[i].Client_Name,
            obj[i].Start_Date,
            obj[i].End_Date
      ] ).draw( true );
   }
		}
		
		if((elogin != "vasu@cg.com")&&(elogin != "admin@cg.com")){
	$("#example tbody").html("");
   assessmentTable.row.add( [
            '<a href="#" class="clkBtn" data-next="dashboardScreen" >'+ objUser.Assessment_Name + '</a>',
            objUser.Client_Name,
            objUser.Start_Date,
            objUser.End_Date
      ] ).draw( true );
   }
	
});

		
	 
		
	});
	
$(document).on("click",".logOut",function() {
	location.reload();
});
	
	
	$(document).on("click",".loginUserName .firstLetter",function() {
		$(".loginUserDetails").toggle();
	});
	
	$(document).on("click","#schemaSubmit",function() {
	var rValue = $('input[name="ConnectSchemaDatabase"]:checked').val();
	var schemaData = {
		"id":$("#emailLogin").val(),
		"Technology":$("#schemaTechnology").val(),
		"Allow tool to connect to your instance":rValue,
		"Host Name":$("#schemaHostName").val(),
		"User Name":$("#schemaUserName").val(),
		"Password":$("#schemaPassword").val()		
	}
	$.ajax({
  type: "POST",
  url: "https://6ffu48re50.execute-api.us-east-1.amazonaws.com/dev/",
  data:JSON.stringify(schemaData),
  success: function(data){
	  alert("Success"+rValue)
  },
  dataType: "json",
  contentType : "application/json"
});
	});
	
	
	$(document).on("click","#workloadSubmit",function() {
	var rValue = $('input[name="workloadDatabaseR"]:checked').val();
	var schemaData = {
		"id":$("#emailLogin").val(),
		"Technology":$("#workloadTechnology").val(),
		"Platform":$("#workloadPlatform").val(),
		"Allow tool to connect to your instance":rValue,
		"Host Name":$("#workloadHostname").val(),
		"User Name":$("#workloadUsername").val(),
		"Password":$("#workloadPassword").val()		
	}
	$.ajax({
  type: "POST",
  url: "https://hhm86ao3w2.execute-api.us-east-1.amazonaws.com/dev/",
  data:JSON.stringify(schemaData),
  success: function(data){
	  alert("Success"+rValue)
  },
  dataType: "json",
  contentType : "application/json"
});
	});
	
	
	$(document).on("click","#ETL_BI_Submit",function() {
	var etlValue = $('input[name="ETL_R"]:checked').val();
	var biValue = $('input[name="BiTool_R"]:checked').val();
	var schemaData = {
		"id":$("#emailLogin").val(),
		"Connect to ETL Code Repository?":etlValue,
		"ETL Host Name":$("#ETL_Hostname").val(),
		"ETL User Name":$("#ETL_UserName").val(),
		"ETL Password":$("#ETL_Password").val(),
		"Connect to BI Tool Repository?":biValue,
		"BI Host Name":$("#BI_Hostname").val(),
		"BI User Name":$("#BI_UserName").val(),
		"BI Password":$("#BI_Password").val()			
	}
	$.ajax({
  type: "POST",
  url: "https://6i7jf6rx6c.execute-api.us-east-1.amazonaws.com/dev/",
  data:JSON.stringify(schemaData),
  success: function(data){
	  alert("Success");
  },
  dataType: "json",
  contentType : "application/json"
});
	});
	
	
	$(document).on("click","#sensitiveDataSubmit",function() {
	var PCIcheck = $('#PCIcheck:checked').val();
	var SOC1check = $('#SOC1check:checked').val();
	var HIPPAcheck = $('#HIPPAcheck:checked').val();
	var PIcheck = $('#PIcheck:checked').val();
	var schemaData = {
		"id":$("#emailLogin").val(),
		"Regulatory Compliance PCI/DSS":PCIcheck,
		"Regulatory Compliance SOC1/SOC2":SOC1check,
		"Regulatory Compliance HIPPA":HIPPAcheck,
		"Regulatory Compliance PI":PIcheck,
		"Data Masking":$("#Data_Masking").val(),
		"Tokenization":$("#Tokenization").val(),
		"Number of Sensitive DB":$("#sensitiveDB").val(),
		"Number of Sensitive Files":$("#sensitiveFiles").val(),
		"Number of Sensitive API Access":$("#API_Access").val(),
		"Number of Sensitive Tools":$("#sensitiveTools").val(),
"Non-Prod Environments":$("#Non-Prod-Dev").val(),
		"Non-Prod Test":$("#Non-Prod-Test").val(),		
		"Sensitive Data Catalogue":$("#sensitive_Data_Catalogue").val()
		
	}
	$.ajax({
  type: "POST",
  url: "https://1maeyfot48.execute-api.us-east-1.amazonaws.com/dev/",
  data:JSON.stringify(schemaData),
  success: function(data){
	  alert("Success");
  },
  dataType: "json",
  contentType : "application/json"
});
	});
	

	$(document).on("click","#qualityAsubmit",function() {
	var schemaData = {
		"id":$("#emailLogin").val(),
		"Success Migration":$("#successMigration").val(),
		"Estimation DataVolume":$("#estimationDataVolume").val(),
		"Retention Policy":$("#retentionPolicy").val(),
		"Archival Policy":$("#archivalPolicy").val(),
		"DR Strategy":$("#DR_Strategy").val(),
		"Prod Capacity":$("#prodCapacity").val(),
"License Units":$("#licenseUnits").val(),
"Expected Growth":$("#expectedGrowth").val(),
"ETL Tools":$("#ETL_Tools_Quality").val()		
	}
	$.ajax({
  type: "POST",
  url: "https://o99s4wit64.execute-api.us-east-1.amazonaws.com/dev",
  data:JSON.stringify(schemaData),
  success: function(data){
	  alert("Success");
  },
  dataType: "json",
  contentType : "application/json"
});
	});
	
$('#datepick1').datepicker({
});
$('#datepick2').datepicker({
});

$(document).on("click","#assessmentTblSubmit",function() {
	$("#assessmentName").val($("#assessmentNamePop").val());
	$("#clientName").val($("#clientNamePop").val());
	$("#firstName").val($("#firstNamePop").val());
	$("#lastName").val($("#lastNamePOP").val());
	
	$(".assessmentPop").hide();
	$(".popUpCartBg").hide();
});
$(document).on("click",".assessmentPopInner h1 span",function() {
	$(".assessmentPop").hide();
	$(".popUpCartBg").hide();
});
$(document).on("click",".editIcon",function() {
	$(".assessmentPop").show();
	$(".popUpCartBg").show();
});

var assessmentTbl = $('#assessmentTbl').DataTable({
	'lengthMenu': [3, 6],
	'pageLength': 3,
      'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center'
      }]
   });
	
	
	
	var locations = {
        'Legacy EDW Technology': ['Teradata','Netezza','Exadata','Greenplum', 'Oracle', 'SQL Server'],
        'Legacy ETL Technology': ['Informatica Power Center','Talend','Datastage','AWS Glue'],
        'Legacy BI': ['Power BI','Tableau','Microstrategy','Cognos','Qlik'],
        'Legacy MDM': ['Informatica MDM','Datastage MDM'],
        'Legacy Data Catalog': ['Informatica EDC','Datastage Catalog','Alation','AWS Glue'],
        'Legacy Data Governance': ['Collibra','Informatica Axon','Datastage Governance'],
        'Legacy Data Lineage': ['Collibra','Waterline','Informatica Power Center'],
		'Legacy Data Quality': ['Informatica Data Quality','Datastage Quality'],
    }
    
    $(document).on("change",".legacyDD1",function() {
		var $locations = $(this).parent().next('td').children('.legacyDD2');
        var country = $(this).val(), lcns = locations[country] || [];
        var html = $.map(lcns, function(lcn){
            return '<option value="' + lcn + '">' + lcn + '</option>'
        }).join('');
        $locations.html(html)
    });
	
		
	$(document).on("click","#LCEsubmit",function() {
		
		/*var formData = {
		"id":$("#emailLogin").val(),
		"Legacy_Labor_Cost":$("#legacyID1").val(),
		
	}*/
	if(!$(this).hasClass("disabled")){
	var legacyLebarSum = 0;
  $(".legacyLebarC1").each(function(){legacyLebarSum += parseFloat($(this).val());});
  $('#legacyID1').val('$ ' + legacyLebarSum);
  var legacyHWSum = 0;
  $(".legacyHWC1").each(function(){legacyHWSum += parseFloat($(this).val());});
  $('#legacyID2').val('$ ' + legacyHWSum);
  var legacyLicenseSum = 0;
  $(".legacyLicenseC1").each(function(){legacyLicenseSum += parseFloat($(this).val());});
  $('#legacyID3').val('$ ' + legacyLicenseSum);
  var legacyMiscSum = 0;
  $(".legacyMiscC1").each(function(){legacyMiscSum += parseFloat($(this).val());});
  $('#legacyID4').val('$ ' + legacyMiscSum);
	}
	/*$.ajax({
  type: "POST",
  url: "https://ty25i7u6ib.execute-api.us-east-1.amazonaws.com/dev1/LegacyCost-dev",
  data:JSON.stringify(formData),
  success: function(data){
	  alert("success");
  },
  dataType: "json",
  contentType : "application/json"
}); */
	});



	$(document).on("click",".pieIcon1.active a",function() {
		$(this).parent().removeClass("active");
		$(this).parent().siblings(".pieIcon2").addClass("active");
		$(this).parent().siblings(".pieChart").show();
		$(this).parent().siblings(".pieTable").hide();		
	});
	$(document).on("click",".pieIcon2.active a",function() {
		$(this).parent().removeClass("active")
		$(this).parent().siblings(".pieIcon1").addClass("active");
		$(this).parent().siblings(".pieChart").hide();
		$(this).parent().siblings(".pieTable").show();
	});
	
	/*
	$('form input[type=file]').change(function(){
		$(this).siblings("label").html($(this).val());
	var file = this.files[0];
	alert(file);
    $.ajax({
  type: "POST",
  url: 'http://ec2-54-210-87-86.compute-1.amazonaws.com:5000/upload',
  data: file,
  success: function(data){ alert("success");},
  dataType: "binary",
  contentType: "application/pdf",
  processData: false
});

    });*/
	
	$('form input[type=file]').on('change', function(){
	$(this).siblings("label").html($(this).val());
    var file = this.files[0];
    var form = new FormData();
    form.append("file", file);

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": 'https://ec2-54-210-87-86.compute-1.amazonaws.com:5000/upload/'+ $(".clnt_name").text() + '/' + $(".Asst_name_name").text(),
      "method": "POST",
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  });
	
	
	
	
	
	
	/*
	
	$(".btnDownload").click(function(){
		var fName = $(this).attr("data-fName");
		if(!$(this).hasClass("disabled")){
		labelNameDL = $(this).find("span").html();
        $.ajax({
            type: 'GET',
            url: 'https://q3c3ix92v1.execute-api.us-east-1.amazonaws.com/v1/teradatavantage-usfs?file='+fName,
            success:function(data){
				alert("success")
             var dataArr = JSON.parse(data);
			 window.open(dataArr.URL);
            }
        });
    return false;
		}
    }); */
	$('input[name="phone"]').keypress(function(e) {
    var a = [];  var k = e.which;    
    for (i = 48; i < 58; i++) a.push(i);    
    if (!(a.indexOf(k)>=0)) e.preventDefault();  
});	

	$("#userProfileID").click(function(){
		var valBoolean = [0,0,0,0,0,0,0,0,0];		
		var formData = {
		"ID":$("#userNm").val(),
		"Assessment_Name":$("#assessmentName").val(),
		"Client_Name":$("#clientName").val(),
		"First_Name":$("#firstName").val(),
		"Last_Name":$("#lastName").val(),
		"E-Mail":$("#userNm").val(),
		"Phone":$("#phoneNum").val(),
		"Password":$("#passwordUser").val(),
"Target_Plateform":$("#assessmentPlatform").val(),
"Start_Date":$("#datepick1").val(),
"End_Date":$("#datepick2").val()			
	}
	
	if(	$("#assessmentName").val() == "")
	{
	$("#assessmentName").siblings(".error").html("Please Enter Assessment Name");
	}
	else if(!$("#assessmentName").val() == ""){
		$("#assessmentName").siblings(".error").html("");
		valBoolean[0] = 1;
	}
	if(	$("#clientName").val() == "")
	{
	$("#clientName").siblings(".error").html("Please Enter Client Name");
	}
	else if(!$("#clientName").val() == ""){
		$("#clientName").siblings(".error").html("");
		valBoolean[1] = 1;
	}
	if($("#firstName").val() == ""){
		$("#firstName").siblings(".error").html("Please Enter First Name");	
	}
	else if(!$("#firstName").val() == ""){
		$("#firstName").siblings(".error").html("");
valBoolean[2] = 1;		
	}
	if($("#lastName").val() == ""){
		$("#lastName").siblings(".error").html("Please Enter Last Name");
	}
	else if(!$("#lastName").val() == ""){
		$("#lastName").siblings(".error").html("");	
		valBoolean[3] = 1;
	}

	
	var mob = /^[1-9]{1}[0-9]{9}$/;
	var currentValue = $("#phoneNum").val();
	if(mob.test(currentValue) == false && currentValue.length < 10 && currentValue.length > 0 ){
		$("#phoneNum").siblings(".error").html("Please Enter Valid Phone Number");
	}
else if(currentValue == "")
{
	$("#phoneNum").siblings(".error").html("Please Enter Phone Number");
}	
else{
		$("#phoneNum").siblings(".error").html("");
		valBoolean[4] = 1;
	}
	
	
	
	var regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regexEmail.test($("#userNm").val())) {
  $("#userNm").siblings(".error").html("Please Enter Valid Email");
  }else if($("#userNm").val() == "")
  {
	  $("#userNm").siblings(".error").html("Please Enter Email");
  }else{
		$("#userNm").siblings(".error").html("");
		valBoolean[5] = 1;
	}
	
	
	var pRE = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/, pRE2 = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20})/
            var pssWord1 = $('#passwordOne').val();            
        if( !pRE.test(pssWord1)) {
           $("#passwordOne").siblings(".error").html("Use at least 8 characters and mix of letters (uppercase and lowercase), numbers and symbols");
        }else if(pssWord1 == "")
		{
	  $("#passwordOne").siblings(".error").html("Please Enter Password");
		}
		else{
		$("#passwordOne").siblings(".error").html("");
		valBoolean[6] = 1;
		}
		var pssWord2 = $('#passwordUser').val();
		if(!pRE2.test(pssWord2)) {
           $("#passwordUser").siblings(".error").html("Use at least 8 characters and mix of letters (uppercase and lowercase), numbers and symbols");
        }else if(pssWord2 == "")
		{
	  $("#passwordUser").siblings(".error").html("Please Enter Password");
		}
		else{
		$("#passwordUser").siblings(".error").html("");
		valBoolean[7] = 1;
	}
		if(pssWord1 != pssWord2 ) {
           $("#passwordUser").siblings(".error").html("Password and Confirm Password do not match");
        }
		else if((pssWord1 == pssWord2)&& pssWord1.length > 0 && pssWord2.length > 0 ){
		$("#passwordUser").siblings(".error").html("");
		valBoolean[8] = 1;
		
	}
	
	if(valBoolean.includes(0))
{console.log("failed");
}
else{
	$.ajax({
  type: "POST",
  url: "https://wzldawy7n6.execute-api.us-east-1.amazonaws.com/Dev/user",
  data:JSON.stringify(formData),
  success: function(data){
		$.ajax({
				  type: "POST",
				  url: 'https://4kumv1dji0.execute-api.us-east-1.amazonaws.com/dev/folders/' + $("#clientName").val() + '/' + $("#assessmentName").val(),
				  data:JSON.stringify(formData),
				  success: function(data){
					  $(".successMsg, .popUpCartBg").show();
				  $("#userSetupPage input").val("");
				  console.log(obj);
				  },
				  dataType: "json",
				  contentType : "application/json"
				});
  },
  dataType: "json",
  contentType : "application/json"
});
	}
	
	});
	
	$(document).on("click",".successMsg button",function() {
		$(".successMsg, .popUpCartBg").hide();
	});
	$(".custom-file a").click(function () {
             $(".custom-file input").trigger('click');
        });
	
/*	$(".btnDownload").click(function (e) {
    window.open('data:application/vnd.ms-excel,' + $('#inputPage2form').html());
    e.preventDefault();
});*/

$(".btnDownload2").click(function (e) {
    window.open('data:application/vnd.ms-excel,' + $('#codeComplexityform').html());
    e.preventDefault();
});

	setTimeout(function(){}, 1000);
	$(".popUpCart").hide();
	$(".popUpCartBg").hide();															
	
	
   
   
   var piitable = $('#piiTable').DataTable({
      'columnDefs': [{
         'targets': 0,
         'searchable':false,
         'orderable':false,
         'className': 'dt-body-center',
         'render': function (data, type, full, meta){
             return '<input type="checkbox" name="id[]" value="' 
                + $('<div/>').text(data).html() + '">';
         }
      }]
   });
   var dropDown1 = $(".dropDown1").html();
   var dropDown2 = $(".dropDown2").html();
   var inputColumn1 = $(".inputColumn1").html();
   var inputColumn2 = $(".inputColumn2").html();
   var inputColumn3 = $(".inputColumn3").html();
   var inputColumn4 = $(".inputColumn4").html();
   var inputColumn6 = $(".inputColumn6").html();
   var legacyTechlgy = $('#legacyTechlgy').DataTable({
      'columnDefs': [{
         'targets': 0,
         'orderable':false,
         'className': 'dt-body-center'
      }]
   });
 
    $(document).on("click",".addNew",function() {
		if(!$(this).hasClass("disabled")){
        legacyTechlgy.row.add( [
            dropDown1,
            dropDown2,
            inputColumn1,
            inputColumn2,
            inputColumn3,
			inputColumn4,
			inputColumn6
      ] ).draw( false );
		}
       
    } );
   
	
	/* For User Creation */
	var userDropdown1 = $(".userDropdown1").html();
	var userDropdown2 = $(".userDropdown2").html();
	var userTargetTech = $(".userTargetTech").html();
	var userDelete = $(".userDelete").html();
	$(document).on("click",".addNew2",function() {
        assessmentTbl.row.add( [
            userDropdown1,
            userDropdown2,
			userTargetTech,
			userDelete
            
      ] ).draw( false );
 
       
    } );
	$(document).on("click",".deleteRow",function() {
		 legacyTechlgy.row($(this).parents('tr')).remove().draw();
	 });
	 
	 $(document).on("click",".deleteRow2",function() {
		 assessmentTbl.row($(this).parents('tr')).remove().draw();
	 });
	 $(document).on("click",".deleteRow3",function() {
		 cloudTechlgy.row($(this).parents('tr')).remove().draw();
	 });
	
      $('.errorEmail').hide();
	  $('.invalid_email').hide();
	  $(".errorAdmin").hide();
$(".pageCover").hide();
$(".adminPage").show();

$(document).on("click",".clkBtn",function() {
	if($(this).attr("data-next") == "memLoginPage")
	{
		$(".adminMenu").hide();$(".memMenu").hide();
	}
	else if($(this).attr("data-next") == "memLandingPage")
	{
		$(".adminMenu").hide();$(".memMenu").show();
	}
	
var clkBtn = $(this).attr("data-next");
$(".pageCover").hide();
$("#"+clkBtn).show();
});
$(".openbtn, .menuBtn, .subMenu a").click(function(){
	  $("#mySidepanel").toggleClass('Slidewidth');
});


$(".mMenu").click(function(){
	
	if($(this).hasClass("active"))
	{
	
	$(this).next(".subMenu").slideUp(300,function(){
	$(this).prev().removeClass("active");	
	});
	
	}
	
	if(!$(this).hasClass("active"))
	{
		$(".mMenu").next(".subMenu").slideUp(300);
		$(this).next(".subMenu").slideDown(300,function(){
			$(".mMenu").removeClass("active");
			$(this).prev().addClass("active");
		});
		
	}
	
});
	  
	  $("input").focus(function(){
	  $(this).removeClass("errOutline");
	  var attr = $(this).attr('data-error');
	  $("."+attr).hide();
	  $(".errorAdmin").hide();
	  });
	  
	  
	  $('.tabs button').click(function(){
	  $('.tabs button').removeClass("active");
	  $(this).addClass("active");
	  });
	  
	  
      
  $(".jsonClose").click(function(){
	  $(".displayJson").hide();
  });
  
  $(document).on("click",".totalROI",function() {
	  $(".roiPDFCover").show();	  
        legacyCostChart();
		estimateCostChart();
		yearonyearCost();		
		roimodelChart();
		cumulativeRfn();
		
    });
  
  
  $(".finalBtn").click(function(){
		  
		  var formData1 = JSON.stringify($("#loginform").serializeArray());
		  var formData2 = JSON.stringify($("#memLoginform").serializeArray());
		  var formData3 = JSON.stringify($("#inputPage1form").serializeArray());
		  var formData4 = JSON.stringify($("#inputPage2form").serializeArray());
		  var formData5 = JSON.stringify($("#inputPage3form").serializeArray());
		  $(".displayJson").show();
		 $(".displayJson .box1").append(formData1);
		 $(".displayJson .box2").append(formData2);
		 $(".displayJson .box3").append(formData3);
		 $(".displayJson .box4").append(formData4);
		 $(".displayJson .box5").append(formData5);
 
	  });
	  $('#submitMemLogin').click(function(){        
        var email = $('.emailLogin').val();
        
        if(email== ''){
          $('.errorEmail').show();
          return false;
        }
        else if(IsEmail(email)==false){
          $('.invalid_email').show();			
          return false;
        }
		
		
  });
  
  


  var dev = [3106, 222, 2, 1238, 11,439,43086,368];
 var qa = [2994, 231, 3, 1578, 15,674,100,312];
 var sit = [3312, 197, 1, 1497, 9,554,43124,401];
 var prod = [3197, 274, 4, 1254, 10,395,43634,361]; 
 var bDev =  [4231, 215, 6, 1824, 21,498,48798,458];
 var bUAT =  [2879, 125, 9, 1524, 16,487,50648,547];
 var bPRD =  [5487, 658, 26, 2365, 14,659,43634,456];
 var policy = [5648, 874, 9, 1547, 23,687,54879,654];
 var claims =  [3985, 215, 6, 1124, 8,542,41235,487];
 var members =  [3256, 298, 5, 1365, 14,457,44569,354];
assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV','csv1','NUMBER OF AMPS');
	envelopeChartfn(0,15,24,ampsData,"Number of Amps - TD_BIM_FR_TRNG_DB_DEV");
	
  $(document).on("click",".highcharts-series-0",function() {	  
   assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV','csv1','NUMBER OF AMPS');
	envelopeChartfn(0,15,24,ampsData,"Number of Amps - TD_BIM_FR_TRNG_DB_DEV");
	
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV','csv11','CONCURRENT USERS');
		envelopeChartfn(0,15,24,concurrentdata,"Concurrent Users - TD_BIM_FR_TRNG_DB_DEV");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV','csv21','CPU Utilization');
		envelopeChartfn(0,15,24,cpudata,"CPU Utilization - TD_BIM_FR_TRNG_DB_DEV");
	}
  });
   $(document).on("click",".highcharts-series-1",function() {	  
   assessmentBarFn(qa,'TD_BIM_FR_TRNG_DB_QA');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_QA',2641,345,3614,9874);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_QA','csv2','NUMBER OF AMPS');
	envelopeChartfn(15,30,24,ampsData,"Number of Amps - TD_BIM_FR_TRNG_DB_QA");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_QA','csv12','CONCURRENT USERS');
		envelopeChartfn(15,30,24,concurrentdata,"Concurrent Users - TD_BIM_FR_TRNG_DB_QA");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_QA','csv22','CPU Utilization');
		envelopeChartfn(15,30,24,cpudata,"CPU Utilization - TD_BIM_FR_TRNG_DB_QA");
	}
  });
   $(document).on("click",".highcharts-series-2",function() {	  
   assessmentBarFn(sit,'TD_BIM_FR_TRNG_DB_SIT');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_SIT',2800,224,3796,9564);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_SIT','csv3','NUMBER OF AMPS');
	envelopeChartfn(30,45,24,ampsData,"Number of Amps - TD_BIM_FR_TRNG_DB_SIT");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_SIT','csv13','CONCURRENT USERS');
		envelopeChartfn(30,45,24,concurrentdata,"Concurrent Users - TD_BIM_FR_TRNG_DB_SIT");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_SIT','csv23','CPU Utilization');
		envelopeChartfn(30,45,24,cpudata,"CPU Utilization - TD_BIM_FR_TRNG_DB_SIT");
	}
  });
   $(document).on("click",".highcharts-series-3",function() {	  
   assessmentBarFn(prod,'TD_BIM_FR_TRNG_DB_PROD');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_PROD',3421,401,4214,12465);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_PROD','csv4','NUMBER OF AMPS');
	envelopeChartfn(45,60,24,ampsData,"Number of Amps - TD_BIM_FR_TRNG_DB_PROD");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_PROD','csv14','CONCURRENT USERS');
		envelopeChartfn(45,60,24,concurrentdata,"Concurrent Users - TD_BIM_FR_TRNG_DB_PROD");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_PROD','csv24','CPU Utilization');
		envelopeChartfn(45,60,24,cpudata,"CPU Utilization - TD_BIM_FR_TRNG_DB_PROD");
	}
  });
  
  
  
  $(document).on("click",".highcharts-series-4",function() {	  
   assessmentBarFn(bDev,'Billing_Dev');
    assessmentCircleFn('Billing_Dev',2214,287,4126,10325);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Billing_Dev','csv5','NUMBER OF AMPS');
	envelopeChartfn(60,75,24,ampsData,"Number of Amps - Billing_Dev");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Billing_Dev','csv15','CONCURRENT USERS');
		envelopeChartfn(60,75,24,concurrentdata,"Concurrent Users - Billing_Dev");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Billing_Dev','csv25','CPU Utilization');
		envelopeChartfn(60,75,24,cpudata,"CPU Utilization - Billing_Dev");
	}
  });
  
  $(document).on("click",".highcharts-series-5",function() {	  
   assessmentBarFn(bUAT,'Billing_UAT');
    assessmentCircleFn('Billing_UAT',2564,354,3200,9856);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Billing_UAT','csv6','NUMBER OF AMPS');
	envelopeChartfn(75,90,24,ampsData,"Number of Amps - Billing_UAT");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Billing_UAT','csv16','CONCURRENT USERS');
		envelopeChartfn(75,90,24,concurrentdata,"Concurrent Users - Billing_UAT");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Billing_UAT','csv26','CPU Utilization');
		envelopeChartfn(75,90,24,cpudata,"CPU Utilization - Billing_UAT");
	}
  });
  
  $(document).on("click",".highcharts-series-6",function() {	  
   assessmentBarFn(bPRD,'Billing_PRD');
    assessmentCircleFn('Billing_PRD',2354,425,3100,9451);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Billing_PRD','csv7','NUMBER OF AMPS');
	envelopeChartfn(90,105,24,ampsData,"Number of Amps - Billing_PRD");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Billing_PRD','csv17','CONCURRENT USERS');
		envelopeChartfn(90,105,24,concurrentdata,"Concurrent Users - Billing_PRD");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Billing_PRD','csv27','CPU Utilization');
		envelopeChartfn(90,105,24,cpudata,"CPU Utilization - Billing_PRD");
	}
  });
  $(document).on("click",".highcharts-series-7",function() {	  
   assessmentBarFn(policy,'Policy');
    assessmentCircleFn('Policy',3214,487,3641,8978);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Policy','csv8','NUMBER OF AMPS');
	envelopeChartfn(105,120,24,ampsData,"Number of Amps - Policy");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Policy','csv18','CONCURRENT USERS');
		envelopeChartfn(105,120,24,concurrentdata,"Concurrent Users - Policy");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Policy','csv28','CPU Utilization');
		envelopeChartfn(105,120,24,cpudata,"CPU Utilization - Policy");
	}
  });
  $(document).on("click",".highcharts-series-8",function() {	  
   assessmentBarFn(claims,'Claims');
    assessmentCircleFn('Claims',3154,312,3956,8654);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Claims','csv9','NUMBER OF AMPS');
	envelopeChartfn(120,135,24,ampsData,"Number of Amps - Claims");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Claims','csv19','CONCURRENT USERS');
		envelopeChartfn(120,135,24,concurrentdata,"Concurrent Users - Claims");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Claims','csv29','CPU Utilization');
		envelopeChartfn(120,135,24,cpudata,"CPU Utilization - Claims");
	}
  });
  $(document).on("click",".highcharts-series-9",function() {	  
   assessmentBarFn(members,'Members');
    assessmentCircleFn('Members',2879,285,4236,11324);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - Members','csv10','NUMBER OF AMPS');
	envelopeChartfn(135,150,24,ampsData,"Number of Amps - Members");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - Members','csv20','CONCURRENT USERS');
		envelopeChartfn(135,150,24,concurrentdata,"Concurrent Users - Members");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - Members','csv30','CPU Utilization');
		envelopeChartfn(135,150,24,cpudata,"CPU Utilization - Members");
	}
  });
  
  
  
  
  
  $("#heatMapMenu").change(function(){
    if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
		assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV','csv1','NUMBER OF AMPS');
	envelopeChartfn(0,15,24,cpudata,"NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV");
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV','csv11','CONCURRENT USERS');
		envelopeChartfn(0,15,24,cpudata,"CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV");
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV','csv21','CPU Utilization');
		envelopeChartfn(0,15,24,cpudata,"CPU Utilization - TD_BIM_FR_TRNG_DB_DEV");
	}
  });
  
 $(document).on("click","#CCEsubmit",function() {
	 $(".cce_containercover.bsh").show();
	 cce_graph();
 });
 
 
  
 });
 
 /* document ready end */
 function codeComplexityFn()
 {
	 for(i=0;i<ends;i++)
	 {
	 }
 }
 function heatmapCSVtext(id,starts,ends,days,csvData){
	  var z=0;
for(i=starts;i<ends;i++)
{
var ampMonth = csvData[i].DATE;
ampMonth = ampMonth.replace(/\b\d\b/g, '0$&');
var stringMonth = ampMonth.substr(0,2);
z=z+1;
for(j=0;j<days;j++)
{

 $(id).append('\n'+'2020-'+stringMonth+'-'+z+','+j+','+csvData[i][j]);
 }
 }  
$(id).html($(id).text());
 }
 function assessmentHeatmap(hdTitle,ids,tooltip)
 {
 Highcharts.chart('container2', {
    chart: {
        type: 'heatmap',
        inverted: true
    },

    data: {
        csv: document.getElementById(ids).innerHTML
    },

    title: {
        text: '<span class="dbTitleClr" style="color:#007bff">'+hdTitle+'</span>',
        align: 'left'
    },

    subtitle: {
        text: '',
        align: 'left'
    },

    xAxis: {
        tickPixelInterval: 50,
        min: Date.UTC(2020, 8, 1),
        max: Date.UTC(2020, 8, 15)
    },

    yAxis: {
        title: {
            text: null
        },
        labels: {
            format: '{value}:00'
        },
        minPadding: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false,
        tickPositions: [0, 6, 12, 18, 24],
        tickWidth: 1,
        min: 0,
        max: 23
    },

    colorAxis: {
        stops: [
            [0, '#7dff6f'],
            [0.5, '#feff9a'],
            [0.9, '#ff3434']
        ],
        min: 0,
		max: 100
    },

    series: [{
        borderWidth: 0,
        colsize: 24 * 36e5, // one day
        tooltip: {
            headerFormat: tooltip+'<br/>',
            pointFormat: '{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} amps</b>'
        }
    }]
});
 }
  function assessmentCircleFn(hdTitle,a1,a2,a3,a4)
  {
	  var a1= 400;
  Highcharts.chart('assessmentCircle', {

    chart: {
        type: 'solidgauge',
        height: '75%',
        events: {
            render: renderIcons
        }
    },

    title: {
        text: 'Activities<span class="dbTitleClr" style="color:#007bff"> - '+hdTitle+'</span>',
        style: {
            fontSize: '18px'
        }
    },

    tooltip: {
        borderWidth: 0,
        backgroundColor: 'none',
        shadow: false,
        style: {
            fontSize: '10px'
        },
        pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
        positioner: function (labelWidth) {
            return {
                x: (this.chart.chartWidth - labelWidth) / 2,
                y: (this.chart.plotHeight / 2) + 15
            };
        }
    },

    pane: {
        startAngle: 0,
        endAngle: 360,
        background: [{ // Track for Move
            outerRadius: '106%',
            innerRadius: '91%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        },{ // Track for Move
            outerRadius: '90%',
            innerRadius: '73%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[5])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Exercise
            outerRadius: '72%',
            innerRadius: '56%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[3])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }, { // Track for Stand
            outerRadius: '55%',
            innerRadius: '38%',
            backgroundColor: Highcharts.color(Highcharts.getOptions().colors[2])
                .setOpacity(0.3)
                .get(),
            borderWidth: 0
        }]
    },

    yAxis: {
        min: 0,
        max: 13000,
        lineWidth: 0,
        tickPositions: []
    },

    plotOptions: {
        solidgauge: {
            dataLabels: {
                enabled: false
            },
            linecap: 'round',
            stickyTracking: false,
            rounded: true
        }
    },

    series: [{
        name: 'Updates per Day',
        data: [{
            color: Highcharts.getOptions().colors[0],
            radius: '106%',
            innerRadius: '91%',
            y: a1
        }]
    },{
        name: 'Delets per Day',
        data: [{
            color: Highcharts.getOptions().colors[5],
            radius: '90%',
            innerRadius: '73%',
            y: a2
        }]
    }, {
        name: 'Inserts per Day',
        data: ['Inserts',{
            color: Highcharts.getOptions().colors[3],
            radius: '72%',
            innerRadius: '56%',
            y: a3
        }]
    }, {
        name: 'Selects per Day',
        data: [{
            color: Highcharts.getOptions().colors[2],
            radius: '55%',
            innerRadius: '38%',
            y: a4
        }]
    }]
});
 }
 function assessmentBarFn(em,hdTitle)
 {
	 $('.assessmentBar').html('<figure class="highcharts-figure"><div id="assessmentBar"></div></figure>');


	 var bubblePopupdata = em;
Highcharts.chart('assessmentBar', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Volumetrics'+'<span class="dbTitleClr" style="color:#007bff"> - '+hdTitle+'</span>'
    },
    xAxis: {
        categories: ['MACRO', 'PROCEDURE', 'TRIGGER', 'VIEW', 'HASH INDEX','No PRIMARY INDEX','PRIMARY INDEX','JOIN INDEX']
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
        shared: true
    },
    plotOptions: {
        column: {
            stacking: 'percent'
        }
    },
    series: [{
        name: 'Values',
        data: bubblePopupdata,
    }]
 });
 }
 var adminValidate = true;
 
 function IsEmail(email) {
	
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
  $(".emailLogin").addClass("errOutline");
    return false;
  }else{
	  console.log(obj);
	  var emailVal = $("#emailLogin").val();
	  var passwordval = $("#passwordLogin").val();
	  for (var i = 0; i < obj.length; i++){
  if ((obj[i].ID == emailVal)&&(obj[i].Password == passwordval)){
						 $(".pageCover,.admMenu,#schemaInputs").hide();
						 $("#adminDashboard,.loginUserName").show();
						 $(".adminMenu").show();$(".memMenu").hide();
						 $(".loginUserName .loginUserDetails div").html('<b><span class="frst_name">'+obj[i].First_Name+'</span>, <span class="lst_name">'+obj[i].Last_Name+'</span></b><br><b>E-Mail:</b> '+ emailVal + '<br><b>Client Name: </b><span class="clnt_name">'+ obj[i].Client_Name+'</span>'+'<br><b>Assessment Name: </b><span class="Asst_name_name">'+obj[i].Assessment_Name+'</span><br/><button type="button" class="btn btn-primary mrgT10 logOut">Log Out</button>');
						 $(".firstLetter").html(obj[i].First_Name.charAt(0)+obj[i].Last_Name.charAt(0));
	  
	  for (var j = 0; j < adminObj.length; j++){
						 
		if ((adminObj[j].EMail == emailVal)){ 
						 				
						 $('.admMenu,#schemaInputs').show();
						$(".loginUserName .loginUserDetails div").html('<b><span class="frst_name">'+obj[i].First_Name+'</span>, <span class="lst_name">'+obj[i].Last_Name+'</span></b><br><b>E-Mail:</b> '+ emailVal + '<br><b>Client Name: </b><span class="clnt_name">'+ obj[i].Client_Name+'</span>'+'<br><b>Assessment Name: </b><span class="Asst_name_name">'+obj[i].Assessment_Name+'</span><br/><button type="button" class="btn btn-primary mrgT10 logOut">Log Out</button>');
						 	 $("#adminDashboard").hide();			 
						  return true;
		  }
	}
	
	for (var k = 0; k < clientObj.length; k++){
						 
		if ((clientObj[k].EMail == emailVal)){ 
		$(".cloudCOstH").addClass("cloudCOstHide");
		$('#cloudTechlgy input[type="text"]').attr("disabled","disabled");
		$('.addNewCloud').addClass("disabled");
		$('#CCEsubmit').addClass("disabled");
		$('.costTech11').removeClass('deleteRow3');
		}
	}
	
	
	
	
	}
  else{
	  $(".errorAdmin").show();
	}
}
	
  }
}

function renderIcons() {

    // Move icon
    if (!this.series[0].icon) {
        this.series[0].icon = this.renderer.path([])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.series[2].group);
    }
    this.series[0].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[0].points[0].shapeArgs.innerR -
            (this.series[0].points[0].shapeArgs.r - this.series[0].points[0].shapeArgs.innerR) / 2
    );

    // Exercise icon
    if (!this.series[1].icon) {
        this.series[1].icon = this.renderer.path(
            []
        )
            .attr({
                stroke: '#ffffff',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.series[2].group);
    }
    this.series[1].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[1].points[0].shapeArgs.innerR -
            (this.series[1].points[0].shapeArgs.r - this.series[1].points[0].shapeArgs.innerR) / 2
    );

    // Stand icon
    if (!this.series[2].icon) {
        this.series[2].icon = this.renderer.path([])
            .attr({
                stroke: '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                zIndex: 10
            })
            .add(this.series[2].group);
    }

    this.series[2].icon.translate(
        this.chartWidth / 2 - 10,
        this.plotHeight / 2 - this.series[2].points[0].shapeArgs.innerR -
            (this.series[2].points[0].shapeArgs.r - this.series[2].points[0].shapeArgs.innerR) / 2
    );
}

function legacyCostChart()
{var finalData;
var txtVal = $(".legacyCost").val();
var legacycostVal = $(".legacyCost").val();	  
var caseVal = $('#myRange').val();
var caseVal2 = $('#myRange').val();
var lineDerived = legacycostVal;
var yearTrgt = $("#slideVal").html()/100;
var arrs = []
for(i=0;i<$('#myRange').val();i++)
{
	caseVal2 = caseVal2 - 1;
	arrs.push(caseVal2);
}
yearL1 = arrs[0] * (legacycostVal*yearTrgt);
yearL2 = arrs[1] * (legacycostVal*yearTrgt);
yearL3 = arrs[2] * (legacycostVal*yearTrgt);
yearL4 = arrs[3] * (legacycostVal*yearTrgt);
yearL5 = arrs[4] * (legacycostVal*yearTrgt);

if(caseVal == 1){finalData = [yearL1];}
else if(caseVal == 2){finalData = [yearL1,yearL2];}
else if(caseVal == 3){finalData = [yearL1,yearL2,yearL3];}
else if(caseVal == 4){finalData = [yearL1,yearL2,yearL3,yearL4];}
else if(caseVal == 5){finalData = [yearL1,yearL2,yearL3,yearL4,yearL5];}

Highcharts.chart('container3', {
    chart: {
        type: 'line'
    },
    title: {
        text: '<div class="legacyCostVal">$0</div>'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5']
    },
    yAxis: {
        title: {
            text: 'Cost'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Yearly Target',
        data: finalData
    }]
});
$(".legacyCostVal").text("$"+txtVal);
}

function estimateCostChart()
{var finalData;
var yearTarget = $('#myRange').val();
var estimatecostVal = $(".estimatedCloudCost").val();	  
var yearTrgt = $("#slideVal").html()/100;
year1 = 1 * (estimatecostVal*yearTrgt);
year2 = 2 * (estimatecostVal*yearTrgt);
year3 = 3 * (estimatecostVal*yearTrgt);
year4 = 4 * (estimatecostVal*yearTrgt);
year5 = 5 * (estimatecostVal*yearTrgt);

if(yearTarget == 1){finalData = [year1];}
else if(yearTarget == 2){finalData = [year1,year2];}
else if(yearTarget == 3){finalData = [year1,year2,year3];}
else if(yearTarget == 4){finalData = [year1,year2,year3,year4];}
else if(yearTarget == 5){finalData = [year1,year2,year3,year4,year5];}

Highcharts.chart('container4', {
    chart: {
        type: 'line'
    },
    title: {
        text: '<div class="estimateCostVal">$0</div>'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5']
    },
    yAxis: {
        title: {
            text: 'Cost'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Yearly Target',
        data: finalData
    }]
});
$(".estimateCostVal").text("$"+estimatecostVal);
}
function yearonyearCost(){
	var finalData1,finalData2;
	var finalData3;
	var txtVal = 1*$(".estimatedMigrationCost").val();
var yearTarget = $('#myRange').val();
if(yearTarget == 1){finalData1 = [yearL1];}
else if(yearTarget == 2){finalData1 = [yearL1,yearL2];}
else if(yearTarget == 3){finalData1 = [yearL1,yearL2,yearL3];}
else if(yearTarget == 4){finalData1 = [yearL1,yearL2,yearL3,yearL4];}
else if(yearTarget == 5){finalData1 = [yearL1,yearL2,yearL3,yearL4,yearL5];}

if(yearTarget == 1){finalData2 = [year1];}
else if(yearTarget == 2){finalData2 = [year1,year2];}
else if(yearTarget == 3){finalData2 = [year1,year2,year3];}
else if(yearTarget == 4){finalData2 = [year1,year2,year3,year4];}
else if(yearTarget == 5){finalData2 = [year1,year2,year3,year4,year5];}

if(yearTarget == 1){finalData3 = [txtVal];}
else if(yearTarget == 2){finalData3 = [txtVal,txtVal];}
else if(yearTarget == 3){finalData3 = [txtVal,txtVal,txtVal];}
else if(yearTarget == 4){finalData3 = [txtVal,txtVal,txtVal,txtVal];}
else if(yearTarget == 5){finalData3 = [txtVal,txtVal,txtVal,txtVal,txtVal];}

	Highcharts.chart('container5', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Migration cost : <span class="yearonyearVal">$0</span>'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'Year1',
            'Year2',
            'Year3',
			'Year4',
			'Year5',
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: ''
        }
    },
    tooltip: {
         headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Legacy',
        data: finalData1

    },{
        name: 'Migration',
        data: finalData3

    }, {
        name: 'Cloud',
        data: finalData2

    }]
});
$(".yearonyearVal").text("$"+txtVal);
}

function roimodelChart(){
	var finalData1,finalData2;
	var finalData3;
	var finalData4;
	var txtVal = 1*$(".estimatedMigrationCost").val();
var yearTarget = $('#myRange').val();
if(yearTarget == 1){finalData1 = [yearL1];}
else if(yearTarget == 2){finalData1 = [yearL1,yearL2];}
else if(yearTarget == 3){finalData1 = [yearL1,yearL2,yearL3];}
else if(yearTarget == 4){finalData1 = [yearL1,yearL2,yearL3,yearL4];}
else if(yearTarget == 5){finalData1 = [yearL1,yearL2,yearL3,yearL4,yearL5];}

if(yearTarget == 1){finalData2 = [year1];}
else if(yearTarget == 2){finalData2 = [year1,year2];}
else if(yearTarget == 3){finalData2 = [year1,year2,year3];}
else if(yearTarget == 4){finalData2 = [year1,year2,year3,year4];}
else if(yearTarget == 5){finalData2 = [year1,year2,year3,year4,year5];}

if(yearTarget == 1){finalData3 = [txtVal];}
else if(yearTarget == 2){finalData3 = [txtVal,txtVal];}
else if(yearTarget == 3){finalData3 = [txtVal,txtVal,txtVal];}
else if(yearTarget == 4){finalData3 = [txtVal,txtVal,txtVal,txtVal];}
else if(yearTarget == 5){finalData3 = [txtVal,txtVal,txtVal,txtVal,txtVal];}
year1line = year1+yearL1+txtVal;
year2line = year2+yearL2+txtVal;
year3line = year3+yearL3+txtVal;
year4line = year4+yearL4+txtVal;
year5line = year5+yearL5+txtVal;

if(yearTarget == 1){finalData4 = [year1line];year2line=0;year3line=0;year4line=0;year5line=0;}
else if(yearTarget == 2){finalData4 = [year2line];year3line=0;year4line=0;year5line=0;}
else if(yearTarget == 3){finalData4 = [year3line];year4line=0;year5line=0;}
else if(yearTarget == 4){finalData4 = [year4line];year5line=0;}
else if(yearTarget == 5){finalData4 = [year5line];}


Highcharts.chart('container6', {
    title: {
        text: 'ROI Model'
    },
    xAxis: {
        categories: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5']
    },
	yAxis: {
        title: {
            text: 'Dollars'
        }
    },
    series: [{
        type: 'column',
        name: 'Legacy Cost',
        data: finalData1
    }, {
        type: 'column',
        name: 'Migration Cost',
        data: finalData3
    }, {
        type: 'column',
        name: 'Cloud Cost',
        data: finalData2
    }, {
        type: 'spline',
        name: 'Total',
        data: [year1line,year2line,year3line,year4line,year5line],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white'
        }
    }]
});
}


function cumulativeRfn(){
	var lVal = $(".legacyCost").val();
	var cBar1 = lVal - year1line;
	var cBar2 = lVal - year2line + cBar1;
	var cBar3 = lVal - year3line + cBar2;
	var cBar4 = lVal - year4line + cBar3;
	var cBar5 = lVal - year5line + cBar4;
Highcharts.chart('cumulativeR', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Cumulative Returns'
    },
    xAxis: {
        categories: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5']
    },
    yAxis: {
         title: {
            text: 'Cumulative Values',
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Cumulative Returns',
        data: [cBar1,cBar2,cBar3,cBar4,cBar5]
    }]
});
}

function downloadFunc(files){
    	var anchor=document.createElement('a');
    	anchor.setAttribute('href','plugin/'+files);
    	anchor.setAttribute('download','');
    	document.body.appendChild(anchor);
    	anchor.click();
    	anchor.parentNode.removeChild(anchor);
  }


function cce_range(rownum){
var cce_slider1 = document.getElementById('CCE_Range'+rownum);
var cce_output1 = document.getElementById('cldCostValue'+rownum);

cce_slider1.oninput = function() {
cce_output1.value = $('#cldCostValue_hidden'+rownum).val();
var d = 100/this.value;

var c = cce_output1.value * d/100;

if(this.value == 3){cce_output1.value = cce_output1.value * 30/100;;}
else{cce_output1.value = c;} 
}
}

function cce_size(rownum){
	var cce_slider1 = document.getElementById('CCE_Range'+rownum);
	var cce_output1 = document.getElementById('cldCostValue'+rownum);
var cce_slider2 = document.getElementById('cce_Size'+rownum);
var cce_output2 = document.getElementById('cldCostValue'+rownum);
var hVal;
cce_slider2.oninput = function() {
	
	cceType();
	if(rownum == 1){hVal = type1;}if(rownum == 2){hVal = type2;}if(rownum == 3){hVal = type3;}if(rownum == 4){hVal = type4;}
if(this.value == 1){$('#cldCostValue_hidden'+rownum).val(hVal);}
if(this.value == 2){$('#cldCostValue_hidden'+rownum).val(hVal);}
if(this.value == 3){$('#cldCostValue_hidden'+rownum).val(hVal);}
cce_slider1.value = 1;
cce_output1.value = $('#cldCostValue_hidden'+rownum).val();
}
}



function cce_graph(){	
	var y1,y2,y3,y4,y5;
	
	cceType();
	var finalData1 = [type1,type1*50/100,type1*30/100,type1*25/100,type1*20/100];
	var finalData2 = [type2,type2*50/100,type2*30/100,type2*25/100,type2*20/100];
	var finalData3 = [type3,type3*50/100,type3*30/100,type3*25/100,type3*20/100];
	var finalData4 = [type4,type4*50/100,type4*30/100,type4*25/100,type4*20/100];
	var totalyear1 = finalData1[0]+finalData2[0]+finalData3[0]+finalData4[0];
	var totalyear2 = finalData1[1]+finalData2[1]+finalData3[1]+finalData4[1];
	var totalyear3 = finalData1[2]+finalData2[2]+finalData3[2]+finalData4[2];
	var totalyear4 = finalData1[3]+finalData2[3]+finalData3[3]+finalData4[3];
	var totalyear5 = finalData1[4]+finalData2[4]+finalData3[4]+finalData4[4];
	
Highcharts.chart('cce_container', {
    title: {
        text: 'CCE Model'
    },
    xAxis: {
        categories: ['Year1', 'Year2', 'Year3', 'Year4', 'Year5']
    },
	yAxis: {
        title: {
            text: 'Dollars'
        }
    },
    series: [{
        type: 'column',
        name: 'ETL Workload',
        data: finalData1
    }, {
        type: 'column',
        name: 'Storage',
        data: finalData2
    }, {
        type: 'column',
        name: 'Analytics Workload',
        data: finalData3
    },{
        type: 'column',
        name: 'Advance Analytics',
        data: finalData4
    }, {
        type: 'spline',
        name: 'Total',
        data: [totalyear1,totalyear2,totalyear3,totalyear4,totalyear5],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[4],
            fillColor: 'white'
        }
    }]
});

}

function cceType(){
	type1=0;type2=0;type3=0;type4=0;
	if($("#cce_Size1").val() == 1){
	for (var i = 0; i < smallObj.length; i++){if (smallObj[i].Type == "ETL Workload"){type1 =  type1 + parseInt(smallObj[i].Price_with_License);}}
	$('#cldCostValue_hidden1').val(type1);}
	if($("#cce_Size1").val() == 2){
	for (var i = 0; i < mediumObj.length; i++){if (mediumObj[i].Type == "ETL Workload"){type1 =  type1 + parseInt(mediumObj[i].Price_with_License);}}
	$('#cldCostValue_hidden1').val(type1);}
	if($("#cce_Size1").val() == 3){
	for (var i = 0; i < largeObj.length; i++){if (largeObj[i].Type == "ETL Workload"){type1 =  type1 + parseInt(largeObj[i].Price_with_License);}}
	$('#cldCostValue_hidden1').val(type1);}
	
	if($("#cce_Size2").val() == 1){
    for (var i = 0; i < smallObj.length; i++){if (smallObj[i].Type == "Storage"){type2 =  type2 + parseInt(smallObj[i].Price_with_License);}}
	$('#cldCostValue_hidden2').val(type2);}
	if($("#cce_Size2").val() == 2){
    for (var i = 0; i < mediumObj.length; i++){if (mediumObj[i].Type == "Storage"){type2 =  type2 + parseInt(mediumObj[i].Price_with_License);}}
	$('#cldCostValue_hidden2').val(type2);}
	if($("#cce_Size2").val() == 3){
    for (var i = 0; i < largeObj.length; i++){if (largeObj[i].Type == "Storage"){type2 =  type2 + parseInt(largeObj[i].Price_with_License);}}
	$('#cldCostValue_hidden2').val(type2);}
	
	  if($("#cce_Size3").val() == 1){
	for (var i = 0; i < smallObj.length; i++){if (smallObj[i].Type == "Analytics Workload"){type3 =  type3 + parseInt(smallObj[i].Price_with_License);}}
	$('#cldCostValue_hidden3').val(type3);}
	 if($("#cce_Size3").val() == 2){
	for (var i = 0; i < mediumObj.length; i++){if (mediumObj[i].Type == "Analytics Workload"){type3 =  type3 + parseInt(mediumObj[i].Price_with_License);}}
	$('#cldCostValue_hidden3').val(type3);}
	 if($("#cce_Size3").val() == 3){
	for (var i = 0; i < largeObj.length; i++){if (largeObj[i].Type == "Analytics Workload"){type3 =  type3 + parseInt(largeObj[i].Price_with_License);}}
	$('#cldCostValue_hidden3').val(type3);}
	
	if($("#cce_Size4").val() == 1){	  
	for (var i = 0; i < smallObj.length; i++){if (smallObj[i].Type == "Advance Analytics"){type4 =  type4 + parseInt(smallObj[i].Price_with_License);}}
	$('#cldCostValue_hidden4').val(type4);}
	if($("#cce_Size4").val() == 2){	  
	for (var i = 0; i < mediumObj.length; i++){if (mediumObj[i].Type == "Advance Analytics"){type4 =  type4 + parseInt(mediumObj[i].Price_with_License);}}
	$('#cldCostValue_hidden4').val(type4);}
	if($("#cce_Size4").val() == 3){	  
	for (var i = 0; i < largeObj.length; i++){if (largeObj[i].Type == "Advance Analytics"){type4 =  type4 + parseInt(largeObj[i].Price_with_License);}}
	$('#cldCostValue_hidden4').val(type4);}
	
}