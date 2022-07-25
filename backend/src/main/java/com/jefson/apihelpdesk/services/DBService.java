package com.jefson.apihelpdesk.services;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jefson.apihelpdesk.domain.Tecnico;
import com.jefson.apihelpdesk.domain.enums.Perfil;
import com.jefson.apihelpdesk.repositories.TecnicoRepository;

@Service
public class DBService {

	@Autowired
	private TecnicoRepository tecnicoRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;

	public void instaciaDB() {
		Tecnico tec1 = new Tecnico(null, "Jeferson Labout", "33407705069", "jefson@gmail.com", encoder.encode("123"));
		tec1.addPerfil(Perfil.ADMIN);
		tecnicoRepository.saveAll(Arrays.asList(tec1));

	}
}
