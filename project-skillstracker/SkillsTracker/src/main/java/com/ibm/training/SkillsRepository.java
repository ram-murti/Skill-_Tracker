package com.ibm.training;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

public interface SkillsRepository extends CrudRepository<AssociateInfo, String> 
{
	List<AssociateInfo> findByAssociateName(String associateName);
	List<AssociateInfo> findByAssociateEmail(String associateName);
}
