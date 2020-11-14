package com.ibm.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.dao.Dao;

@WebServlet("/saveAssociate")
public class SaveAssociate extends HttpServlet {
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("save associate");
		String []info = new String[5];
		info[0] = request.getParameter("aid");
		info[1] = request.getParameter("aname");
		info[2] = request.getParameter("mobNum");
		info[3] = request.getParameter("proj");
		info[4] = request.getParameter("askills");
		for(String skill : info)
		{
			System.out.println(skill);
		}
//		PrintWriter pw = response.getWriter();
//		pw.println("hello");
		Dao dao = new Dao();
		dao.insertinfo(info);
		response.sendRedirect("search.jsp");

	
	}

}
