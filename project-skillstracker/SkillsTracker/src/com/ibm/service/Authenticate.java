package com.ibm.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/authenticate")
public class Authenticate extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		response.setContentType("text/html");
		String email = request.getParameter("email");
		String pass = request.getParameter("pass");
		System.out.println(email+" "+pass);
		if(email.equalsIgnoreCase("shivanidegloorkar@gmail.com") && pass.equalsIgnoreCase("shivanid"))
		{	
			Cookie thecookie = new Cookie("emailId", email);
			thecookie.setMaxAge(3600);
			response.addCookie(thecookie);
			response.sendRedirect("search.jsp");
		
		}
		else
		{
			RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
			PrintWriter pw = response.getWriter();
			pw.println("Enter Correct credentials");
			rd.include(request, response);
		}
	}

}
