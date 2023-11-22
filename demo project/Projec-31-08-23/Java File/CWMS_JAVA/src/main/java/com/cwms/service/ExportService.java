package com.cwms.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cwms.entities.Export;
import com.cwms.repository.ExportRepository;

@Service
public class ExportService {
    

    @Autowired
	private ExportRepository sbTransactionRepository;

    
    
    public Export getSBTransaction(String sbTransId) {
        Optional<Export> optionalSBTransaction = sbTransactionRepository.findById(sbTransId);
        return optionalSBTransaction.orElse(null);
    }

    public Export createSBTransaction(Export sbTransaction) {
        return sbTransactionRepository.save(sbTransaction);
    }

    
    public void deleteSBTransaction(String sbTransId) {
        sbTransactionRepository.deleteById(sbTransId);
    }

    public List<Export> getAllSBTransactions() {
        return sbTransactionRepository.findAllNotDeleted();
    }
}