$(document).ready(function() {

        //get all the nav li, add click event
        $(".nav").find("li").on("click", function() {
                $("#pageContent").hide().html("");
                //remove all active class
                $(".nav").find("li").removeClass("active");
                //add active class to clicked li
                $(this).addClass("active");

                //get the correct page according to click
                var page = $(this).attr("id");
                getPartial(page);

            }); //click

        //get the parital via JSON, add to page, activiate associating js
        function getPartial(partial) {

            if (partial === "homePage") { //ajax get home.html
                $.get("partials/home.html", function(data) {
                    $("#pageContent").html(data);
                    $('.carousel').carousel();
                });
            } else if (partial === "rentPage") { //ajax models.html
                //paste the getJSON here; change the append id; change the file name
                $.getJSON("jsonDatabase/final.json", function(data) {

                        var html = "";

                        $.each(data, function(index, item) {
                                html += '<div class="col-xs-12 col-md-4 jsonCat">' +
                                    '<div class="gameName">' + item.name + '</div>' +
                                    '<div class="gameGenre"><small>Genre </small>' + item.genre + '</div>' +
                                    '<div class="gameType"><small>Type </small>' + item.type + '</div>' +
                                    '<img class="gameImage" src="' + item.image + '"/>' +
                                    //deleted commentsContainer
                                    '<div class="panel panel-default">' + //added
                                    '<div class="panel-heading">Renter Comments</div>'; //added
                                $.each(item.comments, function(ind, i) {
                                        html += '<div class="panel-body">' + //added
                                            '<div class="renterName"><small>' + i.username + '</small></div>' +
                                            '<div class="renterComment">' + i.comment + '</div>' +
                                            '<div class="renterStars">';

                                        for (var j = 1; j <= 5; j++) {

                                            if (j <= i.stars) {
                                                html += '<img src="images/fullStar.png"/>';
                                            } else {
                                                html += '<img src="images/emptyStar.png"/>';
                                            }
                                        }
                                        html += '</div>' + //end stars
                                            '</div>'; //panel body
                                    }); //each comment

                                html += '</div>' + //panel
                                    '</div>'; //col-md-4
                            }); //each cat

                        $("#pageContent").html(html);

                    }); //getJSON
            } else if (partial === "orderPage") { //ajax get order.html
                $.get("partials/order2.html", function(data) {

                        $("#pageContent").html(data);

                       // $('#startRentDate, #endRentDate').datepicker({});
	// jQurey events in here
					// First jQurey Event
						$("#startRentDate").on("focus", function(){
						$("#log").append("<br>Search background-color");
						$(this).css("background-color", "blue");
						})

						.on("blur", function(){
						$("#log").append("<br>when box not selected, turn white");
						$(this).css("background-color", "#FFF");
						});

						$("#submitButton").mouseenter(function(){
						$(this).text("ORDER NOW!!");
						$("#log").append("<br> Button mouseenter");
							})
						.on("mouseleave",function(){
						$("#log").append("<br>Button mouseleave");
						$(this).text("Click Me!");
						});



                        $("#submitButton").on("click", function() {

                                //get all empty inputs and select
                                //add error class to div container
                                $("input, select").filter(function() {
                                    return !this.value;
                                }).closest("div").addClass("has-error");

                                //remove error class for non empty ones
                                $("input, select").filter(function() {
                                    return this.value; //removed !
                                }).closest("div").removeClass("has-error");

                                var errors = $(".has-error");

                                if (errors.length < 1) {
                                    //alert("no errors");
                                    sendConfirmation();
                                }
						//var mySearch = $("#search").val();
						var mystartdate = $("#startRentDate").val();
						var mybutton = $("#submitButton").val();
						var myGenre = $("[name='genre']:checked").val();
						var myName = $("#name").val();
						var myCardNumber = $("#cardNumber").val();
						var mysecurity = $("#securityCode").val();
						var myTimeUpMonth = $("#expirymonth").val();
						var myTimeUpYear =$("#expiryYear").val();
						var myAdress =$("#address1").val();
						var myZip =$("#zip").val();
						var myState =$("#state").val();
						var myCountry =$("#country").val();
						var mySuccess =$("#successMsg").val();

							var myCheckValues = [];
							//each is a jquery loop for objects/arrays
							// each thing is selcted, do function
							// "this" is the element we are currently looking at.
    						$("[name='vehicle']:checked").each(function() {
       						 myCheckValues.push($(this).val());
    						});

					$("#log").append("<br>User Clicked the Button");


					$("#log").append("<br>Day of rent: "+mystartdate);
					//$("#log").append("<br>Value of select is: "+mySelect);
					$("#log").append("<br>User card name: "+myName);
					$("#log").append("<br>User card number: "+myCardNumber);
					$("#log").append("<br>User card security number: "+mysecurity);
					$("#log").append("<br>User expiry month: "+myTimeUpMonth);
					$("#log").append("<br>User expiry year: "+myTimeUpYear);
					$("#log").appened("<br>User adress: "+myAdress);
					$("#log").appened("<br>User Zip is: "+myZip);
					$("#log").appened("<br>User state is: "+myState);
					$("#log").appened("<br>User Counrty is: "+myCountry);
					$("#log").append("<br>Information is being processed: "+mybutton);
					$("#log").append("<br> Successful message recieved: "+mySuccess);
					$("#log").append("<br>Value of check values is: "+myGenre.join());


					}
                            ); //click
                    }); //get
            }
            $("#pageContent").fadeIn();

        }

        function sendConfirmation() {
            //make an object to record data for database;
            var order = {};
            //get all teh jquery objects
            var formData = $("input, select");
            //for each jquery object
            formData.each(function() {
                var id = $(this).attr("id");//get the id of the element
                order[id] = $(this).val();//set the field and the value
            });

            alert("Sending to database " + JSON.stringify(order));
            $("#successMsg").html("Order Received!<br/><br/>" +
              order.catSelect + " Your game will be delivered on " +
              order.startRentDate +
              "<img id='checkmark' src='images/checkmark.png'>");

        } //sendConfirmation

        //begin the program, get the homepage
        getPartial("homePage");

    }); //ready
