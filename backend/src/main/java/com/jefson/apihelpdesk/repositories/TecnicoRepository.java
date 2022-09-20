package com.jefson.apihelpdesk.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jefson.apihelpdesk.domain.Tecnico;

public interface TecnicoRepository extends JpaRepository<Tecnico, Integer>{

	 Page<Tecnico> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
}
