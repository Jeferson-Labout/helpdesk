package com.jefson.apihelpdesk.resources;

import java.util.stream.Collectors;

import javax.validation.Valid;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jefson.apihelpdesk.domain.Cliente;
import com.jefson.apihelpdesk.domain.dtos.ClienteDTO;
import com.jefson.apihelpdesk.services.ClienteService;

import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@Tag(name = "Clientes", description = "Endpoint de Clientes")

@RequestMapping(value = "/clientes")
public class ClienteResource {

	@Autowired
	private ClienteService service;

	@GetMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> findById(@PathVariable Integer id) {
		Cliente obj = service.findById(id);

		return ResponseEntity.ok().body(new ClienteDTO(obj));
	}

	@GetMapping
	public Page<ClienteDTO> findAllPagination(@RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "size", defaultValue = "5") Integer tamanhoPagina) {
		PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
		return service.findAllDto(pageRequest);
	}
	
	
	  @GetMapping("/nome")
	  public Page<ClienteDTO> getTitulo(
	        @RequestParam(required = false) String nome,
	        @RequestParam(value = "page", defaultValue = "0") Integer pagina,
			@RequestParam(value = "size", defaultValue = "5") Integer tamanhoPagina
			
	      ) {

		  
		  PageRequest pageRequest = PageRequest.of(pagina, tamanhoPagina);
			return service.getNome(pageRequest, nome);
	  }

	  @GetMapping("/clientes")
	    public Page<Cliente> buscarClientes(
	            @RequestParam(value = "keyword", required = false) String keyword,
	            @RequestParam(value = "page", defaultValue = "0") int page,
	            @RequestParam(value = "size", defaultValue = "10") int size) {

	     
	        Pageable pageable = PageRequest.of(page, size);

	     
	        return service.buscarClientes(keyword, pageable);
	    }
	
	@GetMapping("all")
	public ResponseEntity<java.util.List<ClienteDTO>> findAll() {
		java.util.List<Cliente> list = service.findAll();
		java.util.List<ClienteDTO> listDTO = list.stream().map(obj -> new ClienteDTO(obj)).collect(Collectors.toList());
		return ResponseEntity.ok().body(listDTO);
	}

	@PostMapping
	public ResponseEntity<ClienteDTO> create(@Valid @RequestBody ClienteDTO objDTO) {
		Cliente newObj = service.create(objDTO);
		 return ResponseEntity.status(HttpStatus.CREATED).body(new ClienteDTO(newObj));
	}
	@PutMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> update(@PathVariable Integer id, @Valid @RequestBody ClienteDTO objDTO){
		Cliente obj = service.update(id,objDTO);
		return ResponseEntity.ok().body(new ClienteDTO(obj));
		
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<ClienteDTO> delete(@PathVariable Integer id){
		 service.delete(id);
		 return ResponseEntity.noContent().build();
		
	}

}