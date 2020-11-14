package com.ibm.training;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SkillsService 
{
	@Autowired
	SkillsDao sd;

	public Optional<AssociateInfo> getAssociate(String id)
	{
		return sd.getAssociateInfo(id);
	}

	public Iterable<AssociateInfo> getAllAssociates() {
		System.out.println("service for all");
		return sd.getAllAssociates();
	}

	public List<AssociateSkills> getAllAssociatesSkills(String id) {
		return sd.getAllAssociatesSkills(id);
	}

	public void updateAssociate(AssociateInfo associate) {
		sd.updateAssociate(associate);
		
	}

	public Iterable<SkillsInfo> getAllSkills()
	{
		return sd.getAllSkills();
	}
	
	public Iterable<AssociateSkills> getAssociatesSkills() {
		return sd.getAssociatesSkills();
	}

	public void updateAssociateSkills(AssociateSkills skills) {
		sd.updateAssociateSkills(skills);
		
	}

	public void deleteAssociate(String id) {
		sd.deleteAssociate(id);
		
	}

	public void deleteAssociateSkill(Integer id) {
		sd.deleteAssociateSkill(id);
		
	}

	

	public Iterable<AssociateSkills> deleteAssociatesSkillsByAid(String id) {
		return sd.deleteAssociatesSkillsByAid(id);
	}

	public void saveAssociate(AssociateInfo associate) {
		sd.saveAssociate(associate);
	}

	public void saveSkills(List<SkillsInfo> skillInfo) {
		sd.saveSkills(skillInfo);
		
	}

	
	
}
