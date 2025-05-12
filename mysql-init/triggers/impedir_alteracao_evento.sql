delimiter //

create trigger impedir_alteracao_evento
before update on evento
for each row
begin
    if old.data_hora < curdate() then
        signal sqlstate '45000'
        set message_text= 'Não é permitido alterar eventos que ja ocorreram.';
    end if;
end; //

delimiter ;