package com.jefson.apihelpdesk.resources;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jefson.apihelpdesk.domain.Chamado;
import com.jefson.apihelpdesk.domain.dtos.ChamadoDTO;
import com.jefson.apihelpdesk.domain.enums.Status;
import com.jefson.apihelpdesk.services.ChamadoService;

@RestController
@RequestMapping(value = "/chamados")
public class ChamadoResource {

	@Autowired
	private ChamadoService service;
	
	
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<ChamadoDTO> findById(@PathVariable Integer id){
		Chamado obj = service.findById(id);
		return ResponseEntity.ok().body(new ChamadoDTO(obj));
	}
	
	@GetMapping
	public Page<ChamadoDTO> findAllPagination(		
			@RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "size", defaultValue = "5") Integer tamanhoPagina
			
			) {
		PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
		return service.findAllDto(pageRequest);
	}
	
	

	  @GetMapping("/status")
	  public Page<ChamadoDTO> getstatus(
	        @RequestParam(required = false) Status status,
	        @RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "size", defaultValue = "5") Integer tamanhoPagina
			
	      ) {

		  PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
			return service.getstatus(pageRequest, status);
	  }
	  
	  
	  @GetMapping("/titulo")
	  public Page<ChamadoDTO> getTitulo(
	        @RequestParam(required = false) String titulo,
	        @RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "size", defaultValue = "5") Integer tamanhoPagina
			
	      ) {

		  System.out.println(titulo);
		  PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
			return service.getTitulo(pageRequest, titulo);
	  }
	
	
	@GetMapping("all")
	public ResponseEntity<List<ChamadoDTO>> findAll(){
		List<Chamado> list = service.findAll();
		List<ChamadoDTO>listDTO = list.stream().map(obj -> new ChamadoDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}
	
	@PostMapping
	public ResponseEntity<ChamadoDTO> create(@Valid @RequestBody ChamadoDTO objDTO){
	Chamado obj = service.create(objDTO);		
	 return ResponseEntity.status(HttpStatus.CREATED).body(new ChamadoDTO(obj));
		
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<ChamadoDTO> update(@PathVariable Integer id, @Valid @RequestBody ChamadoDTO objDTO){
		Chamado newObj = service.update(id, objDTO);
		return ResponseEntity.ok().body(new ChamadoDTO(newObj));
		
	}
}
