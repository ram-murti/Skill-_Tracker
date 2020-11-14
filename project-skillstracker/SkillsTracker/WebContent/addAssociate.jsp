<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="com.ibm.dao.Dao"%> 
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
<html lang="en">
<head>
  <title>Add Associate</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<link href="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/css/bootstrap.min.css"
    rel="stylesheet" type="text/css" />
<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.3/js/bootstrap.min.js"></script>
<link href="http://cdn.rawgit.com/davidstutz/bootstrap-multiselect/master/dist/css/bootstrap-multiselect.css"
    rel="stylesheet" type="text/css" />
<script src="http://cdn.rawgit.com/davidstutz/bootstrap-multiselect/master/dist/js/bootstrap-multiselect.js"
    type="text/javascript"></script>
  <!-- Multi-Select -->

  <style type="text/css">
#container
{
  background-color: #ffffff;
  margin: auto;
  margin-top: 20px;
  padding-left: 50px;
  height: 100%;
  width: 40%;
  text-align: left;
}
h2
{
  color: #009999;
  font-family: Arial;
}
.form-horizontal .control-label{
    text-align: left;
    font-size: 18px;
}
body
{
  background-color: #009999;
}
p
{
  color: red;
  font-size: 12px;
}
label
{
  color: #009999;
  font-family: Arial; 
}
  </style>
</head>
<body>
<div class="float-md-left" id="container">
 
  <br>
  <p id="head"></p>
  <form id = "regexpForm" class="form-horizontal" action="saveAssociate" onsubmit="return formValidation()">
    <div class="form-group" required>
      <label class="control-label col-sm-2" for="aid">ID:</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="aid" placeholder="Enter ID" name="aid" required="">
        <p id="p1"></p>
        <input type="hidden" name="askills" id="skillsid">
      </div>
    </div>
    <br>
    <div class="form-group" required>
      <label class="control-label col-sm-2" for="aname">Name:</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="aname" placeholder="Enter Name" name="aname" required="">
        <p id="p1"></p>
        <input type="hidden" name="askills" id="skillsid">
      </div>
    </div>
    <br>
    <div class="form-group">
      <label class="control-label col-sm-2" for="email">Email:</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="email" placeholder="Enter email" name="email" required="">
        <p id="p2"></p>
      </div>
    </div>
    <br>
    <div class="form-group">
      <label class="control-label col-sm-2" for="mobNum">Mobile No:</label>
      <div class="col-sm-6">
        <input type="text" class="form-control" id="mobNum" placeholder="Enter Mobile Number" name="mobNum" required="" >
        <p id="p3"></p>
      </div>
    </div>
    <br>
    <div class="form-group">
      <label class="control-label col-sm-2" for="proj">Project Name:</label>
      <div class="col-sm-6">          
        <input type="text" class="form-control" id="proj" placeholder="Enter Project Name" name="proj" required="">
        <p id="p4"></p>
      </div>
    </div>
    <br>
    
    <br>
    <br>
    <div class="form-group">
      <label class="control-label col-sm-2" for="addSkill">Add Skills:</label>
      <div class="col-md-6">          
        <select id="selectSkill" multiple>
          <option>Choose Skills</option>
        </select>
        <script>
          var select = document.getElementById("selectSkill");
         <%	
         	String []options = new Dao().getSkillNames();
         	
         %> 
         var skills = [];
         <% for(int i = 0; i < options.length; i++) 
         {%>
         		console.log("adding skills");
              var opt = "<%=options[i]%>";
              var el = document.createElement("option");
              el.textContent = opt;
              el.value = opt;
              select.appendChild(el);
         <% }%>
          
          
          $(function () {
        $('#selectSkill').multiselect({
            includeSelectAllOption: true
        });
    });
        </script>

      </div>
    </div>
    <br>
    <br>
    <div class="form-group">        
      <div class="col-lg-offset-2 col-lg-10">
        <button type="submit" id="btnvalidate" class="btn btn-success btn-lg" >Save</button>
        <script type="text/javascript">
          $('#btnvalidate').click(function () {
            console.log("skills selected");
        var selected = $("#selectSkill option:selected");
        var message = "";
        selected.each(function () {
            // message +=  $(this).val() + "\n";
            skills.push($(this).val());
        });
        document.getElementById('skillsid').value = skills.toString();
        console.log(skills.toString());
    });
        </script>
      </div>
    </div>
  </form>
</div>
</body>  
<script type="text/javascript">
function formValidation() {
    console.log('callled');
// Make quick references to our fields.
var fullname = document.getElementById('aname').value;
var email = document.getElementById('email').value;
var mob = document.getElementById('mobNum').value;
var proj = document.getElementById('proj').value;
console.log(fullname);
var flag=0;
if (inputAlphabet(fullname, "* Please use alphabets only *")) 
{
    console.log("alphabets");
   if (emailValidation(email, "* Please enter a valid email address *")) 
    {
        console.log("email");
       if (mobValidation(mob,"*10 digits only*"))
        {
            console.log("number");
            /* if (textAlphanumeric(proj, "* For project please use numbers or letters *")) 
            { */
                console.log("projects");
                flag=1;
            /* } */
        }
    }
}
// else
// {
//     console.log("else alphabets");
// }
if (flag==1) {
    return true;
}
else
{
    return false;
}
}
// Function that checks whether input text is an alphabetic character or not.
function inputAlphabet(inputtext, alertMsg) {
var alphaExp = /^[a-zA-Z]+$/;
if (inputtext.match(alphaExp)) {
    console.log("true");
return true;
} else {
document.getElementById('p1').innerText = alertMsg; // This segment displays the validation rule for name.
//alert(alertMsg);
document.getElementById('aname').focus();
console.log("false");
return false;
}
}
// Function that checks whether input text includes alphabetic and numeric characters.
function textAlphanumeric(inputtext, alertMsg) {
var alphaExp = /^[0-9a-zA-Z]+$/;
if (inputtext.match(alphaExp)) {
return true;
} else {
document.getElementById('p4').innerText = alertMsg; // This segment displays the validation rule for project.
document.getElementById('proj').focus();
return false;
}
}
// Function that checks whether an user entered valid email address or not and displays alert message on wrong email address format.
function emailValidation(inputtext, alertMsg) {
var emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if (inputtext.match(emailExp)) {
return true;
} else {
document.getElementById('p2').innerText = alertMsg; // This segment displays the validation rule for email.
document.getElementById('email').focus();
return false;
}
}
// Function that checks whether the mobile entered is correct or not.
function mobValidation(inputtext, alertMsg) {
var emailExp = /^(\d{10})$/;
if (inputtext.match(emailExp)) {
return true;
} else {
document.getElementById('p3').innerText = alertMsg; // This segment displays the validation rule for email.
document.getElementById('mobNum').focus();
return false;
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