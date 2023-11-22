package com.cwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cwms.entities.PartyRepresentative;
import com.cwms.entities.PartyRepresentativeId;





@Repository
@EnableJpaRepositories
public interface PartyRepresentativeRepo extends JpaRepository<PartyRepresentative, PartyRepresentativeId> {

	PartyRepresentative findRepresentivBypartyRepresentativeId(String partyRepresentativeId);

    @Modifying
    @Query("DELETE FROM PartyRepresentative pr WHERE pr.partyRepresentativeId = :partyRepresentativeId")
    void deleteRepresentiveById(@Param("partyRepresentativeId") String partyRepresentativeId);

}
