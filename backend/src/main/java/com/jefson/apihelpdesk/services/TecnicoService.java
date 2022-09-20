package com.jefson.apihelpdesk.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jefson.apihelpdesk.domain.Pessoa;
import com.jefson.apihelpdesk.domain.Tecnico;
import com.jefson.apihelpdesk.domain.dtos.TecnicoDTO;
import com.jefson.apihelpdesk.repositories.PessoaRepository;
import com.jefson.apihelpdesk.repositories.TecnicoRepository;
import com.jefson.apihelpdesk.services.exceptions.DataIntegrityViolationException;
import com.jefson.apihelpdesk.services.exceptions.ObjectnotFoundException;



@Service
public class TecnicoService {
    @Autowired
	private TecnicoRepository repository;
	@Autowired
	private PessoaRepository pessoaRepository;
	@Autowired
	private BCryptPasswordEncoder encoder;

	public Tecnico findById(Integer id) {
		Optional<Tecnico> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! Id: " + id));

	}

	
	public Page<TecnicoDTO> findAllDto(Pageable pageable) {
		
		Page<Tecnico> result = repository.findAll(pageable);
		Page<TecnicoDTO> page = result.map(x -> new TecnicoDTO(x));
		return page;
	}
	
	
	public Page<TecnicoDTO> getNome(Pageable pageable, String nome) {

		Page<Tecnico> result = repository.findByNomeContainingIgnoreCase(nome, pageable);
		Page<TecnicoDTO> page = result.map(x -> new TecnicoDTO(x));
		
		return page;
		
	}
	
	public List<Tecnico> findAll() {
		return repository.findAll();
	}

	public Tecnico create(TecnicoDTO objDTO) {
		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());
		objDTO.setId(null);
		objDTO.setSenha(encoder.encode(objDTO.getSenha()));
		objDTO.setDataCriacao(today);
		validaPorCpfEEmail(objDTO);
		Tecnico newObj = new Tecnico(objDTO);
		return repository.save(newObj);
	}

	public Tecnico update(Integer id, @Valid TecnicoDTO objDTO) {
		objDTO.setId(id);
		Tecnico oldObj = findById(id);
		validaPorCpfEEmail(objDTO);
		oldObj = new Tecnico(objDTO);
		return repository.save(oldObj);

	}

	public void delete(Integer id) {
		Tecnico obj = findById(id);
		if (obj.getChamados().size() > 0) {
			throw new DataIntegrityViolationException("Técnico possui ordens de serviço e não pode ser deletado!");
		}
		repository.deleteById(id);

	}

	private void validaPorCpfEEmail(TecnicoDTO objDTO) {
		Optional<Pessoa> obj = pessoaRepository.findByCpf(objDTO.getCpf());
		if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("CPF já cadastrado no sistema!");
		}

		obj = pessoaRepository.findByEmail(objDTO.getEmail());
		if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("E-mail já cadastrado no sistema!");
		}
	}

}
