package com.ibm.training;

import org.springframework.data.repository.CrudRepository;

public interface AssociateSkillsInt extends CrudRepository<AssociateSkills, Integer>
{

	void deleteByAidAssociateId(Integer id);

	//Iterable<AssociateSkills> findAllById(Integer id);

}
