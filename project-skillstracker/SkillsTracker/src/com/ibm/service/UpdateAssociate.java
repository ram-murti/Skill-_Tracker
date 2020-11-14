package com.ibm.service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.dao.Dao;

@WebServlet("/updateAssociate")
public class UpdateAssociate extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		String []info = new String[5];
		info[0] = request.getParameter("empid");
		info[1] = request.getParameter("empname");
		info[2] = request.getParameter("empmob");
		info[3] = request.getParameter("empproj");
		info[4] = request.getParameter("empskills");
		Dao dao = new Dao();
		dao.updateInfo(info);
		System.out.println("Info updated");

		response.sendRedirect("search.jsp");
		
	}


}
