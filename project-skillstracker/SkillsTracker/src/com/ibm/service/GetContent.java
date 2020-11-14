package com.ibm.service;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ibm.dao.Dao;


@WebServlet("/GetContent")
public class GetContent extends HttpServlet 
{
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		//System.out.println("In getContent");
		String search = request.getParameter("searchFor");
		if(search.length() > 0)
		{
			Dao dao = new Dao();
			dao.getInfo(search);
			String []names = dao.getNames(); 
			String []skills = dao.getskills(); 
			String []project = dao.getproject();
			int []mobno = dao.getmobno();
			int []id = dao.getIds();
			PrintWriter pw = response.getWriter();
			for(int i = 0; i < names.length; i++)
			{
				pw.println("<div class=\"column\">\r\n" + 
						"    <div class=\"card\">\r\n" + 
						"      <h2>"+names[i]+"</h2>\r\n" + 
						"      <h3>"+id[i]+"</h3>\r\n" + 
						"      <h3>"+mobno[i]+"</h3>\r\n" + 
						"      <p>"+project[i]+"</p>\r\n" + 
						"      <p>"+skills[i]+"</p>\r\n"
								+ "<hr>"
						+ "<p><a href=\"view.jsp?id="+id[i]+"\"><button id=\"viewbutton\">View Associate</button></a></p>" + 
						"    </div>\r\n" + 
						"  </div>");
			}
		}
	}

	

}
