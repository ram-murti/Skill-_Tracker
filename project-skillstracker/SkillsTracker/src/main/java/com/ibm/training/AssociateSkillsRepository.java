package com.ibm.training;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;


public interface AssociateSkillsRepository extends CrudRepository<AssociateSkills, String>
{
	List<AssociateSkills> findByAidAssociateId(String associateId);
	Iterable<AssociateSkills> deleteByAidAssociateId(String id);
}
