package com.ibm.training;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class AssociateSkills 
{
	@Id
	Integer srNo;
	
	public AssociateSkills() 
	{
		
	}

	@ManyToOne
	AssociateInfo aid;
	
	@ManyToOne
	SkillsInfo sid;
	
	String certification, rating, startDate, endDate, duration , experience;

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
		this.rating = rating;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Integer getSrNo() {
		return srNo;
	}

	public void setSrNo(Integer srNo) {
		this.srNo = srNo;
	}

	public AssociateInfo getAid() {
		return aid;
	}

	public void setAid(AssociateInfo aid) {
		this.aid = aid;
	}

	public SkillsInfo getSid() {
		return sid;
	}

	public void setSid(SkillsInfo sid) {
		this.sid = sid;
	}

	public String getCertification() {
		return certification;
	}

	public void setCertification(String certification) {
		this.certification = certification;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public AssociateSkills(Integer srNo, AssociateInfo aid, SkillsInfo sid, String certification, String startDate,
			String endDate) {
		super();
		this.srNo = srNo;
		this.aid = aid;
		this.sid = sid;
		this.certification = certification;
		this.startDate = startDate;
		this.endDate = endDate;
	}
	
}
