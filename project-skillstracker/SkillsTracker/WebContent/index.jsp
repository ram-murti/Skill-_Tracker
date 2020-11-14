<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>

<html>
<head>
<title>Log in to Skill tracker</title>
<style type="text/css">

body
{
    font-family: Tahoma, Geneva, sans-serif;
    color: #fff;
    background-color: #009999;
    background-size: cover;
}
.signin
{
    background-color: #ffffff ;
    padding: 40px;
    width: 400px;
    margin: auto;
    margin-top: 90px;
    height: 400px;
    margin-left: 180x;
    
}
form
{
    width: 240px;
    text-align: center;
}
input[type = email]
{

    width: 400px;
    text-align: center;
    /*background: transparent;*/
    border: none;
    border-bottom: 1px solid #009999;
    font-family: sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
}
input[type = password]
{
    width: 400px;
    text-align: center;
    /*background: transparent;*/
    border: none;
    border-bottom: 1px solid #009999;
    font-family: 'Play', sans-serif;
    font-size: 16px;
    font-weight: 200px;
    padding: 10px 0;
    transition: border 0.5s;
    outline: none;
}
input[type=submit]
{
    border: none;
    width: 400px;
    background: #58D27F;
    color: #000;
    font-size: 16px;
    line-height: 25px;
    padding: 10px 0;
    border-radius: 15px;
    cursor: pointer;
}

h2
{
    color: #009999;
    padding-left: 150px;
    
}
a
{
    color: #009999;
    text-decoration: blink;

}

::placeholder {
    color:#009999;
    opacity: 0.8; 
}

</style>
</head>

<body>
   <div class="signin">
		<form action="authenticate">
			<h2>Log In</h2>
			<input type="email" name="email"  id = "email" placeholder="Email" pattern=".+@gmail.com" size = "30" required ><br /><br />
			<input type="password" name="pass" id = "Password" placeholder="Password" minlength="8" required ><br /><br />
			<a href="cong.html"><input type="submit" value="Log In" id ="sub"></a><br/>
		</form>
	</div>

</body>
</html>
