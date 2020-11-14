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
<html>
<head>
	<title>View Associate</title>
	<style type="text/css">
		body
		{
			background-color: #009999;
			font-family: Tahoma, Geneva, sans-serif;

		}
		.EmpDet
		{
    		background-color: #ffffff;
    		padding: 40px;
    		width: 400px;
    		margin: auto;
    		margin-top: 20px;
    		height: 500px;
    		margin-left: 180x;
    	}
    	label
    	{
    		color: #009999;
    	}
    	#sub1
		{
    		border: none;
    		width: 190px;
    		background: #58D27F;
    		color:  black;
    		font-size: 16px;
    		line-height: 25px;
    		padding: 10px 0;
    		border-radius: 15px;
    		cursor: pointer;
    		float: left;
		}
		#sub2
		{
    		background: #58D27F;
    		border: none;
    		width: 190px;
    		color: black;
    		font-size: 16px;
    		line-height: 25px;
    		padding: 10px 0;
    		border-radius: 15px;
    		cursor: pointer;
    		float: right;
		}

	</style>
</head>
<body>
<% 
	String id = request.getParameter("id");
	String []view = new Dao().viewInfo(Integer.parseInt(id));
%>
	<div class="EmpDet">
		<label><b>Employee Id: </b></label>
			<p><%=view[0] %></p>
		<hr>	
		<label><b>Employee Name:</b> </label><br>
			<p><%=view[1] %></p>
		<hr>
		<label><b>Employee Phone: </b></label><br>
			<p><%=view[2] %></p>
		<hr>
		<label><b>Employee Project: </b></label><br>
			<p><%=view[3] %></p>
		<hr>
		<label><b>Employee Skills: </b></label><br>
			<p><%=view[4] %></p>
		<hr>
		<br>
		<div style="width:400px;">
    		<div> 
    			<a href="editAssociate.jsp?id=<%=id%>"><button id="sub1">Edit Associate</button></a>
    		</div>
    		<div> 
    			 <a href="deleteAssociate.jsp?id=<%=id%>"><button id="sub2">Delete Associate</button></a>
    		</div>
		</div>
	</div>
</body>
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