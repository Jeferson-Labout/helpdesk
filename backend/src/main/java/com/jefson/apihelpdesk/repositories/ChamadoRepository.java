package com.jefson.apihelpdesk.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jefson.apihelpdesk.domain.Chamado;
import com.jefson.apihelpdesk.domain.enums.Status;

public interface ChamadoRepository extends JpaRepository<Chamado, Integer>{
	
	 Page<Chamado>  findByStatus(Status status, Pageable pageable);
	
	 Page<Chamado> findByTituloContainingIgnoreCase(String titulo, Pageable pageable);

	 
	    long count();

	    @Query("SELECT COUNT(*) FROM Chamado WHERE status = 0")
	    long countChamadoAberto();
	    
	    @Query("SELECT COUNT(*) FROM Chamado WHERE status = 1")
	    long countChamadoAndamento();
	    
	    @Query("SELECT COUNT(*) FROM Chamado WHERE status = 2")
	    long countChamadoFechado();
	    
	    
	    List<Chamado> findTop5ByOrderByIdDesc();

}
