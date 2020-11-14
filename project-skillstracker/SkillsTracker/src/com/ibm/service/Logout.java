package com.ibm.service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@WebServlet("/logout")
public class Logout extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Cookie myCookie = new Cookie("emailId","");
		myCookie.setMaxAge(0);
		response.addCookie(myCookie);
		response.sendRedirect("index.jsp");
	}

}
