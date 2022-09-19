package com.jefson.apihelpdesk.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jefson.apihelpdesk.domain.Chamado;
import com.jefson.apihelpdesk.domain.enums.Status;

public interface ChamadoRepository extends JpaRepository<Chamado, Integer>{
	
	 Page<Chamado>  findByStatus(Status status, Pageable pageable);
	
	 Page<Chamado> findByTituloContainingIgnoreCase(String titulo, Pageable pageable);


}
