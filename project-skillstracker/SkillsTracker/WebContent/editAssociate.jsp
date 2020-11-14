<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.ibm.dao.Dao"%>    
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
    		width: 350px;
    		margin: auto;
    		margin-top: 20px;
    		height: 450px;
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
    		
		}
		

	</style>
</head>
<body>
<% 
	String id = request.getParameter("id");
	String []view = new Dao().viewInfo(Integer.parseInt(id));
%>
<center>
	<form action="updateAssociate">
	<div class="EmpDet">
		<label><b>Employee Id: </b></label>
			<p><input type="text" value="<%=view[0]%>" disabled="disabled"></p>
			<input type="hidden" name="empid" value="<%=view[0]%>">
		<label><b>Employee Name: </b></label>
			<p><input type="text" name="empname" value="<%=view[1]%>"></p>
			
		<label><b>Employee Mobile: </b></label>
			<p><input type="text" name="empmob" value="<%=view[2]%>"></p>
			
		<label><b>Employee Project: </b></label>
			<p><input type="text" name="empproj" value="<%=view[3]%>"></p>
		<label><b>Employee Skills: </b></label>
			<p><input type="text" name="empskills" value="<%=view[4]%>"></p>
		
		<br>
		<div>
    		<div> 
    			<input type="submit" value="Save Edits" id ="sub1">
    		</div>
		</div>
	</div>
	</form>
	</center>
</body>
</html>