const express = require('express');
const chalk = require('chalk');

const app = express();
const port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home')
});

app.get('/decode', (req, res) => {
    //PEGANDO O S-STATELESS-OPEN PELO HEADER

    console.log('X-STATELESS-OPEN \n')
    const tokenStateless = req.headers['x-stateless-open'];

    const tokenStatelessDecod = Buffer.from(tokenStateless, 'base64');
    const tokenStatelessDecodConvert = tokenStatelessDecod.toString('utf-8');
    const xStatelessOpenDecodOBJ = JSON.parse(tokenStatelessDecodConvert);


    console.log("x-stateless-open", tokenStateless);
    console.log('\n');
    console.log( tokenStatelessDecodConvert);

    res.json(xStatelessOpenDecodOBJ.cliente.tipoCliente);

    console.log('\n');
    console.log(xStatelessOpenDecodOBJ.cliente.tipoCliente);

    
    //PEGANDO O TOKEN PELO HEADER

    console.log('BEARER TOKEN \n');
    const BearerToken = req.headers['authorization'].split(" ");

    const BearerTokenArray = BearerToken[1]
    console.log(BearerTokenArray)
    console.log('\n');

    const buff = Buffer.from(BearerTokenArray, 'base64');
    const str = buff.toString('utf-8');
    const strOBJ = JSON.parse(str);
    console.log(strOBJ);
    console.log('\n');
    console.log(strOBJ.token);

}); 

app.listen(port, () => {
    console.log(chalk.bgGreenBright.black(`Servidor rodando: http://localhost:${port}`))
});