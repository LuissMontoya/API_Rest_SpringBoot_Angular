package com.backendapiRest.models.Services;

import com.backendapiRest.models.entity.Cliente;

import java.util.List;

public interface IClienteService {

    public List<Cliente> finAll();

    public Cliente findById(Long id);

    public Cliente save(Cliente cliente);

    public void delete(Long id);

}
