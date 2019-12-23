# Desafio
Projeto desenvolvido em em Laravel e React js. Nesse repositório encontram-se o modelo do banco usado bem como todo o código desenvolvido.
Foi utilizado o mysql do phpmyadmin porém pode-se utilizar qualquer banco de sua preferencia, apenas deve-se acertar a conexão da configuração do 
.env e as configurações do arquivo /app/config/database.php. 
# Instruções para usar
Ao clonar deve-se criar o database api_rest_laravel e executar os seguintes comandos
1- php artisan migrate  (esse comando irá criar todas as tabelas do banco)
2- npm install (Isso irá todas as dependencias do react)
3- npm run dev (Irá buildar o projeto)
4 - php artisan serve (Irá executar todo o projeto, geralemente na localhost porta 8000)
5- Se for a primeira vez que for utilizar o projeto deve utilizar uma ferramenta RESTful para adicionar os tipos e as especialidades dos herois, pois eles são utilizados para gerar a interface de inserção de heróis.(Criei um seeds e faker para o tipo caso queira utilizar mas nao quis implementar para especilidade por ele criar nomes aletório e preferi deixar para casop quissesem criar nomes de sua especialidade). Para add tipos utilize o endereço  "endereço que o laravel estiver rodando"(geralemente http://127.0.0.1:8000)/api/tipo e passar o arugmento tipo com o valor que deseja adicionar. Para adicionar a especialidade use o endereço http://127.0.0.1:8000/api/especialidade e passe o argumento especialidade com o valor que deseja adicionar. Nesse repositório encontra-se exemplo de como adicionar tipos e expecialidades
# Sobre o projeto
Estre projeto é um CRUD feito com api rest em laravel. Nele é possivel adicionar heróis, atualizar, remover e apresentar os heróis cadastrados
