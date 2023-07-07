# App


## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar na aplicação;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realiazdos, pelo usuário logado;
- [ ] Deve ser possível que o usuário obtenha o seu histórico de check-in;
- [ ] Deve ser possível que o usuário busque academias próximas;
- [ ] Deve ser possível que o usuário busque academias pelo nome dela;
- [ ] Deve ser possível realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se ele não estiver a 100m da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por Administradores;
- [ ] A academia só pode ser cadastrada por Administradores;


## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação, precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 items por página;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
