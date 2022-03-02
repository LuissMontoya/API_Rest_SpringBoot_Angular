package com.backendapiRest.models.Services;

import com.backendapiRest.models.dao.IClienteDao;
import com.backendapiRest.models.entity.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class ClienteServiceImpl implements IClienteService{

    @Autowired
    private IClienteDao clienteDao;

    @Override
    @Transactional(readOnly = true)
    public List<Cliente> finAll() {
        return (List<Cliente>) clienteDao.findAll();
    }
}
