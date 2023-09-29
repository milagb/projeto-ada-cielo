# projeto-ada-cielo
Projeto feito em Angular e Node nas seguintes versões:
-> Angular CLI: 16.2.3
-> Node: 18.18.0
-> Package Manager: npm 8.19.2

Como rodar o projeto:
1. Clone o repositório para sua máquina local usando o seguinte comando no terminal bash:
    I. SSH: git clone git@github.com:milagb/projeto-ada-cielo.git
    II. https: git clone https://github.com/milagb/projeto-ada-cielo.git
1. Rodar API: No terminal, vá para dentro da pasta (cd api/) e dê os seguintes comandos: 
    I:  npm install
    II: npm start
2. Rodar o Angular: Abra outro terminal, e vá para dentro da pasta (cd app/) e dê os seguintes comandos:
    I:  npm install
    II: ng serve
3. Rodar os Testes: Abra outro terminal, e vá para dentro da pasta (cd app/) e dê o seguinte comando:
    I. ng test

O projeto apresenta as seguintes funcionalidades:
1. Tabela mostrando 6 dados por vez, com todos os campos disponíveis
2. Botões de Next e Prev para navegar pelos próximos dados da tabela
3. Um campo de search, que funciona quando você digita algum id da lista
