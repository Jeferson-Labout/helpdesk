package com.jefson.apihelpdesk.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import com.jefson.apihelpdesk.services.DBService;

@Configuration
@Profile("dev")
public class DevConfig {
	
	@Autowired
	private DBService dbService;
	@Value("${spring.jpa.hibernate.ddl-auto}")
	private String value;
	
	
	public boolean instanciaDB() {
		
		if(value.equals("create")) {
			
			this.dbService.instaciaDB();
		}
		return false;
	}

}
