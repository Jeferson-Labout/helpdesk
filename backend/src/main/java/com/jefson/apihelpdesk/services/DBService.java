package com.jefson.apihelpdesk.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jefson.apihelpdesk.domain.Tecnico;
import com.jefson.apihelpdesk.domain.enums.Perfil;
import com.jefson.apihelpdesk.repositories.PessoaRepository;

@Service
public class DBService {

	@Autowired
	private PessoaRepository pessoaRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;

	public void instanciaDB() {

		Tecnico tec1 = new Tecnico(null, "Jeferson", "550.482.150-95", "jefson@gmail.com", encoder.encode("123"));
		tec1.addPerfil(Perfil.ADMIN);

		pessoaRepository.saveAll(Arrays.asList(tec1));

	}
}