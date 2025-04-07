delimiter $$
create function calcula_idade(data_nascimento date)
returns int 
deterministic
contains sql 
begin
    declare idade int;
    set idade = timestampdiff(year, data_nascimento, curdate());
    return idade;
end; $$
delimiter ;

select calcula_idade('1990-01-01');

--verifica se a função existe
show create function calcula_idade;

select name, calcula_idade(data_nascimento) as idade from usuario;

delimiter $$
create function status_sistema()
returns varchar(50)
no sql
begin
    return 'Sistem Funcionando Normalmente';
end; $$
delimiter ;

select status_sistema();

delimiter $$
create function total_compras_usuario(id_usuario int)
returns int
reads sql data
begin
    declare total int;

    select count(*) into total
    from compra
    where id_usuario = compra.fk_id_usuario;

    return total;
end; $$
delimiter ;

select total_compras_usuario(1) as "Total de compras";

--tabela para testar a clausula modifies sql data
create table log_evento(
    id_log int AUTO_INCREMENT PRIMARY KEY,
    mensagem varchar(255),
    data_log datetime default current_timestamp
);

delimiter $$
create function registrar_log_evento(texto varchar(255))
returns varchar(50)
not deterministic
modifies sql data
begin
    insert into log_evento(mensagem)
    values(texto);

    return 'Log registrado com sucesso';
end; $$
delimiter ;

    select registrar_log_evento('Teste de log');

--visualiza o estado da variavel de controle para permissoes de criação de funções
show variables like 'log_bin_trust_function_creators';

--altera variavel global no MYSQL
--precisa ter permissao de administração no banco
set global log_bin_trust_function_creators= 1;

delimiter $$
create function mensagem_boas_vindas(nome_usuario varchar(100))
returns varchar(255)
deterministic
contains sql
begin
    declare msg varchar(255);
    set msg = concat('Olá, ',nome_usuario, '! Seja bem-vindo(a) ao sistema VIO.');
    return msg;
end; $$
delimiter ;

select mensagem_boas_vindas('Miguelzin')