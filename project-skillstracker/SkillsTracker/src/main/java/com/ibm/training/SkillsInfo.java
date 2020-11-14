package com.ibm.training;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class SkillsInfo 
{
	String skillName, skillCategory;
	
	@Id
	String skillId;
	
	public String getSkillName() {
		return skillName;
	}
	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}
	public String getSkillCategory() {
		return skillCategory;
	}
	public void setSkillCategory(String skillCategory) {
		this.skillCategory = skillCategory;
	}
	public String getSkillId() {
		return skillId;
	}
	public void setSkillId(String skillId) {
		this.skillId = skillId;
	}
	public SkillsInfo() {
		// TODO Auto-generated constructor stub
	}
	public SkillsInfo(String skillName, String skillCategory, String skillId) {
		super();
		this.skillName = skillName;
		this.skillCategory = skillCategory;
		this.skillId = skillId;
	}
	
	
}
