package com.ibm.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.dao.Dao;


@WebServlet("/saveSkills")
public class SaveSkills extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		PrintWriter out = response.getWriter();
        response.setContentType("text/plain");
 
        Enumeration<String> parameterNames = request.getParameterNames();
 
        while (parameterNames.hasMoreElements()) {
 
            String paramName = parameterNames.nextElement();
 
            String[] paramValues = request.getParameterValues(paramName);
            
            Dao dao = new Dao();
            dao.addSkills(paramValues);
            RequestDispatcher rd = request.getRequestDispatcher("search.jsp");
            rd.forward(request, response);
        }
 
	}

	
}
