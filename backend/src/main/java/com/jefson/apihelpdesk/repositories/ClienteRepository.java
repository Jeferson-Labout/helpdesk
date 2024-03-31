package com.jefson.apihelpdesk.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.jefson.apihelpdesk.domain.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Integer>{
	

	 Page<Cliente> findByNomeContainingIgnoreCase(String nome, Pageable pageable);
	 Page<Cliente> findByNomeContainingIgnoreCaseOrIdOrCpfOrEmailContainingIgnoreCase(String nome, Integer id, String cpf, String email, Pageable pageable);
	Page<Cliente> findByIdOrCpfOrEmailContainingIgnoreCase(int id, String keyword, String keyword2, Pageable pageable);
	Page<Cliente> findByNomeContainingIgnoreCaseOrCpfContainingIgnoreCaseOrEmailContainingIgnoreCase(String keyword,
			String keyword2, String keyword3, Pageable pageable);


}
