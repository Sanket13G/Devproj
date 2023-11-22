package com.cwms.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cwms.entities.HolidayMaster;

public interface HolidayRepository extends JpaRepository<HolidayMaster, String>{

	HolidayMaster getById(String holidayId);

//	 HolidayMaster findHolidayById(String holidayId);
	 void deleteByHolidayId(String holidayId);
	 
	 
	 
	 public HolidayMaster findByHolidayId(String holidayId);
}
