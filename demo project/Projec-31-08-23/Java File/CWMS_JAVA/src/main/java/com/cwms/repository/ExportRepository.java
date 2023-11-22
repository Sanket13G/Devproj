package com.cwms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cwms.entities.Export;

public interface ExportRepository extends JpaRepository<Export, String> {

	@Query(value = "SELECT * FROM Export WHERE status != 'd'", nativeQuery = true)
	List<Export> findAllNotDeleted();
}