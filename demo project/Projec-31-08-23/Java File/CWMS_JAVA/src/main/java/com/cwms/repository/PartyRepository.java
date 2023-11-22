package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cwms.entities.Party;
import com.cwms.entities.PartyId;

@Repository
public interface PartyRepository extends JpaRepository<Party, PartyId> {

//	Party deletePartyByID(String partyID);
//
//	Optional<Party> findById(String partyId);
//	
//	@Query("SELECT  MAX(partyId) FROM Party")
//	String maxPartyId();

//	Optional<Party> findAll(String partyId);

	Party findByPartyId(String partyId);

	// void deleteById( String partyId);

	void deleteByPartyId(String partyId);
	
	List<Party> findByPartyIdNotIn(List<String> excludedPartyIds);
}
