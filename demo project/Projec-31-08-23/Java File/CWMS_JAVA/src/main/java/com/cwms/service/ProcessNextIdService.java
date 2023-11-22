package com.cwms.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwms.entities.ProcessNextId;
import com.cwms.repository.ProcessNextIdRepository;

import jakarta.transaction.Transactional;

@Service

public class ProcessNextIdService {
	
	@Autowired(required = true)
	public ProcessNextIdRepository processNextIdRepository;

	public List<ProcessNextId> getAllByProcessId(String processId) {
		return processNextIdRepository.findByProcessId(processId);
	}

	public List<ProcessNextId> getAllByProcessId() {
		return processNextIdRepository.findAll();
	}

	public ProcessNextId saveProcessNextId(ProcessNextId processNextId) {
		return processNextIdRepository.save(processNextId);
	}

//	public String autoIncrementProcessId() {
//
//		String maxProcessID = processNextIdRepository.findLastProcessId();
//
//		int lastNumericId = Integer.parseInt(maxProcessID.substring(1));
//
//		int nextNumericId = lastNumericId + 1;
//
//		String nextProcessId = String.format("P%05d", nextNumericId);
//
//		return nextProcessId;
//
//		// String processID="POOOO1";
//
//	}
//
//	public String autoIncrementNextId() {
//		String maxNextId = processNextIdRepository.findLastNextId();
//
//		int lastNextNumericId = Integer.parseInt(maxNextId.substring(4));
//
//		int nextNumericNextID = lastNextNumericId + 1;
//
//		String nextNextId = String.format("BKTQ%06d", nextNumericNextID);
//		return nextNextId;
//
//	}
	@Transactional
	public String autoIncrementNextIdNext() {
//		String NextId = processNextIdRepository.findNextId();
//
//		int lastNextNumericId = Integer.parseInt(NextId.substring(4));
//
//		int nextNumericNextID = lastNextNumericId + 1;
//
//		String NextIdD = String.format("H%05d", nextNumericNextID);
//		processNextIdRepository.updateNextId(NextIdD);
//		return NextIdD;
		
		
		String nextId = processNextIdRepository.findNextId();

        int lastNextNumericId = Integer.parseInt(nextId.substring(1));

        int nextNumericNextID = lastNextNumericId + 1;

        String nextIdD = String.format("M%05d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextId(nextIdD);

        return nextIdD;

	}
	
	@Transactional
	public String autoIncrementNextIdHoliday() {
//		String NextId = processNextIdRepository.findNextId();
//
//		int lastNextNumericId = Integer.parseInt(NextId.substring(4));
//
//		int nextNumericNextID = lastNextNumericId + 1;
//
//		String NextIdD = String.format("H%05d", nextNumericNextID);
//		processNextIdRepository.updateNextId(NextIdD);
//		return NextIdD;
		
		
		String nextholi = processNextIdRepository.findNextIdforHoliday();

        int lastNextNumericIdh = Integer.parseInt(nextholi.substring(1));

        int nextNumericNextIDh = lastNextNumericIdh + 1;

        String nextIdDholi = String.format("H%05d", nextNumericNextIDh);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextIdforHoliday(nextIdDholi);

        return nextIdDholi;

	}

	@Transactional
	 public synchronized String autoIncrementMailId() {
	  
	  String nextMailId = processNextIdRepository.findNextMailId();

	        int lastNextNumericId = Integer.parseInt(nextMailId.substring(4));

	        int nextNumericNextID = lastNextNumericId + 1;

	        String MailId = String.format("MAIL%06d", nextNumericNextID);
	        // Update the Next_Id directly in the database using the repository
	        processNextIdRepository.updateNextMailId(MailId);

	        return MailId;

	 }

	@Transactional
	public String autoIncrementNextJarIdNext() {

		
		String nextJarId = processNextIdRepository.findNextJarId();

        int lastNextNumericId = Integer.parseInt(nextJarId.substring(1));

        int nextNumericNextID = lastNextNumericId + 1;

        String nextJD = String.format("J%05d", nextNumericNextID);

        processNextIdRepository.updateNextJarId(nextJD);

        return nextJD;

	}

	@Transactional
	public String autoIncrementNextJarIdDetailNext() {

		
		String nextJarId = processNextIdRepository.findNextJarDId();

        int lastNextNumericId = Integer.parseInt(nextJarId.substring(2));

        int nextNumericNextID = lastNextNumericId + 1;

        String nextJD = String.format("JD%04d", nextNumericNextID);

        processNextIdRepository.updateNextJarDId(nextJD);

        return nextJD;

	}
	
	@Transactional
	public synchronized String autoIncrementReprsentiveiD() {
		
		String nextReId = processNextIdRepository.findNextReId();

        int lastNextNumericId = Integer.parseInt(nextReId.substring(1));

        int nextNumericNextID = lastNextNumericId + 1;

        String ReId = String.format("R%05d", nextNumericNextID);
        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextReId(ReId);

        return ReId;

	}
	
	
	
	@Transactional
	public String autoIncrementServiceNextId() {
		
		String serviceId = processNextIdRepository.findNextServiceId();

        int lastNextNumericId = Integer.parseInt(serviceId.substring(1));

        int nextNumericNextID = lastNextNumericId + 1;

        String serviceNextIdD = String.format("S%05d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextServiceId(serviceNextIdD);

        return serviceNextIdD;

	}
	
	@Transactional
	public String autoIncrementCFSTarrifNextId() {
		
		String CFSTarrifNo = processNextIdRepository.findNextCFSTarrifNo();

        int lastNextNumericId = Integer.parseInt(CFSTarrifNo.substring(4));

        int nextNumericNextID = lastNextNumericId + 1;

        String CFSTTArrifNextIdD = String.format("CFST%06d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextCFSTarrifNo(CFSTTArrifNextIdD);

        return CFSTTArrifNextIdD;

	}
	
	@Transactional
	public String autoIncrementSIRId() {
		
		String SIRNo = processNextIdRepository.findNextSIRNo();

        int lastNextNumericId = Integer.parseInt(SIRNo.substring(2));

        int nextNumericNextID = lastNextNumericId + 1;

        String NextSIRNo = String.format("IM%06d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextSIRNo(NextSIRNo);

        return NextSIRNo;

	}
	
	
	@Transactional
	public String autoIncrementIMPTransId() {
		
		String IMPTransId = processNextIdRepository.findNextimpTransId();

        int lastNextNumericId = Integer.parseInt(IMPTransId.substring(4));

        int nextNumericNextID = lastNextNumericId + 1;

        String NextimpTransId = String.format("IMPT%04d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextimpTransId(NextimpTransId);

        return NextimpTransId;

	}
	
	
	@Transactional
	public String autoIncrementSubImpId( ) {
		
		String IMPTransId = processNextIdRepository.findNextsubimpid();

        int lastNextNumericId = Integer.parseInt(IMPTransId.substring(4));

        int nextNumericNextID = lastNextNumericId + 1;

        String NextimpTransId = String.format("D-IM%06d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNexsubimpid(NextimpTransId);

        return NextimpTransId;

	}
	
	@Transactional
	public String autoIncrementSIRExportId() {
		
		String SIRNo = processNextIdRepository.findNextSIRExportNo();

        int lastNextNumericId = Integer.parseInt(SIRNo.substring(2));

        int nextNumericNextID = lastNextNumericId + 1;

        String NextSIRNo = String.format("EX%06d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNextSIRNo(NextSIRNo);

        return NextSIRNo;

	}
	
	
	@Transactional
	public String autoIncrementSubImpTransId( ) {
		
		String IMPTransId = processNextIdRepository.findNextsubimptransid();

        int lastNextNumericId = Integer.parseInt(IMPTransId.substring(3));

        int nextNumericNextID = lastNextNumericId + 1;

        String NextimpTransId = String.format("SIM%05d", nextNumericNextID);

        // Update the Next_Id directly in the database using the repository
        processNextIdRepository.updateNexsubimptransid(NextimpTransId);

        return NextimpTransId;

	}
	
}
