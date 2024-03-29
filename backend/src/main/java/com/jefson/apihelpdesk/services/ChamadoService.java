package com.jefson.apihelpdesk.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.jefson.apihelpdesk.domain.Chamado;
import com.jefson.apihelpdesk.domain.Cliente;
import com.jefson.apihelpdesk.domain.Tecnico;
import com.jefson.apihelpdesk.domain.dtos.ChamadoDTO;
import com.jefson.apihelpdesk.domain.enums.Prioridade;
import com.jefson.apihelpdesk.domain.enums.Status;
import com.jefson.apihelpdesk.repositories.ChamadoRepository;
import com.jefson.apihelpdesk.services.exceptions.ObjectnotFoundException;

@Service
public class ChamadoService {
	@Autowired
	private ChamadoRepository repository;

	@Autowired
	private TecnicoService tecnicoService;

	@Autowired
	private ClienteService clienteService;

	public Chamado findById(Integer id) {
		Optional<Chamado> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectnotFoundException("Objeto não encontrado! Código: " + id));

	}
	
	  public long countChamados() {
	        return repository.count();
	    }

		public long countChamadoAberto() {
			return repository.countChamadoAberto();
		}
		

		public long countChamadoAndamento() {
			return repository.countChamadoAndamento();
		}
		
		
	    public List<Chamado> findTopByOrderByIdDesc() {
	        return repository.findTop5ByOrderByIdDesc();
	    }

		public long countChamadoFechado() {
			return repository.countChamadoFechado();
		}
	
	public Page<ChamadoDTO> findAllDto(Pageable pageable) {

		Page<Chamado> result = repository.findAll(pageable);
		Page<ChamadoDTO> page = result.map(x -> new ChamadoDTO(x));
		return page;
	}
	
	
	public Page<ChamadoDTO> getStatus(Pageable pageable, Status status) {

		Page<Chamado> result = repository.findByStatus(status, pageable);
		Page<ChamadoDTO> page = result.map(x -> new ChamadoDTO(x));
		return page;
	}

	
	public Page<ChamadoDTO> getTitulo(Pageable pageable, String titulo) {

		Page<Chamado> result = repository.findByTituloContainingIgnoreCase(titulo, pageable);
		Page<ChamadoDTO> page = result.map(x -> new ChamadoDTO(x));
		return page;
	}

	public List<Chamado> findAll() {
		return repository.findAll();
	}
	

	@Transactional
	public Chamado create(@Valid ChamadoDTO objDTO) {
		return repository.save(newChamado(objDTO));

	}

	@Transactional
	public Chamado update(Integer id, @Valid ChamadoDTO objDTO) {
		objDTO.setId(id);
		Chamado oldObj = findById(id);
		oldObj = newChamado(objDTO);
		return repository.save(oldObj);
		
	}

	@Transactional
	private Chamado newChamado(ChamadoDTO obj) {
		Tecnico tecnico = tecnicoService.findById(obj.getTecnico());
		Cliente cliente = clienteService.findById(obj.getCliente());
		
		Chamado chamado = new Chamado();
		if(obj.getId() != null) {
			chamado.setId(obj.getId());
		}
		
		if(obj.getStatus().equals(2)) {
			chamado.setDataFechamento(LocalDate.now());
		}
		
		chamado.setTecnico(tecnico);
		chamado.setCliente(cliente);
		chamado.setPrioridade(Prioridade.toEnum(obj.getPrioridade()));
		chamado.setStatus(Status.toEnum(obj.getStatus()));
		chamado.setTitulo(obj.getTitulo());
		chamado.setObservacoes(obj.getObservacoes());
		return chamado;
	}

}
