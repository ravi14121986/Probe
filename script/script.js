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
var envelopeTitle ="NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV";
$(document).ready(function() {
	$(".popUpCart").hide();
	  $(".popUpCartBg").hide();															
	  var table = $('#example').DataTable({
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
	
      $('.errorEmail').hide();
	  $('.invalid_email').hide();
	  $(".errorAdmin").hide();
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
	  $(".hgCover").show();	  
        legacyCostChart();
		yearonyearCost();		
		estimateCostChart();
		roimodelChart();
		
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
 var prod =  [3197, 274, 4, 1254, 10,395,43634,361];

  
  $(document).on("click",".highcharts-bubble-series path:nth-child(2)",function() {	  
   assessmentBarFn(dev,'TD_BIM_FR_TRNG_DB_DEV');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_DEV',2442,379,3586,8126);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV','csv1');
	envelopeTitle = "NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV";
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV','csv5');
		envelopeTitle = "CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV";
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV','csv9');
		envelopeTitle = "CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV";
	}
  });
   $(document).on("click",".highcharts-bubble-series path:nth-child(3)",function() {	  
   assessmentBarFn(qa,'TD_BIM_FR_TRNG_DB_QA');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_QA',2641,345,3614,9874);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_QA','csv2');
	envelopeTitle = "NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_QA";
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_QA','csv6');
		envelopeTitle = "CONCURRENT USERS - TD_BIM_FR_TRNG_DB_QA";
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_QA','csv10');
		envelopeTitle = "CPU UTILIZATION - TD_BIM_FR_TRNG_DB_QA";
	}
  });
   $(document).on("click",".highcharts-bubble-series path:nth-child(4)",function() {	  
   assessmentBarFn(sit,'TD_BIM_FR_TRNG_DB_SIT');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_SIT',2800,224,3796,9564);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_SIT','csv3');
	envelopeTitle = "NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_SIT";
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_SIT','csv7');
		envelopeTitle = "CONCURRENT USERS - TD_BIM_FR_TRNG_DB_SIT";
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_SIT','csv11');
		envelopeTitle = "CPU UTILIZATION - TD_BIM_FR_TRNG_DB_SIT";
	}
  });
   $(document).on("click",".highcharts-bubble-series path:nth-child(5)",function() {	  
   assessmentBarFn(prod,'TD_BIM_FR_TRNG_DB_PROD');
    assessmentCircleFn('TD_BIM_FR_TRNG_DB_PROD',3421,401,4214,12465);
	if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_PROD','csv4');
	envelopeTitle = "NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_PROD";
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_PROD','csv8');
		envelopeTitle = "CONCURRENT USERS - TD_BIM_FR_TRNG_DB_PROD";
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_PROD','csv12');
		envelopeTitle = "CPU UTILIZATION - TD_BIM_FR_TRNG_DB_PROD";
	}
  });
  
  $("#heatMapMenu").change(function(){
    if($("#heatMapMenu").val() == "NUMBER OF AMPS"){
	assessmentHeatmap('NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV','csv1');
	envelopeTitle = "NUMBER OF AMPS - TD_BIM_FR_TRNG_DB_DEV";
	}else if($("#heatMapMenu").val() == "CONCURRENT USERS"){
		assessmentHeatmap('CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV','csv5');
		envelopeTitle = "CONCURRENT USERS - TD_BIM_FR_TRNG_DB_DEV";
	}else if($("#heatMapMenu").val() == "CPU UTILIZATION"){
		assessmentHeatmap('CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV','csv9');
		envelopeTitle = "CPU UTILIZATION - TD_BIM_FR_TRNG_DB_DEV";
	}
  });
  
  
  
  
 });
 
 function heatmapCSVtext(id,starts,ends,days,csvData){
	  var z=0;
for(i=starts;i<ends;i++)
{
var ampMonth = csvData[i].DATE;
var stringMonth = ampMonth.substr(0,2);
z=z+1;
for(j=0;j<days;j++)
{

 $(id).append('\n'+'2020-'+stringMonth+'-'+z+','+j+','+csvData[i][j]);
 }
 }  
$(id).html($(id).text());
 }
 function assessmentHeatmap(hdTitle,ids)
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
        text: hdTitle,
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
        min: -5
    },

    series: [{
        borderWidth: 0,
        colsize: 24 * 36e5, // one day
        tooltip: {
            headerFormat: 'Number of amps<br/>',
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
        text: hdTitle,
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
        data: [{
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
        text: hdTitle
    },
    xAxis: {
        categories: ['MACRO', 'PROCEDURE', 'TRIGGER', 'VIEW', 'HASH INDEX','No PRIMARY INDEX<br>NO PARTITIONING','PRIMARY INDEX<br>PARTITIONING<br>BOTH','JOIN INDEX']
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
        name: 'KPI Value',
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
	  var emailVal = $("#emailLogin").val();
	  var passwordval = $("#passwordLogin").val();
	  console.log(emailVal);
	  console.log(passwordval);
	  for (var i = 0; i < obj.length; i++){
  if ((obj[i].EMail == emailVal)&&(obj[i].Password == passwordval)){
	  var correctVar  = $("#submitMemLogin").parents(".pageCover").attr("data-next");
				 $(".pageCover").hide();
				 $("."+correctVar).show();
				 $(".adminMenu").show();$(".memMenu").hide();
				 return true; 
  }
  else{
	  $(".errorAdmin").show();
  }
}
	/*  
	  var adminLoginform = JSON.stringify($("#loginform").serializeArray());
	  console.log(adminLoginform);
	  $.ajax({
		  type: "POST",
		  url: "",
		  data: adminLoginform,
		  success: function(msg){
			  if(msg.status=="done"){
                 var correctVar  = $("#submitMemLogin").parents(".pageCover").attr("data-next");
				 $(".pageCover").hide();
				 $("."+correctVar).show();
				 $(".adminMenu").show();$(".memMenu").hide();
				 return true;                     
                  }else{
					  $(".errRespose").html("username or password was incorrect");
				  }
			  
		  },
		  dataType: "json",
		  contentType : "application/json"
		});
	  
  */
  
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
var lineDerived = legacycostVal;
yearL1 = lineDerived * (100-1);
yearL2 = lineDerived * (50-1);
yearL3 = lineDerived * (30-1);
yearL4 = lineDerived * (25-1);
yearL5 = lineDerived * (20-1);

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

year1 = estimatecostVal * (1*yearTarget);
year2 = estimatecostVal * (2*yearTarget);
year3 = estimatecostVal * (3*yearTarget);
year4 = estimatecostVal * (4*yearTarget);
year5 = estimatecostVal * (5*yearTarget);

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
var year1line = year1+yearL1+txtVal;
var year2line = year2+yearL2+txtVal;
var year3line = year3+yearL3+txtVal;
var year4line = year4+yearL4+txtVal;
var year5line = year5+yearL5+txtVal;

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