<%@ page import="javax.servlet.RequestDispatcher, javax.servlet.http.Cookie" %>

<%
response.setContentType("text/html");

Cookie[] c = request.getCookies(); int flag = 0; Cookie mycookie = null;

try
{
	for(Cookie ck: c)
	{
		if(ck.getName().equals("emailId"))
		{
			System.out.println("username found");
			flag = 1;
			mycookie = ck;
			break;
		}
	}
}catch(NullPointerException e)
{
	System.out.println("no cookies set");
}

if(flag == 1)
{
%>

<!DOCTYPE html>
<html>
<head>
	<title>
		Skills Tracker
	</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
	<style type="text/css">
		body
		{
			background-color: #009999;
		}
		hr
		{
			color: #009999
		}
		h2
		{
			color: #009999;
			margin: 10px;
		}
		h4
		{
			color: #009999;
			/*margin: 15px;*/
		}
		#viewbutton
		{
			color: #ffffff;
			background-color: #009999;
			height: 50px;
			width: 150px;
			border-radius: 10px;
			padding: 10px;
		}
		header
		{
			margin: 5px 5px 5px 5px;
  			background-color: white;
  			height: 50px;
		}	
		select
		{
			width: 150px; 
			border-color: #009999; 
			height: 30px;
			margin: 10px;
			color: #009999;
		}
		.column 
		{
  			float: left;
  			width: 30%;
 			padding: 10px 10px;
		}
		.card 
		{
  			padding: 16px;
  			text-align: center;
  			background-color: #f2f2f2;
  			border-radius: 10px;
  			color: #009999;
		}
		input
		{
			width: 450px; 
			border-color: #009999; 
			height: 30px;
			margin: 10px;
			text-align: center;
			color: #009999;
		}
		::placeholder 
		{
    		color:#009999;
    		opacity: 0.8; 
		}

		.profile-dropdown 
		{
  			position: relative;
  			display: inline-block;
  			padding-left: 70px;
		}

		.profile-dropdown a:hover 
		{
			background-color: cyan;
		}

		.img-circle 
		{
  			background-color: none;
  			color: white
  			padding: 16px;
  			font-size: 16px;
  			border: none;
  			cursor: pointer;
		}

		.img-circle:hover, .img-circle:focus 
		{
  			background-color: #009999;
		}

		.dropdown-content 
		{
  			display: none;
  			position: absolute;
  			background-color: white;
  			min-width: 160px;
  			overflow: auto;
  			box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  			z-index: 1;
		}

		.dropdown-content a 
		{
  			color: #009999;
  			padding: 12px 16px;
  			text-decoration: none;
  			display: block;
		}


		#search-dropdown
		{
  			border-color: #009999;
  			height: 30px;
		}

		.show 
		{
			display: block;
		}

		button
		{
			margin: 10px;
			background-color: #009999;
		}
		
	</style>
</head>
<body>
	<header>
		<div class="row">
			<div class="col-sm-3">
				<center>
					<h2>
						Skills Tracker
					</h2>
				</center>
			</div>
  			<div class="col-sm-6">
  				<center>
    				<select name="Search Associate" id="search-dropdown">
      					<option value="id">Search by Id</option>
      					<option value="name">Search by Name</option>
      					<option value="mobileNo">Search by MobileNo</option>
      				</select>
    
        		<input id="search" type="text" placeholder="Search by Name / Mobile Number / Email-id" >
   				</center>  
  			</div>
  			<div class="col-sm-3">
 				<div class="profile-dropdown" style="">
          			<button onclick="myFunction()" >
          				<img  src="chris.jpg" alt="chris" class="img-circle" width="50" height="30"></button>
          				<div id="dropdown-menu" class="dropdown-content">
          					<a href="#">Settings</a>
          					<a href="addAssociate.jsp">Add New Associate</a>
          					<a href="addSkills.html">Add Skills</a>
          					<a href="logout">Logout</a>
        				</div>
       			</div>

  			</div>
		</div>
	</header>
	<div id="row2">
  		
	</div>
</body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	$('input').keyup(function() {
		//console.log("search function called");
		var div = document.getElementById("row2");
		while(div.firstChild)
		{
   			 div.removeChild(div.firstChild);
		}
		//console.log("division cleared");
		$v = document.getElementById('search').value;
		
		$('#row2').load('GetContent?searchFor='+ $v,function(responseValue, statusValue, xhr)
		{
			if(! statusValue == 'success')
				console.log("SOmething wrong...");
		});
		

	});
});
</script>
<script type="text/javascript">
	function myFunction() {
  document.getElementById("dropdown-menu").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.img-circle')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

</script>
</html>
<%
}
else
{
	System.out.println("no cookies set");
	response.getWriter().println("Enter your credentials and then enter\n");
	RequestDispatcher dispatcher = request.getRequestDispatcher("index.jsp");
	dispatcher.include(request, response);
}
%>