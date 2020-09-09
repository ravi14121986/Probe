$(document).ready(function() {
      $('.errorEmail').hide();
	  $('.invalid_email').hide();
$(".pageCover").hide();
$(".adminPage").show();


$(".clkBtn").click(function(){
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
$(".openbtn, #mySidepanel a").click(function(){
	  $("#mySidepanel").toggleClass('Slidewidth');
});
$(".openbtn2, #mySidepanel2 a").click(function(){
	  $("#mySidepanel2").toggleClass('Slidewidth');
});
	  
	  $("input").focus(function(){
	  $(this).removeClass("errOutline");
	  var attr = $(this).attr('data-error');
	  $("."+attr).hide();
	  });
	  
	  
	  $('.tabs button').click(function(){
	  $('.tabs button').removeClass("active");
	  $(this).addClass("active");
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
  $(".jsonClose").click(function(){
	  $(".displayJson").hide();
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
 });
 function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(!regex.test(email)) {
  $(".emailLogin").addClass("errOutline");
    return false;
  }else{
  
  var correctVar  = $("#submitMemLogin").parents(".pageCover").attr("data-next");
  $(".pageCover").hide();
  $("."+correctVar).show();
  $(".adminMenu").show();$(".memMenu").hide();
    return true;
  }
}