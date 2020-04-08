import React from 'react';
import { Switch, Route} from 'react-router-dom';
import Home from './view/home';
import CadastroProduto from './view/produtos/cadastro';
import ConsultaProdutos from './view/produtos/consulta'

export default () => {
    return (

            <Switch>
                <Route exact path="/cadastro-produtos/:sku?" component={CadastroProduto}/>
                <Route exact path="/consulta-produtos" component={ConsultaProdutos}/>
                <Route exact path="/" component={Home}/>
                
            </Switch>
  
    )
}
