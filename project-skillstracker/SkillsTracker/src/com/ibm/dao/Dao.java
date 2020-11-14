package com.ibm.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Dao 
{
	Connection dbCon;
	PreparedStatement statement;
	String []names; 
	String []skills; 
	String []project;
	int []mobno;
	int []id;
	public Dao()
	{
		try 
		{
			Class.forName("com.mysql.jdbc.Driver");
			dbCon = DriverManager.getConnection("jdbc:mysql://localhost:3306/skills", "root", "");
			System.out.println("Database Connected");
		}
		catch (ClassNotFoundException | SQLException e) 
		{
			System.out.println("Issues connecting to databse : "+e);
		} 
	}
	
	public String[] viewInfo(int id)
	{
		String []view = new String[5]; 
		try 
		{
			statement = dbCon.prepareStatement("SELECT * FROM skillsinfo where empid ="+id);
			ResultSet rs = statement.executeQuery();
			
			while(rs.next())
			{
				
				view[0] = String.valueOf(rs.getInt(1));
				view[1] = rs.getString(2);
				view[2] = String.valueOf(rs.getInt(3));
				view[3] = rs.getString(4);
				view[4] = rs.getString(5);
				
			}
		}
		catch (SQLException e) 
		{
			System.out.println("while checking id: "+e);
		}
		return view;
	}
	
	public String[] getSkillNames()
	{
		System.out.println("getting skills dao contents");
		String []skills = null;
		System.out.println("getting skills");
		int i = 0;
		try 
		{
			statement = dbCon.prepareStatement("SELECT * FROM skillsnames");
			ResultSet rs1 = statement.executeQuery();
			while(rs1.next())
			{
				i++;
			}
			skills = new String[i];
			
			i=0;
			statement = dbCon.prepareStatement("SELECT * FROM skillsnames");
			ResultSet rs = statement.executeQuery();
			while(rs.next())
			{
				skills[i] = rs.getString(2);
				i++;
			}
		}
		catch (SQLException e) 
		{
			System.out.println("while checking id: "+e);
		}
		return skills;
	}
	public void insertinfo(String []info)
	{
		try
		{
			statement = dbCon.prepareStatement("INSERT INTO skillsinfo (empid, ename, emob, eprojname, eskills) VALUES (?, ?, ?, ?, ?)");
			statement.setInt(1, Integer.parseInt(info[0]));
			statement.setString(2, info[1]);
			statement.setInt(3, Integer.parseInt(info[2]));
			statement.setString(4, info[3]);
			statement.setString(5, info[4]);
			if(statement.executeUpdate() > 0)
			{
				System.out.println("updated");
			}
		}catch(Exception e)
		{
			System.out.println(e);
		}
	}
	public void getInfo(String search)
	{
		System.out.println("getting info");
		int i = 0;
		try 
		{
			statement = dbCon.prepareStatement("SELECT * FROM skillsinfo where ename like '"+search+"%'");
			ResultSet rs1 = statement.executeQuery();
			while(rs1.next())
			{
				i++;
			}
			id = new int[i];
			names = new String[i];
			mobno = new int[i];
			project = new String[i];
			skills = new String[i];
			
			i=0;
			statement = dbCon.prepareStatement("SELECT * FROM skillsinfo where ename like '"+search+"%'");
			ResultSet rs = statement.executeQuery();
			while(rs.next())
			{
				id[i] = rs.getInt(1);
				names[i] = rs.getString(2);
				mobno[i] = rs.getInt(3);
				project[i] = rs.getString(4);
				skills[i] = rs.getString(5);
				i++;
			}
		}
		catch (SQLException e) 
		{
			System.out.println("while checking id: "+e);
		}

	}
	
	public int[] getIds()
	{
		return id;
	}
	public int[] getmobno()
	{
		return mobno;
	}
	public String[] getNames()
	{
		return names;
	}
	public String[] getproject()
	{
		return project;
	}
	public String[] getskills()
	{
		return skills;
	}
	
	public void updateInfo(String []info)
	{
		try
		{
			for(String in : info)
			{
				System.out.println(in);
			}
			statement = dbCon.prepareStatement("update skillsinfo set empid=?,ename=?,emob=?,eprojname=?,eskills=? WHERE empid =?");
			statement.setInt(1, Integer.parseInt(info[0]));
			statement.setString(2, info[1]);
			statement.setInt(3, Integer.parseInt(info[2]));
			statement.setString(4, info[3]);
			statement.setString(5, info[4]);
			statement.setInt(6, Integer.parseInt(info[0]));
			
			if(statement.executeUpdate() > 0)
			{
				System.out.println("updated");
			}
			else
			{
				System.out.println("not updated");
			}
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
	}

	public void addSkills(String[] paramValues) 
	{
		System.out.println("adding skills");
		try
		{
			statement = dbCon.prepareStatement("INSERT INTO skillsnames(skillName) VALUES (?)");
			for(int i = 0;i < paramValues.length; i++)
			{
				statement.setString(1, paramValues[i]);
				statement.executeUpdate();
			}
		}
		catch(Exception e)
		{
			System.out.println(e);
		}
		
	}
}
