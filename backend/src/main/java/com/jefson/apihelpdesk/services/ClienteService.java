package com.jefson.apihelpdesk.services;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jefson.apihelpdesk.domain.Cliente;
import com.jefson.apihelpdesk.domain.Pessoa;
import com.jefson.apihelpdesk.domain.dtos.ClienteDTO;
import com.jefson.apihelpdesk.repositories.ClienteRepository;
import com.jefson.apihelpdesk.repositories.PessoaRepository;
import com.jefson.apihelpdesk.services.exceptions.DataIntegrityViolationException;
import com.jefson.apihelpdesk.services.exceptions.ObjectnotFoundException;

@Service
public class ClienteService {

	@Autowired
	private ClienteRepository repository;
	@Autowired
	private PessoaRepository pessoaRepository;
	
	@Autowired
	private BCryptPasswordEncoder encoder;

	public Cliente findById(Integer id) {
		Optional<Cliente> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! Id: " + id));

	}

	public Page<ClienteDTO> findAllDto(Pageable pageable) {

		Page<Cliente> result = repository.findAll(pageable);
		Page<ClienteDTO> page = result.map(x -> new ClienteDTO(x));
		return page;
	}
	
	
	public Page<ClienteDTO> getNome(Pageable pageable, String nome) {

		Page<Cliente> result = repository.findByNomeContainingIgnoreCase(nome, pageable);
		Page<ClienteDTO> page = result.map(x -> new ClienteDTO(x));
		
		return page;
		
	}

	
	public List<Cliente> findAll() {
		return repository.findAll();
	}

	public Cliente create(ClienteDTO objDTO) {
		objDTO.setId(null);
		objDTO.setSenha(encoder.encode(objDTO.getSenha()));
		validaPorCpfEEmail(objDTO);
		Cliente newObj = new Cliente(objDTO);
		return repository.save(newObj);
	}

	public Page<Cliente> buscarClientes(String keyword, Pageable pageable) {
	    if (keyword != null && !keyword.isEmpty()) {
	        try {
	            // Tenta converter o valor da palavra-chave em um número
	            int id = Integer.parseInt(keyword);
	            // Se for um número, busca apenas pelo ID
	            return repository.findByIdOrCpfOrEmailContainingIgnoreCase(id, keyword, keyword, pageable);
	        } catch (NumberFormatException e) {
	            // Se não puder ser convertido em número, busca por nome, cpf ou email
	            return repository.findByNomeContainingIgnoreCaseOrCpfContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword, keyword, pageable);
	        }
	    } else {
	        return repository.findAll(pageable);
	    }
	}

	
	public Cliente update(Integer id, @Valid ClienteDTO objDTO) {
		objDTO.setId(id);
		objDTO.setSenha(encoder.encode(objDTO.getSenha()));
		Cliente oldObj = findById(id);
		validaPorCpfEEmail(objDTO);
		oldObj = new Cliente(objDTO);
		return repository.save(oldObj);

	}

	public void delete(Integer id) {
		Cliente obj = findById(id);
		if (obj.getChamados().size() > 0) {
			throw new DataIntegrityViolationException("Cliente possui ordens de serviço e não pode ser deletado!");
		}
		repository.deleteById(id);

	}

	private void validaPorCpfEEmail(ClienteDTO objDTO) {
		Optional<Pessoa> obj = pessoaRepository.findByCpf(objDTO.getCpf());
		if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("CPF já cadastrado no sistema! ");
		}

		obj = pessoaRepository.findByEmail(objDTO.getEmail());
		if (obj.isPresent() && obj.get().getId() != objDTO.getId()) {
			throw new DataIntegrityViolationException("E-mail já cadastrado no sistema!");
		}
	}

}
